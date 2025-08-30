'use client';

import React, { useEffect, useState } from 'react';
import { User } from './types';
import FormInput from '../shared/component/FormInput';
import FormButton from '../shared/component/FormButton';
import { processValidationErrors } from '../shared/utils/createMessageMap';
import { updateUserSchema } from '../api/users/schema';
import { validateSchema } from '../shared/validation';
import { notifications } from '../shared/notifications';

interface UserFormProps {
  data: User | null | undefined;
  errors: any,
  onSave: (user: User) => Promise<void>;
}

export default function UserForm({ data, onSave, errors: es }: UserFormProps) {
  const [errors, setErrors] = useState<Map<string, string>>(es || new Map());
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

  useEffect(() => {
    setErrors(es || new Map());
  }, [es]);

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
    try {
      validateSchema(formData, updateUserSchema);
    } catch (error: any) {
      return setErrors(processValidationErrors(error.errors));
    }
    try {
      await onSave(formData);
      notifications.success('Profile updated successfully');
    } catch (error: any) {
      setErrors(processValidationErrors(error));
      notifications.error('Failed to update profile');
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
            error={errors.get('first_name')}
            onChange={handleChange}
          />
        </div>
        <div>
          <FormInput
            label={'Middle Name'}
            id={'middle_name'}
            name={'middle_name'}
            value={formData.middle_name || ''}
            error={errors.get('middle_name')}
            onChange={handleChange}
          />
        </div>
        <div>
          <FormInput
            label={'Last Name'}
            id={'last_name'}
            name={'last_name'}
            value={formData.last_name || ''}
            error={errors.get('last_name')}
            onChange={handleChange}
          />
        </div>
        <div>
          <FormInput
            label={'Alias'}
            id={'alias'}
            name={'alias'}
            value={formData.alias || ''}
            error={errors.get('alias')}
            onChange={handleChange}
          />
        </div>
        <div>
          <FormInput
            label={'Email'}
            id={'email'}
            name={'email'}
            type={'email'}
            value={formData.email || ''}
            error={errors.get('email')}
            onChange={handleChange}
          />
        </div>
        <div>
          <FormInput
            label={'Date of Birth'}
            id={'dob'}
            name={'dob'}
            type={'date'}
            error={errors.get('dob')}
            value={formData.dob instanceof Date ? formData.dob.toISOString().split('T')[0] : formData.dob ? new Date(formData.dob).toISOString().split('T')[0] : ''}
            onChange={handleChange}
          />
        </div>
        <div>
          <FormInput
            label={'Phone Number'}
            id={'phone_number'}
            name={'phone_number'}
            value={formData.phone_number || ''}
            error={errors.get('phone_number')}
            onChange={handleChange}
          />
        </div>
        <div>
          <FormInput
            label={'TRN'}
            id={'trn'}
            name={'trn'}
            value={formData.trn || ''}
            error={errors.get('trn')}
            onChange={handleChange}
          />
        </div>
        <div>
          <FormInput
            label={'Street Address'}
            id={'street_address'}
            name={'street_address'}
            value={formData.street_address || ''}
            error={errors.get('street_address')}
            onChange={handleChange}
          />
        </div>
        <div>
          <FormInput
            label={'City'}
            id={'city'}
            name={'city'}
            value={formData.city || ''}
            error={errors.get('city')}
            onChange={handleChange}
          />
        </div>
        <div>
          <FormInput
            label={'Country'}
            id={'country'}
            name={'country'}
            value={formData.country || ''}
            error={errors.get('country')}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="flex justify-end space-x-3">
        <FormButton
          type="submit"
        >
          Save
        </FormButton>
      </div>
    </form>
  );
};
