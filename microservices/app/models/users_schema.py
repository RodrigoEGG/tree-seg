from sqlalchemy import Column, Integer, String, Date, Boolean, Float, ForeignKey, UniqueConstraint
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from app.models import Base
from pydantic import BaseModel

class User(Base):
    __tablename__ = 'user'
    
    user_id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(255), nullable=False)
    email = Column(String(255), nullable=False, unique=True)
    password = Column(String(255), nullable=False)
    
    # Relationships
    projects = relationship("ProjectMember", back_populates="user")

class UserBase(BaseModel):
    name: str
    password : str
    email : str

class UserCreate(UserBase):
    pass

class UserResponse(UserBase):
    user_id : int
    
    class Config:
        from_attributes = True
