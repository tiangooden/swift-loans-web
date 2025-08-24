'use client';

import { useState, useEffect } from 'react';
import { Employment } from './types';

interface EmploymentFormProps {
  data: Employment | null | undefined;
  onSave: (employment: Employment) => void;
}

export default function EmploymentForm({ data, onSave }: EmploymentFormProps) {
  const [formData, setFormData] = useState<Employment>({
    employer_name: '',
    job_title: '',
    monthly_income: 0,
    payday_day: 0,
  });

  useEffect(() => {
    if (data) {
      setFormData(data);
    }
  }, [data]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const typedValue = type === "number" ? Number(value) : value;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : typedValue,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="employer_name" className="block text-sm font-medium text-gray-700">Employer Name</label>
          <input
            type="text"
            id="employer_name"
            name="employer_name"
            value={formData.employer_name || ''}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2"
            required
          />
        </div>
        <div>
          <label htmlFor="job_title" className="block text-sm font-medium text-gray-700">Job Title</label>
          <input
            type="text"
            id="job_title"
            name="job_title"
            value={formData.job_title || ''}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2"
            required
          />
        </div>
        <div>
          <label htmlFor="monthly_income" className="block text-sm font-medium text-gray-700">Monthly Income</label>
          <input
            type="number"
            id="monthly_income"
            name="monthly_income"
            value={formData.monthly_income || 0}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2"
            required
          />
        </div>
        <div>
          <label htmlFor="payday_day" className="block text-sm font-medium text-gray-700">Payday Day (1-31)</label>
          <input
            type="number"
            id="payday_day"
            name="payday_day"
            value={formData.payday_day || 0}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2"
            min="1"
            max="31"
            required
          />
        </div>
      </div>
      <div className="flex justify-end">
        <button
          type="submit"
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Save Employment Details
        </button>
      </div>
    </form>
  );
}