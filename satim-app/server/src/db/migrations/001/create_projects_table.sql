CREATE TABLE projects (
                          id           BIGSERIAL PRIMARY KEY,
                          name         VARCHAR(40)    NOT NULL,
                          description  VARCHAR(255)             NULL,
                          owner_id     BIGINT           NOT NULL REFERENCES users(id),
                          created_at   TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                          updated_at   TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
