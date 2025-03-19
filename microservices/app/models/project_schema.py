from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.ext.declarative import declarative_base
from pydantic import BaseModel
from datetime import datetime

Base = declarative_base()

# SQLAlchemy Model (Database Representation)
class Project(Base):
    __tablename__ = "projects"

    project_id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    description = Column(String(500), nullable=True)
    owner = Column(String(100), nullable=False)
    date = Column(DateTime, nullable=False, default=datetime.utcnow)

# Pydantic Schema (For Request/Response Validation)
class ProjectBase(BaseModel):
    name: str
    description: str | None = None
    owner: str

class ProjectCreate(ProjectBase):
    pass  # No project_id since it's auto-generated

class ProjectUpdate(ProjectBase):
    name: str | None = None
    description: str | None = None
    owner: str | None = None

class ProjectResponse(ProjectBase):
    project_id: int
    date: datetime

    class Config:
        from_attributes = True  # Allows conversion from SQLAlchemy models