import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { notifications } from '../lib/notifications';
import { HttpError } from '../lib/httpErrors';

interface UpdateReferencePayload {
  id: string;
  name: string;
  email?: string;
  phone: string;
  relationship: string;
}

export const useUpdateReference = () => {
  const queryClient = useQueryClient();
  const { mutateAsync, isPending, error } = useMutation({
    mutationFn: async (payload: UpdateReferencePayload) => {
      const { id } = payload;
      try {
        const res = await axios.put(`/api/references/${id}`, payload);
        queryClient.invalidateQueries({ queryKey: ['references'] });
        return res.data;
      } catch (e: any) {
        throw new HttpError(e.response?.status || 500, e.message, e.response?.data);
      }
    },
  });
  return { mutateAsync, isPending, error };
};