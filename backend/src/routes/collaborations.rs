use actix_web::{get, post, delete, web, HttpResponse, Result};
use serde::{Deserialize, Serialize};
use uuid::Uuid;
use bigdecimal::BigDecimal;
use crate::models::collaboration::{Collaboration, NewCollaboration, CollaborationWithUser};

#[derive(Deserialize)]
pub struct CreateCollaborationRequest {
    pub user_email: String,
    pub contribution_percentage: BigDecimal,
    pub role: String,
}

#[derive(Deserialize)]
pub struct UpdateCollaborationRequest {
    pub contribution_percentage: Option<BigDecimal>,
    pub role: Option<String>,
}

#[post("/api/v1/projects/{project_id}/collaborations")]
async fn add_collaborator(
    path: web::Path<Uuid>, 
    form: web::Json<CreateCollaborationRequest>
) -> Result<HttpResponse> {
    let project_id = path.into_inner();
    
    // Mock implementation - in real app:
    // 1. Find user by email
    // 2. Check if user is already a collaborator
    // 3. Create collaboration record
    // 4. Send invitation email
    
    let collaboration = CollaborationWithUser {
        id: Uuid::new_v4(),
        project_id,
        user_id: Uuid::new_v4(),
        user_name: Some("New Collaborator".to_string()),
        user_email: form.user_email.clone(),
        contribution_percentage: form.contribution_percentage.clone(),
        role: form.role.clone(),
        joined_at: chrono::Utc::now().naive_utc(),
    };

    Ok(HttpResponse::Ok().json(collaboration))
}

#[get("/api/v1/projects/{project_id}/collaborations")]
async fn list_collaborators(path: web::Path<Uuid>) -> Result<HttpResponse> {
    let project_id = path.into_inner();
    
    // Mock data - replace with actual database query
    let collaborations = vec![
        CollaborationWithUser {
            id: Uuid::new_v4(),
            project_id,
            user_id: Uuid::new_v4(),
            user_name: Some("Sarah Chen".to_string()),
            user_email: "sarah@example.com".to_string(),
            contribution_percentage: BigDecimal::from(30),
            role: "Vocalist".to_string(),
            joined_at: chrono::Utc::now().naive_utc(),
        },
        CollaborationWithUser {
            id: Uuid::new_v4(),
            project_id,
            user_id: Uuid::new_v4(),
            user_name: Some("Mike Johnson".to_string()),
            user_email: "mike@example.com".to_string(),
            contribution_percentage: BigDecimal::from(25),
            role: "Guitarist".to_string(),
            joined_at: chrono::Utc::now().naive_utc(),
        },
    ];

    Ok(HttpResponse::Ok().json(collaborations))
}

#[delete("/api/v1/projects/{project_id}/collaborations/{collaboration_id}")]
async fn remove_collaborator(path: web::Path<(Uuid, Uuid)>) -> Result<HttpResponse> {
    let (_project_id, collaboration_id) = path.into_inner();
    
    // Mock implementation - in real app:
    // 1. Check if user has permission to remove collaborator
    // 2. Delete collaboration record
    // 3. Redistribute contribution percentages if needed
    
    Ok(HttpResponse::Ok().json(serde_json::json!({
        "success": true,
        "message": "Collaborator removed successfully"
    })))
}

pub fn collaboration_routes(cfg: &mut web::ServiceConfig) {
    cfg.service(add_collaborator)
       .service(list_collaborators)
       .service(remove_collaborator);
}