use serde::{Deserialize, Serialize};
use uuid::Uuid;
use diesel::{Queryable, Insertable};
use crate::schema::blobs;

#[derive(Debug, Queryable, Serialize)]
pub struct Blob {
    pub id: Uuid,
    pub commit_id: Uuid,
    pub file_path: String,
    pub ipfs_cid: String, // NEW field
}

#[derive(Debug, Insertable, Deserialize)]
#[table_name = "blobs"]
pub struct NewBlob {
    pub commit_id: Uuid,
    pub file_path: String,
    pub ipfs_cid: String, // NEW field
}

