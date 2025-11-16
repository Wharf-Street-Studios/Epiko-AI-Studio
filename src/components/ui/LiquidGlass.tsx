import React from 'react';

interface LiquidGlassProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'clear' | 'regular' | 'dark' | 'light';
  intensity?: 'subtle' | 'medium' | 'strong';
  rounded?: boolean;
  border?: boolean;
}

/**
 * LiquidGlass Component
 * Apple-inspired Liquid Glass effect for web using CSS backdrop-filter
 * Mimics iOS 26 Liquid Glass visual effect
 */
const LiquidGlass: React.FC<LiquidGlassProps> = ({
  children,
  className = '',
  variant = 'regular',
  intensity = 'medium',
  rounded = true,
  border = true,
}) => {
  // Variant styles
  const variantStyles = {
    clear: 'bg-white/[0.05]',
    regular: 'bg-white/[0.1]',
    dark: 'bg-black/[0.3]',
    light: 'bg-white/[0.15]',
  };

  // Blur intensity
  const blurIntensity = {
    subtle: 'backdrop-blur-sm', // 4px
    medium: 'backdrop-blur-md', // 12px
    strong: 'backdrop-blur-xl', // 24px
  };

  // Border styles
  const borderStyles = border
    ? 'border border-white/[0.15] shadow-[0_8px_32px_0_rgba(0,0,0,0.2)]'
    : '';

  // Rounded corners
  const roundedStyles = rounded ? 'rounded-2xl' : '';

  return (
    <div
      className={`
        ${variantStyles[variant]}
        ${blurIntensity[intensity]}
        ${borderStyles}
        ${roundedStyles}
        transition-all duration-300 ease-out
        ${className}
      `}
      style={{
        backdropFilter: intensity === 'strong' ? 'blur(24px) saturate(180%)' :
                       intensity === 'medium' ? 'blur(12px) saturate(150%)' :
                       'blur(6px) saturate(120%)',
        WebkitBackdropFilter: intensity === 'strong' ? 'blur(24px) saturate(180%)' :
                             intensity === 'medium' ? 'blur(12px) saturate(150%)' :
                             'blur(6px) saturate(120%)',
      }}
    >
      {children}
    </div>
  );
};

export default LiquidGlass;
