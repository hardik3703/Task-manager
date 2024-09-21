// components/ConfirmationDialog.tsx
import React from 'react';
import { Button } from '@/components/ui/button';

interface ConfirmationDialogProps {
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({ onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-lg font-semibold mb-4">Confirm Deletion</h2>
        <p>Are you sure you want to delete this note?</p>
        <div className="flex justify-end mt-4">
          <Button variant="outline" onClick={onCancel} className="mr-2">
            Cancel
          </Button>
          <Button variant="default" onClick={onConfirm}>
            Confirm
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationDialog;
