import { useMutation, useQueryClient } from '@tanstack/react-query';
import { notifications } from '../shared/notifications';
import axios from 'axios';
import { useFetchApplicationKey } from './[id]/useFetchApplication';

export function useAcceptOffer() {
  const queryClient = useQueryClient();
  const { mutateAsync, isPending, error } = useMutation({
    mutationFn: async (offerId: string) => {
      return axios.patch(`${process.env.NEXT_PUBLIC_SWIFT_LOANS_API}/api/offers/${offerId}/accept`).then(res => res.data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [useFetchApplicationKey] });
      notifications.success('Offer accepted successfully!');
    },
    onError: (err: any) => {
      notifications.error(`Error accepting offer: ${err.message}`);
    },
  });

  return { mutateAsync, isPending, error };
}