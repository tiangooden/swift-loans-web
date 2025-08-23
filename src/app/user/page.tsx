'use client';

import { useFetchUser } from './useFetchUser';
import { useUpdateUser } from './useUpdateUser';
import UserForm from './UserForm';
import { User } from 'lucide-react';

export default function UserProfilePage() {
    const { userProfile, loading, error, fetchUser: fetchUserProfile } = useFetchUser();
    const { updateProfile, loading: saving, error: saveError } = useUpdateUser(fetchUserProfile);

    if (loading) {
        return <div className="flex justify-center items-center h-screen">Loading profile...</div>;
    }

    if (saving) {
        return <div className="flex justify-center items-center h-screen">Saving profile...</div>;
    }

    if (error || saveError) {
        return <div className="flex justify-center items-center h-screen text-red-500">Error: {error || saveError}</div>;
    }

    return (
        <div className="min-h-screen bg-gray-100 p-4">
            <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
                <div className="flex items-center mb-6">
                    <User className="w-8 h-8 text-blue-600 mr-3" />
                    <h1 className="text-3xl font-bold text-gray-800">User Profile</h1>
                </div>
                <UserForm data={userProfile} onSave={updateProfile} />
            </div>
        </div>
    );
};