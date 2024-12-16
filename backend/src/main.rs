#![feature(async_closure)]

mod forms;
mod s3;

use fastly::{
    http::{header, request::SendError, CandidateResponse, HeaderName, Method, StatusCode, Url},
    mime, Request, Response,
};
use s3::S3Config;
use std::{error::Error, sync::LazyLock, time::Duration};

const BACKEND: &str = "s3";

fn main() -> Result<(), Box<dyn Error>> {
    let req = fastly::Request::from_client();

    match *req.get_method() {
        Method::GET => {
            let response = retrieve(req)?;
            response.send_to_client();
        }
        Method::HEAD => {
            let response = retrieve(req)?;
            response.clone_without_body().send_to_client();
        }
        _ => {
            let response = Response::from_status(StatusCode::METHOD_NOT_ALLOWED);
            response.send_to_client();
        }
    }

    Ok(())
}

fn retrieve(mut req: Request) -> Result<Response, Box<dyn Error>> {
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

    fn call_backend(req: &Request, f: fn(&mut Request, path: &str)) -> Result<Response, SendError> {
        static CONFIG: LazyLock<S3Config> = LazyLock::new(|| S3Config::load());

        let path = req.get_path();
        // Response handler needs to know this for caching behavior
        let is_hashed = path.starts_with("/_next/");

        let mut bereq = req.clone_without_body();

        normalize_request(&mut bereq);
        f(&mut bereq, path);

        let response = bereq
            .with_before_send(|req| {
                s3::authorize(req, &CONFIG);
                req.set_auto_decompress_gzip(true);
                Ok(())
            })
            .with_after_send(move |resp| {
                finalize_headers(resp, is_hashed);

                resp.set_surrogate_keys(["all"]);
                resp.set_ttl(Duration::from_secs(31_536_000)); // surrogate; 1 year
                resp.set_stale_while_revalidate(Duration::from_secs(86_400)); // 1 day

                Ok(())
            })
            .send(BACKEND)?;

        Ok(response)
    }

    // Store query in case of redirect
    let query: Vec<(String, String)> = req.get_query()?;

    let resp = call_backend(&req, |r, p| {
        if p.ends_with('/') {
            r.set_path(&format!("{}index.html", p));
        }
    })?;

    if resp.get_status().is_success() {
        if let Some(value) = resp.get_header_str("x-amz-website-redirect-location") {
            let url = Url::parse_with_params(value, query)?;
            return Ok(Response::redirect(url));
        } else {
            return Ok(resp);
        }
    } else {
        // It may actually be HTML; try looking for the corresponding index.html file
        let resp = call_backend(&req, |r, p| r.set_path(&format!("{}/index.html", p)))?;
        if resp.get_status().is_success() {
            // It was actually HTML... normalize to a trailing slash
            let url = Url::parse_with_params(&format!("{}/", req.get_path()), query)?;
            return Ok(Response::redirect(url));
        } else {
            // Return 404
            return Ok(call_backend(&req, |r, _| r.set_path("/404.html"))?
                .with_status(StatusCode::NOT_FOUND));
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
        .filter(|&header| !ALLOWED_HEADERS.contains(header))
        .cloned()
        .collect();

    for header in removals {
        resp.remove_header(header);
    }

    resp.set_header("x-compress-hint", "on");

    #[cfg(not(feature = "production"))]
    resp.set_header("x-robots-tag", "noindex");

    if let Some(mime) = resp.get_content_type() {
        if mime.essence_str() == "text/html" {
            resp.set_header(header::ALT_SVC, "h3=\":443\"; ma=2592000; persist=1");

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
