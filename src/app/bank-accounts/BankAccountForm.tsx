'use client';

import React, { useState, useEffect } from 'react';
import { BankAccount } from './hooks';

interface BankAccountFormProps {
  account: BankAccount | null;
  onSave: (bankAccount: BankAccount) => Promise<void>;
}

const BankAccountForm: React.FC<BankAccountFormProps> = ({ account, onSave }) => {
  const [formData, setFormData] = useState<BankAccount>(account || {
    bank_name: '',
    branch_name: '',
    account_name: '',
    account_number: '',
    account_type: '',
  });

  useEffect(() => {
    if (account) {
      setFormData(account);
    } else {
      setFormData({
        bank_name: '',
        branch_name: '',
        account_name: '',
        account_number: '',
        account_type: '',
      });
    }
  }, [account]);

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
          <label htmlFor="bank_name" className="block text-sm font-medium text-gray-700">Bank Name</label>
          <input
            type="text"
            name="bank_name"
            id="bank_name"
            value={formData.bank_name || ''}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2"
            required
          />
        </div>
        <div>
          <label htmlFor="branch_name" className="block text-sm font-medium text-gray-700">Branch Name</label>
          <input
            type="text"
            name="branch_name"
            id="branch_name"
            value={formData.branch_name || ''}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2"
            required
          />
        </div>
        <div>
          <label htmlFor="account_name" className="block text-sm font-medium text-gray-700">Account Name</label>
          <input
            type="text"
            name="account_name"
            id="account_name"
            value={formData.account_name || ''}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2"
            required
          />
        </div>
        <div>
          <label htmlFor="account_number" className="block text-sm font-medium text-gray-700">Account Number</label>
          <input
            type="text"
            name="account_number"
            id="account_number"
            value={formData.account_number || ''}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2"
            required
          />
        </div>
        <div>
          <label htmlFor="account_type" className="block text-sm font-medium text-gray-700">Account Type</label>
          <select
            name="account_type"
            id="account_type"
            value={formData.account_type || ''}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2"
            required
          >
            <option value="">Select Account Type</option>
            <option value="Savings">Savings</option>
            <option value="Checking">Checking</option>
          </select>
        </div>
      </div>
      <div className="flex justify-end">
        <button
          type="button"
          onClick={handleSubmit}
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Save Bank Account Details
        </button>
      </div>
    </form>
  );
};

export default BankAccountForm;