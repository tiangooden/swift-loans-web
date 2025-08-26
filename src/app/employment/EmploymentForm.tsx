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
    employer_phone_number: '',
    job_title: '',
    date_of_employment: undefined,
    gross_salary: 0,
    payday_day: 0,
    pay_cycle: '',
    total_expenses_per_cycle: 0,
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
            autoComplete="on"
          />
        </div>
        <div>
          <label htmlFor="employer_phone_number" className="block text-sm font-medium text-gray-700">Employer Phone Number</label>
          <input
            type="text"
            id="employer_phone_number"
            name="employer_phone_number"
            value={formData.employer_phone_number || ''}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2"
            autoComplete="on"
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
            autoComplete="on"
          />
        </div>
        <div>
          <label htmlFor="date_of_employment" className="block text-sm font-medium text-gray-700">Date of Employment</label>
          <input
            type="date"
            id="date_of_employment"
            name="date_of_employment"
            value={formData.date_of_employment ? new Date(formData.date_of_employment).toISOString().split('T')[0] : ''}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2"
            autoComplete="on"
          />
        </div>
        <div>
          <label htmlFor="gross_salary" className="block text-sm font-medium text-gray-700">Gross Salary</label>
          <input
            type="number"
            id="gross_salary"
            name="gross_salary"
            value={formData.gross_salary || 0}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2"
            autoComplete="on"
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
            autoComplete="on"
          />
        </div>
        <div>
          <label htmlFor="pay_cycle" className="block text-sm font-medium text-gray-700">Pay Cycle</label>
          <input
            type="text"
            id="pay_cycle"
            name="pay_cycle"
            value={formData.pay_cycle || ''}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2"
            autoComplete="on"
          />
        </div>
        <div>
          <label htmlFor="total_expenses_per_cycle" className="block text-sm font-medium text-gray-700">Total Expenses Per Cycle</label>
          <input
            type="number"
            id="total_expenses_per_cycle"
            name="total_expenses_per_cycle"
            value={formData.total_expenses_per_cycle || 0}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2"
            autoComplete="on"
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