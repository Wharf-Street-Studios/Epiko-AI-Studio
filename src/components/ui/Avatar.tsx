import React from 'react';
import { UserIcon } from 'hugeicons-react';

interface AvatarProps {
  name?: string;
  src?: string;
  size?: 'small' | 'medium' | 'large' | 'xlarge';
  className?: string;
}

const Avatar: React.FC<AvatarProps> = ({
  name,
  src,
  size = 'medium',
  className = '',
}) => {
  const sizeClasses = {
    small: 'w-8 h-8 text-xs',
    medium: 'w-10 h-10 text-sm',
    large: 'w-16 h-16 text-xl',
    xlarge: 'w-20 h-20 text-2xl',
  };

  const iconSizes = {
    small: 16,
    medium: 20,
    large: 28,
    xlarge: 36,
  };

  const getInitials = (name?: string) => {
    if (!name) return '';
    const parts = name.trim().split(' ');
    if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
    return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
  };

  const initials = getInitials(name);

  if (src) {
    return (
      <div className={`${sizeClasses[size]} rounded-full overflow-hidden ${className}`}>
        <img src={src} alt={name || 'Avatar'} className="w-full h-full object-cover" />
      </div>
    );
  }

  return (
    <div
      className={`${sizeClasses[size]} rounded-full bg-dark-150 flex items-center justify-center font-semibold text-white ${className}`}
    >
      {initials || <UserIcon size={iconSizes[size]} color="#ffffff" />}
    </div>
  );
};

export default Avatar;
