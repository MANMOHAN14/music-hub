use serde::{Deserialize, Serialize};
use uuid::Uuid;
use diesel::{Queryable, Insertable};
use crate::schema::branches;

#[derive(Debug, Queryable, Serialize)]
pub struct Branch {
    pub id: Uuid,
    pub project_id: Uuid,
    pub name: String,
    pub created_at: chrono::NaiveDateTime,
}

#[derive(Debug, Insertable, Deserialize)]
#[table_name = "branches"]
pub struct NewBranch {
    pub project_id: Uuid,
    pub name: String,
}