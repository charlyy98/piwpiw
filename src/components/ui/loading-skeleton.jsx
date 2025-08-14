import React from 'react';

const LoadingSkeleton = ({ 
  className = '', 
  variant = 'default',
  theme = 'light',
  animate = true 
}) => {
  const baseClasses = `
    rounded-lg
    ${animate ? 'animate-pulse' : ''}
    ${theme === 'dark' ? 'bg-slate-700/50' : 'bg-amber-200/50'}
  `;

  const variants = {
    default: 'h-4 w-full',
    text: 'h-4 w-3/4',
    title: 'h-8 w-1/2',
    avatar: 'h-12 w-12 rounded-full',
    card: 'h-32 w-full',
    button: 'h-10 w-24 rounded-xl',
    chart: 'h-64 w-full'
  };

  return (
    <div className={`${baseClasses} ${variants[variant]} ${className}`}>
      <div className="h-full w-full bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
    </div>
  );
};

export default LoadingSkeleton;

