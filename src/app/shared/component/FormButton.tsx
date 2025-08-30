import React from 'react';

interface FormButtonProps {
  children: React.ReactNode;
  onClick?: (e: React.FormEvent) => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  disabled?: boolean;
  color?: 'blue' | 'red' | 'gray' | 'orange' | 'green' | 'yellow' | 'purple' | 'pink' | 'indigo';
}

const FormButton: React.FC<FormButtonProps> = ({
  children,
  onClick,
  type = 'button',
  className = '',
  disabled = false,
  color = 'blue',
}) => {
  const colorClasses = {
    blue: 'bg-blue-500 hover:bg-blue-700',
    red: 'bg-red-500 hover:bg-red-700',
    gray: 'bg-gray-500 hover:bg-gray-700',
    orange: 'bg-orange-500 hover:bg-orange-700',
    green: 'bg-green-500 hover:bg-green-700',
    yellow: 'bg-yellow-500 hover:bg-yellow-700',
    purple: 'bg-purple-500 hover:bg-purple-700',
    pink: 'bg-pink-500 hover:bg-pink-700',
    indigo: 'bg-indigo-500 hover:bg-indigo-700',
  }[color];
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${colorClasses} text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${className}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default FormButton;