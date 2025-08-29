'use client';

import React, { useState, useEffect } from 'react';
import { SocialMedia } from './types';
import FormSelect from '../shared/component/FormSelect';
import FormButton from '../shared/component/FormButton';
import FormInput from '../shared/component/FormInput';

interface SocialMediaFormProps {
  socialMedia: SocialMedia | null | undefined;
  onSave: (socialMedia: SocialMedia) => Promise<void>;
}

const SocialMediaForm: React.FC<SocialMediaFormProps> = ({ socialMedia: data, onSave }) => {
  const [formData, setFormData] = useState<SocialMedia>({
    platform: '',
    username: '',
    profile_url: '',
  });

  useEffect(() => {
    if (data) {
      setFormData(data);
    }
  }, [data]);

  const handleChange = (e: React.ChangeEvent<any>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData((prevData: any) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = () => {
    onSave(formData);
  };

  return (
    <form className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <FormSelect
            label="Platform"
            id="platform"
            name="platform"
            value={formData.platform || ''}
            onChange={handleChange}
            options={[
              { value: '', label: 'Select Platform' },
              { value: 'facebook', label: 'Facebook' },
              { value: 'x', label: 'Twitter/X' },
              { value: 'instagram', label: 'Instagram' },
              { value: 'linkedIn', label: 'LinkedIn' },
              { value: 'youTube', label: 'YouTube' },
              { value: 'tikTok', label: 'TikTok' },
            ]}
            required
          />
        </div>
        <div>
          <FormInput
            label="Username"
            id="username"
            name="username"
            value={formData.username || ''}
            onChange={handleChange}
            required
          />
        </div>
      </div>
      <div className="flex justify-end">
        <FormButton
          type="button"
          onClick={handleSubmit}
        >
          Save Social Media Details
        </FormButton>
      </div>
    </form>
  );
};

export default SocialMediaForm;