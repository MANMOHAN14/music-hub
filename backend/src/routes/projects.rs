use actix_web::{get, post, put, delete, web, HttpResponse, Scope, Result};
use serde::{Deserialize, Serialize};
use uuid::Uuid;

#[derive(Serialize)]
struct Project {
    id: String,
    name: String,
    description: Option<String>,
    owner_id: String,
    collaborators: Vec<String>,
    created_at: String,
    updated_at: String,
}

#[derive(Deserialize)]
struct CreateProjectRequest {
    name: String,
    description: Option<String>,
}

#[post("/api/v1/projects")]
async fn create_project(form: web::Json<CreateProjectRequest>) -> Result<HttpResponse> {
    let project = Project {
        id: Uuid::new_v4().to_string(),
        name: form.name.clone(),
        description: form.description.clone(),
        owner_id: Uuid::new_v4().to_string(),
        collaborators: vec![],
        created_at: chrono::Utc::now().to_rfc3339(),
        updated_at: chrono::Utc::now().to_rfc3339(),
    };

    Ok(HttpResponse::Ok().json(project))
}

#[get("/api/v1/projects")]
async fn list_projects() -> Result<HttpResponse> {
    let projects = vec![
        Project {
            id: "1".to_string(),
            name: "Summer Vibes EP".to_string(),
            description: Some("Collaborative electronic music project".to_string()),
            owner_id: "user1".to_string(),
            collaborators: vec!["user2".to_string(), "user3".to_string()],
            created_at: chrono::Utc::now().to_rfc3339(),
            updated_at: chrono::Utc::now().to_rfc3339(),
        },
    ];

    Ok(HttpResponse::Ok().json(projects))
}

#[get("/api/v1/projects/{id}")]
async fn get_project(path: web::Path<String>) -> Result<HttpResponse> {
    let project_id = path.into_inner();
    
    let project = Project {
        id: project_id,
        name: "Summer Vibes EP".to_string(),
        description: Some("Collaborative electronic music project".to_string()),
        owner_id: "user1".to_string(),
        collaborators: vec!["user2".to_string(), "user3".to_string()],
        created_at: chrono::Utc::now().to_rfc3339(),
        updated_at: chrono::Utc::now().to_rfc3339(),
    };

    Ok(HttpResponse::Ok().json(project))
}

pub fn project_routes(cfg: &mut web::ServiceConfig) {
    cfg.service(create_project)
       .service(list_projects)
       .service(get_project);
}