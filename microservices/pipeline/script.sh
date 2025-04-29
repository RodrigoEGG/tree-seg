#!/bin/bash

if [ "$#" -ne 4 ]; then
    echo "Uso: $0 parametro1 parametro2 parametro3 parametro4"
    exit 1
fi

project_id=$1
file_id=$2
file_name=$3
token=$4
base_name="${file_name%.las}"

input="/home/juan/input/$file_id/"
output="/home/juan/output/$file_id/"

mkdir $output

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

$POTREE_CONVERTER "${output}home/datascience/results/${base_name}_out.laz" -o "/home/juan/potree/$file_id/"

