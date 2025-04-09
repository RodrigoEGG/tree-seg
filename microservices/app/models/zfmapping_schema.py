from sqlalchemy import Column, Integer, ForeignKey, UniqueConstraint
from sqlalchemy.orm import relationship
from pydantic import BaseModel

Base = declarative_base()

# SQLAlchemy Model
class ZFMapping(Base):
    __tablename__ = "zfmapping"
    
    zfmapping_id = Column(Integer, primary_key=True, index=True)
    zone_id = Column(Integer, ForeignKey("zone.zone_id", ondelete="CASCADE"), nullable=False)
    file_id = Column(Integer, ForeignKey("file.file_id", ondelete="CASCADE"), nullable=False)
    
    # Relationships
    zone = relationship("Zone", back_populates="files")
    file = relationship("File", back_populates="zones")
    
    # Unique constraint
    __table_args__ = (UniqueConstraint('zone_id', 'file_id'),)

# Pydantic Models
class ZFMappingBase(BaseModel):
    zone_id: int
    file_id: int

class ZFMappingCreate(ZFMappingBase):
    pass

class ZFMappingResponse(ZFMappingBase):
    zfmapping_id: int
    
    class Config:
        from_attributes = True  # Allows conversion from SQLAlchemy models