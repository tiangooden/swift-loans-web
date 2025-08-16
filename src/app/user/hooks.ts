import { useState, useCallback, useEffect } from 'react';
import { notifications } from '@/app/shared/notifications';
import { useSession } from 'next-auth/react';

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

export const useProfileUpdate = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateProfile = useCallback(async (formData: UserProfile) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/user`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      notifications.success('Profile updated successfully!');
      return true;
    } catch (e: any) {
      notifications.error('An error occurred while updating profile.');
      setError(e.message);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  return { updateProfile, loading, error };
};

export const useFetchUserProfile = () => {
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

  return { userProfile, loading, error };
};