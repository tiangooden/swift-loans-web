import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useFetchApplicationsKey } from './useFetchApplications';
import { HttpError } from '../shared/http-errors';

export function useSaveApplication() {
  const queryClient = useQueryClient();
  const { mutateAsync, isPending, error } = useMutation({
    mutationFn: async ({ data, id }: { data: {}, id?: string }) => {
      const url = id ?
        `${process.env.NEXT_PUBLIC_SWIFT_LOANS_API}/api/applications/${id}` :
        `${process.env.NEXT_PUBLIC_SWIFT_LOANS_API}/api/applications`;
      try {
        const res = id ? await axios.put(url, data) : await axios.post(url, data);
        queryClient.invalidateQueries({ queryKey: [useFetchApplicationsKey] });
        return res.data;
      } catch (e: any) {
        throw new HttpError(e.response?.status || 500, e.message, e.response?.data);
      }
    },
  });

  return { mutateAsync, isPending, error };
}