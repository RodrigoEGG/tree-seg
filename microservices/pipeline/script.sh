#!/bin/bash
set -euo pipefail
exec > >(tee -a "/tmp/pipeline_$2.log") 2>&1

if [ "$#" -ne 3 ]; then
    echo "Uso: $0 project_id file_id file_name"
    exit 1
fi

source /home/juan/tree-seg/microservices/pipeline/.venv/bin/activate

project_id=$1
file_id=$2
file_name=$3
base_name="${file_name%.las}"

export LD_LIBRARY_PATH="/home/juan/potreeconverter:$LD_LIBRARY_PATH"
POTREE_CONVERTER="/home/juan/potreeconverter/PotreeConverter"

input="/home/juan/input/$file_id/"
output="/home/juan/output/$file_id/"
mkdir -p "$input" "$output" "/home/juan/potree/$file_id/"

echo "[INFO] Ejecutando file.py..."
python3 "$(dirname "$0")/file.py" "$project_id" "$file_id" "$file_name"

CONTAINER_NAME="test_e2e_instance"
IMAGE_NAME="nibio/e2e-instance"

docker rm -f $CONTAINER_NAME 2>/dev/null || true

echo "[INFO] Ejecutando contenedor Docker..."
if ! docker run --gpus all --name "$CONTAINER_NAME" \
    --mount type=bind,source="$input",target=/home/nibio/mutable-outside-world/bucket_in_folder \
    --mount type=bind,source="$output",target=/home/nibio/mutable-outside-world/bucket_out_folder \
    "$IMAGE_NAME"; then
    echo "[ERROR] Docker run falló"
    exit 1
fi

docker rm $CONTAINER_NAME 2>/dev/null || true

zip_file="${output}results.zip"
if [ -f "$zip_file" ]; then
    unzip "$zip_file" -d "$output"
    echo "[INFO] Archivo descomprimido en $output"
else
    echo "[ERROR] No se encontró results.zip en $output"
    exit 1
fi

seg_path="${output}home/datascience/results"
if [ ! -f "$seg_path/${base_name}_out.laz" ]; then
    echo "[ERROR] Archivo LAZ no encontrado: $seg_path/${base_name}_out.laz"
    exit 1
fi

echo "[INFO] Ejecutando segmentation..."
python3 "$(dirname "$0")/segmentation.py" "$project_id" "$file_id" "$file_name"

echo "[INFO] Ejecutando bucket..."
python3 "$(dirname "$0")/bucket.py" "$project_id" "$file_id" "$file_name"

echo "[INFO] Ejecutando PotreeConverter..."
$POTREE_CONVERTER "$seg_path/${base_name}_out.laz" -o "/home/juan/potree/$file_id/"

echo "[INFO] Ejecutando potree.py..."
python3 "$(dirname "$0")/potree.py" "$project_id" "$file_id" "$file_name"

echo "[INFO] Ejecutando update.py..."
python3 "$(dirname "$0")/update.py" "$project_id" "$file_id" "$file_name"

deactivate
