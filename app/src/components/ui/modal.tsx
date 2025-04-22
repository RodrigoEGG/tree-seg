import React, { useState } from 'react';
import { Modal } from 'antd';
import { Button } from "@/components/ui/button"
import UploadData from './uploadData';
import { PlusCircle } from 'lucide-react';
import { UploadModalProps } from '@/interfaces/refresh';




const UploadDataModal: React.FC<UploadModalProps> = ( upload ) => {

    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (

        <>

            <Button size="sm" className="h-8 gap-1 ml-auto" onClick={showModal}>

                <PlusCircle className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Add file
                </span>

            </Button>

            <Modal title="Upload your Files" 
                open={isModalOpen} 
                onCancel={handleCancel}
                footer={false}
            >

                <UploadData {...upload} />

                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
                    <Button onClick={handleOk}>Upload</Button>
                </div>
            </Modal>


        </>

    );
};

export default UploadDataModal;