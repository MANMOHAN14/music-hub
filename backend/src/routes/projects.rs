use actix_web::{get, post, web, HttpResponse};

#[post("/projects")]
async fn create_project() -> HttpResponse {
    HttpResponse::Ok().body("Project created")
}

#[get("/projects")]
async fn list_projects() -> HttpResponse {
    HttpResponse::Ok().body("List of projects")
}

// Add more handlers here...
