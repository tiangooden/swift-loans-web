import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { HttpError } from '../shared/http-errors';

export const useAddReference = () => {
  const queryClient = useQueryClient();
  const { mutateAsync, isPending, error } = useMutation<any, Error, ReferenceForm>({
    mutationFn: async (formData: ReferenceForm) => {
      try {
        const res = await axios.post(`${process.env.NEXT_PUBLIC_SWIFT_LOANS_API}/api/references`, formData);
        queryClient.invalidateQueries({ queryKey: ['references'] });
        return res.data;
      } catch (e: any) {
        throw new HttpError(e.response?.status || 500, e.message, e.response?.data);
      }
    },
  });
  return { mutateAsync, isPending, error };
};