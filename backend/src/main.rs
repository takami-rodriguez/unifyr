mod crt;
mod error;
mod forms;
mod logos;
mod rewriter;
mod s3;
mod utils;

use common::{DomainStore, Forms};
use error::EdgeError;
use fastly::{
    http::{header, CandidateResponse, HeaderName, Method, StatusCode},
    mime, Request, Response,
};
use regex::Regex;
use s3::S3Config;
use serde_json::json;
use std::{sync::LazyLock, time::Duration};
use url::Url;

const BACKEND: &str = "s3";

const SER_FORMS: &[u8] = include_bytes!(concat!(env!("OUT_DIR"), "/forms.bin"));
const SER_BLACKLIST: &[u8] = include_bytes!(concat!(env!("OUT_DIR"), "/blacklist.bin"));

pub static FORMS: LazyLock<Forms> = LazyLock::new(|| bincode::deserialize(SER_FORMS).unwrap());
pub static BLACKLIST: LazyLock<DomainStore> =
    LazyLock::new(|| bincode::deserialize(SER_BLACKLIST).unwrap());

fn main() -> Result<(), EdgeError> {
    let mut req = fastly::Request::from_client();

    match *req.get_method() {
        Method::GET => {
            #[cfg(not(feature = "production"))]
            if req.get_path() == "/analyze" {
                if let Some(domain) = req.get_query_parameter("domain") {
                    let result = futures::executor::block_on(crt::search(domain));
                    if let Err(_) = result {
                        let response = Response::from_body(
                            "I'm painfully slow and still investigating... try again.",
                        );
                        response.send_to_client();
                        return Ok(());
                    }

                    let body = serde_json::to_string(&result.unwrap())?;
                    let response = Response::from_body(body);
                    response.send_to_client();
                    return Ok(());
                }
            }

            let mut resp = retrieve(req)?;
            if utils::is_html(&resp) {
                rewriter::rewrite(&mut resp);
            }
            resp.send_to_client();
        }
        Method::HEAD => {
            let mut resp = retrieve(req)?;
            if utils::is_html(&resp) {
                rewriter::rewrite(&mut resp);
            }
            resp.clone_without_body().send_to_client();
        }
        Method::POST => {
            // This is a proxy for the Netop sister company; they don't have a server to run this
            // securely.
            if req.get_path().eq_ignore_ascii_case("/api/netop/trial") {
                let _ = forms::netop::start_netop_trial(req);
                return Ok(());
            }

            // Provide a way for the client to request a company logo for page personalization
            // purposes.
            if req.get_path().eq_ignore_ascii_case("/retrieve-logo") {
                if let Some(domain) = req.get_query_parameter("domain") {
                    let logo = logos::retrieve_logo(domain)?;
                    Response::from_body(logo).send_to_client();
                    return Ok(());
                }
            }

            // Otherwise, expect the POST request is a form.
            let re = Regex::new(r"^/forms/(\d+)$").unwrap();

            let mut formdata: forms::FormDataMap = if let Ok(formdata) = req.take_body_form() {
                formdata
            } else {
                let response = Response::from_status(StatusCode::NOT_FOUND);
                response.send_to_client();
                return Ok(());
            };

            let result = re
                .captures(req.get_path())
                .and_then(|c| c.get(1))
                .map(|m| m.as_str())
                .and_then(|id| FORMS.get_key_value(id))
                .map(|(id, raw)| {
                    (
                        id.parse().unwrap(),
                        crate::forms::Form::from_elements(raw.as_ref()),
                    )
                });

            let response = if let Some((id, form)) = result {
                let err_map = futures::executor::block_on(form.validate(&formdata));

                if !err_map.is_empty() {
                    Response::from_status(StatusCode::BAD_REQUEST).with_body_json(&err_map)?
                } else {
                    // post-process formdata
                    forms::post_proc_formdata(&req, &mut formdata);

                    match forms::marketo::submit(&req, id, &formdata) {
                        Err(err) => {
                            let message = format!(
                                "An error occurred. Please contact hello@unifyr.com. ({})",
                                err.to_string()
                            );
                            let body = json!({
                                "message": message
                            });
                            Response::from_status(StatusCode::BAD_REQUEST).with_body_json(&body)?
                        }
                        Ok(_) => {
                            // Register with Unifyr+ if applicable.
                            if formdata
                                .get("entity_type__c")
                                .is_some_and(|val| val.eq_ignore_ascii_case("partner"))
                            {
                                let _ = forms::unifyr::register(&formdata);
                            }

                            Response::from_status(StatusCode::OK)
                        }
                    }
                }
            } else {
                Response::from_status(StatusCode::NOT_FOUND)
            };

            response.send_to_client();
        }
        _ => {
            let response = Response::from_status(StatusCode::METHOD_NOT_ALLOWED)
                .with_header(header::ALLOW, "GET, HEAD");
            response.send_to_client();
        }
    }

    Ok(())
}

