use crate::forms::creds::CREDENTIALS;
use fastly::Request;
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

mod marketo_form {
    mod request {
        use serde::Serialize;
        use serde_json::Value;
        use std::collections::HashMap;

        #[derive(Serialize)]
        #[serde(rename_all(serialize = "camelCase"))]
        pub struct Data {
            input: Input,
            form_id: i32,
            #[serde(skip_serializing_if = "Option::is_none")]
            program_id: Option<i32>,
        }

        #[derive(Serialize)]
        #[serde(rename_all(serialize = "camelCase"))]
        pub struct Input {
            lead_form_fields: HashMap<String, Value>,
            visitor_data: VisitorData,
            #[serde(skip_serializing_if = "Option::is_none")]
            cookie: Option<String>,
        }

        #[derive(Serialize)]
        #[serde(rename_all(serialize = "camelCase"))]
        pub struct VisitorData {
            #[serde(rename(serialize = "pageURL"))]
            page_url: String,
            query_string: String,
            lead_client_ip_address: String,
            user_agent_string: String,
        }
    }

    mod response {
        use serde::Deserialize;

        #[derive(Deserialize)]
        #[serde(rename_all(deserialize = "camelCase"))]
        pub struct Data {
            request_id: String,
            success: bool,
            result: Option<Vec<Result>>,
            errors: Option<Vec<Message>>,
            warnings: Option<Vec<Message>>,
        }

        #[derive(Deserialize)]
        pub struct Result {
            id: usize,
            status: Status,
            reasons: Option<Vec<Message>>,
        }

        #[derive(Deserialize)]
        pub struct Message {
            code: String,
            message: String,
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
