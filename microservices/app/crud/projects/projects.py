from sqlalchemy.orm import Session
from app.models.project_schema import Project, ProjectCreate, ProjectUpdate
from app.models.project_member_schema import ProjectMember, ProjectMemberCreate

#  Create a new project
def create_project(db: Session, project: ProjectCreate):
    new_project = Project(
        name=project.name,
        description=project.description,
        date=project.date
    )
    db.add(new_project)
    db.commit()
    db.refresh(new_project)

    pm = ProjectMember(user_id=project.owner_id, project_id=new_project.project_id)
    db.add(pm)
    db.commit()
    db.refresh(pm)

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

# Get a project by owner ID
def get_project_by_owner_id(db: Session, owner_id: int):
    return db.query(Project).join(ProjectMember).filter(ProjectMember.user_id == owner_id).all()

# Update a project by ID
def update_project(db: Session, project_id: int, project: ProjectUpdate):
    existing_project = db.query(Project).filter(Project.project_id == project_id).first()
    if not existing_project:
        return None
    for key, value in project.dict(exclude_unset=True).items():
        setattr(existing_project, key, value)
    db.commit()
    db.refresh(existing_project)
    return existing_project

# Update a project by name
def update_project_by_name(db: Session, name: str, project: ProjectUpdate):
    existing_project = db.query(Project).filter(Project.name == name).first()
    if not existing_project:
        return None
    for key, value in project.dict(exclude_unset=True).items():
        setattr(existing_project, key, value)
    db.commit()
    db.refresh(existing_project)
    return existing_project

# Delete a project by ID
def delete_project(db: Session, project_id: int):
    project = db.query(Project).filter(Project.project_id == project_id).first()
    if project:
        db.delete(project)
        db.commit()
    return project

# Delete a project by name
def delete_project_by_name(db: Session, name: str):
    project = db.query(Project).filter(Project.name == name).first()
    if project:
        db.delete(project)
        db.commit()
    return project

def create_projectmember(db : Session , project_member : ProjectMemberCreate):
    new_project_member = ProjectMember(**project_member.dict())
    db.add(new_project_member)
    db.commit()
    db.refresh(new_project_member)
    return new_project_member

def check_projectmember(db: Session, project_member: ProjectMemberCreate):
    projectmember=db.query(ProjectMember).filter(
        ProjectMember.user_id == project_member.user_id,
        ProjectMember.project_id == project_member.project_id
    ).first()
    if projectmember:
        return True
    else:
        return False
