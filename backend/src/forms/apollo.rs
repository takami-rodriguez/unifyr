use super::FormDataMap;
use crate::{error::EdgeError, forms::creds::CREDENTIALS};
use fastly::Request;
use url::Url;

const APOLLO_BACKEND: &str = "apollo";
const APOLLO_ENRICHMENT: &str = "https://api.apollo.io/api/v1/people/match";

// hard-coded marketo built-in keys
pub fn enrich(formdata: &mut FormDataMap) -> Result<(), EdgeError> {
    let mut vec = vec![
        ("reveal_personal_emails", "false"),
        ("reveal_phone_number", "false"),
    ];

    let email = formdata
        .get("email")
        .expect("email should be present at this point");

    vec.push(("email", email));

    if let Some(first_name) = formdata.get("firstName") {
        vec.push(("first_name", first_name));
    }

    if let Some(last_name) = formdata.get("lastName") {
        vec.push(("last_name", last_name));
    }

    let url = Url::parse_with_params(APOLLO_ENRICHMENT, vec)?;
    let mut response = Request::post(url)
        .with_header("x-api-key", &CREDENTIALS.apollo_match_key)
        .send(APOLLO_BACKEND)?;

    let value = response
        .take_body_json::<apollo_enrichment::Response>()?
        .person;

    formdata.insert("title".into(), value.title);
    formdata.insert("company".into(), value.organization.name);
    formdata.insert(
        "Apollo_Primary_Industry__c".into(),
        value.organization.industry,
    );

    Ok(())
}

#[allow(dead_code)]
mod apollo_enrichment {
    use serde::Deserialize;

    #[derive(Debug, Deserialize)]
    pub struct Response {
        pub person: Person,
    }

    #[derive(Debug, Deserialize)]
    pub struct Person {
        pub title: String,
        pub organization: Organization,
    }

    #[derive(Debug, Deserialize)]
    pub struct Organization {
        pub name: String,
        pub industry: String,
        pub country: String,
    }
}
