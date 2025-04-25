import React, { useState, useEffect } from 'react';
import { Modal } from 'antd';
import { Button } from "@/components/ui/button"
import { selectToken } from '@/redux/slices/useSlice';
import { useSelector } from 'react-redux';
import { fileServices } from '@/services/file-api';
import { BellIcon } from 'lucide-react';
import { DropdownMenuItem } from './ui/dropdown-menu';

interface DeleteFileProps {
    fileId: number;
    refreshFiles : () => void;
}

const DeleteFileModal: React.FC<DeleteFileProps> = ({ fileId, refreshFiles}) => {

    const token = useSelector(selectToken)

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);


    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setError(null);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
    };

    const handleDelete = async () => {
        if (!window.confirm('Are you sure you want to delete this project?')) {
            return;
        }

        try {
            setIsLoading(true);
            setError(null);
			await fileServices.deleteFile(fileId, token);
            setIsModalOpen(false);
            refreshFiles();
        } catch (err) {
            console.error('Error deleting project:', err);
            setError(err instanceof Error ? err.message : 'Failed to delete project');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <DropdownMenuItem className="hover:bg-gray-500 hover:text-black"  onSelect={(e) => {
                e.preventDefault();
                showModal();
            }}>
                <BellIcon />
				Delete
            </DropdownMenuItem>
            <Modal
                title="Delet File"
                open={isModalOpen}
                onCancel={handleCancel}
                footer={null}
                confirmLoading={isLoading}
            >
                { error ? (
                    <div className="py-4 text-red-500">{error}</div>
                ) : (
                    <form className='flex flex-col gap-6' onSubmit={handleSubmit}>
                        {error && <div className="text-red-500">{error}</div>}

                        <div className="flex justify-between mt-4">
                            <Button
								variant="outline"
                                size="sm"
                                onClick={handleDelete}
                                type="button"
                            >
                                Delete
                            </Button>
                            <div className="space-x-2">
                                <Button
                                    type="button"
                                    onClick={handleCancel}
                                    disabled={isLoading}
                                >
                                    Cancel
                                </Button>
                            </div>
                        </div>
                    </form>
                )}
            </Modal>
        </>
    );
};

export default DeleteFileModal;