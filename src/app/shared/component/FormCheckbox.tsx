import React from 'react';

interface FormCheckboxProps {
  label: string;
  id: string;
  name: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

const FormCheckbox: React.FC<FormCheckboxProps> = ({
  label,
  id,
  name,
  checked,
  onChange,
  error,
}) => {
  return (
    <div className="mb-4 flex items-center">
      <input
        type="checkbox"
        id={id}
        name={name}
        checked={checked}
        onChange={onChange}
        className="mr-2 leading-tight"
      />
      <label htmlFor={id} className="text-gray-700 text-sm font-bold">
        {label}
      </label>
      {error && <p className="text-red-500 text-xs italic ml-2">{error}</p>}
    </div>
  );
};

export default FormCheckbox;