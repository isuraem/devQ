"use client";
import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import useAuthStore from '../../../../services/utils/authStore';
import { changeUserRoleByEmail } from '../../../../services/authServices/authService';
import { updateUser } from '../../../../services/authServices/localAuthService';

interface ModalProps {
    show: boolean;
    onClose: () => void;
    refreshUser: () => void;
    user: { name: string; email: string; position: string; userID: number, role: number };
}

type OptionType = {
    value: string;
    label: string;
};

type FormData = {
    email: string;
    position: OptionType | null;
    role: OptionType | null;
};

const animatedComponents = makeAnimated();

const positionOptions: OptionType[] = [
    { value: 'Developer', label: 'Developer' },
    { value: 'Senior Developer', label: 'Senior Developer' },
    { value: 'Software Engineer', label: 'Software Engineer' },
    { value: 'Frontend Developer', label: 'Frontend Developer' },
    { value: 'Backend Developer', label: 'Backend Developer' },
    { value: 'Full Stack Developer', label: 'Full Stack Developer' },
    { value: 'UI/UX Designer', label: 'UI/UX Designer' },
    { value: 'Product Manager', label: 'Product Manager' },
    { value: 'Project Manager', label: 'Project Manager' },
    { value: 'Quality Assurance Engineer', label: 'Quality Assurance Engineer' },
    { value: 'Data Scientist', label: 'Data Scientist' },
    { value: 'Database Administrator', label: 'Database Administrator' },
    { value: 'System Administrator', label: 'System Administrator' },
    { value: 'Network Engineer', label: 'Network Engineer' },
    { value: 'DevOps Engineer', label: 'DevOps Engineer' },
    { value: 'Cybersecurity Analyst', label: 'Cybersecurity Analyst' }
];

const roleOptions: OptionType[] = [
    { value: 'Admin', label: 'Admin' },
    { value: 'Recruiter', label: 'Recruiter' }
];

const validationSchema = yup.object().shape({
    email: yup.string().email('Invalid email format').required('Email is required'),
    position: yup.object().shape({
        value: yup.string().required('Position is required'),
        label: yup.string().required('Position is required')
    }).nullable().required('Position is required'),
    role: yup.object().shape({
        value: yup.string().required('Role is required'),
        label: yup.string().required('Role is required')
    }).nullable().required('Role is required')
});

const EditUserModal: React.FC<ModalProps> = ({ show, onClose, refreshUser, user }) => {
    const { control, handleSubmit, formState: { errors }, reset, setValue } = useForm({
        resolver: yupResolver(validationSchema)
    });

    useEffect(() => {
        if (user) {
            console.log("data", user.role)
            setValue('email', user.email);
            const foundPosition: any = positionOptions.find(option => option.value === user.position) ?? null;
            const foundRole: any = roleOptions.find(option => option.value === (user.role == 0 ? 'Admin' : 'Recruiter')) ?? null;
            setValue('position', foundPosition);
            setValue('role', foundRole);
        }
    }, [user, setValue]);

    const onSubmit = async (data: any) => {
        try {
            console.log("value of role", data.role.value)
            const updatedUser = {
                email: data.email,
                position: data.position.value,
                role: data.role.value === 'Admin' ? 0 : 1
            };
            let roleId: any;
            if (data.role.value === 'Admin') {
                roleId = process.env.NEXT_PUBLIC_ADMIN_ROLE_ID;
            }
            else {
                roleId = process.env.NEXT_PUBLIC_RECRUITER_ROLE_ID;
            }

            const response = await changeUserRoleByEmail(updatedUser.email, roleId);

            if (response) {
                // Update user details in your database
                console.log("data in id", user.userID)
                console.log("data in id", updatedUser.role)
                console.log("data in id", updatedUser.position)
                let result = await updateUser(user.userID, { role: updatedUser.role, position: updatedUser.position });
                if (result) {
                    reset({ email: '', position: null, role: null } as any);
                    onClose();
                    refreshUser();
                }

            }
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    const handleClose = () => {
        reset({ email: '', position: null, role: null } as any);
        onClose();
    };

    if (!show) {
        return null;
    }

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white rounded-lg w-96 p-6 shadow-lg relative">
                <button
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
                    onClick={handleClose}
                >
                    &times;
                </button>
                <h2 className="text-2xl font-semibold text-center mb-4">Edit User</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Email address</label>
                        <Controller
                            name="email"
                            control={control}
                            render={({ field }) => (
                                <input
                                    type="text"
                                    placeholder="Enter email address"
                                    className="border border-gray-300 rounded-[8px] py-2 px-4 w-full"
                                    {...field}
                                />
                            )}
                        />
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Position</label>
                        <Controller
                            name="position"
                            control={control}
                            render={({ field }) => (
                                <Select
                                    components={animatedComponents}
                                    options={positionOptions}
                                    placeholder="Select a position"
                                    className="mb-4"
                                    {...field}
                                />
                            )}
                        />
                        {errors.position && <p className="text-red-500 text-sm mt-1">{errors.position?.value?.message}</p>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Role</label>
                        <Controller
                            name="role"
                            control={control}
                            render={({ field }) => (
                                <Select
                                    components={animatedComponents}
                                    options={roleOptions}
                                    placeholder="Select a role"
                                    className="mb-4"
                                    {...field}
                                />
                            )}
                        />
                        {errors.role && <p className="text-red-500 text-sm mt-1">{errors.role?.value?.message}</p>}
                    </div>
                    <button className="bg-purple-600 text-white py-2 px-4 rounded-[8px] w-full hover:bg-purple-700" type="submit">
                        Save Changes
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EditUserModal;
