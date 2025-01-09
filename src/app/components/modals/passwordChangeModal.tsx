"use client";
import { useState } from 'react';
import { changeUserPassword } from '../../../../services/authServices/authService';
import useAuthStore from '../../../../services/utils/authStore';
import { toast } from 'react-toastify';
import { useRouter } from "next/navigation";


interface PasswordChangeModalProps {
  isOpen: boolean;
  onClose: () => void;  // This indicates that onClose is a function that returns nothing
}

const PasswordChangeModal: React.FC<PasswordChangeModalProps> = ({ isOpen, onClose }) => {
  const [retypePassword, setRetypePassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const router = useRouter();

  const { user } = useAuthStore();
  let email : any = user?.email;
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Check if passwords match
    if (newPassword !== retypePassword) {
      setError('Passwords do not match.');
      toast.error('Passwords do not match.');
      return;  // Prevent form submission if passwords don't match
    }

    // Reset error if passwords match
    setError('');

    try {
      let response = await changeUserPassword(email, newPassword);
      if(response){
        console.log('Password changed:', { newPassword });
        toast.success('Password changed successfully.');
        onClose(); 
        handleLogout();
      }
     
    } catch (error: any) {
      setError(error.message || 'Failed to change password');
      toast.error(error.message || 'Failed to change password');
    }
  };
  const handleLogout = () => {
    useAuthStore.getState().logoutAccount();
    router.push(`/login`);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl flex flex-col justify-center ">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 justify-center">Change Password</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="p-3 mb-4 border border-gray-300 rounded w-full focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <input
            type="password"
            placeholder="Retype Password"
            value={retypePassword}
            onChange={(e) => setRetypePassword(e.target.value)}
            className="p-3 mb-6 border border-gray-300 rounded w-full focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <div className="flex justify-end space-x-4">
            <button type="button" onClick={onClose} className="px-4 py-2 text-gray-600 hover:text-gray-800 transition duration-150 ease-in-out">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition duration-150 ease-in-out">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PasswordChangeModal;

