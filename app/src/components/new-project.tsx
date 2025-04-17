import React, { useState } from 'react';
import { projectServices } from '@/services/project-api';
import { Modal, message } from 'antd';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

// Dummy owner ID
const OWNER_ID = 1;

const NewProjectModal: React.FC<{ onProjectAdded: () => void }> = ({ onProjectAdded }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');

    const showModal = () => {
        setIsModalOpen(true);
    };

    const resetForm = () => {
        setName('');
        setDescription('');
        setDate('');
    };

    const handleOk = async () => {
        if (!name) {
            message.error('Project name and date are required.');
            return;
        }

        const today = new Date().toISOString().split('T')[0];

        try {
            await projectServices.createProject({
                name,
                description,
                owner_id: OWNER_ID,
                date: date || today,
            });

            message.success('Project created successfully!');
            resetForm();
            setIsModalOpen(false);
            onProjectAdded(); // Trigger refresh
        } catch (error) {
            message.error('Failed to create project.');
            console.error(error);
        }
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <Button onClick={showModal}>
                Add New Project
            </Button>
            <Modal
                title="Add Project"
                open={isModalOpen}
                onCancel={handleCancel}
                footer={false}
            >
                <form className='flex flex-col gap-6'>
                    <fieldset className="space-y-4">
                        <div className="form-group space-y-2">
                            <Label htmlFor="project-name">Project Name:</Label>
                            <Input
                                type="text"
                                id="project-name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Name"
                            />
                        </div>
                        <div className="form-group space-y-2">
                            <Label htmlFor="project-description">Project Description:</Label>
                            <Textarea
                                id="project-description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Description"
                                rows={4}
                            />
                        </div>
                        <div className="form-group space-y-2">
                            <Label htmlFor="project-date">Project Date:</Label>
                            <Input
                                type="date"
                                id="project-date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                placeholder="Date"
                            />
                        </div>
                    </fieldset>

                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
                        <Button onClick={handleOk}>Add Project</Button>
                    </div>
                </form>
            </Modal>
        </>
    );
};

export default NewProjectModal;
