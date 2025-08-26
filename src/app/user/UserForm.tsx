'use client';

import React, { useEffect, useState } from 'react';
import { User } from './types';

interface UserFormProps {
  data: User | null | undefined;
  onSave: (user: User) => Promise<boolean>;
}

export default function UserForm({ data, onSave }: UserFormProps) {
  const [formData, setFormData] = useState<User>({
    id: undefined,
    identity: '',
    alias: '',
    email: '',
    first_name: '',
    middle_name: '',
    last_name: '',
    dob: null,
    phone_number: '',
    trn: '',
    street_address: '',
    city: '',
    country: '',
    status: '',
  });

  useEffect(() => {
    if (data) {
      setFormData(data);
    }
  }, [data]);

  const [isEditing, setIsEditing] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const success = await onSave(formData);
      if (success) {
        setIsEditing(false);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="first_name" className="block text-sm font-medium text-gray-700">First Name</label>
          <input
            type="text"
            name="first_name"
            id="first_name"
            value={formData.first_name || ''}
            onChange={handleChange}
            readOnly={!isEditing}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2"
            {... (isEditing && { autoComplete: 'on' })}
          />
        </div>
        <div>
          <label htmlFor="middle_name" className="block text-sm font-medium text-gray-700">Middle Name</label>
          <input
            type="text"
            name="middle_name"
            id="middle_name"
            value={formData.middle_name || ''}
            onChange={handleChange}
            readOnly={!isEditing}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2"
            {... (isEditing && { autoComplete: 'on' })}
          />
        </div>
        <div>
          <label htmlFor="last_name" className="block text-sm font-medium text-gray-700">Last Name</label>
          <input
            type="text"
            name="last_name"
            id="last_name"
            value={formData.last_name || ''}
            onChange={handleChange}
            readOnly={!isEditing}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2"
            {... (isEditing && { autoComplete: 'on' })}
          />
        </div>
        <div>
          <label htmlFor="alias" className="block text-sm font-medium text-gray-700">Alias</label>
          <input
            type="text"
            name="alias"
            id="alias"
            value={formData.alias || ''}
            onChange={handleChange}
            readOnly={!isEditing}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2"
            {... (isEditing && { autoComplete: 'on' })}
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email || ''}
            onChange={handleChange}
            readOnly={!isEditing}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2"
            {... (isEditing && { autoComplete: 'on' })}
          />
        </div>
        <div>
          <label htmlFor="dob" className="block text-sm font-medium text-gray-700">Date of Birth</label>
          <input
            type="date"
            name="dob"
            id="dob"
            value={formData.dob instanceof Date ? formData.dob.toISOString().split('T')[0] : formData.dob ? new Date(formData.dob).toISOString().split('T')[0] : ''}
            onChange={handleChange}
            readOnly={!isEditing}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2"
            {... (isEditing && { autoComplete: 'on' })}
          />
        </div>
        <div>
          <label htmlFor="phone_number" className="block text-sm font-medium text-gray-700">Phone Number</label>
          <input
            type="text"
            name="phone_number"
            id="phone_number"
            value={formData.phone_number || ''}
            onChange={handleChange}
            readOnly={!isEditing}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2"
            {... (isEditing && { autoComplete: 'on' })}
          />
        </div>
        <div>
          <label htmlFor="trn" className="block text-sm font-medium text-gray-700">TRN</label>
          <input
            type="text"
            name="trn"
            id="trn"
            value={formData.trn || ''}
            onChange={handleChange}
            readOnly={!isEditing}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2"
            {... (isEditing && { autoComplete: 'on' })}
          />
        </div>
        <div>
          <label htmlFor="street_address" className="block text-sm font-medium text-gray-700">Street Address</label>
          <input
            type="text"
            name="street_address"
            id="street_address"
            value={formData.street_address || ''}
            onChange={handleChange}
            readOnly={!isEditing}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2"
            {... (isEditing && { autoComplete: 'on' })}
          />
        </div>
        <div>
          <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
          <input
            type="text"
            name="city"
            id="city"
            value={formData.city || ''}
            onChange={handleChange}
            readOnly={!isEditing}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2"
            {... (isEditing && { autoComplete: 'on' })}
          />
        </div>
        <div>
          <label htmlFor="country" className="block text-sm font-medium text-gray-700">Country</label>
          <input
            type="text"
            name="country"
            id="country"
            value={formData.country || ''}
            onChange={handleChange}
            readOnly={!isEditing}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2"
            {... (isEditing && { autoComplete: 'on' })}
          />
        </div>
      </div>
      <div className="flex justify-end space-x-3">
        <button
          type="submit"
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          disabled={loading}
        >
          {loading ? 'Saving...' : 'Save'}
        </button>
      </div>
    </form>
  );
};
