from sqlalchemy import Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class Files(Base):
    __tablename__ = "files"

    file_id = Column(Integer, primary_key=True, index=True)
    project_id = Column(Integer, nullable=False)
    name = Column(String, nullable=False)
    date = Column(String, nullable=False)
    location = Column(String, nullable=False)
    is_segmented = Column(Integer, nullable=False)