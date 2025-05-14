CREATE TYPE project_access_role AS ENUM ('viewer','editor','admin');

CREATE TABLE project_access (
                                project_id   BIGINT                       NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
                                user_id      BIGINT                       NOT NULL REFERENCES users(id)    ON DELETE CASCADE,
                                role         project_access_role          NOT NULL DEFAULT 'viewer',
                                granted_at   TIMESTAMP WITH TIME ZONE     NOT NULL DEFAULT now(),
                                PRIMARY KEY (project_id, user_id)
);
