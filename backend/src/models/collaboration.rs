use serde::{Deserialize, Serialize};
use uuid::Uuid;
use diesel::{Queryable, Insertable};
use bigdecimal::BigDecimal;
use crate::schema::collaborations;

#[derive(Debug, Queryable, Serialize)]
pub struct Collaboration {
    pub id: Uuid,
    pub project_id: Uuid,
    pub user_id: Uuid,
    pub contribution_percentage: BigDecimal,
    pub role: String,
    pub joined_at: chrono::NaiveDateTime,
}

#[derive(Debug, Insertable, Deserialize)]
#[diesel(table_name = collaborations)]
pub struct NewCollaboration {
    pub project_id: Uuid,
    pub user_id: Uuid,
    pub contribution_percentage: BigDecimal,
    pub role: String,
}

#[derive(Debug, Serialize)]
pub struct CollaborationWithUser {
    pub id: Uuid,
    pub project_id: Uuid,
    pub user_id: Uuid,
    pub user_name: Option<String>,
    pub user_email: String,
    pub contribution_percentage: BigDecimal,
    pub role: String,
    pub joined_at: chrono::NaiveDateTime,
}