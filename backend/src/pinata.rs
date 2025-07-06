use std::path::Path;
use std::fs::File;
use std::io::Read;
use reqwest::{Client, multipart};
use serde::Deserialize;

#[derive(Debug, Deserialize)]
struct PinataResponse {
    IpfsHash: String,
}

pub async fn upload_to_pinata<P: AsRef<Path>>(file_path: P) -> Result<String, Box<dyn std::error::Error>> {
    // Load API keys from environment
    let api_key = std::env::var("PINATA_API_KEY")?;
    let secret_api_key = std::env::var("PINATA_SECRET_API_KEY")?;

    // Create HTTP client
    let client = Client::new();

    // Read file into memory
    let mut file = File::open(&file_path)?;
    let mut buf = Vec::new();
    file.read_to_end(&mut buf)?;

    // Create multipart form
    let part = multipart::Part::bytes(buf)
        .file_name(file_path.as_ref().file_name().unwrap().to_string_lossy().to_string());
    let form = multipart::Form::new().part("file", part);

    // Send POST request
    let res = client
        .post("https://api.pinata.cloud/pinning/pinFileToIPFS")
        .header("pinata_api_key", api_key)
        .header("pinata_secret_api_key", secret_api_key)
        .multipart(form)
        .send()
        .await?;

    // Check for success
    if !res.status().is_success() {
        let text = res.text().await?;
        return Err(format!("Pinata upload failed: {}", text).into());
    }

    // Parse JSON response
    let json: PinataResponse = res.json().await?;

    // Return the CID
    Ok(json.IpfsHash)
}
