use actix_web::{get, web, HttpResponse, Scope};

#[get("/api/v1/projects/{project_id}/branches")]
async fn list_branches() -> HttpResponse {
    HttpResponse::Ok().body("List of branches")
}

pub fn branch_routes() -> Scope {
    web::scope("").service(list_branches)
}
