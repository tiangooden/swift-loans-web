'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import ProfileForm from './ProfileForm';

interface UserProfile {
    id: number;
    identity: string;
    email?: string;
    first_name?: string;
    middle_name?: string;
    last_name?: string;
    dob?: string;
    phone_number?: string;
    trn?: string;
    street_address?: string;
    city?: string;
    country?: string;
    status?: string;
}

const ProfilePage = () => {
    const { data: session, status } = useSession();
    const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUserProfile = async () => {
            if (status === 'authenticated' && session?.user?.email) {
                try {
                    const response = await fetch(`/api/user`);
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    const data = await response.json();
                    setUserProfile(data);
                } catch (e: any) {
                    setError(e.message);
                } finally {
                    setLoading(false);
                }
            } else if (status === 'unauthenticated') {
                setLoading(false);
                setError('You must be logged in to view this page.');
            }
        };

        fetchUserProfile();
    }, [session, status]);

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