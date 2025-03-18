use crate::error::EdgeError;
use base64_simd::{Out, STANDARD};
use fastly::{
    mime::{self},
    Response,
};
use ring::rand::SecureRandom;

pub const fn base64_len_for(orig: usize) -> usize {
    ((4 * orig) / 3) + 3 & !0b11
}

pub(crate) fn gen_nonce<R: SecureRandom>(rng: R) -> Result<Box<[u8]>, EdgeError> {
    const NONCE_BYTES: usize = 16;
    let mut nonce = [0u8; NONCE_BYTES];
    rng.fill(&mut nonce)?;
    Ok(base64_encode(&nonce))
}

pub(crate) fn base64_encode(bytes: &[u8]) -> Box<[u8]> {
    let cap = base64_len_for(bytes.len());
    let mut vec = vec![0u8; cap];
    let out = Out::from_slice(&mut vec);
    STANDARD.encode(bytes, out).into()
}

pub fn is_html(resp: &Response) -> bool {
    resp.get_content_type()
        .is_some_and(|mime| mime.subtype() == mime::HTML)
}
