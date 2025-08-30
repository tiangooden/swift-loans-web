'use client';

import React from 'react';
import { SocialMedia } from './types';
import FormSelect from '../shared/component/FormSelect';
import FormButton from '../shared/component/FormButton';
import FormInput from '../shared/component/FormInput';

interface SocialMediaFormProps {
  formData: SocialMedia;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onSave: (socialMedia: SocialMedia) => Promise<void>;
  errors: Map<string, string>;
}

const SocialMediaForm: React.FC<SocialMediaFormProps> = ({ formData, handleChange, onSave, errors }) => {
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
            error={errors.get('platform')}
            options={[
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
            error={errors.get('username')}
            required
          />
        </div>
      </div>
      <div className="flex justify-end">
        <FormButton
          type="button"
          onClick={() => onSave(formData)}
        >
          Save Social Media Details
        </FormButton>
      </div>
    </form>
  );
};

export default SocialMediaForm;