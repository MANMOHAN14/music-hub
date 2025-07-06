use actix_web::{get, post, put, web, HttpResponse, Result};
use serde::{Deserialize, Serialize};
use uuid::Uuid;
use bigdecimal::BigDecimal;
use crate::models::nft::{Nft, NewNft, NftWithProject};
use crate::models::collaboration::CollaborationWithUser;
use crate::models::revenue_share::{RevenueShare, NewRevenueShare};

#[derive(Deserialize)]
pub struct CreateNftRequest {
    pub project_id: Uuid,
    pub title: String,
    pub description: Option<String>,
    pub price: Option<BigDecimal>,
    pub royalty_percentage: BigDecimal,
}

#[derive(Deserialize)]
pub struct MintNftRequest {
    pub contract_address: String,
    pub token_id: String,
}

#[derive(Serialize)]
pub struct NftResponse {
    pub nft: NftWithProject,
    pub collaborators: Vec<CollaborationWithUser>,
    pub revenue_shares: Vec<RevenueShare>,
}

#[post("/api/v1/nfts")]
async fn create_nft(form: web::Json<CreateNftRequest>) -> Result<HttpResponse> {
    // Mock implementation - replace with actual database operations
    let nft_id = Uuid::new_v4();
    let creator_id = Uuid::new_v4(); // Get from auth context
    
    let nft = NftWithProject {
        id: nft_id,
        project_id: form.project_id,
        project_name: "Sample Project".to_string(),
        creator_id,
        creator_name: Some("Creator Name".to_string()),
        token_id: None,
        contract_address: None,
        metadata_uri: format!("https://api.nftune.com/metadata/{}", nft_id),
        title: form.title.clone(),
        description: form.description.clone(),
        price: form.price.clone(),
        royalty_percentage: form.royalty_percentage.clone(),
        is_minted: false,
        is_listed: false,
        opensea_url: None,
        created_at: chrono::Utc::now().naive_utc(),
        updated_at: chrono::Utc::now().naive_utc(),
    };

    Ok(HttpResponse::Ok().json(nft))
}

#[get("/api/v1/nfts")]
async fn list_nfts() -> Result<HttpResponse> {
    // Mock data - replace with actual database query
    let nfts = vec![
        NftWithProject {
            id: Uuid::new_v4(),
            project_id: Uuid::new_v4(),
            project_name: "Summer Vibes EP".to_string(),
            creator_id: Uuid::new_v4(),
            creator_name: Some("Artist Name".to_string()),
            token_id: Some("1".to_string()),
            contract_address: Some("0x123...".to_string()),
            metadata_uri: "https://api.nftune.com/metadata/1".to_string(),
            title: "Summer Vibes NFT".to_string(),
            description: Some("Exclusive NFT for Summer Vibes EP".to_string()),
            price: Some(BigDecimal::from(100)),
            royalty_percentage: BigDecimal::from(10),
            is_minted: true,
            is_listed: true,
            opensea_url: Some("https://opensea.io/assets/...".to_string()),
            created_at: chrono::Utc::now().naive_utc(),
            updated_at: chrono::Utc::now().naive_utc(),
        }
    ];

    Ok(HttpResponse::Ok().json(nfts))
}

#[get("/api/v1/nfts/{id}")]
async fn get_nft(path: web::Path<Uuid>) -> Result<HttpResponse> {
    let nft_id = path.into_inner();
    
    // Mock data - replace with actual database query
    let nft = NftWithProject {
        id: nft_id,
        project_id: Uuid::new_v4(),
        project_name: "Summer Vibes EP".to_string(),
        creator_id: Uuid::new_v4(),
        creator_name: Some("Artist Name".to_string()),
        token_id: Some("1".to_string()),
        contract_address: Some("0x123...".to_string()),
        metadata_uri: "https://api.nftune.com/metadata/1".to_string(),
        title: "Summer Vibes NFT".to_string(),
        description: Some("Exclusive NFT for Summer Vibes EP".to_string()),
        price: Some(BigDecimal::from(100)),
        royalty_percentage: BigDecimal::from(10),
        is_minted: true,
        is_listed: true,
        opensea_url: Some("https://opensea.io/assets/...".to_string()),
        created_at: chrono::Utc::now().naive_utc(),
        updated_at: chrono::Utc::now().naive_utc(),
    };

    let collaborators = vec![
        CollaborationWithUser {
            id: Uuid::new_v4(),
            project_id: nft.project_id,
            user_id: Uuid::new_v4(),
            user_name: Some("Collaborator 1".to_string()),
            user_email: "collab1@example.com".to_string(),
            contribution_percentage: BigDecimal::from(40),
            role: "Producer".to_string(),
            joined_at: chrono::Utc::now().naive_utc(),
        }
    ];

    let revenue_shares = vec![
        RevenueShare {
            id: Uuid::new_v4(),
            nft_id,
            user_id: Uuid::new_v4(),
            percentage: BigDecimal::from(40),
            amount_earned: Some(BigDecimal::from(40)),
            created_at: chrono::Utc::now().naive_utc(),
        }
    ];

    let response = NftResponse {
        nft,
        collaborators,
        revenue_shares,
    };

    Ok(HttpResponse::Ok().json(response))
}

#[put("/api/v1/nfts/{id}/mint")]
async fn mint_nft(path: web::Path<Uuid>, form: web::Json<MintNftRequest>) -> Result<HttpResponse> {
    let nft_id = path.into_inner();
    
    // Mock implementation - in real app, this would:
    // 1. Call smart contract to mint NFT
    // 2. Update database with contract address and token ID
    // 3. Generate OpenSea URL
    
    let opensea_url = format!("https://opensea.io/assets/ethereum/{}/{}", 
                             form.contract_address, form.token_id);
    
    let response = serde_json::json!({
        "success": true,
        "token_id": form.token_id,
        "contract_address": form.contract_address,
        "opensea_url": opensea_url,
        "transaction_hash": "0xabc123..."
    });

    Ok(HttpResponse::Ok().json(response))
}

#[get("/api/v1/projects/{project_id}/nfts")]
async fn get_project_nfts(path: web::Path<Uuid>) -> Result<HttpResponse> {
    let project_id = path.into_inner();
    
    // Mock data - replace with actual database query
    let nfts = vec![
        NftWithProject {
            id: Uuid::new_v4(),
            project_id,
            project_name: "Summer Vibes EP".to_string(),
            creator_id: Uuid::new_v4(),
            creator_name: Some("Artist Name".to_string()),
            token_id: Some("1".to_string()),
            contract_address: Some("0x123...".to_string()),
            metadata_uri: "https://api.nftune.com/metadata/1".to_string(),
            title: "Summer Vibes NFT".to_string(),
            description: Some("Exclusive NFT for Summer Vibes EP".to_string()),
            price: Some(BigDecimal::from(100)),
            royalty_percentage: BigDecimal::from(10),
            is_minted: true,
            is_listed: true,
            opensea_url: Some("https://opensea.io/assets/...".to_string()),
            created_at: chrono::Utc::now().naive_utc(),
            updated_at: chrono::Utc::now().naive_utc(),
        }
    ];

    Ok(HttpResponse::Ok().json(nfts))
}

pub fn nft_routes(cfg: &mut web::ServiceConfig) {
    cfg.service(create_nft)
       .service(list_nfts)
       .service(get_nft)
       .service(mint_nft)
       .service(get_project_nfts);
}