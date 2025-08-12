'use client';

import React, { useState, useEffect } from 'react';

interface BankAccount {
  id?: number;
  user_id?: number | null;
  bank_name: string | null;
  account_number: string | null;
  account_type: string | null;
  is_primary: boolean | null;
}

interface BankAccountFormProps {
  account: BankAccount | null;
  onClose: () => void;
  onSubmitSuccess: () => void;
}

const BankAccountForm: React.FC<BankAccountFormProps> = ({ account, onClose, onSubmitSuccess }) => {
  const [formData, setFormData] = useState<BankAccount>(account || {
    bank_name: '',
    account_number: '',
    account_type: '',
    is_primary: false,
  });
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    if (account) {
      setFormData(account);
    } else {
      setFormData({
        bank_name: '',
        account_number: '',
        account_type: '',
        is_primary: false,
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    const method = formData.id ? 'PUT' : 'POST';
    const url = formData.id ? `/api/bank-accounts/${formData.id}` : `/api/bank-accounts`;

    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      setMessage(`Bank account ${formData.id ? 'updated' : 'added'} successfully!`);
      onSubmitSuccess();
    } catch (e: any) {
      setMessage(`Failed to ${formData.id ? 'update' : 'add'} bank account: ${e.message}`);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">{account ? 'Edit Bank Account' : 'Add New Bank Account'}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="bank_name" className="block text-sm font-medium text-gray-700">Bank Name</label>
            <input
              type="text"
              name="bank_name"
              id="bank_name"
              value={formData.bank_name || ''}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
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
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
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
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
              required
            >
              <option value="">Select Account Type</option>
              <option value="Savings">Savings</option>
              <option value="Checking">Checking</option>
            </select>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              name="is_primary"
              id="is_primary"
              checked={formData.is_primary || false}
              onChange={handleChange}
              className="h-4 w-4 text-blue-600 border-gray-300 rounded"
            />
            <label htmlFor="is_primary" className="ml-2 block text-sm text-gray-900">Set as Primary Account</label>
          </div>
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
            >
              {account ? 'Update Account' : 'Add Account'}
            </button>
          </div>
          {message && (
            <div className={`mt-4 text-sm ${message.includes('Failed') ? 'text-red-600' : 'text-green-600'}`}>
              {message}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default BankAccountForm;