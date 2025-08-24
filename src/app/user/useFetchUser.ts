import { useQuery } from '@tanstack/react-query';
import { User } from './types';
import axios from 'axios';

export const useFetchUser = () => {
  const { data, isFetching, error, refetch } = useQuery<User | null>({
    queryKey: [useFetchUserKey],
    queryFn: async () => {
      return axios.get(`${process.env.NEXT_PUBLIC_SWIFT_LOANS_API}/api/users`).then(res => res.data);
    },
  });

  return { data, isFetching, error, refetch };
};

export const useFetchUserKey = 'userProfile';