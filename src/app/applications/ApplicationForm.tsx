'use client';

import FormInput from '../lib/component/FormInput';
import FormSelect from '../lib/component/FormSelect';
import FormButton from '../lib/component/FormButton';
import FormTextArea from '../lib/component/FormTextArea';
import { handleChange as handleChangeUtil } from '../lib/handleChange';

export interface ApplicationFormProps {
  data: {
    id: string;
    amount_requested: number;
    term_in_days: number;
    purpose: string;
  } | null;
  errors: Map<string, string>;
  saving: boolean;
  onSubmit: (data: any) => void;
  onCancel: () => void;
  formData: any;
  setFormData: (data: any) => void;
}

export default function ApplicationForm({ data, onSubmit, onCancel,
  errors: es, saving, formData, setFormData }: ApplicationFormProps) {
  const errors = es || new Map();

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    onSubmit(formData);
  };
  const handleChange = handleChangeUtil(setFormData)

  return (
    <form className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          {data ? 'Update Loan Application' : 'New Loan Application'}
        </h2>
      </div>
      <div>
        <FormInput
          label="Amount Requested ($)"
          type="number"
          id="amount_requested"
          name="amount_requested"
          value={formData.amount_requested || 0}
          onChange={handleChange}
          min={0}
          step={5000}
          placeholder="1000.00"
          error={errors.get('amount_requested')}
        />
      </div>
      <div>
        <FormSelect
          label="Term (days)"
          id="term_in_days"
          name="term_in_days"
          value={formData.term_in_days || 0}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
            const { name, value } = e.target;
            const newValue = Number(value);
            setFormData((prevData: any) => ({
              ...prevData,
              [name]: newValue,
            }));
          }}
          options={[
            { value: 14, label: '14 days' },
            { value: 28, label: '28 days' },
          ]}
          error={errors.get('term_in_days')}
        />
      </div>
      <div>
        <label htmlFor="purpose" className="block text-sm font-medium text-gray-700 mb-2">
          Purpose
        </label>
        <FormTextArea
          label=""
          id="purpose"
          name="purpose"
          value={formData.purpose || ''}
          onChange={handleChange}
          rows={3}
          placeholder="Describe the purpose of this loan..."
          error={errors.get('purpose')}
        />
      </div>
      <div className="flex space-x-3 pt-4">
        <FormButton
          type="button"
          disabled={saving}
          onClick={handleSubmit}
        >
          {data ? 'Update Application' : 'Submit Application'}
        </FormButton>
        <FormButton
          type="button"
          onClick={onCancel}
          color="red"
        >
          Cancel
        </FormButton>
      </div>
    </form>
  );
}