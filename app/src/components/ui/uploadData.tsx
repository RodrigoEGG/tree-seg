import React from 'react';
import { InboxOutlined } from '@ant-design/icons';
import { Upload, message } from 'antd';
import type { UploadProps } from 'antd';
import { fileServices } from '@/services/file-api';
import { useSelector } from 'react-redux';
import { selectToken } from '@/redux/slices/useSlice';
import { useParams } from 'react-router-dom';

const { Dragger } = Upload;

const UploadData: React.FC = () => {

    const token = useSelector(selectToken)

    const {id} = useParams();

    const props: UploadProps = {
        name: 'file',
        multiple: false,
        beforeUpload(file) {
            const isLt500MB = file.size < 500 * 1024 * 1024;
            const validExtensions = ['.las', '.laz'];
            const fileName = file.name.toLowerCase();
            const hasValidExtension = validExtensions.some(ext => fileName.endsWith(ext));

            if (!isLt500MB) {
                message.error(`Max 500MB.`);
                return false;
            }

            if (!hasValidExtension) {
                message.error(`Solo .las o .laz).`);
                return false;
            }

            return true;
        },
        customRequest: async ({ file, onSuccess, onError }) => {

            const realFile = file as File;

            try {

                const data = await fileServices.getSignedUrl(`${realFile.name}`, token);
                const presignedUrl = data.signedurl;

                const uploadResponse = await fetch(presignedUrl, {
                    method: 'PUT',
                    body: realFile,
                });

                if (uploadResponse.ok) {
                    onSuccess?.("ok");
                    message.success(`Subido exitosamente`);
                } else {
                    throw new Error("Error");
                }

                void fileServices.createFile(id ? parseInt(id) : 1 , realFile.name, token);
        
            } catch (err) {
                console.error(err);
                onError?.(new Error("Error al subir a MinIO"));
                message.error(`Falló la subida`);
            }
        },

        onDrop(e) {
            console.log('Archivos soltados:', e.dataTransfer.files);
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
