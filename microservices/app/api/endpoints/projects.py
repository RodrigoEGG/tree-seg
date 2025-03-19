from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from microservices.app.config.db_config_postgres import connect_to_db_postgres
from microservices.app.crud.projects.projects import create_project, get_projects, get_project_by_id, get_project_by_name, update_project, update_project_by_name, delete_project, delete_project_by_name
from microservices.app.models.project_schema import Project, ProjectCreate, ProjectUpdate, ProjectResponse

# Handle HTTP requests for the /projects endpoint with try and except blocks
router = APIRouter()

# Create a new project
@router.post("/", response_model=ProjectResponse, status_code=status.HTTP_201_CREATED)
def create_new_project(project: ProjectCreate, db: Session = Depends(connect_to_db_postgres)):
    try:
        new_project = create_project(db, project)
        return new_project
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
    
# Get all projects
@router.get("/", response_model=list[ProjectResponse], status_code=status.HTTP_200_OK)
def get_all_projects(db: Session = Depends(connect_to_db_postgres)):
    try:
        projects = get_projects(db)
        return projects
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
    
# Get a project by ID
@router.get("/{project_id}", response_model=ProjectResponse, status_code=status.HTTP_200_OK)
def get_project_by_id(project_id: int, db: Session = Depends(connect_to_db_postgres)):
    try:
        project = get_project_by_id(db, project_id)
        if project is None:
            raise HTTPException(status_code=404, detail="Project not found")
        return project
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
    
# Get a project by name
@router.get("/name/{name}", response_model=ProjectResponse, status_code=status.HTTP_200_OK)
def get_project_by_name(name: str, db: Session = Depends(connect_to_db_postgres)):
    try:
        project = get_project_by_name(db, name)
        if project is None:
            raise HTTPException(status_code=404, detail="Project not found")
        return project
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

# Update a project by ID
@router.put("/{project_id}", response_model=ProjectResponse, status_code=status.HTTP_200_OK)
def update_project_by_id(project_id: int, project: ProjectUpdate, db: Session = Depends(connect_to_db_postgres)):
    try:
        updated_project = update_project(db, project_id, project)
        if updated_project is None:
            raise HTTPException(status_code=404, detail="Project not found")
        return updated_project
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

# Update a project by name
@router.put("/name/{name}", response_model=ProjectResponse, status_code=status.HTTP_200_OK)
def update_project_by_name(name: str, project: ProjectUpdate, db: Session = Depends(connect_to_db_postgres)):
    try:
        updated_project = update_project_by_name(db, name, project)
        if updated_project is None:
            raise HTTPException(status_code=404, detail="Project not found")
        return updated_project
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

# Delete a project by ID
@router.delete("/{project_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_project_by_id(project_id: int, db: Session = Depends(connect_to_db_postgres)):
    try:
        deleted_project = delete_project(db, project_id)
        if deleted_project is None:
            raise HTTPException(status_code=404, detail="Project not found")
        return None
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

# Delete a project by name
@router.delete("/name/{name}", status_code=status.HTTP_204_NO_CONTENT)
def delete_project_by_name(name: str, db: Session = Depends(connect_to_db_postgres)):
    try:
        deleted_project = delete_project_by_name(db, name)
        if deleted_project is None:
            raise HTTPException(status_code=404, detail="Project not found")
        return None
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
