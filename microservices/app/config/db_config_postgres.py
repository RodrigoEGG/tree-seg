from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from dotenv import dotenv_values

def connect_to_db_postgres():
    # Load environment variables
    CONFIG = dotenv_values(".env")

    DATABASE_URL = CONFIG.get("POSTGRES_URL")

    if not DATABASE_URL:
        raise ValueError("POSTGRES_URL is not set in the environment variables.")

    # Create SQLAlchemy engine
    engine = create_engine(DATABASE_URL)

    # Create a session factory
    SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

    # Dependency to get DB session
    try:
        db = SessionLocal()
        print("Connected to PostgreSQL!")
        return db
    except Exception as e:
        print("Failed to connect to PostgreSQL:", e)
        return None
