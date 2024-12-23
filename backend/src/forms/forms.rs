use futures::future::join_all;
use lol_html::{element, html_content::ContentType, ElementContentHandlers, Selector};
use std::{
    borrow::Cow,
    collections::{HashMap, HashSet},
    future::Future,
    pin::Pin,
};

type ElementHandlerArray<'h> = Vec<(Cow<'static, Selector>, ElementContentHandlers<'h>)>;

type FormData = Vec<(String, String)>;
type ValidationResult<'h> = Result<(), ElementHandlerArray<'h>>;
type Validation<'h> =
    fn(&'static str, Option<&'h str>) -> Pin<Box<dyn Future<Output = ValidationResult<'h>>>>;
type Field<'h> = (&'static str, Validation<'h>);

struct Form<'h> {
    id: &'static str,
    fields: Vec<Field<'h>>,
}

impl<'h> Form<'h> {
    pub fn new(id: &'static str, fields: Vec<Field<'h>>) -> Self {
        Self { id, fields }
    }

    pub async fn validate(&self, formdata: &'h FormData) -> Result<(), ElementHandlerArray<'h>> {
        let field_names: HashSet<_> = self.fields.iter().map(|&(k, _)| k).collect();

        let (map, err) = formdata.iter().fold(
            (HashMap::with_capacity(formdata.len()), false),
            |(mut map, err), (k, v)| {
                let duplicate = map.insert(k.as_str(), v.as_str()).is_some();
                (map, err || duplicate || !field_names.contains(k.as_str()))
            },
        );

        if err {
            let tx = vec![element!(
                format!(r#"form[data-form-id="{}"] > .message"#, self.id),
                |el| {
                    el.set_inner_content("Internal error", ContentType::Text);
                    Ok(())
                }
            )];
            return Err(tx);
        }

        let validations: Vec<_> = self
            .fields
            .iter()
            .map(|&(name, validator)| validator(self.id, map.get(name).map(|&v| v)))
            .collect();

        let results = join_all(validations).await;

        let mut errors: Vec<_> = results
            .into_iter()
            .filter_map(|r| r.err())
            .flat_map(|e| e)
            .collect();

        if errors.is_empty() {
            Ok(())
        } else {
            let mut restored = self.restore(&formdata);
            errors.append(&mut restored);
            Err(errors)
        }
    }

    fn restore(&self, formdata: &'h FormData) -> ElementHandlerArray<'h> {
        let mut handlers = vec![];

        for (name, value) in formdata.iter() {
            handlers.push(element!(
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

        handlers
    }
}

macro_rules! validation {
    ($field:expr, $check:expr, $message:expr) => {
        |form_id: &str, value: Option<&str>| {
            let check = $check;
            Box::pin(async move {
                if !(check(value).await) {
                    let x = vec![element!(
                        format!(
                            r#"form[data-form-id="{}"] input[name="{}"] .message"#,
                            form_id, $field
                        ),
                        |el| {
                            el.set_inner_content($message, ContentType::Text);
                            Ok(())
                        }
                    )];
                    Err(x)
                } else {
                    Ok(())
                }
            })
        }
    };
}
