import React from 'react';
import { InboxOutlined } from '@ant-design/icons';
import { Upload, message } from 'antd';
import type { UploadProps } from 'antd';

const { Dragger } = Upload;

const UploadData: React.FC = () => {

    const props: UploadProps = {

        name: 'file',
        multiple: true,
        beforeUpload(file) {

            const isLt500MB = file.size < 500 * 1024 * 1024;
            const validExtensions = ['.las', '.laz'];
            const fileName = file.name.toLowerCase();
            const hasValidExtension = validExtensions.some(ext => fileName.endsWith(ext));

            if (!isLt500MB) {
                message.error(`Max 500MB`);
                return true;
            }

            if (!hasValidExtension) {
                message.error(`Only .las o .laz`);
                return true;
            }

            return true;

        },
        customRequest: async ({ file, onSuccess, onError }) => {

            console.log(file)
            onSuccess?.("ok");

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
