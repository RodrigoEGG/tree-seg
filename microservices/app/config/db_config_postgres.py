from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from dotenv import dotenv_values

def connect_to_db_postgres():
    # Load environment variables
    CONFIG = dotenv_values(".env")

    DATABASE_URL = CONFIG.get("POSTGRES_CONNECTION_STRING")

    if not DATABASE_URL:
        raise ValueError("POSTGRES_CONNECTION_STRING is not set in the environment variables.")
    # Create SQLAlchemy engine
    engine = create_engine(DATABASE_URL)

    # Create a session factory and return it
    SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
    
    return SessionLocal  # Return the session factory, not a session