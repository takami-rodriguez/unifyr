use fastly::ConfigStore;
use std::sync::LazyLock;

pub static CREDENTIALS: LazyLock<Credentials> = LazyLock::new(|| Credentials::load());

pub struct Credentials {
    pub marketo_client_id: String,
    pub marketo_client_secret: String,
}

impl Credentials {
    fn load() -> Self {
        let store = ConfigStore::open("form_creds");

        Self {
            marketo_client_id: store.get("marketo_client_id").expect("cfg error"),
            marketo_client_secret: store.get("marketo_client_secret").expect("cfg error"),
        }
    }
}
