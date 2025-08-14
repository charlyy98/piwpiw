import React from 'react';

const EnhancedCard = ({ 
  children, 
  className = '', 
  hover = true, 
  glow = false, 
  gradient = false,
  theme = 'light',
  ...props 
}) => {
  const baseClasses = `
    relative overflow-hidden backdrop-blur-xl rounded-2xl border shadow-xl transition-all duration-500
    ${hover ? 'hover:shadow-2xl hover:scale-105 group cursor-pointer' : ''}
    ${glow ? 'hover:shadow-2xl hover:shadow-blue-500/25' : ''}
    ${gradient ? 'bg-gradient-to-br from-white/90 via-white/80 to-white/70' : ''}
    ${theme === 'dark' 
      ? 'bg-slate-800/80 border-slate-700/50' 
      : 'bg-amber-100/90 border-amber-300/80 shadow-amber-200/50'
    }
  `;

  return (
    <div className={`${baseClasses} ${className}`} {...props}>
      {glow && (
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-indigo-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      )}
      <div className="relative z-10">
        {children}
      </div>
      {hover && (
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
        </div>
      )}
    </div>
  );
};

export default EnhancedCard;

