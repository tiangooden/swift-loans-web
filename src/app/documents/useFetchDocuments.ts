import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

export const useFetchFile = () => {
    const { data = [], isPending, error, refetch } = useQuery<any[], Error>({
        queryKey: [useFetchFileKey],
        queryFn: async () => {
            return axios.get(`${process.env.NEXT_PUBLIC_SWIFT_LOANS_API}/api/file`).then(res => res.data);
        },
    });

    return { data, isPending, error, refetch };
};

export const useFetchFileKey = 'documents';