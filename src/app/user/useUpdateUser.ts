import { useState } from 'react';
import { notifications } from '@/app/shared/notifications';
import { User } from './types';

export function useUpdateUser(onSuccess?: () => void) {
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