import React, { useState } from 'react';
import { projectServices } from '@/services/project-api';
import { Modal, message } from 'antd';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useSelector } from 'react-redux';
import { selectToken, selectUid } from '@/redux/slices/useSlice';

const NewProjectModal: React.FC<{ onProjectAdded: () => void }> = ({ onProjectAdded }) => {
    const uid = useSelector(selectUid);
    const token = useSelector(selectToken);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const resetForm = () => {
        setName('');
        setDescription('');
        setDate('');
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault(); // Prevent form from refreshing the page
        
        if (!name) {
            message.error('Project name is required.');
            return;
        }

        setIsSubmitting(true);
        const today = new Date().toISOString().split('T')[0];

        try {
            console.log('Creating project with:', {
                name,
                description,
                owner_id: uid,
                date: date || today
            });
            
            const data = await projectServices.createProject({
                name,
                description,
                owner_id: uid,
                date: date || today,
            }, token);

            console.log('Project created response:', data);
            message.success('Project created successfully!');
            resetForm();
            setIsModalOpen(false);
            onProjectAdded(); // Trigger refresh
        } catch (error) {
            message.error('Failed to create project.');
            console.error('Project creation error:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        resetForm();
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
                footer={null} // Use null instead of false for cleaner React code
            >
                <form onSubmit={handleSubmit} className='flex flex-col gap-6'>
                    <fieldset className="space-y-4">
                        <div className="form-group space-y-2">
                            <Label htmlFor="project-name">Project Name:</Label>
                            <Input
                                type="text"
                                id="project-name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Name"
                                required
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
                        <Button 
                            type="submit" 
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Adding...' : 'Add Project'}
                        </Button>
                    </div>
                </form>
            </Modal>
        </>
    );
};

export default NewProjectModal;