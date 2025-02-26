use crate::error::EdgeError;
use common::{Attr, FormElement};
use fastly::Request;
use futures::future::join_all;
use std::{collections::HashMap, future::Future, pin::Pin};

const TURNSTILE_SITEVERIFY: &str = "https://challenges.cloudflare.com/turnstile/v0/siteverify";
const TURNSTILE_BACKEND: &str = "turnstile";
const TURNSTILE_KEY: &str = "cf-turnstile-response";

// type ElementHandlerArray<'h> = Vec<(Cow<'static, Selector>, ElementContentHandlers<'h>)>;

pub type FormData = Vec<(String, String)>;
pub type FormDataMap = HashMap<String, String>;

type ValidationResult = Result<(), EdgeError>;
type Pending<'a> = Pin<Box<dyn Future<Output = ValidationResult> + 'a>>;
type Validation<'a> = fn(Option<&'a str>) -> Pending<'a>;
type Field<'a> = (&'static str, Vec<Validation<'a>>);
type Applied<'a> = (&'static str, Pending<'a>);

type FormErrors = HashMap<&'static str, &'static str>;

pub struct Form<'a> {
    fields: Vec<Field<'a>>,
}

impl<'a> Form<'a> {
    pub fn from_elements(elements: &'static Vec<FormElement>) -> Self {
        let mut fields: Vec<Field> = vec![];

        for FormElement { name, attrs } in elements.iter() {
            let mut validations: Vec<Validation> = vec![];

            for Attr { name, value } in attrs.iter() {
                let attr_validation = match (name.as_ref(), value) {
                    ("required", _) => validations::required,
                    _ => validations::no_op,
                };

                validations.push(attr_validation);
            }

            let name_based_validation = match name.as_ref() {
                "email" => validations::blacklist,
                _ => validations::no_op,
            };

            validations.push(name_based_validation);
            fields.push((name, validations));
        }

        fields.push((TURNSTILE_KEY, vec![validations::turnstile]));

        Self { fields }
    }

    pub async fn validate(&self, map: &'a FormDataMap) -> HashMap<&'a str, EdgeError> {
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

        errors
    }
}

pub fn post_proc_formdata(req: &Request, formdata: &mut FormDataMap) {
    formdata.remove(TURNSTILE_KEY);

    let utm_values: Vec<_> = ["utm_campaign", "utm_medium", "utm_source"]
        .iter()
        .filter_map(|&key| req.get_query_parameter(key).map(|val| (key, val)))
        .collect();

    for (k, v) in utm_values.into_iter() {
        formdata.insert(k.to_owned(), v.to_owned());
    }

    let _ = super::apollo::enrich(formdata);

    // Register with Unifyr+ if applicable.
    if formdata
        .get("entity_type__c")
        .is_some_and(|val| val.eq_ignore_ascii_case("partner"))
    {
        let _ = super::unifyr::register(formdata);
    }
}

mod validations {
    use super::{Pending, TURNSTILE_BACKEND, TURNSTILE_SITEVERIFY};
    use crate::{error::EdgeError, forms::creds::CREDENTIALS, BLACKLIST};
    use fastly::Request;
    use serde_json::{json, Value};
    use std::future::ready;

    pub fn no_op<'a>(_: Option<&'a str>) -> Pending<'a> {
        Box::pin(ready(Ok(())))
    }

    pub fn required<'a>(value: Option<&'a str>) -> Pending<'a> {
        let result = value
            .is_some_and(|s| !s.is_empty())
            .then(|| Ok(()))
            .unwrap_or(Err(EdgeError::ValidationError("This field is required")));
        Box::pin(ready(result))
    }

    pub fn turnstile<'a>(value: Option<&'a str>) -> Pending<'a> {
        Box::pin(async move {
            let body = json!({
                "secret": CREDENTIALS.turnstile_secret_key,
                "response": value,
            });

            // TODO: async/await?
            let value: Value = Request::post(TURNSTILE_SITEVERIFY)
                .with_body_json(&body)?
                .send(TURNSTILE_BACKEND)?
                .take_body_json()?;

            let success = value.get("success").and_then(|b| b.as_bool());

            match success {
                Some(b) if b == true => Ok(()),
                _ => Err(EdgeError::TurnstileError),
            }
        })
    }

    pub fn blacklist<'a>(value: Option<&'a str>) -> Pending<'a> {
        let value = value.and_then(|v| v.split_once('@')).map(|split| split.1);
        let result = match value {
            Some(s) if BLACKLIST.contains(s) => Err(EdgeError::ValidationError(
                "Please provide a company email address.",
            )),
            _ => Ok(()),
        };
        Box::pin(ready(result))
    }
}
