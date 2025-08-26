import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'sonner';

interface UpdateReferencePayload {
  id: string;
  name: string;
  email?: string;
  phone: string;
  relationship: string;
}

export const useUpdateReference = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: UpdateReferencePayload) => {
      const { id, ...data } = payload;
      const response = await axios.put(`/api/references/${id}`, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['references'] });
      toast.success('Reference updated successfully!');
    },
    onError: (error) => {
      toast.error(`Failed to update reference: ${error.message}`);
    },
  });
};