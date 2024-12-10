use fastly::{
    http::{header, Method},
    ConfigStore, Request,
};
use percent_encoding::{AsciiSet, CONTROLS};
use ring::{
    digest::{self, digest},
    hmac::{self, Tag},
};
use time::{format_description::FormatItem, macros::format_description};

const EMPTY_HASH: &str = "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855";
const AWS_BUCKET: &str = std::env!("AWS_BUCKET");
const AWS_HOST: &str = std::env!("AWS_HOST");
const AWS_REGION: &str = std::env!("AWS_REGION");

pub struct S3Config {
    access_key_id: String,
    secret_access_key: String,
}

impl S3Config {
    pub fn load() -> Self {
        let store = ConfigStore::open("s3_config");
        Self {
            access_key_id: store.get("access_key_id").expect("cfg error"),
            secret_access_key: store.get("secret_access_key").expect("cfg error"),
        }
    }
}

fn sign(key: impl AsRef<[u8]>, data: impl AsRef<[u8]>) -> Tag {
    let key = hmac::Key::new(hmac::HMAC_SHA256, key.as_ref());
    hmac::sign(&key, data.as_ref())
}

pub(super) fn authorize(req: &mut Request, cfg: &S3Config) {
    const FORMAT: &[FormatItem] = format_description!("[year][month][day]T[hour][minute][second]Z");

    const ENCODE: &AsciiSet = &CONTROLS
        .add(b':')
        .add(b'?')
        .add(b'#')
        .add(b'[')
        .add(b']')
        .add(b'@')
        .add(b'!')
        .add(b'$')
        .add(b'&')
        .add(b'\'')
        .add(b'(')
        .add(b')')
        .add(b'*')
        .add(b'+')
        .add(b',')
        .add(b';')
        .add(b'=');

    // req.remove_query();
    let canonical_querystring = "";
    let service = "s3";
    let x_amz_content_256 = EMPTY_HASH;
    let amz_date = time::OffsetDateTime::now_utc().format(FORMAT).unwrap();

    let path = req.get_path();
    let path_decoded = percent_encoding::percent_decode_str(&path).decode_utf8_lossy();
    let canonical_url = percent_encoding::utf8_percent_encode(&path_decoded, ENCODE).to_string();

    let canonical_headers = format!(
        "host:{}\nx-amz-content-sha256:{}\nx-amz-date:{}\n",
        AWS_HOST, x_amz_content_256, amz_date
    );

    let signed_headers = "host;x-amz-content-sha256;x-amz-date";

    let canonical_request = format!(
        "{}\n{}\n{}\n{}\n{}\n{}",
        "GET",
        canonical_url,
        canonical_querystring,
        canonical_headers,
        signed_headers,
        x_amz_content_256
    );

    let credential_date = &amz_date[..8];
    let credential_scope = format!(
        "{}/{}/{}/aws4_request",
        credential_date, AWS_REGION, service
    );

    let canonical_request_hash = hex::encode(digest(&digest::SHA256, canonical_request.as_bytes()));
    let string_to_sign = format!(
        "AWS4-HMAC-SHA256\n{}\n{}\n{}",
        amz_date, credential_scope, canonical_request_hash
    );

    let aws4_secret = format!("AWS4{}", &cfg.secret_access_key);
    let date_key = sign(aws4_secret, credential_date);
    let region_key = sign(date_key, AWS_REGION);
    let service_key = sign(region_key, service);
    let signing_key = sign(service_key, "aws4_request");

    let signature = hex::encode(sign(signing_key, string_to_sign));

    let authorization_value = format!(
        "AWS4-HMAC-SHA256 Credential={}/{},SignedHeaders={},Signature={}",
        cfg.access_key_id, credential_scope, signed_headers, signature
    );

    req.set_method(Method::GET);

    req.set_header(header::HOST, AWS_HOST);
    req.set_header(header::AUTHORIZATION, authorization_value);
    req.set_header("x-amz-content-sha256", x_amz_content_256);
    req.set_header("x-amz-date", amz_date);
}
