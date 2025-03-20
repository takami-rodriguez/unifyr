use crate::error::EdgeError;
use async_recursion::async_recursion;
use fastly::Request;
use serde::Deserialize;
use std::{collections::HashSet, future::Future, thread::sleep, time::Duration};
use url::Url;

const CRT: &str = "crt";
const GOOG_DNS: &str = "goog_dns";

#[allow(dead_code)]
#[derive(Deserialize)]
struct CrtRecord {
    issuer_ca_id: u64,
    issuer_name: String,
    common_name: String,
    name_value: String,
    id: u64,
    entry_timestamp: String,
    not_before: String,
    not_after: String,
    serial_number: String,
    result_count: u64,
}

#[derive(Deserialize)]
struct DnsResponse {
    #[serde(rename(deserialize = "Answer"))]
    answers: Option<Vec<Answer>>,
}

#[derive(Deserialize)]
struct Answer {
    data: String,
}

#[async_recursion]
async fn retry<F, T, Fut>(f: F, tries: u64, duration: u64) -> Result<T, EdgeError>
where
    F: Fn() -> Fut + Send + Sync,
    T: Send,
    Fut: Future<Output = Result<T, EdgeError>> + Send,
{
    match f().await {
        Ok(t) => Ok(t),
        Err(err) => {
            if tries == 0 {
                Err(err)
            } else {
                sleep(Duration::from_millis(duration));
                retry(f, tries - 1, (duration as f64 * 1.5) as u64).await
            }
        }
    }
}

pub async fn search(domain: &str) -> Result<Vec<String>, EdgeError> {
    let url = Url::parse_with_params("https://crt.sh", &[("q", domain), ("output", "json")])?;

    let run = async || {
        let mut resp = Request::get(&url)
            .with_after_send(|candidate_response| {
                if candidate_response.get_status().is_success() {
                    candidate_response.set_ttl(Duration::from_secs(86400));
                }

                Ok(())
            })
            .send(CRT)?;
        let records: Vec<CrtRecord> = resp.take_body_json()?;
        let name_values: HashSet<String> = records
            .iter()
            .map(|rec| rec.name_value.as_ref())
            .flat_map(|name_value: &str| name_value.split('\n'))
            .filter_map(|value| {
                ["partner", "channel", "alliance", "prm"]
                    .iter()
                    .any(|needle| value.contains(needle))
                    .then_some(value.to_owned())
            })
            .collect();
        Ok(name_values)
    };

    let crt_result = retry(run, 5, 1250).await?;

    Ok(crt_result
        .iter()
        .flat_map(|input| dig(&input))
        .flatten()
        .collect())
}

fn dig(value: &str) -> Result<Vec<String>, EdgeError> {
    let url = Url::parse_with_params(
        "https://dns.google/resolve",
        &[("name", value), ("type", "CNAME")],
    )?;

    let mut resp = Request::get(url).send(GOOG_DNS)?;
    let dnsresponse: DnsResponse = match resp.take_body_json() {
        Ok(dnsresponse) => dnsresponse,
        Err(_) => return Ok(vec![]),
    };

    Ok(dnsresponse
        .answers
        .unwrap_or_default()
        .into_iter()
        .map(|answer| answer.data)
        .collect())
}
