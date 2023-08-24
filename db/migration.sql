-- Create and Connect to the Database
CREATE DATABASE career_services_db;

\c career_services_db;
--Drop all tables if they exist
DROP TABLE IF EXISTS cohort_assignment;
DROP TABLE IF EXISTS submission;
DROP TABLE IF EXISTS tracking;
DROP TABLE IF EXISTS student;
DROP TABLE IF EXISTS cohort;
DROP TABLE IF EXISTS assignment;
DROP TABLE IF EXISTS admin;
DROP TABLE IF EXISTS todo;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS authentication;

-- connect to default and dropo the user and the databse
\c postgres

DROP USER career_services_api;
DROP DATABASE career_services_db;
-- recreate and connect to the database
CREATE DATABASE career_services_db;

\c career_services_db;
-- create an extension for UUID to enable unique 128 bit identifiers
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
-- create authentication table and call uuid as a type and the extension to generate one
CREATE TABLE authentication (
    user_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_name VARCHAR(50) NOT NULL,
    user_email VARCHAR(50) NOT NULL UNIQUE,
    user_password VARCHAR(255) NOT NULL
);
-- create Users table with FK contraint  on auth ID
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    auth_id uuid REFERENCES authentication(user_id) ON DELETE CASCADE,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    isAdmin BOOLEAN,
    github_acct VARCHAR(50)
);
-- create todo table with FK constraint on users.id
CREATE TABLE todo (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    todo_item TEXT
);
-- create an admin table for future stores of info with FK on users.id
CREATE TABLE admin (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE CASCADE
);
-- Create assignment table to store normalized values for assignments
CREATE TABLE assignment (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL
);
-- create cohort table to store normalized values for Cohorts
CREATE TABLE cohort (
    id SERIAL PRIMARY KEY,
    start_date DATE,
    end_date DATE,
    name VARCHAR(25) NOT NULL
);
-- create student table to hold information for student users with FK on cohort.id and users.id
CREATE TABLE student (
    id SERIAL PRIMARY KEY,
    cohort_id INT REFERENCES cohort(id),
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    desired_location TEXT,
    location TEXT
);
-- create tracking table to store normalized values for status on assignments
CREATE TABLE tracking (
    id SERIAL PRIMARY KEY,
    status VARCHAR(25) NOT NULL
);
-- create submissions table as a join table holding FK on sudent.id assignment.id and tracking.id
CREATE TABLE submission (
    id SERIAL PRIMARY KEY,
    info TEXT,
    feedback TEXT,
    submission_time TIMESTAMP,
    student_id INT REFERENCES student(id) ON DELETE CASCADE,
    assignment_id INT REFERENCES assignment(id) ON DELETE CASCADE,
    tracking_id INT REFERENCES tracking(id) ON DELETE CASCADE
);
-- create join table holding FK on cohort.id and assignment.id
CREATE TABLE cohort_assignment (
    id SERIAL PRIMARY KEY,
    assignment_id INT REFERENCES assignment(id) ON DELETE CASCADE,
    cohort_id INT REFERENCES cohort(id) ON DELETE CASCADE
);
-- PL/SQL function to insert a submission with default values
CREATE OR REPLACE FUNCTION create_submissions_for_cohort()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO submission (info, feedback, tracking_id, submission_time, student_id, assignment_id)
    SELECT
        '' as info, -- or default value
        '' as feedback, -- or default value
        1 as tracking_id,
        NOW() as submission_time,
        student.id as student_id,
        NEW.assignment_id -- NEW refers to the inserted row
    FROM 
        student
    WHERE 
        student.cohort_id = NEW.cohort_id;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;
-- create a trigger to run the PL/SQL function any time a new assignment is added to cohort_assignment join table
CREATE TRIGGER after_cohort_assignment_insert
AFTER INSERT ON cohort_assignment
FOR EACH ROW
EXECUTE FUNCTION create_submissions_for_cohort();

-- PL/SQL function to insert a submission with default values
CREATE OR REPLACE FUNCTION create_submissions_for_new_student()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO submission (info, feedback, tracking_id, submission_time, student_id, assignment_id)
    SELECT
        '' as info, -- using empty strings as default values for clarity
        '' as feedback, -- using empty strings as default values for clarity
        1 as tracking_id,
        NOW() as submission_time,
        NEW.id as student_id,
        cohort_assignment.assignment_id
    FROM 
        cohort_assignment
    WHERE 
        cohort_assignment.cohort_id = NEW.cohort_id;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;
-- Trigger to run whenever a new student is added to a cohort
CREATE TRIGGER after_student_insert_into_cohort
AFTER INSERT ON student
FOR EACH ROW
EXECUTE FUNCTION create_submissions_for_new_student();

--create user and grant user access
CREATE USER career_services_api PASSWORD 'career_services_api_password';
GRANT SELECT, INSERT, UPDATE, DELETE on users, admin, authentication, student, tracking, submission, cohort, assignment TO career_services_api;
GRANT USAGE on admin_id_seq, assignment_id_seq, cohort_assignment_id_seq, cohort_id_seq, student_id_seq, submission_id_seq, tracking_id_seq, users_id_seq TO career_services_api;