#![feature(async_closure)]

mod forms;
mod s3;

use fastly::{
    http::{header, CandidateResponse, HeaderName, Method, StatusCode},
    Request, Response,
};
use s3::S3Config;
use std::{error::Error, sync::LazyLock};

const BACKEND: &str = "s3";

fn main() -> Result<(), Box<dyn Error>> {
    let mut req = fastly::Request::from_client();

    match *req.get_method() {
        Method::GET => {
            req.set_ttl(31536000); // 1 year
            req.set_stale_while_revalidate(86400); // 1 day

            let response = retrieve(req)?;
            response.send_to_client();
        }
        Method::HEAD => {
            req.set_ttl(31536000); // 1 year
            req.set_stale_while_revalidate(86400); // 1 day

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

    fn call_backend(
        req: &Request,
        f: fn(&mut Request, path: &str),
    ) -> Result<Response, Box<dyn Error>> {
        static CONFIG: LazyLock<S3Config> = LazyLock::new(|| S3Config::load());

        let path = req.get_path();
        let mut bereq = req.clone_without_body();
        f(&mut bereq, path);

        let response = bereq
            .with_before_send(|req| {
                s3::authorize(req, &CONFIG);
                Ok(())
            })
            .with_after_send(|resp| {
                filter_headers(resp);

                #[cfg(not(feature = "production"))]
                resp.set_header("x-robots-tag", "noindex");

                Ok(())
            })
            .send(BACKEND)?;

        Ok(response)
    }

    let resp = call_backend(&req, |r, p| {
        if p.ends_with('/') {
            r.set_path(&format!("{}index.html", p));
        }
    })?;

    if resp.get_status().is_success() {
        if let Some(value) = resp.get_header_str("x-amz-website-redirect-location") {
            return Ok(Response::redirect(value));
        } else {
            return Ok(resp);
        }
    } else {
        // It may actually be HTML; try looking for the corresponding index.html file
        let resp = call_backend(&req, |r, p| r.set_path(&format!("{}/index.html", p)))?;
        if resp.get_status().is_success() {
            // It was actually HTML... normalize to a trailing slash
            return Ok(Response::redirect(format!("{}/", req.get_path())));
        } else {
            // Return 404
            return Ok(call_backend(&req, |r, _| r.set_path("/404.html"))?
                .with_status(StatusCode::NOT_FOUND));
        }
    }
}

fn filter_headers(resp: &mut CandidateResponse) {
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

    if let Some(mime) = resp.get_content_type() {
        if mime.essence_str() == "text/html" {
            resp.set_header(header::ALT_SVC, "h3=\":443\"; ma=2592000; persist=1");
        }
    }
}
