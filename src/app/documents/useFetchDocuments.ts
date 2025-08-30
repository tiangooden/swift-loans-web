import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

export const useFetchFile = () => {
    const { data = [], isFetching, error } = useQuery<any[], Error>({
        queryKey: [useFetchFileKey],
        queryFn: async () => {
            return axios.get(`${process.env.NEXT_PUBLIC_SWIFT_LOANS_API}/api/files`).then(res => res.data);
        },
    });

    return { data, isFetching, error };
};

export const useFetchFileKey = 'documents';