'use client';

import { notifications } from '../shared/notifications';
import SocialMediaForm from './SocialMediaForm';
import { SocialMedia } from './types';
import { useFetchSocialMedias } from './useFetchSocialMedias';
import { useSaveSocialMedia } from './useSaveSocialMedia';
import { Share2 } from 'lucide-react'; // Using Share2 icon for social media

const SocialMediasPage = () => {
  const { data: socialMedia, isFetching: fetchLoading, error: fetchError } = useFetchSocialMedias();
  const { mutateAsync, isPending: saveLoading, error: saveError } = useSaveSocialMedia();

  if (fetchLoading) {
    return <div className="flex justify-center items-center h-screen">Loading social media accounts...</div>;
  }

  async function handleSave(socialMedia: SocialMedia): Promise<void> {
    try {
      const res = mutateAsync(socialMedia);
      notifications.success(`Social media account ${socialMedia.id ? 'updated' : 'added'} successfully!`);
      return res;
    } catch (e: any) {
      notifications.error('Profile failed to update');
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <div className="flex items-center mb-6">
          <Share2 className="w-8 h-8 text-blue-600 mr-3" />
          <h1 className="text-3xl font-bold text-gray-800">Social Media</h1>
        </div>
        <SocialMediaForm socialMedia={socialMedia} onSave={handleSave} />
      </div>
    </div>
  );
};

export default SocialMediasPage;