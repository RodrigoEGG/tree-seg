import uvicorn
import os
from fastapi import FastAPI
from app.config.db_config import connect_to_db
from fastapi.middleware.cors import CORSMiddleware
from app.api.routes import api_router
from pymongo import MongoClient
from dotenv import dotenv_values
# Initialize FastAPI app
app = FastAPI()

# Connect to MongoDB at startup
db_client = connect_to_db()  

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

@app.on_event("startup")
def startup_db_client():
    app.mongodb_client = MongoClient(CONFIG["ATLAS_URI"])
    app.database = app.mongodb_client[CONFIG["ATLAS_DB_NAME"]]

@app.on_event("shutdown")
def shutdown_db_client():
    app.mongodb_client.close()

@app.get("/health")
async def health():
    return {"status": "ok"}

# Include routers
app.include_router(api_router, prefix="/api")

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=int(os.getenv("PORT", 8000)))