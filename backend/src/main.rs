mod db;
mod auth;
mod models;
mod routes;

use actix_web::{App, HttpServer};
use db::init_pool;
use routes::*;

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    dotenv::dotenv().ok();
    let pool = init_pool();

    HttpServer::new(move || {
        App::new()
            .app_data(pool.clone())
            .configure(auth_routes)
            .configure(project_routes)
            .configure(branch_routes)
            .configure(commit_routes)
            .configure(audio_routes)
            .configure(comment_routes)
    })
    .bind(("127.0.0.1", 8080))?
    .run()
    .await
}