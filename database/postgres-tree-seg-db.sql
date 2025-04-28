-- Create tables for the database structure

-- Create User table
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

-- Create Zone table
CREATE TABLE zone (
    zone_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    latitude DECIMAL(8,6) NOT NULL,
    longitude DECIMAL(9,6) NOT NULL
);

-- Create Project table
CREATE TABLE project (
    project_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description VARCHAR(1000),
    date DATE NOT NULL DEFAULT CURRENT_DATE
);

-- Create Project Member junction table
CREATE TABLE project_member (
    projectmember_id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    project_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES "user"(user_id) ON DELETE CASCADE,
    FOREIGN KEY (project_id) REFERENCES project(project_id) ON DELETE CASCADE,
    UNIQUE(user_id, project_id)
);

-- Create File table
CREATE TABLE file (
    file_id SERIAL PRIMARY KEY,
    project_id INT NOT NULL,
    file_name VARCHAR(255) NOT NULL,
    date_uploaded DATE NOT NULL DEFAULT CURRENT_DATE,
    is_segmented BOOLEAN NOT NULL DEFAULT FALSE,
    FOREIGN KEY (project_id) REFERENCES project(project_id) ON DELETE CASCADE
);

-- Create Zone-to-File mapping table
CREATE TABLE zfmapping (
    zfmapping_id SERIAL PRIMARY KEY,
    zone_id INT NOT NULL,
    file_id INT NOT NULL,
    FOREIGN KEY (zone_id) REFERENCES zone(zone_id) ON DELETE CASCADE,
    FOREIGN KEY (file_id) REFERENCES file(file_id) ON DELETE CASCADE,
    UNIQUE(zone_id, file_id)
);

-- Create indexes for foreign keys to improve query performance
CREATE INDEX idx_project_member_user_id ON project_member(user_id);
CREATE INDEX idx_project_member_project_id ON project_member(project_id);
CREATE INDEX idx_file_project_id ON file(project_id);
CREATE INDEX idx_zfmapping_zone_id ON zfmapping(zone_id);
CREATE INDEX idx_zfmapping_file_id ON zfmapping(file_id);
