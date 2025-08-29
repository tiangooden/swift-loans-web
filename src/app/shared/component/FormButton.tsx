import React from 'react';

interface FormButtonProps {
  children: React.ReactNode;
  onClick?: (e: React.FormEvent) => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  disabled?: boolean;
}

const FormButton: React.FC<FormButtonProps> = ({
  children,
  onClick,
  type = 'button',
  className = '',
  disabled = false,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${className}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default FormButton;