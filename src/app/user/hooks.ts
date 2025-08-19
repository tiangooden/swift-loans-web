import { useState, useEffect, useCallback } from 'react';
import { notifications } from '@/app/shared/notifications';

export interface User {
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

export const useFetchUserProfile = () => {
  const [userProfile, setUserProfile] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SWIFT_LOANS_API}/api/user`);
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
  };

  return { userProfile, loading, error, fetchUserProfile };
};

export function useProfileUpdate(onSuccess?: () => void) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateProfile = async (formData: User) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SWIFT_LOANS_API}/api/user`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error(`Failed to update profile: ${response.statusText}`);
      }
      notifications.success('Profile updated successfully!');
      if (onSuccess) {
        onSuccess();
      }
      return true;
    } catch (e: any) {
      notifications.error('An error occurred while updating profile.');
      setError(e.message);
      return false;
    } finally {
      setLoading(false);
    }
  };
  return { updateProfile, loading, error };
};