import React, { useState } from 'react';
import { Modal } from 'antd';
import { Button } from "@/components/ui/button"

const EditProjectModal: React.FC = () => {
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

    const handleDelete = () => {
        // Handle delete logic here
        console.log('Delete project');
        setIsModalOpen(false);
    };

    return (
        <>
            <Button variant="secondary" onClick={showModal}>
                Edit
            </Button>
            <Modal title="Edit Project Details" 
                open={isModalOpen}
                onCancel={handleCancel}
                footer={false}>
                
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
                    <Button variant="secondary" onClick={handleDelete} style={{ marginRight: '1rem' }}>
                        Delete Project
                    </Button>
                    <Button onClick={handleOk}>Make Changes</Button>
                </div>
            </Modal>
        </>
    );
};

export default EditProjectModal;