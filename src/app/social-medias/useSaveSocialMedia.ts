import { useMutation, useQueryClient } from '@tanstack/react-query';
import { notifications } from '@/app/shared/notifications';
import { SocialMedia } from './types';
import axios from 'axios';
import { useFetchSocialMediasKey } from './useFetchSocialMedias';

export const useSaveSocialMedia = () => {
  const queryClient = useQueryClient();
  const { mutateAsync, isPending, error } = useMutation<any, Error, SocialMedia>({
    mutationFn: async (socialMedia: SocialMedia) => {
      const url = socialMedia.id ?
        `${process.env.NEXT_PUBLIC_SWIFT_LOANS_API}/api/social-medias/${socialMedia.id}` :
        `${process.env.NEXT_PUBLIC_SWIFT_LOANS_API}/api/social-medias`;

      if (socialMedia.id) {
        return axios.put(url, socialMedia).then(res => res.data);
      } else {
        return axios.post(url, socialMedia).then(res => res.data);
      }
    },
    onSuccess: (_, socialMedia) => {
      queryClient.invalidateQueries({ queryKey: [useFetchSocialMediasKey] });
      notifications.success(`Social media account ${socialMedia.id ? 'updated' : 'added'} successfully!`);
    },
    onError: (e: any, socialMedia) => {
      notifications.error(`Failed to ${socialMedia.id ? 'update' : 'add'} social media account: ` + e.message);
    },
  });

  return { mutateAsync, isPending, error };
};