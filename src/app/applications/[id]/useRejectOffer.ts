import { useMutation, useQueryClient } from '@tanstack/react-query';
import { notifications } from '../../shared/notifications';
import axios from 'axios';
import { useFetchApplicationKey } from './useFetchApplication';

export function useRejectOffer() {
  const queryClient = useQueryClient();
  const { mutateAsync, isPending, error } = useMutation({
    mutationFn: async (offerId: string) => {
      return axios.patch(`${process.env.NEXT_PUBLIC_SWIFT_LOANS_API}/api/offers/${offerId}/reject`).then(res => res.data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [useFetchApplicationKey] });
      notifications.success('Offer rejected successfully!');
    },
    onError: (err: any) => {
      notifications.error(`Error rejecting offer: ${err.message}`);
    },
  });

  return { mutateAsync, isPending, error };
}