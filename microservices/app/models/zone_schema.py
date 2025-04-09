from sqlalchemy import Column, Integer, String, Numeric
from sqlalchemy.orm import relationship
from pydantic import BaseModel

Base = declarative_base()

# SQLAlchemy Model
class Zone(Base):
    __tablename__ = "zone"
    
    zone_id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    latitude = Column(Numeric(8, 6), nullable=False)
    longitude = Column(Numeric(9, 6), nullable=False)
    
    # Relationships
    files = relationship("ZFMapping", back_populates="zone")

# Pydantic Models
class ZoneBase(BaseModel):
    name: str
    latitude: float
    longitude: float

class ZoneCreate(ZoneBase):
    pass

class ZoneUpdate(BaseModel):
    name: str | None = None
    latitude: float | None = None
    longitude: float | None = None

class ZoneResponse(ZoneBase):
    zone_id: int
    
    class Config:
        from_attributes = True  # Allows conversion from SQLAlchemy models