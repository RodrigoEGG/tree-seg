from fastapi import APIRouter, Depends
from fastapi.responses import StreamingResponse
from pymongo.database import Database
from pymongo.errors import PyMongoError
from app.dependencies.mongo_depends import get_mongo
import pandas as pd
from io import StringIO

router = APIRouter()

@router.get("/csv/{file_id}")
def descargar_tree_data_csv(file_id: int, client : Database = Depends(get_mongo)):
    try:
        db = client["tree-seg"]
        collection = db["metadata"]
        filtro = {}
        filtro["file_id"] = file_id

        documentos = list(collection.find(filtro))
        all_trees = []

        for doc in documentos:
            file_id_val = doc.get("file_id", None)
            tree_data = doc.get("tree_data", [])

            for tree in tree_data:
                tree["file_id"] = file_id_val
                all_trees.append(tree)

        if not all_trees:
            return {"mensaje": "No se encontraron datos de árboles para el file_id dado."}

        df = pd.DataFrame(all_trees)

        csv_buffer = StringIO()
        df.to_csv(csv_buffer, index=False)
        csv_buffer.seek(0)

        return StreamingResponse(
            csv_buffer,
            media_type="text/csv",
            headers={"Content-Disposition": f"attachment; filename=tree_data_{file_id}.csv"}
        )
    except PyMongoError as e:
        return {"error": f"Error al conectar con MongoDB: {str(e)}"}
