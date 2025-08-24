import { useMutation, useQueryClient } from '@tanstack/react-query';
import { notifications } from '@/app/shared/notifications';
import { User } from './types';
import axios from 'axios';
import { useFetchUserKey } from './useFetchUser';

export function useUpdateUser() {
  const queryClient = useQueryClient();
  const { mutateAsync, isPending, error } = useMutation<any, Error, User>({
    mutationFn: async (formData: User) => {
      return axios.put(`${process.env.NEXT_PUBLIC_SWIFT_LOANS_API}/api/user`, formData).then(res => res.data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [useFetchUserKey] });
      notifications.success('Profile updated successfully!');
    },
    onError: () => {
      notifications.error('An error occurred while updating profile.');
    },
  });
  return { mutateAsync, isPending, error };
};