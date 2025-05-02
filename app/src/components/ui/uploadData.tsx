import React, { useState } from 'react';
import { InboxOutlined } from '@ant-design/icons';
import { Upload } from 'antd';
import type { UploadProps } from 'antd';
import { fileServices } from '@/services/file-api';
import { useSelector } from 'react-redux';
import { selectToken } from '@/redux/slices/useSlice';
import { useParams } from 'react-router-dom';
import { UploadModalProps } from '@/interfaces/refresh';
import Swal from 'sweetalert2';
import { pipelineServices } from '@/services/pipeline-api';

const { Dragger } = Upload;

const showErrorModal = (errorMessage: string) => {
    Swal.fire({
        icon: 'error',
        title: 'Error',
        text: errorMessage,
        confirmButtonColor: '#d33',
    });
};

const UploadData: React.FC<UploadModalProps> = ({ refreshFiles }) => {

    const token = useSelector(selectToken);
    const { id } = useParams();
	const [fileId, setFileId] = useState<number>(0);

    const props: UploadProps = {
        name: 'file',
        multiple: true,
        beforeUpload : async (file) => {
            const isLt500MB = file.size < 500 * 1024 * 1024;
            const validExtensions = ['.las', '.laz'];
            const fileName = file.name.toLowerCase();
            const hasValidExtension = validExtensions.some(ext => fileName.endsWith(ext));

			const validation = await fileServices.checkFile(file.name, parseInt(id ? id : "1"), token);

            if (!isLt500MB) {
                showErrorModal('El archivo supera el límite de 500MB.');
                return false;
            }

            if (!hasValidExtension) {
                showErrorModal('Solo se permiten archivos con extensión .las o .laz.');
                return false;
            }

			if(validation.check){
				showErrorModal('Ya existe un archivo con ese nombre en el proyecto');
                return false;
			}

			const file_record  = await fileServices.createFile(id ? parseInt(id) : 1, file.name, token);

			setFileId(file_record.file_id);

            return true;
        },

        customRequest: async ({ file, onSuccess, onError }) => {
            const realFile = file as File;

            try {
                const data = await fileServices.getSignedUrl(`${id}/${fileId}/${realFile.name}`, token);
                const presignedUrl = data.signedurl;
                const uploadResponse = await fetch(presignedUrl, {
                    method: 'PUT',
                    body: realFile,
                });

                if (uploadResponse.ok) {
					const fileMetadata = await fileServices.getFileMetadata(fileId, token);
					const pipeline = await pipelineServices.executePipeline(fileId, token);

					if(fileMetadata.check && pipeline.check){
						onSuccess?.("ok");
						Swal.fire({
							icon: 'success',
							title: 'Subido exitosamente',
							text: `${realFile.name} fue subido.`,
							confirmButtonColor: '#3085d6',
						});
					}else{
						await fileServices.deleteFile(fileId, token);
						showErrorModal('El archivo no tiene las propiedades de un LAS o LAZ');
						throw new Error('Error al subir el archivo.');
					}
                } else {
					await fileServices.deleteFile(fileId, token);
					showErrorModal('El archivo no tiene las propiedades de un LAS o LAZ');
                    throw new Error('Error al subir el archivo.');
                }
            } catch (err) {
				await fileServices.deleteFile(fileId, token);
                console.error(err);
                onError?.(new Error("Error al subir a MinIO"));
                showErrorModal(`${realFile.name} falló al subir.`);
            }
			refreshFiles();
        },
    };

    return (
        <Dragger {...props}>
            <p className="ant-upload-drag-icon">
                <InboxOutlined style={{ color: '#1c1917' }} />
            </p>

            <p className="ant-upload-text">Click o arrastra archivos para subir</p>

            <p className="ant-upload-hint">
                Solo se aceptan archivos .las o .laz y menos de 500MB.
            </p>
        </Dragger>
    );
};

export default UploadData;
