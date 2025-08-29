import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { HttpError } from '../shared/http-errors';

export const useDeleteReference = () => {
  const queryClient = useQueryClient();
  const { mutateAsync, isPending, error } = useMutation<any, Error, string>({
    mutationFn: async (id: string) => {
      try {
        const res = await axios.delete(`${process.env.NEXT_PUBLIC_SWIFT_LOANS_API}/api/references/${id}`);
        queryClient.invalidateQueries({ queryKey: ['references'] });
        return res.data;
      } catch (e: any) {
        throw new HttpError(e.response?.status || 500, e.response?.data);
      }
    },
  });
  return { mutateAsync, isPending, error };
};