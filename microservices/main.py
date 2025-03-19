import uvicorn
import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.routes import api_router
from pymongo import MongoClient
from sqlalchemy.orm import Session
from dotenv import dotenv_values
from microservices.app.config.db_config_mongo import connect_to_db_mongo
from microservices.app.config.db_config_postgres import connect_to_db_postgres, SessionLocal

# Initialize FastAPI app
app = FastAPI()

# Connect to MongoDB at startup
db_client_mongo = connect_to_db_mongo()  

# Connect to PostgreSQL at startup
db_client_postgres = connect_to_db_postgres()

# load environment variables
CONFIG = dotenv_values(".env")

# Set up CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Startup event
@app.on_event("startup")
def startup_db_client_():
    # MongoDB
    app.mongodb_client = MongoClient(CONFIG["ATLAS_URI"])
    app.database = app.mongodb_client[CONFIG["ATLAS_DB_NAME"]]
    print("Connected to MongoDB!")

    # PostgreSQL
    app.postgres_db = SessionLocal()
    print("Connected to PostgreSQL!")


# Shutdown event
@app.on_event("shutdown")
def shutdown_db_client():
    # MongoDB
    app.mongodb_client.close()

    # PostgreSQL
    app.postgres_db.close()


@app.get("/health")
async def health():
    return {"status": "ok"}

# Include routers
app.include_router(api_router, prefix="/api")

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=int(os.getenv("PORT", 8000)))