use serde::{Deserialize, Serialize};
use uuid::Uuid;
use diesel::{Queryable, Insertable};
use crate::schema::users;

#[derive(Debug, Queryable, Serialize)]
pub struct User {
    pub id: Uuid,
    pub email: String,
    pub password_hash: String,
    pub name: Option<String>,
    pub avatar_url: Option<String>,
    pub created_at: chrono::NaiveDateTime,
}

#[derive(Debug, Insertable, Deserialize)]
#[diesel(table_name = users)]
pub struct NewUser {
    pub email: String,
    pub password_hash: String,
    pub name: Option<String>,
}