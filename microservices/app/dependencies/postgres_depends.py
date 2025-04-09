from sqlalchemy.orm import Session
from app.config.db_config_postgres import connect_to_db_postgres

# Create a session factory once
SessionLocal = connect_to_db_postgres()

def get_db():
    db = SessionLocal()  # Create a new session
    try:
        yield db
    finally:
        db.close()