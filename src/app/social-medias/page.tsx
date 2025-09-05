'use client';

import LoadingOverlayWrapper from 'react-loading-overlay-ts';
import { notifications } from '../lib/notifications';
import SocialMediaForm from './SocialMediaForm';
import { SocialMedia } from './types';
import { useFetchSocialMedias } from './useFetchSocialMedias';
import { useSaveSocialMedia } from './useSaveSocialMedia';
import { Share2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { validateSchema } from '../lib/validation';
import { socialMediaSchema } from './schema';
import { processValidationErrors } from '../lib/createMessageMap';
import { handleChange as handleChangeUtil } from '../lib/handleChange';

const SocialMediasPage = () => {
  const { data, isFetching } = useFetchSocialMedias();
  const [errors, setErrors] = useState<Map<string, string>>(new Map());
  const { mutateAsync, isPending } = useSaveSocialMedia();

  const [formData, setFormData] = useState<SocialMedia>({
    platform: '',
    username: '',
  });
  const handleChange = handleChangeUtil(setFormData)

  useEffect(() => {
    if (data) {
      setFormData(data);
    }
  }, [data]);

  async function handleSave(socialMedia: SocialMedia): Promise<void> {
    try {
      validateSchema(socialMedia, socialMediaSchema);
    } catch (error: any) {
      return setErrors(processValidationErrors(error.errors));
    }
    try {
      await mutateAsync(socialMedia);
      notifications.success(`Social media account ${socialMedia.id ? 'updated' : 'added'} successfully!`);
      setErrors(new Map());
    } catch (e: any) {
      const { errors: er, statusMessage } = e;
      setErrors(processValidationErrors(er));
      notifications.error(`An error occurred: ${statusMessage}`);
    }
  }

  return (
    <LoadingOverlayWrapper active={isFetching} spinner text='Loading your social media...'>
      <LoadingOverlayWrapper active={isPending} spinner text='Updating your social media...'>
        <div className="min-h-screen bg-gray-100 p-4">
          <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
            <div className="flex items-center mb-6">
              <Share2 className="w-8 h-8 text-blue-600 mr-3" />
              <h1 className="text-3xl font-bold text-gray-800">Social Media</h1>
            </div>
            <SocialMediaForm
              formData={formData}
              handleChange={handleChange}
              onSave={handleSave}
              errors={errors}
            />
          </div>
        </div>
      </LoadingOverlayWrapper>
    </LoadingOverlayWrapper>
  );
};

export default SocialMediasPage;