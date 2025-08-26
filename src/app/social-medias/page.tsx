'use client';

import SocialMediaForm from './SocialMediaForm';
import { useFetchSocialMedias } from './useFetchSocialMedias';
import { useSaveSocialMedia } from './useSaveSocialMedia';
import { Share2 } from 'lucide-react'; // Using Share2 icon for social media

const SocialMediasPage = () => {
  const { data: socialMedia, isFetching: fetchLoading, error: fetchError } = useFetchSocialMedias();
  const { mutateAsync, isPending: saveLoading, error: saveError } = useSaveSocialMedia();

  if (fetchLoading) {
    return <div className="flex justify-center items-center h-screen">Loading social media accounts...</div>;
  }

  if (saveLoading) {
    return <div className="flex justify-center items-center h-screen">Saving social media accounts...</div>;
  }

  if (fetchError || saveError) {
    return <div className="flex justify-center items-center h-screen text-red-500">Error: {fetchError?.message || saveError?.message}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <div className="flex items-center mb-6">
          <Share2 className="w-8 h-8 text-blue-600 mr-3" />
          <h1 className="text-3xl font-bold text-gray-800">Social Media</h1>
        </div>
        <SocialMediaForm socialMedia={socialMedia} onSave={mutateAsync} />
      </div>
    </div>
  );
};

export default SocialMediasPage;