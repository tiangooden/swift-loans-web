import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useFetchApplicationKey } from './useFetchApplication';
import { HttpError } from '@/app/lib/http-errors';

export function useAcceptOffer() {
  const queryClient = useQueryClient();
  const { mutateAsync, isPending, error } = useMutation({
    mutationFn: async (offerId: string) => {
      try {
        const res = await axios.patch(`${process.env.NEXT_PUBLIC_SWIFT_LOANS_API}/api/offers/${offerId}/accept`);
        queryClient.invalidateQueries({ queryKey: [useFetchApplicationKey] });
        return res.data;
      } catch (e: any) {
        throw new HttpError(e.response?.status || 500, e.message, e.response?.data);
      }
    },
  });

  return { mutateAsync, isPending, error };
}