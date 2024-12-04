use super::validation::{Compose, Context, ValidationM, Validator};
use fastly::ConfigStore;
use lol_html::{element, html_content::ContentType, send::Settings};
use std::{
    future::{Future, Ready},
    sync::{Arc, LazyLock},
};

pub static CREDENTIALS: LazyLock<Credentials> = LazyLock::new(|| Credentials::load());

pub struct Credentials {
    pub marketo_client_id: String,
    pub marketo_client_secret: String,
}

impl Credentials {
    fn load() -> Self {
        let store = ConfigStore::open("creds");

        Self {
            marketo_client_id: store.get("marketo_client_id").expect("cfg error"),
            marketo_client_secret: store.get("marketo_client_secret").expect("cfg error"),
        }
    }
}

type FormData = Vec<(String, String)>;

#[repr(transparent)]
struct ValidationError<'s> {
    apply: Arc<dyn Fn(&mut Settings<'_, 's>) + 's>,
}

impl<'s> Compose for ValidationError<'s> {
    fn compose(self, other: Self) -> Self {
        ValidationError {
            apply: Arc::new(move |settings| {
                (self.apply)(settings);
                (other.apply)(settings);
            }),
        }
    }
}

impl<'s> ValidationError<'s> {
    pub fn lift<F>(f: F) -> Self
    where
        F: Fn(&mut Settings<'_, 's>) + 's,
    {
        Self { apply: Arc::new(f) }
    }
}

type FormValidator<'a> = Validator<'a, FormData, FormData, ValidationError<'a>>;

pub struct Form<'a> {
    id: &'static str,
    validator: FormValidator<'a>,
}

impl<'s> Form<'s> {
    pub fn new(id: &'static str, fields: Vec<&'static str>) -> Self {
        let expected = Validator::lift(move |formdata: FormData| {
            let result = {
                let unknown: Vec<_> = formdata
                    .iter()
                    .filter(|&(key, _)| !fields.contains(&key.as_str()))
                    .collect();
                if unknown.is_empty() {
                    ValidationM::pure(formdata)
                } else {
                    let err = ValidationError::lift(move |settings| {
                        settings.element_content_handlers.push(element!(
                            format!(r#"form[data-form-id="{}"] .message"#, id),
                            |el| {
                                el.set_inner_content("Internal error", ContentType::Text);
                                Ok(())
                            }
                        ));
                    });
                    ValidationM::fail(formdata, err)
                }
            };

            Box::pin(std::future::ready(result))
        });

        Self {
            id,
            validator: expected,
        }
    }

    pub fn merge_validator(self, validator: FormValidator<'s>) -> Self {
        Self {
            id: self.id,
            validator: self.validator.compose(validator),
        }
    }

    pub fn with_field_validator<P, Fut>(
        self,
        field: &'static str,
        pred: P,
        fail_message: &'static str,
    ) -> Self
    where
        P: Fn(Option<&str>) -> Fut + 's,
        Fut: Future<Output = bool> + 's,
    {
        let validator = Validator::lift(move |formdata: FormData| {
            let value = formdata
                .iter()
                .find(|(k, _)| k.as_str().eq_ignore_ascii_case(field))
                .map(|(_, v)| v.as_str());
            let fut = pred(value);
            Box::pin(async move {
                if fut.await {
                    ValidationM::pure(formdata)
                } else {
                    let err = ValidationError::lift(move |settings| {
                        settings.element_content_handlers.push(element!(
                            format!(r#"form[data-form-id="{}"] [name="{}"]"#, self.id, field),
                            |el| {
                                // TODO: Add message for field
                                Ok(())
                            }
                        ));
                    });
                    ValidationM::fail(formdata, err)
                }
            })
        });

        self.merge_validator(validator)
    }

    pub async fn run(&self, formdata: FormData) -> Result<(), Settings<'_, 's>> {
        let result = self.validator.validate(formdata).await;
        if let Context::Err(formdata, err) = &*result {
            let mut settings = Settings::new_send();
            (err.apply)(&mut settings);
            for (name, value) in formdata.clone() {
                settings.element_content_handlers.push(element!(
                    format!(r#"form[data-form-id="{}"] [name="{}"]"#, self.id, name),
                    move |el| {
                        if el.tag_name() == "input" {
                            match el.get_attribute("type") {
                                Some(typ) if typ == "checkbox" || typ == "radio" => {
                                    if *value == el.get_attribute("value").unwrap_or("on".into()) {
                                        el.set_attribute("checked", "").unwrap();
                                    } else {
                                        el.remove_attribute("checked");
                                    }
                                }
                                _ => {
                                    el.set_attribute("value", value.as_str()).unwrap();
                                }
                            }
                        } else if el.tag_name() == "textarea" {
                            el.set_inner_content(value.as_str(), ContentType::Text);
                        }
                        Ok(())
                    }
                ));
            }
            Err(settings)
        } else {
            Ok(())
        }
    }
}

static REQUIRED: fn(Option<&str>) -> Ready<bool> =
    |opt| std::future::ready(opt.is_some_and(|v| !v.is_empty()));
