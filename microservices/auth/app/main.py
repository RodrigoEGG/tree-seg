from app.api import router
from app import app

app.include_router(router)

@app.get("/")
def root():
    return {"message": "Server running"}