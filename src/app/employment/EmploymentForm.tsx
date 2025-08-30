'use client';

import { Employment } from './types';
import FormInput from '../shared/component/FormInput';
import FormSelect from '../shared/component/FormSelect';


interface EmploymentFormProps {
  errors: Map<string, string>;
  data: Employment | null | undefined;
  onSave: (employment: Employment) => void;
  formData: Employment;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

export default function EmploymentForm({ data, onSave, formData, handleChange, errors }: EmploymentFormProps) {

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      onSave(formData);
    }}>
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">Employment Information</h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">Provide details about your current or most recent employment.</p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <FormInput
              label="Employer Name"
              name="employer_name"
              value={formData.employer_name || ''}
              onChange={handleChange}
              error={errors.get('employer_name')}
              required id={'employer_name'} />

            <FormInput
              label="Employer Phone Number"
              name="employer_phone_number"
              value={formData.employer_phone_number || ''}
              onChange={handleChange}
              error={errors.get('employer_phone_number')}
              required id={'employer_phone_number'} />

            <FormInput
              label="Job Title"
              name="job_title"
              value={formData.job_title || ''}
              onChange={handleChange}
              error={errors.get('job_title')}
              required id={'job_title'} />

            <FormInput
              label="Date of Employment"
              name="date_of_employment"
              value={formData.date_of_employment instanceof Date ? formData.date_of_employment.toISOString().split('T')[0] : formData.date_of_employment ? new Date(formData.date_of_employment).toISOString().split('T')[0] : ''}
              onChange={handleChange}
              error={errors.get('date_of_employment')}
              required id={'date_of_employment'} />

            <FormInput
              label="Gross Salary"
              name="gross_salary"
              value={formData.gross_salary || ''}
              onChange={handleChange}
              error={errors.get('gross_salary')}
              required id={'gross_salary'} />

            <FormInput
              label="Payday Day"
              name="payday_day"
              value={formData.payday_day || ''}
              onChange={handleChange}
              error={errors.get('payday_day')}
              required id={'payday_day'} />

            <FormSelect
              label="Pay Cycle"
              name="pay_cycle"
              value={formData.pay_cycle || ''}
              onChange={handleChange}
              options={[
                { value: 'weekly', label: 'Weekly' },
                { value: 'fortnightly', label: 'Fortnightly' },
                { value: 'monthly', label: 'Monthly' },
              ]}
              error={errors.get('pay_cycle')}
              required id={'pay_cycle'} />

            <FormInput
              label="Total Expenses Per Cycle"
              name="total_expenses_per_cycle"
              value={formData.total_expenses_per_cycle || ''}
              onChange={handleChange}
              error={errors.get('total_expenses_per_cycle')}
              required id={'total_expenses_per_cycle'} />
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button type="button" className="text-sm font-semibold leading-6 text-gray-900">Cancel</button>
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Save
        </button>
      </div>
    </form>
  );
}