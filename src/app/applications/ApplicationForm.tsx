'use client';

import { useState } from 'react';
import { ApplicationFormProps } from './types';

export default function ApplicationForm({ data, onSubmit, onCancel }: ApplicationFormProps) {
  const [formData, setFormData] = useState(data || {
    id: '',
    amount_requested: 15000,
    term_in_days: 14,
    purpose: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          {data ? 'Update Loan Application' : 'New Loan Application'}
        </h2>
      </div>

      <div>
        <label htmlFor="amount_requested" className="block text-sm font-medium text-gray-700 mb-2">
          Amount Requested ($)
        </label>
        <input
          type="number"
          id="amount_requested"
          name="amount_requested"
          value={formData.amount_requested || ''}
          onChange={handleChange}
          min="0"
          step="5000"
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          placeholder="1000.00"
          autoComplete="on"
        />
      </div>

      <div>
        <label htmlFor="term_in_days" className="block text-sm font-medium text-gray-700 mb-2">
          Term (days)
        </label>
        <select
          id="term_in_days"
          name="term_in_days"
          value={formData.term_in_days || ''}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="" disabled>Select term duration</option>
          <option value="14">14 days</option>
          <option value="28">28 days</option>
        </select>
      </div>

      <div>
        <label htmlFor="purpose" className="block text-sm font-medium text-gray-700 mb-2">
          Purpose
        </label>
        <textarea
          id="purpose"
          name="purpose"
          value={formData.purpose || ''}
          onChange={handleChange}
          rows={3}
          // required
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          placeholder="Describe the purpose of this loan..."
        />
      </div>

      <div className="flex space-x-3 pt-4">
        <button
          type="submit"
          className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-200"
        >
          {data ? 'Update Application' : 'Submit Application'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition duration-200"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}