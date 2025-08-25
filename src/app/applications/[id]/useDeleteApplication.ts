import { notifications } from '@/app/shared/notifications';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useFetchApplicationsKey } from '../useFetchApplications';

export function useDeleteApplication() {
  const queryClient = useQueryClient();
  const { mutateAsync, isPending, error } = useMutation({
    mutationFn: async (key: string) => {
      return axios.delete(`${process.env.NEXT_PUBLIC_SWIFT_LOANS_API}/api/applications/${key}`).then(res => res.data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [useFetchApplicationsKey] });
      notifications.success('Loan application deleted successfully!');
    },
    onError: (err: any) => {
      notifications.error(err.message);
    },
  });

  return { mutateAsync, isPending, error };
}