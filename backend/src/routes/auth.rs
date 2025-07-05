use actix_web::{post, web, HttpResponse, Scope, Result};
use serde::{Deserialize, Serialize};
use uuid::Uuid;
use bcrypt::{hash, verify, DEFAULT_COST};
use crate::auth::create_jwt;

#[derive(Deserialize)]
struct RegisterRequest {
    email: String,
    password: String,
    name: Option<String>,
}

#[derive(Deserialize)]
struct LoginRequest {
    email: String,
    password: String,
}

#[derive(Serialize)]
struct AuthResponse {
    token: String,
    #[serde(rename = "userId")]
    user_id: String,
    user: UserInfo,
}

#[derive(Serialize)]
struct UserInfo {
    id: String,
    email: String,
    name: Option<String>,
}

#[post("/api/v1/auth/register")]
async fn register(form: web::Json<RegisterRequest>) -> Result<HttpResponse> {
    let user_id = Uuid::new_v4();
    let password_hash = hash(&form.password, DEFAULT_COST)
        .map_err(|_| actix_web::error::ErrorInternalServerError("Password hashing failed"))?;
    
    let token = create_jwt(&user_id.to_string());
    
    let user_info = UserInfo {
        id: user_id.to_string(),
        email: form.email.clone(),
        name: form.name.clone(),
    };

    let response = AuthResponse {
        token,
        user_id: user_id.to_string(),
        user: user_info,
    };

    Ok(HttpResponse::Ok().json(response))
}

#[post("/api/v1/auth/login")]
async fn login(form: web::Json<LoginRequest>) -> Result<HttpResponse> {
    // Mock login - in real implementation, verify against database
    let user_id = Uuid::new_v4();
    let token = create_jwt(&user_id.to_string());
    
    let user_info = UserInfo {
        id: user_id.to_string(),
        email: form.email.clone(),
        name: Some("Demo User".to_string()),
    };

    let response = AuthResponse {
        token,
        user_id: user_id.to_string(),
        user: user_info,
    };

    Ok(HttpResponse::Ok().json(response))
}

pub fn auth_routes(cfg: &mut web::ServiceConfig) {
    cfg.service(register)
       .service(login);
}