from sqlalchemy import Column, Integer, ForeignKey, UniqueConstraint
from sqlalchemy.orm import relationship
from app.models import Base
from pydantic import BaseModel

class ProjectMember(Base):
    __tablename__ = 'project_member'
    
    projectmember_id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey('user.user_id', ondelete='CASCADE'), nullable=False)
    project_id = Column(Integer, ForeignKey('project.project_id', ondelete='CASCADE'), nullable=False)
    
    # Unique constraint for user_id and project_id
    __table_args__ = (UniqueConstraint('user_id', 'project_id'),)
    
    # Relationships
    user = relationship("User", back_populates="projects")
    project = relationship("Project", back_populates="members")

class ProjectMemberCreate(BaseModel):
    user_id : int
    project_id : int

class ProjectMemberResponse(ProjectMemberCreate):
    projectmember_id : int

    class Config:
        from_attributes = True
