import { useQuery } from '@tanstack/react-query';
import { LoanApplication } from './types';
import axios from 'axios';

export function useFetchApplications() {
  const { data = [], isFetching, error, refetch } = useQuery<LoanApplication[]>({
    queryKey: [useFetchApplicationsKey],
    queryFn: async () => {
      return axios.get(`${process.env.NEXT_PUBLIC_SWIFT_LOANS_API}/api/applications`).then(res => res.data);
    },
  });

  return { data, isFetching, error, refetch };
}

export const useFetchApplicationsKey = 'applications';