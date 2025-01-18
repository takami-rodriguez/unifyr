pub use types::*;

pub mod types {
    use radix_trie::Trie;
    use serde::{Deserialize, Serialize};
    use std::collections::HashMap;

    // forms
    #[derive(Debug, Deserialize, Serialize, Clone)]
    pub struct Attr {
        pub name: String,
        pub value: String,
    }

    #[derive(Debug, Deserialize, Serialize, Clone)]
    pub struct FormElement {
        pub name: String,
        pub attrs: Vec<Attr>,
    }

    pub type Forms = HashMap<String, Vec<FormElement>>;

    // domains
    #[repr(transparent)]
    #[derive(Serialize, Deserialize)]
    pub struct DomainStore(Trie<Vec<u8>, ()>);

    impl DomainStore {
        pub fn new() -> Self {
            Self(Trie::new())
        }

        pub fn insert(&mut self, domain: &str) {
            let domain = reverse(domain);
            self.0.insert(domain, ());
        }

        pub fn contains(&self, domain: &str) -> bool {
            let domain = reverse(domain);
            self.0.get(&domain).is_some()
        }
    }

    fn reverse(input: &str) -> Vec<u8> {
        input
            .as_bytes()
            .iter()
            .map(|&b| {
                if b >= b'A' && b <= b'Z' {
                    b | 0b00100000
                } else {
                    b
                }
            })
            .rev()
            .collect()
    }
}
