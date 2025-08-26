import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { notifications } from '@/app/shared/notifications';

interface ReferenceForm {
  name: string;
  email?: string;
  phone: string;
  relationship: string;
}

export const useAddReference = () => {
  const queryClient = useQueryClient();
  const { mutateAsync, isPending, error } = useMutation<any, Error, ReferenceForm>({
    mutationFn: async (formData: ReferenceForm) => {
      return axios.post(`${process.env.NEXT_PUBLIC_SWIFT_LOANS_API}/api/references`, formData).then(res => res.data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['references'] });
      notifications.success('Reference added successfully!');
    },
    onError: () => {
      notifications.error('An error occurred while adding the reference.');
    },
  });
  return { mutateAsync, isPending, error };
};