import { notifications } from '@/app/shared/notifications';
import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useFetchApplicationReviewsKey } from './useFetchApplicationReview';

export const useCounterOfferApplicationReview = () => {
  const queryClient = useQueryClient();
  const { mutateAsync, isPending, error } = useMutation<boolean, Error, { id: string; data: any }>({
    mutationFn: async ({ id, data }) => {
      return axios.patch(`${process.env.NEXT_PUBLIC_SWIFT_LOANS_API}/api/applications/${id}/counter-offer`, data).then(res => res.data);
    },
    onSuccess: (_, applicationId) => {
      queryClient.invalidateQueries({ queryKey: [useFetchApplicationReviewsKey, applicationId] });
      notifications.success('Application counter-offered successfully!');
    },
    onError: (err) => {
      notifications.error(`Failed to counter offer application: ${err.message}`);
    },
  });

  return { mutateAsync, isPending, error };
};