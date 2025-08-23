import { useState } from 'react';
import { notifications } from '@/app/shared/notifications';
import { User } from './types';
import axios from 'axios';

export function useUpdateUser(onSuccess?: () => void) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateProfile = async (formData: User) => {
    setLoading(true);
    setError(null);
    try {
      await axios.put(`${process.env.NEXT_PUBLIC_SWIFT_LOANS_API}/api/user`, formData);
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