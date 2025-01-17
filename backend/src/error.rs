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
    MarketoError(Vec<String>),
    #[error("E104")]
    RingError,

    #[error("E900")]
    TurnstileError,
    #[error("{0}")]
    ValidationError(&'static str),
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
