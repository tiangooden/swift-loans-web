'use client';

import React, { useState, useEffect } from 'react';
import { BankAccount } from './types';
import FormInput from '../shared/component/FormInput';
import FormSelect from '../shared/component/FormSelect';
import FormButton from '../shared/component/FormButton';

interface BankAccountFormProps {
  account: BankAccount | null | undefined;
  onSave: (bankAccount: BankAccount) => Promise<void>;
}

const BankAccountForm: React.FC<BankAccountFormProps> = ({ account: data, onSave }) => {
  const [formData, setFormData] = useState<BankAccount>({
    bank_name: '',
    branch_name: '',
    account_name: '',
    account_number: '',
    account_type: '',
  });

  useEffect(() => {
    if (data) {
      setFormData(data);
    }
  }, [data]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData((prevData) => ({
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
          <FormInput
            label="Bank Name"
            id="bank_name"
            name="bank_name"
            value={formData.bank_name || ''}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <FormInput
            label="Branch Name"
            id="branch_name"
            name="branch_name"
            value={formData.branch_name || ''}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <FormInput
            label="Account Name"
            id="account_name"
            name="account_name"
            value={formData.account_name || ''}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <FormInput
            label="Account Number"
            id="account_number"
            name="account_number"
            value={formData.account_number || ''}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <FormSelect
            label="Account Type"
            id="account_type"
            name="account_type"
            value={formData.account_type || ''}
            onChange={handleChange}
            options={[
              { value: '', label: 'Select Account Type' },
              { value: 'Savings', label: 'Savings' },
              { value: 'Checking', label: 'Checking' }
            ]}
            required
          />
        </div>
      </div>
      <div className="flex justify-end">
        <FormButton
          type="button"
          onClick={handleSubmit}
        >
          Save Bank Account Details
        </FormButton>
      </div>
    </form>
  );
};

export default BankAccountForm;