'use client';

import { useState } from 'react';
import { ApplicationFormProps } from './types';
import FormInput from '../shared/component/FormInput';
import FormSelect from '../shared/component/FormSelect';
import FormButton from '../shared/component/FormButton';
import FormTextArea from '../shared/component/FormTextArea';

export default function ApplicationForm({ data, onSubmit, onCancel, errors, saving }: ApplicationFormProps) {
  const [formData, setFormData] = useState(data || {
    amount_requested: 15000,
    term_in_days: 14,
    purpose: '',
  });

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <form className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          {data ? 'Update Loan Application' : 'New Loan Application'}
        </h2>
      </div>

      <div>
        <FormInput
          label="Amount Requested ($)"
          type="number"
          id="amount_requested"
          name="amount_requested"
          value={formData.amount_requested || ''}
          onChange={handleChange}
          min={0}
          // step="5000"
          required
          placeholder="1000.00"
        />
      </div>

      <div>
        <FormSelect
          label="Term (days)"
          id="term_in_days"
          name="term_in_days"
          value={formData.term_in_days || ''}
          onChange={handleChange}
          required
          options={[
            { value: '', label: 'Select term duration' },
            { value: '14', label: '14 days' },
            { value: '28', label: '28 days' },
          ]}
        />
      </div>

      <div>
        <label htmlFor="purpose" className="block text-sm font-medium text-gray-700 mb-2">
          Purpose
        </label>
        <FormTextArea
          label="Purpose"
          id="purpose"
          name="purpose"
          value={formData.purpose || ''}
          onChange={handleChange}
          rows={3}
          required
          placeholder="Describe the purpose of this loan..."
        />
      </div>
      <div className="">
        {errors && errors.map((e, i) => <p key={i}>* {e}</p>)}
      </div>
      <div className="flex space-x-3 pt-4">
        <FormButton
          type="button"
          disabled={saving}
          onClick={handleSubmit}
        >
          {data ? 'Update Application' : 'Submit Application'}
        </FormButton>

        <FormButton
          type="button"
          onClick={onCancel}
          color="red"
        >
          Cancel
        </FormButton>
      </div>
    </form>
  );
}