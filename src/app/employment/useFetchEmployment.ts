import { Employment } from './types';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

export function useFetchEmployment() {
    const { data, isFetching, error, refetch } = useQuery<Employment, Error>({
        queryKey: [useFetchEmploymentKey],
        queryFn: async () => {
            return axios.get(`${process.env.NEXT_PUBLIC_SWIFT_LOANS_API}/api/employment`).then(res => res.data);
        },
    });

    return { data, isFetching, error, refetch };
}

export const useFetchEmploymentKey = 'employment';