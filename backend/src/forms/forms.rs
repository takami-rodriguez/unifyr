use common::{Attr, FormElement};
use futures::future::join_all;
use serde::Serialize;
use std::{collections::HashMap, future::Future, pin::Pin};

const TURNSTILE_SITEVERIFY: &str = "https://challenges.cloudflare.com/turnstile/v0/siteverify";
const TURNSTILE_BACKEND: &str = "turnstile";
const TURNSTILE_KEY: &str = "cf-turnstile-response";

// type ElementHandlerArray<'h> = Vec<(Cow<'static, Selector>, ElementContentHandlers<'h>)>;

#[derive(Serialize)]
pub struct FormError<'a> {
    #[serde(skip_serializing_if = "Option::is_none")]
    pub name: Option<&'a str>,
    pub message: &'a str,
}

mod validations {
    use super::{Validation, TURNSTILE_BACKEND, TURNSTILE_SITEVERIFY};
    use crate::forms::creds::CREDENTIALS;
    use fastly::Request;
    use serde_json::{json, Value};
    use std::error::Error;

    pub const NO_OP: Validation = |_| Box::pin(std::future::ready(Ok(())));

    pub const REQUIRED: Validation = |value: Option<&str>| {
        let result = if value.is_some_and(|s| !s.is_empty()) {
            Ok(())
        } else {
            Err("This field is required")
        };
        Box::pin(std::future::ready(result))
    };

    pub const TURNSTILE: Validation = |value: Option<&str>| {
        fn fallible(value: Option<&str>) -> Result<bool, Box<dyn Error>> {
            let body = json!({
                "secret": CREDENTIALS.turnstile_secret_key,
                "response": value,
            });

            let value: Value = Request::post(TURNSTILE_SITEVERIFY)
                .with_body_json(&body)?
                .send(TURNSTILE_BACKEND)?
                .take_body_json()?;

            let success = value
                .get("success")
                .and_then(|b| b.as_bool())
                .expect("challenge response missing");

            Ok(success)
        }

        let result = match fallible(value) {
            Ok(b) if b == true => Ok(()),
            _ => Err("An error occurred. Please try again."),
        };

        Box::pin(std::future::ready(result))
    };
}

pub type FormData = Vec<(String, String)>;
pub type FormDataMap = HashMap<String, String>;

type ValidationResult = Result<(), &'static str>;
type Pending = Pin<Box<dyn Future<Output = ValidationResult>>>;
type Validation = fn(Option<&str>) -> Pending;
type Field = (&'static str, Vec<Validation>);
type Applied = (&'static str, Pending);

type FormErrors = HashMap<&'static str, &'static str>;

pub struct Form {
    fields: Vec<Field>,
}

impl Form {
    pub fn from_elements(elements: &'static Vec<FormElement>) -> Self {
        let mut fields: Vec<Field> = vec![];

        for FormElement { name, attrs } in elements.iter() {
            let mut validations: Vec<Validation> = vec![];

            let mut attr_based_validations: Vec<Validation> = attrs
                .iter()
                .map(
                    |Attr { name, value }| match (name.as_ref(), value.as_ref()) {
                        ("required", _) => validations::REQUIRED,
                        _ => validations::NO_OP,
                    },
                )
                .collect();

            let name_based_validation: Validation = match name.as_ref() {
                _ => validations::NO_OP,
            };

            validations.append(&mut attr_based_validations);
            validations.push(name_based_validation);

            fields.push((name, validations));
        }

        fields.push((TURNSTILE_KEY, vec![validations::TURNSTILE]));

        Self { fields }
    }

    pub async fn validate(&self, map: &FormDataMap) -> Result<(), FormErrors> {
        let intermediate: Vec<Applied> = self
            .fields
            .iter()
            .flat_map(|&(name, ref validators)| {
                let value = map.get(name).map(|s| s.as_str());
                validators.iter().map(move |f| (name, f(value)))
            })
            .collect();

        let (names, pending): (Vec<&'static str>, Vec<Pending>) = intermediate.into_iter().unzip();
        let results = join_all(pending).await;
        let errors = names
            .into_iter()
            .zip(results)
            .filter(|(_, result)| result.is_err())
            .rfold(HashMap::new(), |mut map, (name, result)| {
                let _ = map.try_insert(name, result.err().unwrap());
                map
            });

        if errors.is_empty() {
            Ok(())
        } else {
            Err(errors)
        }
    }
}
