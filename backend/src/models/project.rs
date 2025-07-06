use serde::{Deserialize, Serialize};
use uuid::Uuid;
use diesel::{Queryable, Insertable};
use crate::schema::projects;

#[derive(Debug, Queryable, Serialize)]
pub struct Project {
    pub id: Uuid,
    pub owner_id: Uuid,
    pub name: String,
    pub description: Option<String>,
    pub created_at: chrono::NaiveDateTime,
    pub updated_at: chrono::NaiveDateTime,
}

#[derive(Debug, Insertable, Deserialize)]
#[diesel(table_name = projects)]
pub struct NewProject {
    pub owner_id: Uuid,
    pub name: String,
    pub description: Option<String>,
}