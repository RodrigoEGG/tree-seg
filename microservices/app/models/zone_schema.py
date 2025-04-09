from sqlalchemy import Column, Integer, String, Date, Boolean, Float, ForeignKey, UniqueConstraint
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from app.models import Base

class Zone(Base):
    __tablename__ = 'zone'
    
    zone_id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(255), nullable=False)
    latitude = Column(Float, nullable=False)
    longitude = Column(Float, nullable=False)
    
    # Relationships
    files = relationship("ZFMapping", back_populates="zone")