from sqlalchemy import Column, Integer, ForeignKey, UniqueConstraint
from sqlalchemy.orm import relationship
from pydantic import BaseModel
from app.models import Base

class ZFMapping(Base):
    __tablename__ = 'zfmapping'
    
    zfmapping_id = Column(Integer, primary_key=True, autoincrement=True)
    zone_id = Column(Integer, ForeignKey('zone.zone_id', ondelete='CASCADE'), nullable=False)
    file_id = Column(Integer, ForeignKey('file.file_id', ondelete='CASCADE'), nullable=False)
    
    # Unique constraint for zone_id and file_id
    __table_args__ = (UniqueConstraint('zone_id', 'file_id'),)
    
    # Relationships
    zone = relationship("Zone", back_populates="files")
    file = relationship("File", back_populates="zones")