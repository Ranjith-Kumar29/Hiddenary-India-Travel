import React, { useId } from 'react';

interface HiddenaryIconProps {
  size?: number;
  variant?: 'light' | 'dark';
  className?: string;
}

export const HiddenaryIcon: React.FC<HiddenaryIconProps> = ({
  size = 38,
  variant = 'light',
  className = ''
}) => {
  const uid = useId().replace(/:/g, '');
  const bgGradId = `hiddenary-blue-bg-${uid}`;
  const planeGradId = `hiddenary-plane-${uid}`;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 ${className}`}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={bgGradId} x1="10" y1="6" x2="90" y2="94" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#0A84DB" />
          <stop offset="60%" stopColor="#0879C9" />
          <stop offset="100%" stopColor="#055FA3" />
        </linearGradient>
        <linearGradient id={planeGradId} x1="24" y1="36" x2="82" y2="64" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#0879C9" />
          <stop offset="100%" stopColor="#045999" />
        </linearGradient>
      </defs>

      {/* Royal Blue Rounded Emblem */}
      <rect x="2" y="2" width="96" height="96" rx="24" fill={`url(#${bgGradId})`} />
      {variant === 'dark' && (
        <rect
          x="3"
          y="3"
          width="94"
          height="94"
          rx="23"
          stroke="#42B9F5"
          strokeOpacity="0.55"
          strokeWidth="2"
        />
      )}

      {/* Bold, Rounded H-Shaped Symbol */}
      <path
        d="M21 28 C21 21.37 26.37 16 33 16 C39.63 16 45 21.37 45 28 V38.5 C45 39.6 45.9 40.5 47 40.5 H53 C54.1 40.5 55 39.6 55 38.5 V28 C55 21.37 60.37 16 67 16 C73.63 16 79 21.37 79 28 V72 C79 78.63 73.63 84 67 84 C60.37 84 55 78.63 55 72 V61.5 C55 60.4 54.1 59.5 53 59.5 H47 C45.9 59.5 45 60.4 45 61.5 V72 C45 78.63 39.63 84 33 84 C26.37 84 21 78.63 21 72 V28 Z"
        fill="#FFFFFF"
      />

      {/* Smooth Curved Aeroplane Flight Path */}
      <path
        d="M46.5 62.5 C43.5 57.5 36.5 55.8 29.5 53 C23 50.4 22.8 40.2 29.5 37.2 C35.8 34.4 40.2 41.2 43.8 48.8 C46.4 54.2 50.6 54.6 56.5 52.8"
        stroke={`url(#${planeGradId})`}
        strokeWidth="4.4"
        strokeLinecap="round"
        fill="none"
      />

      {/* Stylish Forward-Pointing Arrow on Flight Path */}
      <path
        d="M47.8 49.4 L54.6 52.6 L48.6 57.2 L50.2 53 Z"
        fill={`url(#${planeGradId})`}
      />

      {/* Modern Aeroplane Integrated Inside the H */}
      <path
        d="M54.5 53.2 C53.2 53.2 52.5 52.2 53.2 51.2 L55.2 48.8 L58.4 50.6 L62.2 48.8 L56.2 41.4 C55.4 40.4 56.4 39.2 57.8 39.8 L67.8 46.2 L76.8 43.2 C79.5 42.3 82.2 43 82.6 44.6 C83 46.2 80.8 47.9 78.1 48.8 L73.2 50.4 L67.6 62.8 C67 64 65.2 63.8 65.4 62.2 L67.2 51.8 L58.8 53.6 C57.2 53.9 55.8 53.4 54.5 53.2 Z"
        fill={`url(#${planeGradId})`}
      />

      {/* Cockpit Window Detail */}
      <path
        d="M74.4 45.2 C76.6 44.4 78.6 44.6 79.4 45.4 C77.8 46.1 76 46.1 74.4 45.2 Z"
        fill="#FFFFFF"
      />
    </svg>
  );
};

interface HiddenaryLogoProps {
  variant?: 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
  tagline?: string;
  className?: string;
}

export const HiddenaryLogo: React.FC<HiddenaryLogoProps> = ({
  variant = 'light',
  size = 'md',
  showTagline = false,
  tagline = 'Travel Beyond Ordinary',
  className = ''
}) => {
  const dimensions = {
    sm: { icon: 32, title: 'text-base', gap: 'gap-2', tag: 'text-[9px]' },
    md: { icon: 38, title: 'text-lg sm:text-xl', gap: 'gap-2.5', tag: 'text-[10px]' },
    lg: { icon: 44, title: 'text-xl sm:text-2xl', gap: 'gap-3', tag: 'text-[10px]' }
  }[size];

  const isDark = variant === 'dark';

  return (
    <div className={`inline-flex items-center ${dimensions.gap} select-none ${className}`}>
      <HiddenaryIcon
        size={dimensions.icon}
        variant={variant}
        className="drop-shadow-xs transition-transform duration-200 group-hover:scale-105"
      />
      <div className="flex flex-col">
        <span
          className={`font-extrabold ${dimensions.title} tracking-tight leading-none ${
            isDark ? 'text-white' : 'text-[#102B4E]'
          }`}
        >
          Hidden<span className={isDark ? 'text-[#42B9F5]' : 'text-[#0879C9]'}>ary</span>
        </span>
        {showTagline && (
          <span
            className={`${dimensions.tag} font-semibold tracking-widest uppercase mt-0.5 leading-none ${
              isDark ? 'text-[#42B9F5]/90' : 'text-[#0879C9]'
            }`}
          >
            {tagline}
          </span>
        )}
      </div>
    </div>
  );
};
