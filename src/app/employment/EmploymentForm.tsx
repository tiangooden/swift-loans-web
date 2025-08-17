'use client';

import { useState, useEffect } from 'react';

interface EmploymentFormProps {
  initialData: {
    employer_name: string;
    job_title: string;
    monthly_income: number;
    payday_day: number;
  };
  onSave: (employment: {
    employer_name: string;
    job_title: string;
    monthly_income: number;
    payday_day: number;
  }) => void;
}

export default function EmploymentForm({ initialData, onSave }: EmploymentFormProps) {
  const [employer_name, setEmployerName] = useState(initialData.employer_name);
  const [job_title, setJobTitle] = useState(initialData.job_title);
  const [monthly_income, setMonthlyIncome] = useState(initialData.monthly_income);
  const [payday_day, setPaydayDay] = useState(initialData.payday_day);

  useEffect(() => {
    setEmployerName(initialData.employer_name);
    setJobTitle(initialData.job_title);
    setMonthlyIncome(initialData.monthly_income);
    setPaydayDay(initialData.payday_day);
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      employer_name,
      job_title,
      monthly_income: parseFloat(monthly_income.toString()),
      payday_day: parseInt(payday_day.toString()),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="employer_name" className="block text-sm font-medium text-gray-700">Employer Name</label>
          <input
            type="text"
            id="employer_name"
            value={employer_name}
            onChange={(e) => setEmployerName(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2"
            required
          />
        </div>
        <div>
          <label htmlFor="job_title" className="block text-sm font-medium text-gray-700">Job Title</label>
          <input
            type="text"
            id="job_title"
            value={job_title}
            onChange={(e) => setJobTitle(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2"
            required
          />
        </div>
        <div>
          <label htmlFor="monthly_income" className="block text-sm font-medium text-gray-700">Monthly Income</label>
          <input
            type="number"
            id="monthly_income"
            value={monthly_income}
            onChange={(e) => setMonthlyIncome(parseFloat(e.target.value))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2"
            required
          />
        </div>
        <div>
          <label htmlFor="payday_day" className="block text-sm font-medium text-gray-700">Payday Day (1-31)</label>
          <input
            type="number"
            id="payday_day"
            value={payday_day}
            onChange={(e) => setPaydayDay(parseInt(e.target.value))}
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