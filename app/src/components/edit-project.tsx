import React, { useState } from 'react';
import { Modal } from 'antd';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

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

                <form className='flex flex-col gap-6'>
                    <fieldset>
                        <div className="form-group space-y-2">
                            <Label htmlFor="project-name">Project Name:</Label>
                            <Input type="text" id="project-name" placeholder="Name" />
                        </div>
                        <div className="form-group space-y-2">
                            <Label htmlFor="project-description">Project Description:</Label>
                            <Textarea id="project-description" placeholder="Description" rows={4} />
                        </div>
                        <div className="form-group space-y-2">
                            <Label htmlFor="project-owner">Project Owner:</Label>
                            <Textarea id="project-owner" placeholder="Owner" />
                        </div>
                        <div className="form-group space-y-2">
                            <Label htmlFor="project-date">Project Date:</Label>
                            <Input type="date" id="project-date" placeholder="Date" />
                        </div>
                    </fieldset>


                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
                    <Button variant="secondary" onClick={handleDelete} style={{ marginRight: '1rem' }}>
                        Delete Project
                    </Button>
                    <Button onClick={handleOk}>Make Changes</Button>
                </div>
            </form>
            </Modal>
        </>
    );
};

export default EditProjectModal;