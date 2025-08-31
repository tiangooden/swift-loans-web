'use client';

import { Employment } from './types';
import FormInput from '../shared/component/FormInput';
import FormSelect from '../shared/component/FormSelect';
import FormButton from '../shared/component/FormButton';


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
        <div className="pb-12">
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <FormInput
                label="Employer Name"
                name="employer_name"
                value={formData.employer_name || ''}
                onChange={handleChange}
                error={errors.get('employer_name')}
                required id={'employer_name'} />
            </div>
            <div>
              <FormInput
                label="Employer Phone Number"
                name="employer_phone_number"
                value={formData.employer_phone_number || ''}
                onChange={handleChange}
                error={errors.get('employer_phone_number')}
                required id={'employer_phone_number'} />
            </div>
            <div>
              <FormInput
                label="Job Title"
                name="job_title"
                value={formData.job_title || ''}
                onChange={handleChange}
                error={errors.get('job_title')}
                required id={'job_title'} />
            </div>
            <div>
              <FormInput
                label="Date of Employment"
                type='date'
                name="date_of_employment"
                value={formData.date_of_employment instanceof Date ? formData.date_of_employment.toISOString().split('T')[0] : formData.date_of_employment ? new Date(formData.date_of_employment).toISOString().split('T')[0] : ''}
                onChange={handleChange}
                error={errors.get('date_of_employment')}
                required id={'date_of_employment'} />
            </div>
            <div>
              <FormInput
                label="Gross Salary"
                name="gross_salary"
                value={formData.gross_salary || ''}
                onChange={handleChange}
                error={errors.get('gross_salary')}
                required id={'gross_salary'} />
            </div>
            <div>
              <FormInput
                label="Payday Day"
                name="payday_day"
                value={formData.payday_day || ''}
                onChange={handleChange}
                error={errors.get('payday_day')}
                required id={'payday_day'} />
            </div>
            <div>
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
            </div>
            <div>
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
      </div>
      <div className="flex justify-end space-x-3">
        <FormButton
          type="submit"
        >
          Save
        </FormButton>
      </div>
    </form>
  );
}