from sqlalchemy import Column, Integer, String, Date, Boolean, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class File(Base):
    __tablename__ = "file"
   
    file_id = Column(Integer, primary_key=True, index=True)
    project_id = Column(Integer, ForeignKey("project.project_id", ondelete="CASCADE"), nullable=False)
    file_name = Column(String(255), nullable=False)
    date_uploaded = Column(Date, nullable=False, server_default="CURRENT_DATE")
    is_segmented = Column(Boolean, nullable=False, default=False)
    
    # Relationships
    project = relationship("Project", back_populates="files")
    zones = relationship("ZFMapping", back_populates="file")