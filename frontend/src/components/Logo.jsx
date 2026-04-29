import React from 'react';

const Logo = ({ size = 'md', variant = 'default' }) => {
  const sizes = {
    sm: { icon: 32, text: 'text-base' },
    md: { icon: 40, text: 'text-lg' },
    lg: { icon: 56, text: 'text-2xl' },
    xl: { icon: 72, text: 'text-3xl' },
  };

  const { icon, text } = sizes[size] || sizes.md;

  // Premium color variants
  const colorSchemes = {
    default: {
      primary: '#8B7355',
      secondary: '#D4AF37',
      accent: '#C19A6B',
      background: '#F5F0E6',
    },
    premium: {
      primary: '#B8860B',
      secondary: '#FFD700',
      accent: '#DAA520',
      background: '#FFF8DC',
    },
    dark: {
      primary: '#D4AF37',
      secondary: '#FFD700',
      accent: '#C19A6B',
      background: '#2C2C2C',
    }
  };

  const colors = colorSchemes[variant] || colorSchemes.default;

  return (
    <svg width={icon} height={icon} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Premium background with gradient */}
      <defs>
        <linearGradient id="logoGrad" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor={colors.primary} />
          <stop offset="50%" stopColor={colors.accent} />
          <stop offset="100%" stopColor={colors.secondary} />
        </linearGradient>
        <linearGradient id="pageGrad" x1="14" y1="8" x2="34" y2="40" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor={colors.background} />
        </linearGradient>
        <radialGradient id="shineGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="white" stopOpacity="0.3" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </radialGradient>
        <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="rgba(0,0,0,0.1)" />
        </filter>
      </defs>

      {/* Rounded square background with premium styling */}
      <rect width="48" height="48" rx="14" fill="url(#logoGrad)" filter="url(#shadow)" />

      {/* Shine effect */}
      <ellipse cx="24" cy="12" rx="16" ry="8" fill="url(#shineGrad)" opacity="0.4" />

      {/* Document/page shape with premium styling */}
      <path d="M14 10 H30 L34 14 V38 H14 V10Z" fill="url(#pageGrad)" rx="3" stroke={colors.accent} strokeWidth="0.5" />

      {/* Page fold corner with premium accent */}
      <path d="M30 10 L30 14 H34 L30 10Z" fill={colors.secondary} opacity="0.9" />
      <path d="M30 10 L30 14 H34 L30 10Z" fill="white" opacity="0.3" />

      {/* Premium decorative elements */}
      <rect x="16" y="16" width="16" height="1.5" rx="0.75" fill={colors.primary} opacity="0.9" />
      <rect x="16" y="19" width="14" height="1" rx="0.5" fill={colors.accent} opacity="0.7" />
      <rect x="16" y="21.5" width="12" height="1" rx="0.5" fill={colors.accent} opacity="0.7" />
      <rect x="16" y="24" width="10" height="1" rx="0.5" fill={colors.accent} opacity="0.7" />

      {/* Premium accent circle with AI sparkle */}
      <circle cx="32" cy="32" r="6" fill={colors.secondary} opacity="0.95" />
      <path d="M32 29.5 V34.5 M29.5 32 H34.5" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="32" cy="32" r="2.5" fill="white" opacity="0.3" />

      {/* Premium badge indicator */}
      <circle cx="38" cy="10" r="3" fill="#FF6B6B" />
      <text x="38" y="11.5" textAnchor="middle" fill="white" fontSize="5" fontWeight="bold">★</text>
    </svg>
  );
};

export default Logo;