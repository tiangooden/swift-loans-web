'use client';

import React from 'react';
import { BankAccount } from './types';
import FormInput from '../shared/component/FormInput';
import FormSelect from '../shared/component/FormSelect';
import FormButton from '../shared/component/FormButton';

interface BankAccountFormProps {
  errors: Map<string, string>;
  account: BankAccount | null | undefined;
  onSave: (bankAccount?: BankAccount | null) => Promise<void>;
  formData: BankAccount;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

const BankAccountForm: React.FC<BankAccountFormProps> = ({ account: data, onSave, formData, handleChange, errors }) => {

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
            error={errors.get('bank_name')}
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
            error={errors.get('branch_name')}
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
            error={errors.get('account_name')}
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
            error={errors.get('account_number')}
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
              { value: 'Savings', label: 'Savings' },
              { value: 'Checking', label: 'Checking' }
            ]}
            error={errors.get('account_type')}
            required
          />
        </div>
      </div>
      <div className="flex justify-end">
        <FormButton
          type="button"
          onClick={() => onSave(data)}
        >
          Save Bank Account Details
        </FormButton>
      </div>
    </form>
  );
};

export default BankAccountForm;