use serde::{Deserialize, Serialize};
use uuid::Uuid;
use diesel::{Queryable, Insertable};
use crate::schema::commits;

#[derive(Debug, Queryable, Serialize)]
pub struct Commit {
    pub id: Uuid,
    pub branch_id: Uuid,
    pub author_id: Uuid,
    pub message: String,
    pub created_at: chrono::NaiveDateTime,
}

#[derive(Debug, Insertable, Deserialize)]
#[table_name = "commits"]
pub struct NewCommit {
    pub branch_id: Uuid,
    pub author_id: Uuid,
    pub message: String,
}