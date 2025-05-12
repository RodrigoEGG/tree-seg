import pytest
from fastapi.testclient import TestClient
from unittest.mock import patch, MagicMock
from fastapi import FastAPI, HTTPException
from app.api.endpoints import auth, users, userc, projects, files, pipeline

# Setup FastAPI app for testing
app = FastAPI()
app.include_router(auth.router, prefix="/auth")
app.include_router(users.router, prefix="/users")
app.include_router(userc.router, prefix="/userc")
app.include_router(projects.router, prefix="/projects")
app.include_router(files.router, prefix="/files")
app.include_router(pipeline.router, prefix="/pipeline")

@pytest.fixture
def client():
    return TestClient(app)

def override_get_db():
    yield MagicMock()

@patch("app.api.endpoints.users.get_db", override_get_db)
@patch("app.api.endpoints.users.get_all_users")
def test_users_fetch_all_users(mock_get_all_users, client):
    mock_get_all_users.return_value = [{"user_id": 1, "name": "test", "email": "test@test.com", "password": "hashed"}]
    response = client.get("/users/")
    assert response.status_code == 200
    assert isinstance(response.json(), list)

@patch("app.api.endpoints.users.get_db", override_get_db)
@patch("app.api.endpoints.users.get_user")
def test_users_fetch_user_success(mock_get_user, client):
    mock_get_user.return_value = {"user_id": 1, "name": "test", "email": "test@test.com", "password": "hashed"}
    response = client.get("/users/1")
    assert response.status_code == 200
    assert response.json()["user_id"] == 1

@patch("app.api.endpoints.userc.get_db", override_get_db)
def test_userc_register_user_already_exists(client):
    with patch("app.api.endpoints.userc.get_db", return_value=MagicMock()) as mock_db:
        mock_db.return_value.query.return_value.filter.return_value.first.return_value = {"user_id": 1}  # Simulate existing user
        response = client.post("/userc/user", json={"name": "test", "email": "test@test.com", "password": "pass"})
        assert response.status_code == 400
        assert response.json()["detail"] == "Email already registered"

        
# --- Projects endpoints ---

@patch("app.api.endpoints.projects.get_db", override_get_db)
@patch("app.api.endpoints.projects.get_projects")
def test_projects_fetch_all_projects(mock_get_projects, client):
    mock_get_projects.return_value = [
        {"project_id": 1, "name": "proj", "description": "desc", "date": "2024-01-01"}
    ]
    response = client.get("/projects/")
    assert response.status_code == 200
    assert isinstance(response.json(), list)

@patch("app.api.endpoints.projects.get_db", override_get_db)
@patch("app.api.endpoints.projects.get_project_by_id")
def test_projects_fetch_project_by_id(mock_get_project_by_id, client):
    mock_get_project_by_id.return_value = {"project_id": 1, "name": "proj", "description": "desc", "date": "2024-01-01"}
    response = client.get("/projects/1")
    assert response.status_code == 200
    assert response.json()["project_id"] == 1

@patch("app.api.endpoints.projects.get_db", override_get_db)
@patch("app.api.endpoints.projects.create_project")
def test_projects_create_new_project(mock_create_project, client):
    mock_create_project.return_value = {"project_id": 1, "name": "proj", "description": "desc", "date": "2024-01-01"}
    payload = {"name": "proj", "description": "desc", "date": "2024-01-01", "owner_id": 1}
    response = client.post("/projects/", json=payload)
    assert response.status_code == 201
    assert response.json()["name"] == "proj"

# --- Files endpoints ---

@patch("app.api.endpoints.files.get_db", override_get_db)
@patch("app.api.endpoints.files.get_all_files")
def test_files_fetch_all_files(mock_get_all_files, client):
    mock_get_all_files.return_value = [
        {"file_id": 1, "file_name": "f.txt", "project_id": 1, "date_uploaded": "2024-01-01", "is_segmented": False}
    ]
    response = client.get("/files/")
    assert response.status_code == 200
    assert isinstance(response.json(), list)

@patch("app.api.endpoints.files.get_db", override_get_db)
@patch("app.api.endpoints.files.get_file")
def test_files_fetch_file_by_id(mock_get_file, client):
    mock_get_file.return_value = {"file_id": 1, "file_name": "f.txt", "project_id": 1, "date_uploaded": "2024-01-01", "is_segmented": False}
    response = client.get("/files/1")
    assert response.status_code == 200
    assert response.json()["file_id"] == 1

@patch("app.api.endpoints.files.get_db", override_get_db)
@patch("app.api.endpoints.files.create_file")
def test_files_create_file(mock_create_file, client):
    mock_create_file.return_value = {"file_id": 1, "file_name": "f.txt", "project_id": 1, "date_uploaded": "2024-01-01", "is_segmented": False}
    payload = {"file_name": "f.txt", "project_id": 1}
    response = client.post("/files/file", json=payload)
    assert response.status_code == 200
    assert response.json()["file_name"] == "f.txt"