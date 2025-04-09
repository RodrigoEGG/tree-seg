from sqlalchemy import Column, Integer, String, Date, Boolean, ForeignKey, Numeric, UniqueConstraint
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from pydantic import BaseModel

Base = declarative_base()

class ProjectMember(Base):
    __tablename__ = "project_member"
    
    projectmember_id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("user.user_id", ondelete="CASCADE"), nullable=False)
    project_id = Column(Integer, ForeignKey("project.project_id", ondelete="CASCADE"), nullable=False)
    
    # Relationships - Use string references for Project
    user = relationship("User", back_populates="projects")
    project = relationship("Project", back_populates="members")
    
    # Unique constraint
    __table_args__ = (UniqueConstraint('user_id', 'project_id'),)