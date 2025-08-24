import { LoanApplication } from './types';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

export function useFetchApplicationReview(id?: string) {
  const { data, isPending, error } = useQuery<LoanApplication, Error>({
    queryKey: [useFetchApplicationReviewsKey, id],
    queryFn: async () => {
      return axios.get(`${process.env.NEXT_PUBLIC_SWIFT_LOANS_API}/api/applications/${id}/review`).then(res => res.data);
    },
  });

  return { data, isPending, error };
}

export const useFetchApplicationReviewsKey = 'applicationReview';
