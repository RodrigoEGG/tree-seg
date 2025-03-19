from sqlalchemy.orm import Session
from .database import SessionLocal

def get_db():
    db = SessionLocal()
    try:
        yield db  # Provide the session
    finally:
        db.close()  # Ensure the session is closed after use