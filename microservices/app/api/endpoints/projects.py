from fastapi import APIRouter, Depends, HTTPException, status
from app.models.project_member_schema import ProjectMemberCreate, ProjectMemberResponse
from sqlalchemy.orm import Session
from app.dependencies.postgres_depends import get_db
from app.crud.projects.projects import (
    create_project,
    create_projectmember,
    get_projects,
    get_project_by_id,
    get_project_by_name,
    update_project,
    update_project_by_name,
    delete_project,
    delete_project_by_name,
    get_project_by_owner_id,
    check_projectmember
)
from app.models.project_schema import ProjectCreate, ProjectUpdate, ProjectResponse

router = APIRouter()

@router.post("/", response_model=ProjectResponse, status_code=status.HTTP_201_CREATED)
def create_new_project(project: ProjectCreate, db: Session = Depends(get_db)):
    print(project)
    return create_project(db, project)

@router.get("/", response_model=list[ProjectResponse], status_code=status.HTTP_200_OK)
def fetch_all_projects(db: Session = Depends(get_db)):
    return get_projects(db)

@router.get("/{project_id}", response_model=ProjectResponse, status_code=status.HTTP_200_OK)
def fetch_project_by_id(project_id: int, db: Session = Depends(get_db)):
    project = get_project_by_id(db, project_id)
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    return project

@router.get("/name/{name}", response_model=ProjectResponse, status_code=status.HTTP_200_OK)
def fetch_project_by_name(name: str, db: Session = Depends(get_db)):
    project = get_project_by_name(db, name)
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    return project

@router.get("/owner/{owner_id}", response_model=list[ProjectResponse], status_code=status.HTTP_200_OK)
def fetch_projects_by_owner_id(owner_id: int, db: Session = Depends(get_db)):
    projects = get_project_by_owner_id(db, owner_id)
    if not projects:
        raise HTTPException(status_code=404, detail="No projects found for this owner")
    return projects

@router.put("/{project_id}", response_model=ProjectResponse, status_code=status.HTTP_200_OK)
def modify_project_by_id(project_id: int, project: ProjectUpdate, db: Session = Depends(get_db)):
    updated_project = update_project(db, project_id, project)
    if not updated_project:
        raise HTTPException(status_code=404, detail="Project not found")
    return updated_project

@router.put("/name/{name}", response_model=ProjectResponse, status_code=status.HTTP_200_OK)
def modify_project_by_name(name: str, project: ProjectUpdate, db: Session = Depends(get_db)):
    updated_project = update_project_by_name(db, name, project)
    if not updated_project:
        raise HTTPException(status_code=404, detail="Project not found")
    return updated_project

@router.delete("/{project_id}", status_code=status.HTTP_204_NO_CONTENT)
def remove_project_by_id(project_id: int, db: Session = Depends(get_db)):
    deleted_project = delete_project(db, project_id)
    if not deleted_project:
        raise HTTPException(status_code=404, detail="Project not found")
    return None

@router.delete("/name/{name}", status_code=status.HTTP_204_NO_CONTENT)
def remove_project_by_name(name: str, db: Session = Depends(get_db)):
    deleted_project = delete_project_by_name(db, name)
    if not deleted_project:
        raise HTTPException(status_code=404, detail="Project not found")
    return None

@router.post("/member/", response_model=ProjectMemberResponse, status_code=status.HTTP_200_OK)
def create_project_member(project_member : ProjectMemberCreate):
    return create_projectmember(project_member)

@router.get("/check/{user_id}/{project_id}", status_code=status.HTTP_200_OK)
def fetch_project_member_check(user_id: int, project_id: int, db: Session = Depends(get_db)):
    project_member = ProjectMemberCreate(user_id=user_id, project_id=project_id)
    flag = check_projectmember(db, project_member)
    return {"check": flag}


