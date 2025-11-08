import React from 'react';

interface InputProps {
  label?: string;
  type?: 'text' | 'email' | 'password' | 'number';
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  disabled?: boolean;
  required?: boolean;
  helperText?: string;
}

const Input: React.FC<InputProps> = ({
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  disabled = false,
  required = false,
  helperText,
}) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-semibold text-gray-900 mb-2.5">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        className={`w-full px-4 py-3.5 border-2 rounded-xl text-base transition-all duration-300
          bg-white text-gray-900 placeholder:text-gray-400
          focus:outline-none focus:ring-4 focus:ring-primary-200 focus:border-primary-500
          hover:border-gray-400
          disabled:bg-gray-100 disabled:cursor-not-allowed
          shadow-soft focus:shadow-medium
          ${error ? 'border-red-500 focus:ring-red-200 focus:border-red-500' : 'border-gray-300'}
        `}
      />
      {error && <p className="mt-2 text-sm text-red-600 font-medium">{error}</p>}
      {helperText && !error && <p className="mt-2 text-sm text-gray-500">{helperText}</p>}
    </div>
  );
};

export default Input;
