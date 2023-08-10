CREATE DATABASE career_services_db;

\c career_services_db;

DROP TABLE IF EXISTS cohort_assignment;
DROP TABLE IF EXISTS submission;
DROP TABLE IF EXISTS tracking;
DROP TABLE IF EXISTS student;
DROP TABLE IF EXISTS cohort;
DROP TABLE IF EXISTS assignment;
DROP TABLE IF EXISTS admin;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS authentication;


\c postgres

DROP USER career_services_api;
DROP DATABASE career_services_db;

CREATE DATABASE career_services_db;

\c career_services_db;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE authentication (
    user_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_name VARCHAR(50) NOT NULL,
    user_email VARCHAR(50) NOT NULL UNIQUE,
    user_password VARCHAR(255) NOT NULL
);
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    auth_id uuid REFERENCES authentication(user_id) ON DELETE CASCADE,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    isAdmin BOOLEAN
);

CREATE TABLE admin (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE CASCADE
);


CREATE TABLE assignment (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL
);

CREATE TABLE cohort (
    id SERIAL PRIMARY KEY,
    start_date DATE,
    end_date DATE,
    name VARCHAR(25) NOT NULL
);

CREATE TABLE student (
    id SERIAL PRIMARY KEY,
    cohort_id INT REFERENCES cohort(id),
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    desired_location TEXT,
    location TEXT
);
CREATE TABLE tracking (
    id SERIAL PRIMARY KEY,
    status VARCHAR(25) NOT NULL
);

CREATE TABLE submission (
    id SERIAL PRIMARY KEY,
    info TEXT,
    submission_time TIMESTAMP,
    student_id INT REFERENCES student(id) ON DELETE CASCADE,
    assignment_id INT REFERENCES assignment(id) ON DELETE CASCADE,
    tracking_id INT REFERENCES tracking(id) ON DELETE CASCADE
);

CREATE TABLE cohort_assignment (
    id SERIAL PRIMARY KEY,
    assignment_id INT REFERENCES assignment(id) ON DELETE CASCADE,
    cohort_id INT REFERENCES cohort(id) ON DELETE CASCADE
);

CREATE USER career_services_api PASSWORD 'career_services_api_password';
GRANT SELECT, INSERT, UPDATE, DELETE on users, admin, authentication, student, tracking, submission, cohort, assignment TO career_services_api;
GRANT USAGE on admin_id_seq, assignment_id_seq, cohort_assignment_id_seq, cohort_id_seq, student_id_seq, submission_id_seq, tracking_id_seq, users_id_seq TO career_services_api;