from sqlalchemy.orm import Session
from app.models.project_schema import Project, ProjectCreate, ProjectUpdate, ProjectResponse

# Create a new project
def create_project(db: Session, project: ProjectCreate):
    new_project = Project(**project.dict())
    db.add(new_project)
    db.commit()
    db.refresh(new_project)
    return new_project

# Get all projects
def get_projects(db: Session):
    return db.query(Project).all()

# Get a project by ID
def get_project_by_id(db: Session, project_id: int):
    return db.query(Project).filter(Project.project_id == project_id).first()

# Get a project by name
def get_project_by_name(db: Session, name: str):
    return db.query(Project).filter(Project.name == name).first()

# Update a project by ID
def update_project(db: Session, project_id: int, project: ProjectUpdate):
    db.query(Project).filter(Project.project_id == project_id).update(project.dict())
    db.commit()
    return db.query(Project).filter(Project.project_id == project_id).first()

# Update a project by name
def update_project_by_name(db: Session, name: str, project: ProjectUpdate):
    db.query(Project).filter(Project.name == name).update(project.dict())
    db.commit()
    return db.query(Project).filter(Project.name == name).first()

# Delete a project by ID
def delete_project(db: Session, project_id: int):
    db.query(Project).filter(Project.project_id == project_id).delete()
    db.commit()
    return project_id

# Delete a project by name
def delete_project_by_name(db: Session, name: str):
    db.query(Project).filter(Project.name == name).delete()
    db.commit()
    return name