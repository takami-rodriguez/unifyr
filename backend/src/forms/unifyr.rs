use super::FormDataMap;
use crate::error::EdgeError;
use fastly::Request;
use std::collections::HashMap;

const UNIFYR_BACKEND: &str = "unifyr";
const UNIFYR_ENDPOINT: &str = "https://plus.unifyr.com/rest/unifyr/registration";

pub fn register(formdata: &FormDataMap) -> Result<(), EdgeError> {
    let mut json = HashMap::with_capacity(3);

    for (k, v) in formdata {
        if ["firstName", "lastName", "email"].contains(&k.as_str()) {
            json.insert(k, v);
        }
    }

    let _ = Request::post(UNIFYR_ENDPOINT)
        .with_body_json(&json)?
        .send_async(UNIFYR_BACKEND);

    Ok(())
}
