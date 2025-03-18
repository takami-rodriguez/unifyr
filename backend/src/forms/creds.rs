use fastly::ConfigStore;
use std::sync::LazyLock;

pub static CREDENTIALS: LazyLock<Credentials> = LazyLock::new(|| Credentials::load());

pub struct Credentials {
    pub marketo_client_id: String,
    pub marketo_client_secret: String,
    pub apollo_match_key: String,
    pub turnstile_secret_key: String,
    pub logos_dev_public_key: String,

    pub netop_api_key: String,
}

impl Credentials {
    fn load() -> Self {
        let store = ConfigStore::open("form_creds");

        Self {
            marketo_client_id: store.get("marketo_client_id").expect("cfg error"),
            marketo_client_secret: store.get("marketo_client_secret").expect("cfg error"),
            apollo_match_key: store.get("apollo_match_key").expect("cfg error"),
            turnstile_secret_key: store.get("turnstile_secret_key").expect("cfg error"),
            logos_dev_public_key: store.get("logos_dev_public_key").expect("cfg error"),

            netop_api_key: store.get("netop_api_key").expect("cfg error"),
        }
    }
}
