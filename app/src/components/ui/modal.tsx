import React, { useState } from 'react';
import { Modal } from 'antd';
import { Button } from "@/components/ui/button"
import UploadData from './uploadData';

const UploadDataModal: React.FC = () => {
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
      <Button variant="link" className="text-muted-foreground" onClick={showModal}>
        Upload Data
      </Button>
      <Modal title="Upload your Files" 
      open={isModalOpen} 
      onCancel={handleCancel}
      footer={false}>
        <UploadData />
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
          <Button onClick={handleOk}>Upload</Button>
        </div>
      </Modal>
    </>
  );
};

export default UploadDataModal;