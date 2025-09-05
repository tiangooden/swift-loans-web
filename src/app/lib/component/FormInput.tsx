import React from 'react';

interface FormInputProps {
  label: string;
  id: string;
  name: string;
  type?: string;
  placeholder?: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  readOnly?: boolean;
  error?: string;
  min?: number;
  max?: number;
  step?: number;
}

const FormInput: React.FC<FormInputProps> = ({
  label,
  id,
  name,
  type = 'text',
  placeholder,
  value,
  onChange,
  required = false,
  readOnly = false,
  error,
  min,
  max,
  step
}) => {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-gray-700 text-sm font-bold mb-2">
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        id={id}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        readOnly={readOnly}
        autoComplete={'on'}
        min={min}
        max={max}
        step={step}
        className={`shadow rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${error ? 'border-red-500' : ''}`}
      />
      {error && <p className="text-red-500 text-md italic">{error}</p>}
    </div>
  );
};

export default FormInput;