CREATE TABLE USERS(
    id SERIAL PRIMARY KEY,
    firstname varchar(200),
    lastname varchar(200),
    password_digest varchar
);