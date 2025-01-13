use super::FormDataMap;
use crate::forms::creds::CREDENTIALS;
use cookie::Cookie;
use fastly::{
    http::{header, Url},
    Request,
};
use serde_json::Value;
use std::{error::Error, fmt::Display, net::IpAddr};

const MARKETO_BACKEND: &str = "marketo";
const MARKETO_IDENTITY: &str = "https://907-KOI-624.mktorest.com/identity/oauth/token";
const MARKETO_SUBMIT_FORM: &str = "https://907-KOI-624.mktorest.com/rest/v1/leads/submitForm.json";

#[derive(Debug)]
pub enum MarketoError {
    Internal(String),
}

impl Error for MarketoError {}

impl Display for MarketoError {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        match self {
            MarketoError::Internal(m) => write!(f, "Form error: {}", m),
        }
    }
}

fn get_marketo_token() -> Result<String, Box<dyn Error>> {
    let url = Url::parse_with_params(
        MARKETO_IDENTITY,
        &[
            ("client_id", &CREDENTIALS.marketo_client_id),
            ("client_secret", &CREDENTIALS.marketo_client_secret),
            ("grant_type", &"client_credentials".to_owned()),
        ],
    )?;
    let value: Value = Request::get(url).send(MARKETO_BACKEND)?.take_body_json()?;
    let token = value
        .get("access_token")
        .expect("missing token")
        .as_str()
        .unwrap()
        .to_owned();
    Ok(token)
}

pub fn submit(
    req: &Request,
    form_id: i32,
    lead_form_fields: &FormDataMap,
) -> Result<(), Box<dyn Error>> {
    let token = get_marketo_token()?;

    let mut url = req.get_url().clone();
    url.set_query(None);

    let cookie = req.get_header_str(header::COOKIE).and_then(|cookie| {
        Cookie::split_parse(cookie)
            .filter_map(|c| c.ok())
            .find(|c| c.name() == "_mkto_trk")
    });
    let cookie = cookie.as_ref().map(|c| c.value());

    let lead_client_ip_address = if let Some(IpAddr::V4(ip)) = req.get_client_ip_addr() {
        Some(ip.to_string())
    } else {
        None
    };

    let visitor_data = marketo_form::request::VisitorData {
        page_url: url.as_str(),
        query_string: req.get_query_str().unwrap_or_default(),
        lead_client_ip_address,
        user_agent_string: req.get_header_str(header::USER_AGENT).unwrap_or_default(),
    };

    let input = vec![marketo_form::request::Input {
        lead_form_fields,
        visitor_data,
        cookie,
    }];

    let data = marketo_form::request::Data {
        input,
        form_id,
        program_id: None,
    };

    println!("{}", serde_json::to_string_pretty(&data)?);

    let request = Request::post(MARKETO_SUBMIT_FORM)
        .with_header(header::AUTHORIZATION, format!("Bearer {}", token))
        .with_body_json(&data)?;
    let mut response = request.send(MARKETO_BACKEND)?;
    let json: marketo_form::response::Data = response.take_body_json()?;

    if json.success {
        Ok(())
    } else {
        let final_error: &str = json
            .errors
            .as_ref()
            .and_then(|errors| errors.last())
            .map(|error| error.message.as_ref())
            .unwrap_or_default();

        Err(Box::new(MarketoError::Internal(final_error.to_owned())))
    }
}

#[allow(dead_code)]
mod marketo_form {
    pub mod request {
        use serde::Serialize;
        use std::collections::HashMap;

        #[derive(Debug, Serialize)]
        #[serde(rename_all(serialize = "camelCase"))]
        pub struct Data<'a> {
            pub input: Vec<Input<'a>>,
            pub form_id: i32,
            #[serde(skip_serializing_if = "Option::is_none")]
            pub program_id: Option<i32>,
        }

        #[derive(Debug, Serialize)]
        #[serde(rename_all(serialize = "camelCase"))]
        pub struct Input<'a> {
            pub lead_form_fields: &'a HashMap<String, String>,
            pub visitor_data: VisitorData<'a>,
            #[serde(skip_serializing_if = "Option::is_none")]
            pub cookie: Option<&'a str>,
        }

        #[derive(Debug, Serialize)]
        #[serde(rename_all(serialize = "camelCase"))]
        pub struct VisitorData<'a> {
            #[serde(rename(serialize = "pageURL"))]
            pub page_url: &'a str,
            pub query_string: &'a str,
            pub lead_client_ip_address: Option<String>,
            pub user_agent_string: &'a str,
        }
    }

    pub mod response {
        use serde::Deserialize;

        #[derive(Debug, Deserialize)]
        #[serde(rename_all(deserialize = "camelCase"))]
        pub struct Data {
            pub request_id: String,
            pub success: bool,
            pub result: Option<Vec<Result>>,
            pub errors: Option<Vec<Message>>,
            pub warnings: Option<Vec<Message>>,
        }

        #[derive(Debug, Deserialize)]
        pub struct Result {
            pub id: Option<usize>,
            pub status: Status,
            pub reasons: Option<Vec<Message>>,
        }

        #[derive(Debug, Deserialize)]
        pub struct Message {
            pub code: String,
            pub message: String,
        }

        #[derive(Debug, Deserialize, PartialEq)]
        #[serde(rename_all(deserialize = "lowercase"))]
        pub enum Status {
            Created,
            Updated,
            Skipped,
        }
    }
}
