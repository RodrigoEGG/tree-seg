from datetime import timedelta, datetime
from app.utils.minio import get_minio_client, get_minio_bucket
from app.models.project_member_schema import ProjectMember
from app.models.project_schema import Project
from sqlalchemy.orm import Session
from app.models.files_schema import File, FileCheck, FileCreate, FileUpdate, FileUrl
from minio.error import S3Error
from sqlalchemy import and_
from pymongo.database import Database
import laspy
import io
from pyproj import CRS, Transformer
from bson import ObjectId


def get_all_files(db: Session):
    return db.query(File).all()

def get_file(db: Session, file_id: int):
    return db.query(File).filter(File.file_id == file_id).first()

def get_project_files(db: Session, project_id: int):
    return db.query(File).filter(File.project_id == project_id).all()

def get_signed_url(fileurl : FileUrl):

    try : 

        client = get_minio_client()
        bucket = get_minio_bucket()

        url = client.get_presigned_url(
            "PUT",
            bucket,
            fileurl.filename,
            expires=timedelta(hours=1),
            response_headers={"response-content-type": "application/json"},
        )

        return url

    except Exception as e:
        return f"Error al generar la URL firmada: {str(e)}"

def create_file(db : Session , file : FileCreate):

    file = File(
        file_name=file.file_name,
        project_id=file.project_id
    )

    db.add(file)
    db.commit()
    db.refresh(file)

    return file

def check_file(db : Session , file : FileCreate):

    result = db.query(File).filter(File.project_id == file.project_id, File.file_name == file.file_name).first()

    if result : 
        return True
    else : 
        return False
    
def delete_file(db: Session, mongo : Database, file_id: int):
    try:
        client = get_minio_client()
        bucket = get_minio_bucket()

        file = db.query(File).filter(File.file_id == file_id).first()
        
        if not file:
            return None

        client.remove_object(bucket, f"{file.project_id}/{file_id}/{file.file_name}")
        mongo_db = mongo['tree-seg']
        collection = mongo_db["metadata"]
        collection.delete_one({"file_id": file.file_id , "project_id" : file.project_id})
        
        db.delete(file)
        db.commit()
        
        return file
    
    except S3Error as e:
        return e
    except Exception as e:
        return e


def update_file(db : Session, file_id : int , file : FileUpdate):
    existing_file = db.query(File).filter(File.file_id == file_id).first()
    if not existing_file:
        return None
    for key, value in file.dict(exclude_unset=True).items():
        setattr(existing_file, key, value)
    db.commit()
    db.refresh(existing_file)
    return existing_file
    

def validate_user_file(db: Session, user_id : int, project_id : int, file_id : int):
    result = db.query(File).\
        join(Project, File.project_id == Project.project_id).\
        join(
            ProjectMember,
            and_(
                ProjectMember.project_id == Project.project_id,
                ProjectMember.user_id == user_id
            )
        ).\
        filter(
            File.file_id == file_id,
            Project.project_id == project_id
        ).first()

    return result is not None

def get_file_metadata(pg: Session, mongo: Database,file_id: int):
    try:
        file = pg.query(File).filter(File.file_id == file_id).first()
        if not file:
            raise ValueError("Archivo no encontrado en base de datos")
        
        
        client = get_minio_client()
        bucket = get_minio_bucket()
        
        file_object = client.get_object(bucket, f"{file.project_id}/{file.file_id}/{file.file_name}")
        data = io.BytesIO(file_object.read())
        try:
            las = laspy.read(data)
        except Exception as e:
            delete_file(pg, file.file_id)
            return False

        print(las.header.point_count)
        
        vrls = las.header.parse_crs()
        
        if not vrls:
            delete_file(pg, file.file_id)
            return False

        transformer = Transformer.from_crs(vrls, "EPSG:4326", always_xy=True)
        x_max, y_max, x_min, y_min = las.header.max[0], las.header.max[1], las.header.min[0], las.header.min[1]
        lon_min, lat_min = transformer.transform(x_min, y_min)
        lon_min2, lat_max = transformer.transform(x_min, y_max)
        lon_max, lat_max2 = transformer.transform(x_max, y_max)
        lon_max2, lat_min2 = transformer.transform(x_max, y_min)
        lon_min, lat_min = transformer.transform(x_min, y_min)
        lon_max, lat_max = transformer.transform(x_max, y_max)
        
        coordinates = [
            [lat_min, lon_min],
            [lat_max, lon_min2],
            [lat_max2, lon_max],
            [lat_min2, lon_max2],
        ]

        x_mid = (x_max + x_min) / 2
        y_mid = (y_max + y_min) / 2
        lon_mid, lat_mid = transformer.transform(x_mid, y_mid)
        creation_date = datetime.combine(las.header.creation_date, datetime.min.time())
        
        header = {
            "project_id" : file.project_id,
            "file_id": file.file_id,
            "file_name": file.file_name,
            "point_count": las.header.point_count,
            "creation_date": creation_date,
            "generating_software": las.header.generating_software,
            "location": [lat_mid, lon_mid],
            "crs" : vrls.to_string(),
            "coordinates": coordinates
        }
        
        db = mongo['tree-seg']
        collection = db["metadata"]
        
        result = collection.insert_one(header)

        return True

    except Exception as e:
        delete_file(pg, file.file_id)
        return False
    
def get_metadata_by_project(client: Database, project_id: int):
    try:
        db = client['tree-seg']
        collection = db["metadata"]
        result = collection.find({"project_id": project_id})
        metadata = []
        for doc in result:
            doc["_id"] = str(doc["_id"])
            metadata.append(doc)
        return metadata
    except Exception as e:
        return str(e)

def get_metadata_by_file(mongo: Database, file_id: int):
    try:
        db = mongo["tree-seg"]
        collection = db["metadata"]
        result = collection.find_one({"file_id": file_id})
        result["_id"] = str(result["_id"])
        return result
    except Exception as e:
        return str(e)