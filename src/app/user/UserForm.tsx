'use client';

import React, { useEffect, useState } from 'react';
import { User } from './types';
import FormInput from '../shared/component/FormInput';
import FormButton from '../shared/component/FormButton';

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
          <FormInput
            label={'First Name'}
            id={'first_name'}
            name={'first_name'}
            value={formData.first_name || ''}
            onChange={handleChange}
            readOnly={!isEditing} />
        </div>
        <div>
          <FormInput
            label={'Middle Name'}
            id={'middle_name'}
            name={'middle_name'}
            value={formData.middle_name || ''}
            onChange={handleChange}
            readOnly={!isEditing} />
        </div>
        <div>
          <FormInput
            label={'Last Name'}
            id={'last_name'}
            name={'last_name'}
            value={formData.last_name || ''}
            onChange={handleChange}
            readOnly={!isEditing} />
        </div>
        <div>
          <FormInput
            label={'Alias'}
            id={'alias'}
            name={'alias'}
            value={formData.alias || ''}
            onChange={handleChange}
            readOnly={!isEditing} />
        </div>
        <div>
          <FormInput
            label={'Email'}
            id={'email'}
            name={'email'}
            type={'email'}
            value={formData.email || ''}
            onChange={handleChange}
            readOnly={!isEditing} />
        </div>
        <div>
          <FormInput
            label={'Date of Birth'}
            id={'dob'}
            name={'dob'}
            type={'date'}
            value={formData.dob instanceof Date ? formData.dob.toISOString().split('T')[0] : formData.dob ? new Date(formData.dob).toISOString().split('T')[0] : ''}
            onChange={handleChange}
            readOnly={!isEditing} />
        </div>
        <div>
          <FormInput
            label={'Phone Number'}
            id={'phone_number'}
            name={'phone_number'}
            value={formData.phone_number || ''}
            onChange={handleChange}
            readOnly={!isEditing} />
        </div>
        <div>
          <FormInput
            label={'TRN'}
            id={'trn'}
            name={'trn'}
            value={formData.trn || ''}
            onChange={handleChange}
            readOnly={!isEditing} />
        </div>
        <div>
          <FormInput
            label={'Street Address'}
            id={'street_address'}
            name={'street_address'}
            value={formData.street_address || ''}
            onChange={handleChange}
            readOnly={!isEditing} />
        </div>
        <div>
          <FormInput
            label={'City'}
            id={'city'}
            name={'city'}
            value={formData.city || ''}
            onChange={handleChange}
            readOnly={!isEditing} />
        </div>
        <div>
          <FormInput
            label={'Country'}
            id={'country'}
            name={'country'}
            value={formData.country || ''}
            onChange={handleChange}
            readOnly={!isEditing} />
        </div>
      </div>
      <div className="flex justify-end space-x-3">
        <FormButton
          type="submit"
          disabled={loading}
        >
          {loading ? 'Saving...' : 'Save'}
        </FormButton>
      </div>
    </form>
  );
};
