use serde::Serialize;
use thiserror::Error;

#[derive(Debug, Error)]
pub enum EdgeError {
    #[error("E100")]
    SendError(#[from] fastly::http::request::SendError),
    #[error("E101")]
    UrlParseError(#[from] url::ParseError),
    #[error("E102")]
    SerdeJsonError(#[from] serde_json::Error),
    #[error("E103")]
    SerdeUrlEncodedError(#[from] serde_urlencoded::ser::Error),
    #[error("E104")]
    MarketoError(Vec<String>),
    #[error("E105")]
    RingError,
    #[error("E106")]
    KVStoreError(#[from] fastly::kv_store::KVStoreError),

    #[error("E900")]
    TurnstileError,
    #[error("{0}")]
    ValidationError(&'static str),
    #[error("E1000")]
    GenericError,
}

impl From<ring::error::Unspecified> for EdgeError {
    fn from(_: ring::error::Unspecified) -> Self {
        EdgeError::RingError
    }
}

impl Serialize for EdgeError {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: serde::Serializer,
    {
        serializer.serialize_str(&self.to_string())
    }
}
