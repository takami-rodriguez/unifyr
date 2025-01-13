pub use types::*;

pub mod types {
    use serde::{Deserialize, Serialize};
    use std::{borrow::Cow, collections::HashMap};

    #[derive(Debug, Deserialize, Serialize, Clone)]
    pub struct Attr {
        pub name: Cow<'static, str>,
        pub value: Cow<'static, str>,
    }

    #[derive(Debug, Deserialize, Serialize, Clone)]
    pub struct FormElement {
        pub name: Cow<'static, str>,
        pub attrs: Vec<Attr>,
    }

    pub type Forms = HashMap<Cow<'static, str>, Cow<'static, Vec<FormElement>>>;
}
