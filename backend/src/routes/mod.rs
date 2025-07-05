pub mod auth;
pub mod projects;
pub mod branches;
pub mod commits;
pub mod audio;
pub mod comments;

pub use auth::auth_routes;
pub use projects::project_routes;
pub use branches::branch_routes;
pub use commits::commit_routes;
pub use audio::audio_routes;
pub use comments::comment_routes;