'use client';

import { useFetchUser } from './useFetchUser';
import { useUpdateUser } from './useUpdateUser';
import UserForm from './UserForm';
import { notifications } from '../shared/notifications';
import { User } from 'lucide-react';
import { User as UserType } from './types';
import LoadingOverlayWrapper from 'react-loading-overlay-ts';

export default function UserProfilePage() {
    const { data, isFetching } = useFetchUser();
    const { mutateAsync, isPending } = useUpdateUser();

    async function handleSave(user: UserType): Promise<void> {
        try {
            const res = await mutateAsync(user);
            notifications.success('Profile updated successfully!');
            return res;
        } catch (e: any) {
            notifications.error('Profile failed to update');
        }
    }

    return (
        <LoadingOverlayWrapper active={isFetching} spinner text='Loading your profile...'>
            <LoadingOverlayWrapper active={isPending} spinner text='Updaing your profile...'>
                <div className="min-h-screen bg-gray-100 p-4">
                    <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
                        <div className="flex items-center mb-6">
                            <User className="w-8 h-8 text-blue-600 mr-3" />
                            <h1 className="text-3xl font-bold text-gray-800">User Profile</h1>
                        </div>
                        <UserForm data={data} onSave={handleSave} />
                    </div>
                </div>
            </LoadingOverlayWrapper>
        </LoadingOverlayWrapper>
    );
};