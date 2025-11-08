import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  size = 'medium',
  fullWidth = false,
  disabled = false,
  type = 'button',
}) => {
  const baseStyles = 'font-semibold rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform active:scale-95 focus:outline-none focus:ring-4 focus:ring-opacity-30';

  const variantStyles = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 shadow-lg hover:shadow-xl border-2 border-blue-700 focus:ring-blue-300',
    secondary: 'bg-gray-300 text-gray-900 hover:bg-gray-400 active:bg-gray-500 shadow-md hover:shadow-lg border-2 border-gray-400 hover:border-gray-500 focus:ring-gray-300',
    outline: 'bg-white border-3 border-gray-600 text-gray-900 hover:border-gray-800 hover:bg-gray-100 active:bg-gray-200 shadow-md hover:shadow-lg focus:ring-gray-300',
  };

  const sizeStyles = {
    small: 'px-4 py-2.5 text-sm',
    medium: 'px-6 py-3.5 text-base',
    large: 'px-8 py-4 text-lg',
  };

  const widthStyles = fullWidth ? 'w-full' : '';

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${widthStyles}`}
    >
      {children}
    </button>
  );
};

export default Button;