fn retrieve(mut req: Request) -> Result<Response, EdgeError> {
    let mut redirect = false;

    // Redirect **/index.html → **/
    let mut url = req.get_url_mut();
    let path = url.path();
    if path.ends_with("/index.html") {
        let path = path.to_owned();
        url.set_path(&path[..path.len() - "index.html".len()]);
        redirect = true;
    }

    // Production only
    // Redirect https://unifyr.com → https://www.unifyr.com
    #[cfg(feature = "production")]
    {
        let host = url.host_str().unwrap();
        if !host.starts_with("www.") {
            let host = host.to_owned();
            url.set_host(Some(&format!("www.{}", host)))?;
            redirect = true;
        }
    }

    drop(url);

    if redirect {
        return Ok(Response::redirect(req.get_url()));
    }

    fn call_backend(req: &Request, f: fn(&mut Request)) -> Result<Response, EdgeError> {
        static CONFIG: LazyLock<S3Config> = LazyLock::new(|| S3Config::load());

        let path = req.get_path();
        // Response handler needs to know this for caching behavior
        let is_hashed = path.starts_with("/_next/");

        let mut bereq = req.clone_without_body();

        normalize_request(&mut bereq);
        f(&mut bereq);

        let response = bereq
            .with_before_send(|req| {
                s3::authorize(req, &CONFIG);
                req.set_auto_decompress_gzip(true);
                Ok(())
            })
            .with_after_send(move |resp| {
                finalize_headers(resp, is_hashed);

                resp.set_ttl(Duration::from_secs(31_536_000)); // surrogate; 1 year
                resp.set_stale_while_revalidate(Duration::from_secs(86_400)); // 1 day

                Ok(())
            })
            .send(BACKEND)?;

        Ok(response)
    }

    let resp = call_backend(&req, |r| {
        let path = r.get_path();
        if path.ends_with('/') {
            r.set_path(&format!("{}index.html", path));
        }
    })?;

    if resp.get_status().is_success() {
        return match resp.get_header_str("x-amz-website-redirect-location") {
            Some(value) if value.starts_with('/') => {
                req.set_path(value);
                Ok(Response::redirect(req.get_url()))
            }
            Some(value) => {
                let query = req.get_query_str();
                let mut url = Url::parse(value)?;

                url.set_query(query);
                Ok(Response::redirect(url))
            }
            None => Ok(resp),
        };
    } else {
        // It may actually be HTML; try looking for the corresponding index.html file
        let resp = call_backend(&req, |r| {
            let path = r.get_path();
            r.set_path(&format!("{}/index.html", path));
        })?;

        if resp.get_status().is_success() {
            // It was actually HTML... normalize to a trailing slash
            let path = req.get_path();
            req.set_path(&format!("{}/", path));
            return Ok(Response::redirect(req.get_url()));
        } else {
            // Return 404
            return Ok(
                call_backend(&req, |r| r.set_path("/404.html"))?.with_status(StatusCode::NOT_FOUND)
            );
        }
    }
}

fn finalize_headers(resp: &mut CandidateResponse, is_hashed: bool) {
    const ALLOWED_HEADERS: &[HeaderName] = &[
        header::AGE,
        header::CACHE_CONTROL,
        header::CONTENT_ENCODING,
        header::CONTENT_TYPE,
        header::DATE,
        header::ETAG,
        header::LOCATION,
        header::VARY,
    ];

    let removals: Vec<HeaderName> = resp
        .get_header_names()
        .filter(|&header| {
            !ALLOWED_HEADERS.contains(header)
                && header != HeaderName::from_static("x-amz-website-redirect-location")
        })
        .cloned()
        .collect();

    for header in removals {
        resp.remove_header(header);
    }

    if let Some(mime) = resp.get_content_type() {
        if mime.subtype() == mime::HTML || mime.subtype() == mime::PLAIN {
            // For HTML, do not cache on the client
            resp.set_header(header::CACHE_CONTROL, "no-store, must-revalidate");
        } else if mime.type_() == mime::IMAGE && !is_hashed {
            // For images without hashes, cache temporarily
            resp.set_header(header::CACHE_CONTROL, "public, max-age=86400");
        } else {
            // For all other content, cache for a long time
            resp.set_header(header::CACHE_CONTROL, "public, max-age=31536000, immutable");
        }
    }

    // Set noindex on non-production deployments
    #[cfg(not(feature = "production"))]
    resp.set_header("x-robots-tag", "noindex");

    // Set Fastly compression hint
    resp.set_header("x-compress-hint", "on");

    // alt-svc + security (non-csp)
    resp.set_header(header::ALT_SVC, r#"h3=":443"; ma=2592000; persist=1"#);
    resp.set_header(header::CONTENT_SECURITY_POLICY, "default-src 'self'"); // default
    resp.set_header(header::REFERRER_POLICY, "strict-origin");
    resp.set_header(header::X_CONTENT_TYPE_OPTIONS, "nosniff");
    resp.set_header(header::X_FRAME_OPTIONS, "DENY");
    resp.set_header(
        header::STRICT_TRANSPORT_SECURITY,
        "max-age=63072000; includeSubDomains; preload",
    );
}

fn normalize_request(req: &mut Request) {
    #[inline]
    fn norm_accept<'a>(input: &str, accept: &[&'a str], def: &'a str) -> &'a str {
        accept
            .iter()
            .find(|&val| input.contains(val))
            .unwrap_or(&def)
    }

    let enc_accept = vec!["br", "gzip"];
    let enc_def = "identity";
    let enc_norm = norm_accept(
        req.get_header_str(header::ACCEPT_ENCODING).unwrap_or(""),
        &enc_accept,
        enc_def,
    );

    let charset_accept = vec!["utf-8", "iso-8859-2", "iso-8859-5"];
    let charset_def = "utf-8";
    let charset_norm = norm_accept(
        req.get_header_str(header::ACCEPT_CHARSET).unwrap_or(""),
        &charset_accept,
        charset_def,
    );

    req.remove_query();

    req.remove_header(header::ACCEPT_LANGUAGE);
    req.remove_header(header::COOKIE);
    req.remove_header(header::USER_AGENT);
    req.remove_header(header::REFERER);
    req.set_header(header::ACCEPT_ENCODING, enc_norm);
    req.set_header(header::ACCEPT_CHARSET, charset_norm);
}
