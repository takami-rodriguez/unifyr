use super::FormData;
use crate::forms::creds::CREDENTIALS;
use fastly::{http::header, Request};
use serde_json::{json, Value};
use std::error::Error;

const MARKETO_BACKEND: &str = "marketo";
const MARKETO_IDENTITY: &str = "https://907-KOI-624.mktorest.com/identity/oauth/token";
const MARKETO_SUBMIT_FORM: &str = "https://907-KOI-624.mktorest.com/rest/v1/leads/submitForm.json";

fn get_marketo_token() -> Result<String, Box<dyn Error>> {
    let body = json!({
        "client_id": CREDENTIALS.marketo_client_id,
        "client_secret": CREDENTIALS.marketo_client_secret,
        "grant_type": "client_credentials",
    });
    let value: Value = Request::get(MARKETO_IDENTITY)
        .with_body_form(&body)?
        .send(MARKETO_BACKEND)?
        .take_body_json()?;
    let token = value
        .get("access_token")
        .expect("missing token")
        .to_string();
    Ok(token)
}

fn submit(req: &Request, formdata: &FormData) -> Result<(), Box<dyn Error>> {
    let mut url = req.get_url().clone();
    url.set_query(None);

    let visitor_data = marketo_form::request::VisitorData {
        page_url: url.as_str(),
        query_string: req.get_query_str().unwrap_or_default(),
        lead_client_ip_address: &req.get_client_ip_addr().unwrap().to_string(),
        user_agent_string: req.get_header_str(header::USER_AGENT).unwrap_or_default(),
    };

    Ok(())
}

mod marketo_form {
    pub mod request {
        use serde::Serialize;
        use serde_json::Value;
        use std::collections::HashMap;

        #[derive(Serialize)]
        #[serde(rename_all(serialize = "camelCase"))]
        pub struct Data<'a> {
            pub input: Input<'a>,
            pub form_id: i32,
            #[serde(skip_serializing_if = "Option::is_none")]
            pub program_id: Option<i32>,
        }

        #[derive(Serialize)]
        #[serde(rename_all(serialize = "camelCase"))]
        pub struct Input<'a> {
            pub lead_form_fields: HashMap<String, Value>,
            pub visitor_data: VisitorData<'a>,
            #[serde(skip_serializing_if = "Option::is_none")]
            pub cookie: Option<String>,
        }

        #[derive(Serialize)]
        #[serde(rename_all(serialize = "camelCase"))]
        pub struct VisitorData<'a> {
            #[serde(rename(serialize = "pageURL"))]
            pub page_url: &'a str,
            pub query_string: &'a str,
            pub lead_client_ip_address: &'a str,
            pub user_agent_string: &'a str,
        }
    }

    pub mod response {
        use serde::Deserialize;

        #[derive(Deserialize)]
        #[serde(rename_all(deserialize = "camelCase"))]
        pub struct Data {
            pub request_id: String,
            pub success: bool,
            pub result: Option<Vec<Result>>,
            pub errors: Option<Vec<Message>>,
            pub warnings: Option<Vec<Message>>,
        }

        #[derive(Deserialize)]
        pub struct Result {
            pub id: usize,
            pub status: Status,
            pub reasons: Option<Vec<Message>>,
        }

        #[derive(Deserialize)]
        pub struct Message {
            pub code: String,
            pub message: String,
        }

        #[derive(Deserialize, PartialEq)]
        #[serde(rename_all(deserialize = "lowercase"))]
        pub enum Status {
            Created,
            Updated,
            Skipped,
        }
    }
}
