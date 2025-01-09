import React from 'react';

interface ConfirmationModalProps {
  isVisible: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ isVisible, onConfirm, onCancel }) => {
    if (!isVisible) return null;
  
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-6 rounded shadow-lg">
          <p>Are you sure you want to delete this answer?</p>
          <div className="mt-4 flex justify-between">
            <button className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-400" onClick={onConfirm}>
              Confirm
            </button>
            <button className="bg-gray-300 text-black py-2 px-4 rounded ml-2 hover:bg-gray-200" onClick={onCancel}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  export default ConfirmationModal;