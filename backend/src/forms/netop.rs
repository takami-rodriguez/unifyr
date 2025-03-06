use super::creds::CREDENTIALS;
use crate::{error::EdgeError, BLACKLIST};
use fastly::Request;
use std::collections::HashMap;
use url::Url;

const NETOP_URL: &str = "https://api.connect.backdrop.cloud/api/v4/rest/account/trial";
const NETOP_BACKEND: &str = "netop";

pub fn start_netop_trial(mut req: Request) -> Result<(), EdgeError> {
    let body: HashMap<String, String> = req.take_body_json()?;

    if body
        .get("email")
        .and_then(|v| v.split_once('@'))
        .map(|split| split.1)
        .is_some_and(|domain| BLACKLIST.contains(domain))
    {
        return Ok(());
    }

    let url = Url::parse_with_params(NETOP_URL, &[("apikey", &CREDENTIALS.netop_api_key)])?;

    let _ = req
        .with_url(url)
        .with_body_json(&body)?
        .send_async(NETOP_BACKEND);

    Ok(())
}
