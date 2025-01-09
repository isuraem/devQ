"use client"
import React, { useState } from 'react';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import useAuthStore from '../../../../services/utils/authStore';
import EditUserModal from '../modals/editUserModal';

interface CardProps {
  name: string;
  email: string;
  position: string;
  userID: number;
  role: number;
  refreshUser: () => void;
}

const Card: React.FC<CardProps> = ({ name, email, position, userID, role, refreshUser}) => {
  const { user } = useAuthStore();
  const user_id: any = user?.id;

  const [showModal, setShowModal] = useState(false);

  const handleEditClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <div className="border border-gray-300 rounded-lg p-5 shadow-md relative min-w-[250px]">
        <div className="flex items-center mb-2">
          <div className="bg-[#211951] text-white rounded-full h-8 w-8 flex items-center justify-center font-bold mr-2">
            {name.split(' ').map((n) => n[0]).join('')}
          </div>
          <div>
            <h3 className="text-sm font-semibold text-[#211951]">{name}</h3>
            <p className="text-xs text-[#211951]">{email}</p>
          </div>
        </div>
        <p className="text-sm font-bold text-gray-800">{position}</p>
        <div className="absolute top-1 right-1 flex space-x-2">
          {user_id !== userID && (
            <>
              <button className="text-gray-500 hover:text-blue-500 mr-2 mt-2" onClick={handleEditClick}>
                <AiOutlineEdit />
              </button>
              <button className="text-gray-500 hover:text-red-500 mr-2 mt-2">
                <AiOutlineDelete />
              </button>
            </>
          )}
        </div>
      </div>

      <EditUserModal
        show={showModal}
        onClose={handleCloseModal}
        refreshUser={refreshUser} // Implement refresh logic if needed
        user={{ name, email, position, userID, role }} // Pass user details to the modal
      />
    </>
  );
};

export default Card;




