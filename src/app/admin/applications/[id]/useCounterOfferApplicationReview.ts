import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useFetchApplicationReviewsKey } from './useFetchApplicationReview';
import { HttpError } from '@/app/lib/httpErrors';

export const useCounterOfferApplicationReview = () => {
  const queryClient = useQueryClient();
  const { mutateAsync, isPending, error } = useMutation<boolean, Error, { id: string | undefined; data: any }>({
    mutationFn: async ({ id, data }) => {
      try {
        const res = await axios.post(`${process.env.NEXT_PUBLIC_SWIFT_LOANS_API}/api/applications/${id}/counter-offer`, data);
        queryClient.invalidateQueries({ queryKey: [useFetchApplicationReviewsKey] });
        return res.data;
      } catch (e: any) {
        throw new HttpError(e.response?.status || 500, e.message, e.response?.data);
      }
    },
  });

  return { mutateAsync, isPending, error };
};