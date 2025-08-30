import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const useFetchReferences = () => {
  const { data = [], isFetching, error, refetch } = useQuery<Reference[]>({
    queryKey: ['references'],
    queryFn: async () => {
      return axios.get(`${process.env.NEXT_PUBLIC_SWIFT_LOANS_API}/api/references`).then(res => res.data);
    },
  });

  return { data, isFetching, error, refetch };
};