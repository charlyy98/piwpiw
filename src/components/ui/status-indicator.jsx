import React from 'react';

const StatusIndicator = ({ 
  status = 'online', 
  size = 'md', 
  pulse = true,
  label,
  className = '' 
}) => {
  const sizes = {
    sm: 'w-2 h-2',
    md: 'w-3 h-3',
    lg: 'w-4 h-4',
    xl: 'w-5 h-5'
  };

  const colors = {
    online: 'bg-emerald-500',
    offline: 'bg-slate-400',
    busy: 'bg-red-500',
    away: 'bg-amber-500',
    maintenance: 'bg-orange-500',
    error: 'bg-red-600',
    warning: 'bg-yellow-500',
    success: 'bg-green-500'
  };

  const pulseColors = {
    online: 'bg-emerald-400/30',
    offline: 'bg-slate-400/30',
    busy: 'bg-red-400/30',
    away: 'bg-amber-400/30',
    maintenance: 'bg-orange-400/30',
    error: 'bg-red-400/30',
    warning: 'bg-yellow-400/30',
    success: 'bg-green-400/30'
  };

  return (
    <div className={`relative inline-flex items-center ${className}`}>
      <div className={`${sizes[size]} ${colors[status]} rounded-full relative z-10`}></div>
      {pulse && (
        <div className={`absolute inset-0 ${sizes[size]} ${pulseColors[status]} rounded-full animate-ping`}></div>
      )}
      {label && (
        <span className="ml-2 text-sm font-medium text-slate-700 dark:text-slate-300">
          {label}
        </span>
      )}
    </div>
  );
};

export default StatusIndicator;

