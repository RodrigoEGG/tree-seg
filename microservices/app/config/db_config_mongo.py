import os
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from dotenv import dotenv_values
import certifi

def connect_to_db_mongo():
    # Load the environment variables
    CONFIG = dotenv_values(".env")

    # Retrieve password from .env
    atlas_password = CONFIG["ATLAS_PASSWORD"]
    
    if not atlas_password:
        raise ValueError("ATLAS_PASSWORD is not set in the environment variables.")

    uri = CONFIG["ATLAS_URI"]

    # Create a new client and connect to the server
    client = MongoClient(uri, server_api=ServerApi('1'), tlsCAFile=certifi.where())

    # Send a ping to confirm a successful connection
    try:
        client.admin.command('ping')
        print("Pinged your deployment. You successfully connected to MongoDB!")
        return client  # Return the MongoDB client for reuse
    except Exception as e:
        print("Failed to connect to MongoDB:", e)
        return None