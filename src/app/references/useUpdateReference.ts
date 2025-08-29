import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { notifications } from '../shared/notifications';
import { HttpError } from '../shared/http-errors';

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
      const { id, ...data } = payload;
      try {
        const res = await axios.put(`/api/references/${id}`, data);
        queryClient.invalidateQueries({ queryKey: ['references'] });
        return res.data;
      } catch (e: any) {
        throw new HttpError(e.response?.status || 500, e.response?.data);
      }
    },
  });
  return { mutateAsync, isPending, error };
};