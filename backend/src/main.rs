mod db;
mod auth;
mod models;
mod routes;

use actix_web::{web, App, HttpServer, middleware::Logger};
use actix_cors::Cors;
use db::init_pool;
use routes::*;

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    env_logger::init();
    dotenv::dotenv().ok();
    
    let pool = init_pool();

    HttpServer::new(move || {
        let cors = Cors::default()
            .allow_any_origin()
            .allow_any_method()
            .allow_any_header()
            .max_age(3600);

        App::new()
            .app_data(web::Data::new(pool.clone()))
            .wrap(cors)
            .wrap(Logger::default())
            .configure(auth_routes)
            .configure(project_routes)
            .configure(branch_routes)
            .configure(commit_routes)
            .configure(audio_routes)
            .configure(comment_routes)
            .configure(nft_routes)
            .configure(collaboration_routes)
    })
    .bind(("127.0.0.1", 8080))?
    .run()
    .await
}