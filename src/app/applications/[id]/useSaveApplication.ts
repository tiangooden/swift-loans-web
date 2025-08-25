import { notifications } from '@/app/shared/notifications';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useFetchApplicationsKey } from '../useFetchApplications';

export function useSaveApplication() {
  const queryClient = useQueryClient();
  const { mutateAsync, isPending, error } = useMutation({
    mutationFn: async ({ data, id }: { data: any; id?: string }) => {
      const url = id ?
        `${process.env.NEXT_PUBLIC_SWIFT_LOANS_API}/api/applications/${id}` :
        `${process.env.NEXT_PUBLIC_SWIFT_LOANS_API}/api/applications`;
      return id ? axios.put(url, data).then(res => res.data) :
        axios.post(url, data).then(res => res.data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [useFetchApplicationsKey] });
      notifications.success('Application saved successfully!');
    },
    onError: (err: any) => {
      notifications.error(`Error saving application: ${err.message}`);
    },
  });

  return { mutateAsync, isPending, error };
}