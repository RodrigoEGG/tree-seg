from fastapi import APIRouter, Depends, HTTPException, status
from app.models.files_schema import FileCreate, FileCreateResponse, FileUpdate, FileUrl, FileUrlResponse
from app.dependencies.mongo_depends import get_mongo
from app.dependencies.postgres_depends import get_db
from sqlalchemy.orm import Session
from app.crud.files.files import check_file, create_file, delete_file, get_all_files, get_file, get_file_metadata, get_metadata_by_project, get_project_files, get_signed_url, update_file, validate_user_file
from pymongo.database import Database
from bson import ObjectId

router = APIRouter()

@router.get("/", status_code=status.HTTP_200_OK)
def fetch_all_files(db: Session = Depends(get_db)):
    try:
        files = get_all_files(db)
        return files
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/{file_id}", status_code=status.HTTP_200_OK)
def fetch_file(file_id: int, db: Session = Depends(get_db)):
    file = get_file(db, file_id)
    if not file:
        raise HTTPException(status_code=404, detail="File not found")
    return file

@router.get("/project/{project_id}", status_code=status.HTTP_200_OK)
def fetch_project_files(project_id: int, db: Session = Depends(get_db)):
    try:
        files = get_project_files(db, project_id)
        return files
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
@router.post("/signedurl", response_model=FileUrlResponse, status_code=status.HTTP_200_OK)
def fetch_signed_url(fileurl : FileUrl):
    try:
        url = get_signed_url(fileurl)
        return FileUrlResponse(signedurl=url)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/file", response_model=FileCreateResponse, status_code=status.HTTP_200_OK)
def create_file_endpoint(file: FileCreate, db: Session = Depends(get_db)):
    return create_file(db, file)

@router.delete("/{file_id}", status_code=status.HTTP_200_OK)
def remove_file_by_id(file_id : int, db : Session = Depends(get_db)):
    deleted_file = delete_file(db, file_id)
    if not deleted_file:
        raise HTTPException(status_code=404, detail="Project not found")
    return None
 
@router.post("/check/", status_code=status.HTTP_200_OK)
def check_file_by_project(file : FileCreate, db: Session = Depends(get_db)):
    response = check_file(db, file)
    return {"check" : response}

@router.put("/{file_id}", status_code=status.HTTP_200_OK)
def modify_file_by_id(file_id : int,  file : FileUpdate, db : Session = Depends(get_db)):

    updated_file = update_file(db, file_id, file)

    if not updated_file:
        raise HTTPException(status_code=404, detail="File not found")
    
    return updated_file

@router.get('/check/{user_id}/{project_id}/{file_id}', status_code=status.HTTP_200_OK)
def check_user_file(user_id : int, project_id : int, file_id : int, db : Session = Depends(get_db)):
    check = validate_user_file(db, user_id, project_id,file_id)
    return {"check" : check}

@router.get('/file/metadata/{file_id}', status_code=status.HTTP_200_OK)
def fetch_file_metadata(file_id: int,pg: Session = Depends(get_db), mongo_db: Database = Depends(get_mongo) ):
    try:
        result = get_file_metadata(pg, mongo_db, file_id)
        return {"check" : result}
    except Exception:
        raise HTTPException(status_code=404, detail="File not found")
    
@router.get('/metadatas/{project_id}', status_code=status.HTTP_200_OK)
def fetch_metadata_by_project(project_id : int, client : Database = Depends(get_mongo)):
    try:
        result = get_metadata_by_project(client, project_id)
        return {"metadatas" : result}
    except Exception:
        raise HTTPException(status_code=404, detail="Metadata not found")
    



