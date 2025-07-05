use actix_web::{post, web, HttpResponse, Scope};
use serde::Deserialize;
use uuid::Uuid;
use crate::auth::create_jwt;

#[derive(Deserialize)]
struct RegisterRequest {
    email: String,
    password: String,
    name: Option<String>,
}

#[post("/api/v1/auth/register")]
async fn register(form: web::Json<RegisterRequest>) -> HttpResponse {
    let user_id = Uuid::new_v4();
    let token = create_jwt(&user_id.to_string());

    HttpResponse::Ok().json(serde_json::json!({
        "userId": user_id,
        "token": token
    }))
}

pub fn auth_routes() -> Scope {
    web::scope("").service(register)
}

