'use client';

import ProfileForm from './UserForm';
import { useFetchUserProfile } from './hooks';

const ProfilePage = () => {
    const { userProfile, loading, error } = useFetchUserProfile();

    if (loading) {
        return <div className="flex justify-center items-center h-screen">Loading profile...</div>;
    }

    if (error) {
        return <div className="flex justify-center items-center h-screen text-red-500">Error: {error}</div>;
    }

    if (!userProfile) {
        return <div className="flex justify-center items-center h-screen">No profile data found.</div>;
    }

    return (
        <div className="min-h-screen bg-gray-100 p-4">
            <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
                <div className="flex items-center mb-6">
                    <svg className="w-8 h-8 text-blue-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                    </svg>
                    <h1 className="text-3xl font-bold text-gray-800">User Profile</h1>
                </div>
                <ProfileForm user={userProfile} />
            </div>
        </div>
    );
};

export default ProfilePage;