from sqlalchemy import Column, Integer, String, Date, Boolean, ForeignKey, Numeric, UniqueConstraint
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from datetime import date as date_type
from pydantic import BaseModel
from app.models import Base
from app.models.project_member_schema import ProjectMember
from app.models.files_schema import File

# SQLAlchemy Model (Database Representation)
class Project(Base):
    __tablename__ = "project"
   
    project_id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    description = Column(String(1000))
    date = Column(Date, nullable=False, server_default="CURRENT_DATE")
   
    # Relationships
    members = relationship("ProjectMember", back_populates="project", cascade="all, delete-orphan")
    files = relationship("File", back_populates="project", cascade="all, delete-orphan")

# Pydantic Schema (For Request/Response Validation)
class ProjectBase(BaseModel):
    name: str
    description: str | None = None
    date: date_type | None = None

class ProjectCreate(ProjectBase):
    pass  # No project_id since it's auto-generated

class ProjectUpdate(ProjectBase):
    name: str | None = None
    description: str | None = None
    date: date_type | None = None

class ProjectResponse(ProjectBase):
    project_id: int
    date: date_type | None = None
    
    class Config:
        orm_mode = True  # Allows conversion from SQLAlchemy models