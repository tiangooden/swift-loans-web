import { useMutation, useQueryClient } from '@tanstack/react-query';
import { notifications } from '@/app/lib/notifications';
import { SocialMedia } from './types';
import axios from 'axios';
import { useFetchSocialMediasKey } from './useFetchSocialMedias';
import { HttpError } from '../lib/http-errors';

export const useSaveSocialMedia = () => {
  const queryClient = useQueryClient();
  const { mutateAsync, isPending, error } = useMutation<any, Error, SocialMedia>({
    mutationFn: async (socialMedia: SocialMedia) => {
      try {
        const url = socialMedia.id ?
          `${process.env.NEXT_PUBLIC_SWIFT_LOANS_API}/api/social-medias/${socialMedia.id}` :
          `${process.env.NEXT_PUBLIC_SWIFT_LOANS_API}/api/social-medias`;
        const res = socialMedia.id ?
          await axios.put(url, socialMedia) :
          await axios.post(url, socialMedia);
        queryClient.invalidateQueries({ queryKey: [useFetchSocialMediasKey] });
        return res.data;
      } catch (e: any) {
        throw new HttpError(e.response?.status || 500, e.message, e.response?.data);
      }
    },
  });

  return { mutateAsync, isPending, error };
};