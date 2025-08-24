'use client';

import { useFetchUser } from './useFetchUser';
import { useUpdateUser } from './useUpdateUser';
import UserForm from './UserForm';
import { User } from 'lucide-react';

export default function UserProfilePage() {
    const { data, isFetching, error: fetchError } = useFetchUser();
    const { mutateAsync, isPending, error: saveError } = useUpdateUser();

    if (isFetching) {
        return <div className="flex justify-center items-center h-screen">Loading profile...</div>;
    }

    if (isPending) {
        return <div className="flex justify-center items-center h-screen">Saving profile...</div>;
    }

    if (fetchError || saveError) {
        return (
            <div className="flex justify-center items-center h-screen text-red-500">
                Error: {fetchError?.message || saveError?.message}
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 p-4">
            <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
                <div className="flex items-center mb-6">
                    <User className="w-8 h-8 text-blue-600 mr-3" />
                    <h1 className="text-3xl font-bold text-gray-800">User Profile</h1>
                </div>
                <UserForm data={data} onSave={mutateAsync} />
            </div>
        </div>
    );
};