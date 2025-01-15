use base64_simd::{Out, STANDARD};
use fastly::{
    mime::{self},
    Response,
};
use ring::rand::SecureRandom;
use std::mem::MaybeUninit;

pub const NONCE_BYTES: usize = 16;
pub const BASE64_LEN: usize = ((4 * NONCE_BYTES / 3) + 3) & !0b11;

pub(crate) struct NonceGenerator<R: SecureRandom> {
    rng: R,
    byte_buf: [MaybeUninit<u8>; NONCE_BYTES],
    b64_buf: [MaybeUninit<u8>; BASE64_LEN],
}

impl<R: SecureRandom> NonceGenerator<R> {
    pub fn new(rng: R) -> Self {
        Self {
            rng,
            byte_buf: MaybeUninit::uninit_array(),
            b64_buf: MaybeUninit::uninit_array(),
        }
    }

    pub fn generate(&mut self) -> Result<&str, ring::error::Unspecified> {
        let bytes: &mut [u8] = unsafe { self.byte_buf.assume_init_mut() };
        self.rng.fill(bytes)?;

        let out = Out::from_uninit_slice(&mut self.b64_buf);

        Ok(STANDARD.encode_as_str(bytes, out))
    }
}

pub fn is_html(resp: &Response) -> bool {
    resp.get_content_type()
        .is_some_and(|mime| mime.subtype() == mime::HTML)
}
