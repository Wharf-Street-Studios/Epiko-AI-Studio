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
  const baseStyles = 'font-semibold rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform active:scale-95 focus:outline-none flex items-center justify-center';

  const variantStyles = {
    primary: 'bg-white text-black hover:bg-gray-100 active:bg-gray-200',
    secondary: 'bg-dark-100 text-white hover:bg-dark-150 active:bg-dark-200 border border-dark-200',
    outline: 'bg-transparent border-2 border-dark-200 text-white hover:bg-dark-100 hover:border-white active:bg-dark-150',
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
