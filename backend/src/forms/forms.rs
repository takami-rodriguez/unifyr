use common::{Attr, FormElement};
use futures::future::join_all;
use std::{
    collections::{HashMap, HashSet},
    future::Future,
    pin::Pin,
};

// type ElementHandlerArray<'h> = Vec<(Cow<'static, Selector>, ElementContentHandlers<'h>)>;

mod validations {
    use super::Validation;

    pub const NO_OP: Validation = |_| Box::pin(std::future::ready(Ok(())));

    pub const REQUIRED: Validation = |value: Option<&str>| {
        let result = if value.is_some_and(|s| !s.is_empty()) {
            Ok(())
        } else {
            Err("This field is required")
        };
        Box::pin(std::future::ready(result))
    };
}

pub type FormData = Vec<(String, String)>;

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

        Self { fields }
    }

    pub async fn validate(&self, formdata: &FormData) -> Result<(), FormErrors> {
        let field_names: HashSet<_> = self.fields.iter().map(|&(k, _)| k).collect();

        let (map, err) = formdata.iter().fold(
            (HashMap::with_capacity(formdata.len()), false),
            |(mut map, err), (k, v)| {
                let duplicate = map.insert(k.as_str(), v.as_str()).is_some();
                (map, err || duplicate || !field_names.contains(k.as_str()))
            },
        );

        if err {
            return Ok(());
        }

        let intermediate: Vec<Applied> = self
            .fields
            .iter()
            .flat_map(move |&(name, ref validators)| {
                let value = map.get(name).map(|&v| v);
                validators.into_iter().map(move |f| (name, f(value)))
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
