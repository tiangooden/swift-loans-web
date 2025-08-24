import axios from 'axios';
import { LoanApplication } from '../types';
import { useQuery } from '@tanstack/react-query';

export function useFetchApplication(id: string) {
    const { data, isFetching, error, refetch } = useQuery<LoanApplication, Error>({
        queryKey: [useFetchApplicationKey, id],
        queryFn: async () => {
            return axios.get(`${process.env.NEXT_PUBLIC_SWIFT_LOANS_API}/api/applications/${id}`).then(res => res.data);
        },
    });

    return { data, isFetching, error, refetch };
}

export const useFetchApplicationKey = 'application';