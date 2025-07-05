use serde::{Deserialize, Serialize};
use uuid::Uuid;
use diesel::{Queryable, Insertable};
use crate::schema::comments;

#[derive(Debug, Queryable, Serialize)]
pub struct Comment {
    pub id: Uuid,
    pub commit_id: Uuid,
    pub author_id: Uuid,
    pub content: String,
    pub created_at: chrono::NaiveDateTime,
}

#[derive(Debug, Insertable, Deserialize)]
#[table_name = "comments"]
pub struct NewComment {
    pub commit_id: Uuid,
    pub author_id: Uuid,
    pub content: String,
}