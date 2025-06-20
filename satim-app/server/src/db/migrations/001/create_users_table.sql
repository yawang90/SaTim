CREATE TABLE users (
                       id INT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
                       last_name VARCHAR(100) NOT NULL,
                       first_name VARCHAR(100) NOT NULL,
                       email VARCHAR(100) UNIQUE NOT NULL,
                       password VARCHAR(255) NOT NULL,
                       roles user_role[] NOT NULL,
                       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TYPE user_role AS ENUM ('ADMIN', 'PARTICIPANT', 'GENERAL');
