use serde::{Deserialize, Serialize};
use uuid::Uuid;
use diesel::{Queryable, Insertable};
use bigdecimal::BigDecimal;
use crate::schema::revenue_shares;

#[derive(Debug, Queryable, Serialize)]
pub struct RevenueShare {
    pub id: Uuid,
    pub nft_id: Uuid,
    pub user_id: Uuid,
    pub percentage: BigDecimal,
    pub amount_earned: Option<BigDecimal>,
    pub created_at: chrono::NaiveDateTime,
}

#[derive(Debug, Insertable, Deserialize)]
#[diesel(table_name = revenue_shares)]
pub struct NewRevenueShare {
    pub nft_id: Uuid,
    pub user_id: Uuid,
    pub percentage: BigDecimal,
}