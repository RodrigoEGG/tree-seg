import React, { useState, useEffect } from 'react';
import { projectServices } from '@/services/project-api';
import { Modal } from 'antd';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ProjectRecord } from "@/interfaces/project-record";
import { selectToken } from '@/redux/slices/useSlice';
import { useSelector } from 'react-redux';

interface EditProjectModalProps {
    projectId: number;
    onProjectUpdated?: () => void;
}

const EditProjectModal: React.FC<EditProjectModalProps> = ({ projectId, onProjectUpdated }) => {

    const token = useSelector(selectToken)

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [project, setProject] = useState<ProjectRecord | null>(null);

    // Form state
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [error, setError] = useState<string | null>(null);

    // Fetch project data when modal is opened
    const fetchProjectData = async () => {
        try {
            setIsLoading(true);
            setError(null);
            const projectData = await projectServices.getProject(projectId, token);
            setProject(projectData);

            // Set form fields with project data
            setName(projectData.name || '');
            setDescription(projectData.description || '');

            // Format date for date input (YYYY-MM-DD)
            if (projectData.date) {
                const dateObj = new Date(projectData.date);
                const formattedDate = dateObj.toISOString().split('T')[0];
                setDate(formattedDate);
            }
        } catch (err) {
            console.error('Error fetching project:', err);
            setError(err instanceof Error ? err.message : 'Failed to load project data');
        } finally {
            setIsLoading(false);
        }
    };

    const showModal = () => {
        setIsModalOpen(true);
        fetchProjectData();
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setError(null);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setIsLoading(true);
            setError(null);

            await projectServices.updateProject(projectId, {
                    name,
                    description,
                }, token
            );

            // Call the callback if provided
            if (onProjectUpdated) {
                onProjectUpdated();
            }

            setIsModalOpen(false);
        } catch (err) {
            console.error("Error updating project:", err);
            setError(err instanceof Error ? err.message : "Failed to update project");
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async () => {
        if (!window.confirm('Are you sure you want to delete this project?')) {
            return;
        }

        try {
            setIsLoading(true);
            setError(null);
            await projectServices.deleteProject(projectId, token);

            // Call the callback if provided
            if (onProjectUpdated) {
                onProjectUpdated();
            }

            setIsModalOpen(false);
        } catch (err) {
            console.error('Error deleting project:', err);
            setError(err instanceof Error ? err.message : 'Failed to delete project');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <Button variant="secondary" onClick={showModal} size="sm">
                Edit
            </Button>
            <Modal
                title="Edit Project Details"
                open={isModalOpen}
                onCancel={handleCancel}
                footer={null}
                confirmLoading={isLoading}
            >
                {isLoading && !project ? (
                    <div className="py-8 text-center">Loading project data...</div>
                ) : error && !project ? (
                    <div className="py-4 text-red-500">{error}</div>
                ) : (
                    <form className='flex flex-col gap-6' onSubmit={handleSubmit}>
                        {error && <div className="text-red-500">{error}</div>}

                        <fieldset className="space-y-4" disabled={isLoading}>
                            <div className="form-group space-y-2">
                                <Label htmlFor="project-name">Project Name:</Label>
                                <Input
                                    type="text"
                                    id="project-name"
                                    placeholder="Name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group space-y-2">
                                <Label htmlFor="project-description">Project Description:</Label>
                                <Textarea
                                    id="project-description"
                                    placeholder="Description"
                                    rows={4}
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </div>
                            <div className="form-group space-y-2">
                                <Label htmlFor="project-date">Project Date:</Label>
                                <Input
                                    type="date"
                                    id="project-date"
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                    disabled
                                />
                                <p className="text-sm text-gray-500">Date cannot be changed</p>
                            </div>
                        </fieldset>

                        <div className="flex justify-between mt-4">
                            <Button
                                variant="secondary"
                                size="sm"
                                onClick={handleDelete}
                                type="button"
                            >
                                Delete
                            </Button>
                            <div className="space-x-2">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={handleCancel}
                                    disabled={isLoading}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    disabled={isLoading}
                                >
                                    {isLoading ? 'Saving...' : 'Save Changes'}
                                </Button>
                            </div>
                        </div>
                    </form>
                )}
            </Modal>
        </>
    );
};

export default EditProjectModal;