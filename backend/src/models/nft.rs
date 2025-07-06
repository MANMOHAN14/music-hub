use serde::{Deserialize, Serialize};
use uuid::Uuid;
use diesel::{Queryable, Insertable};
use bigdecimal::BigDecimal;
use crate::schema::nfts;

#[derive(Debug, Queryable, Serialize)]
pub struct Nft {
    pub id: Uuid,
    pub project_id: Uuid,
    pub creator_id: Uuid,
    pub token_id: Option<String>,
    pub contract_address: Option<String>,
    pub metadata_uri: String,
    pub title: String,
    pub description: Option<String>,
    pub price: Option<BigDecimal>,
    pub royalty_percentage: BigDecimal,
    pub is_minted: bool,
    pub is_listed: bool,
    pub opensea_url: Option<String>,
    pub created_at: chrono::NaiveDateTime,
    pub updated_at: chrono::NaiveDateTime,
}

#[derive(Debug, Insertable, Deserialize)]
#[diesel(table_name = nfts)]
pub struct NewNft {
    pub project_id: Uuid,
    pub creator_id: Uuid,
    pub metadata_uri: String,
    pub title: String,
    pub description: Option<String>,
    pub price: Option<BigDecimal>,
    pub royalty_percentage: BigDecimal,
}

#[derive(Debug, Serialize)]
pub struct NftWithProject {
    pub id: Uuid,
    pub project_id: Uuid,
    pub project_name: String,
    pub creator_id: Uuid,
    pub creator_name: Option<String>,
    pub token_id: Option<String>,
    pub contract_address: Option<String>,
    pub metadata_uri: String,
    pub title: String,
    pub description: Option<String>,
    pub price: Option<BigDecimal>,
    pub royalty_percentage: BigDecimal,
    pub is_minted: bool,
    pub is_listed: bool,
    pub opensea_url: Option<String>,
    pub created_at: chrono::NaiveDateTime,
    pub updated_at: chrono::NaiveDateTime,
}