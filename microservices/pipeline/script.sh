#!/bin/bash

if [ "$#" -ne 3 ]; then
    echo "Uso: $0 parametro1 parametro2 parametro3 parametro4"
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

mkdir $output
mkdir $input
mkdir "/home/juan/potree/$file_id/"

python3 "$(dirname "$0")/file.py" "$project_id" "$file_id" "$file_name"

CONTAINER_NAME="test_e2e_instance"
IMAGE_NAME="nibio/e2e-instance"
POTREE_CONVERTER="/home/juan/potreeconverter/PotreeConverter"

docker rm -f $CONTAINER_NAME 2>/dev/null

docker run -it --gpus all \
    --name $CONTAINER_NAME \
    --mount type=bind,source=$input,target=/home/nibio/mutable-outside-world/bucket_in_folder \
    --mount type=bind,source=$output,target=/home/nibio/mutable-outside-world/bucket_out_folder \
    $IMAGE_NAME

docker rm $CONTAINER_NAME 2>/dev/null

zip_file="${output}results.zip"

if [ -f "$zip_file" ]; then
    unzip "$zip_file" -d "$output"
    echo "Archivo descomprimido en $output"
else
    echo "No se encontró result.zip en $output"
    exit 1
fi

seg_path="${output}home/datascience/results"


python3 "$(dirname "$0")/segmentation.py" "$project_id" "$file_id" "$file_name"

python3 "$(dirname "$0")/bucket.py" "$project_id" "$file_id" "$file_name"

$POTREE_CONVERTER "$seg_path/${base_name}_out.laz" -o "/home/juan/potree/$file_id/"

python3 "$(dirname "$0")/potree.py" "$project_id" "$file_id" "$file_name"
python3 "$(dirname "$0")/update.py" "$project_id" "$file_id" "$file_name"

deactivate

