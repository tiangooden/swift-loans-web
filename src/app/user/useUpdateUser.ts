import { useMutation, useQueryClient } from '@tanstack/react-query';
import { User } from './types';
import axios from 'axios';
import { useFetchUserKey } from './useFetchUser';
import { HttpError } from '../shared/http-errors';

export function useUpdateUser() {
  const queryClient = useQueryClient();
  const { mutateAsync, isPending, error } = useMutation<any, Error, User>({
    mutationFn: async (formData: User) => {
      try {
        const res = await axios.put(`${process.env.NEXT_PUBLIC_SWIFT_LOANS_API}/api/users`, formData);
        queryClient.invalidateQueries({ queryKey: [useFetchUserKey] });
        return res.data;
      } catch (e: any) {
        throw new HttpError(e.response?.status || 500, e.message, e.response?.data);
      }
    },
  });
  return { mutateAsync, isPending, error };
};