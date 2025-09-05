import { notifications } from '@/app/lib/notifications';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useFetchApplicationsKey } from '../useFetchApplications';
import { HttpError } from '@/app/lib/httpErrors';

export function useDeleteApplication() {
  const queryClient = useQueryClient();
  const { mutateAsync, isPending, error } = useMutation({
    mutationFn: async (key: string) => {
      try {
        const res = await axios.delete(`${process.env.NEXT_PUBLIC_SWIFT_LOANS_API}/api/applications/${key}`);
        queryClient.invalidateQueries({ queryKey: [useFetchApplicationsKey] });
        return res.data;
      } catch (e: any) {
        throw new HttpError(e.response?.status || 500, e.message, e.response?.data);
      }
    },
  });

  return { mutateAsync, isPending, error };
}