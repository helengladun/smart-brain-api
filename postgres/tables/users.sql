BEGIN TRANSACTION;

CREATE TABLE users (
    id serial PRIMARY KEY,
    name VARCHAR(100),
    email text UNIQUE NOT NULL,
    entries BIGINT DEFAULT 0,
    age BIGINT DEFAULT 0,
    pet text,
    joined TIMESTAMP NOT NULL
);

COMMIT;