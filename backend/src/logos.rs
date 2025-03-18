use crate::{error::EdgeError, forms::creds::CREDENTIALS, utils::base64_encode};
use fastly::Request;
use std::time::Duration;
use url::Url;

const LOGOS_BACKEND: &str = "logos";

pub fn retrieve_logo(domain: &str) -> Result<String, EdgeError> {
    let kv = fastly::kv_store::KVStore::open("logos")?.unwrap();
    if let Some(body) = kv.lookup(domain)?.try_take_body() {
        return Ok(body.into_string());
    }

    let url = Url::parse_with_params(
        "https://img.logo.dev",
        &[
            ("token", CREDENTIALS.logos_dev_public_key.as_str()),
            ("size", "256"),
            ("retina", "true"),
            ("format", "webp"),
            ("fallback", "404"),
        ],
    )?;

    let response = Request::get(url).send(LOGOS_BACKEND)?;

    if response.get_status().is_success() {
        let bytes = response.into_body_bytes();
        let base64_buf = base64_encode(&bytes);
        let base64_str = str::from_utf8(&base64_buf).unwrap();

        let _ = kv
            .build_insert()
            .time_to_live(Duration::from_secs(60 * 60 * 24 * 28 * 2))
            .execute_async(domain, base64_str);

        Ok(base64_str.into())
    } else {
        Err(EdgeError::GenericError)
    }
}
