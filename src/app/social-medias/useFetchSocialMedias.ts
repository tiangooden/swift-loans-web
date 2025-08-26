import { useQuery } from '@tanstack/react-query';
import { SocialMedia } from './types';
import axios from 'axios';

export const useFetchSocialMedias = () => {
  const { data, isFetching, error, refetch } = useQuery<SocialMedia | null> ({
    queryKey: [useFetchSocialMediasKey],
    queryFn: async () => {
      return axios.get(`${process.env.NEXT_PUBLIC_SWIFT_LOANS_API}/api/social-medias`).then(res => res.data);
    },
  });

  return { data, isFetching, error, refetch };
};

export const useFetchSocialMediasKey = 'socialMedia';