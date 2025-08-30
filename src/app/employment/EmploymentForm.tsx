'use client';

import { Employment } from './types';
import FormInput from '../shared/component/FormInput';
import FormButton from '../shared/component/FormButton';
import FormSelect from '../shared/component/FormSelect';


interface EmploymentFormProps {
  data: Employment | null | undefined;
  onSave: (employment: Employment) => void;
  formData: Employment;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

export default function EmploymentForm({ data, onSave, formData, handleChange }: EmploymentFormProps) {

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      onSave(formData);
    }} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <FormInput
            label="Employer Name"
            id="employer_name"
            name="employer_name"
            value={formData.employer_name || ''}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <FormInput
            label="Employer Phone Number"
            id="employer_phone_number"
            name="employer_phone_number"
            value={formData.employer_phone_number || ''}
            onChange={handleChange}
          />
        </div>
        <div>
          <FormInput
            label="Job Title"
            id="job_title"
            name="job_title"
            value={formData.job_title || ''}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <FormInput
            label="Date of Employment"
            id="date_of_employment"
            name="date_of_employment"
            type="date"
            value={formData.date_of_employment ? new Date(formData.date_of_employment).toISOString().split('T')[0] : ''}
            onChange={handleChange}
          />
        </div>
        <div>
          <FormInput
            label="Gross Salary"
            id="gross_salary"
            name="gross_salary"
            type={"number"}
            value={formData.gross_salary || 0}
            onChange={handleChange}
          />
        </div>
        <div>
          <FormInput
            label="Payday Day (1-31)"
            id="payday_day"
            name="payday_day"
            type="number"
            value={formData.payday_day || 0}
            onChange={handleChange}
            min={1}
            max={31}
            required
          />
        </div>
        <div>
          <FormSelect
            label="Pay Cycle"
            id="pay_cycle"
            name="pay_cycle"
            value={formData.pay_cycle || ''}
            onChange={handleChange}
            options={[
              { value: 'weekly', label: 'Weekly' },
              { value: 'fortnightly', label: 'Fortnightly' },
              { value: 'monthly', label: 'Monthly' },
            ]}
          />
        </div>
        <div>
          <FormInput
            label="Total Expenses Per Cycle"
            id="total_expenses_per_cycle"
            name="total_expenses_per_cycle"
            type="number"
            value={formData.total_expenses_per_cycle || 0}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="flex justify-end">
        <FormButton
          type="submit"
        >
          Save Employment Details
        </FormButton>
      </div>
    </form>
  );
}