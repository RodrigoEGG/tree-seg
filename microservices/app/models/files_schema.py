from sqlalchemy import Column, Integer, String, Date, Boolean, ForeignKey
from sqlalchemy.orm import relationship
from app.models import Base
from sqlalchemy.sql import func
from pydantic import BaseModel
from datetime import date as date_type

class File(Base):
    __tablename__ = 'file'
    
    file_id = Column(Integer, primary_key=True, autoincrement=True)
    project_id = Column(Integer, ForeignKey('project.project_id', ondelete='CASCADE'), nullable=False)
    file_name = Column(String(255), nullable=False)
    date_uploaded = Column(Date, nullable=False, default=func.current_date())
    is_segmented = Column(Boolean, nullable=False, default=False)
    
    # Relationships
    project = relationship("Project", back_populates="files")
    zones = relationship("ZFMapping", back_populates="file")

class FileCreate(BaseModel):
    file_name : str
    project_id : int

class FileCreateResponse(FileCreate):
    file_id : int
    date_uploaded : date_type
    is_segmented : bool

    class Config:
        from_attributes = True

class FileUrl(BaseModel):
    filename : str

class FileUrlResponse(BaseModel):
    signedurl : str

class FileUpdate(BaseModel):
    file_name : str
    is_segmented : str