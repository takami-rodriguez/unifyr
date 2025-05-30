use crate::utils::gen_nonce;
use fastly::{
    http::{body::StreamingBody, header},
    Response,
};
use lol_html::{element, OutputSink, RewriteStrSettings};
use ring::rand::SystemRandom;
use std::{io::Write, mem::ManuallyDrop};

const CHUNK_SIZE: usize = 8192;

struct NoopOutputSink(usize);

impl OutputSink for NoopOutputSink {
    fn handle_chunk(&mut self, chunk: &[u8]) {
        self.0 += chunk.len();
    }
}

#[repr(transparent)]
struct DelegatedStreamingBody(ManuallyDrop<StreamingBody>);

impl DelegatedStreamingBody {
    fn new(stream: StreamingBody) -> Self {
        Self(ManuallyDrop::new(stream))
    }
}

impl OutputSink for DelegatedStreamingBody {
    fn handle_chunk(&mut self, chunk: &[u8]) {
        let _ = self.0.write(chunk);
    }
}

impl Drop for DelegatedStreamingBody {
    fn drop(&mut self) {
        unsafe {
            let _ = ManuallyDrop::take(&mut self.0).finish();
        }
    }
}

pub(crate) fn rewrite(resp: &mut Response) {
    let rng = SystemRandom::new();
    let buf = &gen_nonce(rng).unwrap();
    let nonce = unsafe { std::str::from_utf8_unchecked(buf) };

    resp.set_header(header::CONTENT_SECURITY_POLICY, make_csp(nonce));
    let body = resp.take_body_str();

    let modified = lol_html::rewrite_str(
        &body,
        RewriteStrSettings {
            element_content_handlers: vec![element!("script", |el| {
                Ok(el.set_attribute("nonce", &nonce)?)
            })],
            ..Default::default()
        },
    )
    .unwrap();

    resp.set_body_text_html(&modified);
}

// frame-src rather than child-src
fn make_csp(nonce: &str) -> String {
    format!(
        "default-src 'self'; \
        script-src 'nonce-{nonce}' 'strict-dynamic'; \
        style-src 'self' 'unsafe-inline'; \
        connect-src 'self' www.googletagmanager.com https://*.mktoresp.com https://app.apollo.io https://*.wistia.com https://*.wistia.net; \
        img-src 'self' data: www.googletagmanager.com https://*.wistia.com https://*.wistia.net; \
        media-src 'self' blob: https://*.wistia.com https://*.wistia.net; \
        frame-src https://challenges.cloudflare.com https://fast.wistia.com https://fast.wistia.net; \
        font-src 'self' https://assets.apollo.io; \
        base-uri 'none'; \
        form-action 'self'; \
        frame-ancestors 'none'; \
        upgrade-insecure-requests;"
    )
}
