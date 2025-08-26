'use client';

import React, { useState, useEffect } from 'react';
import { SocialMedia } from './types';

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
          <label htmlFor="platform" className="block text-sm font-medium text-gray-700">Platform</label>
          <select
            name="platform"
            id="platform"
            value={formData.platform || ''}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2"
            required
          >
            <option value="">Select Platform</option>
            <option value="facebook">Facebook</option>
            <option value="x">Twitter/X</option>
            <option value="instagram">Instagram</option>
            <option value="linkedIn">LinkedIn</option>
            <option value="youTube">YouTube</option>
            <option value="tikTok">TikTok</option>
          </select>
        </div>
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
          <input
            type="text"
            name="username"
            id="username"
            value={formData.username || ''}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2"
            required
            autoComplete="on"
          />
        </div>
      </div>
      <div className="flex justify-end">
        <button
          type="button"
          onClick={handleSubmit}
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Save Social Media Details
        </button>
      </div>
    </form>
  );
};

export default SocialMediaForm;