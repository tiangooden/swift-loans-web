import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { notifications } from '@/app/shared/notifications';

export const useDeleteReference = () => {
  const queryClient = useQueryClient();
  const { mutateAsync, isPending, error } = useMutation<any, Error, string>({
    mutationFn: async (id: string) => {
      return axios.delete(`${process.env.NEXT_PUBLIC_SWIFT_LOANS_API}/api/references/${id}`).then(res => res.data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['references'] });
      notifications.success('Reference deleted successfully!');
    },
    onError: () => {
      notifications.error('An error occurred while deleting the reference.');
    },
  });
  return { mutateAsync, isPending, error };
};