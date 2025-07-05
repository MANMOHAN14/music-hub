table! {
    projects (id) {
        id -> Uuid,
        owner_id -> Uuid,
        name -> Varchar,
        description -> Nullable<Text>,
        created_at -> Timestamp,
    }
}

table! {
    branches (id) {
        id -> Uuid,
        project_id -> Uuid,
        name -> Varchar,
        created_at -> Timestamp,
    }
}

table! {
    commits (id) {
        id -> Uuid,
        branch_id -> Uuid,
        author_id -> Uuid,
        message -> Text,
        created_at -> Timestamp,
    }
}

table! {
    blobs (id) {
        id -> Uuid,
        commit_id -> Uuid,
        file_path -> Varchar,
        content -> Bytea,
    }
}

table! {
    comments (id) {
        id -> Uuid,
        commit_id -> Uuid,
        author_id -> Uuid,
        content -> Text,
        created_at -> Timestamp,
    }
}

joinable!(branches -> projects (project_id));
joinable!(commits -> branches (branch_id));
joinable!(comments -> commits (commit_id));
joinable!(blobs -> commits (commit_id));

allow_tables_to_appear_in_same_query!(
    projects,
    branches,
    commits,
    blobs,
    comments,
);
