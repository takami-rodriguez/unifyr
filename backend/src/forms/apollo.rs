use super::FormDataMap;
use crate::error::EdgeError;
use fastly::Request;
use url::Url;

const APOLLO_BACKEND: &str = "apollo";
const APOLLO_ENRICHMENT: &str = "https://api.apollo.io/api/v1/people/match";

pub fn enrich(formdata: &mut FormDataMap) -> Result<(), EdgeError> {
    let mut vec = vec![];

    let email = formdata
        .get("Email")
        .expect("email should be present at this point");

    vec.push(("email", email));

    if let Some(first_name) = formdata.get("FirstName") {
        vec.push(("first_name", first_name));
    }

    if let Some(last_name) = formdata.get("LastName") {
        vec.push(("last_name", last_name));
    }

    let url = Url::parse_with_params(APOLLO_ENRICHMENT, vec)?;
    let mut response = Request::post(url).send(APOLLO_BACKEND)?;
    let value: apollo_enrichment::Response = response.take_body_json()?;

    // FIXME: get real field names
    formdata.insert("Title".into(), value.title);
    formdata.insert("CompanyName".into(), value.organization.name);
    formdata.insert("Industry".into(), value.organization.industry);

    Ok(())
}

mod apollo_enrichment {
    use serde::Deserialize;

    #[derive(Deserialize)]
    pub struct Response {
        pub title: String,
        pub organization: Organization,
    }

    #[derive(Deserialize)]
    pub struct Organization {
        pub name: String,
        pub industry: String,
        pub country: String,
    }
}
