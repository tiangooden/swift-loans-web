'use client';

import React from 'react';
import { User } from './types';
import FormInput from '../lib/component/FormInput';
import FormButton from '../lib/component/FormButton';

interface UserFormProps {
  errors: Map<string, string>;
  onSave: (user: User) => Promise<void>;
  formData: User;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export default function UserForm({ onSave, errors, formData, handleChange }: UserFormProps) {

  async function handleSubmit(e: any) {
    e.preventDefault();
    await onSave(formData);
  }

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
