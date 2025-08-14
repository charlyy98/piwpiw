import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import AnimatedCounter from './animated-counter';
import StatusIndicator from './status-indicator';

const MetricCard = ({
  title,
  value,
  change,
  trend = 'up',
  icon: Icon,
  color = 'blue',
  description,
  status,
  theme = 'light',
  className = '',
  animated = true
}) => {
  const colorClasses = {
    blue: {
      icon: 'text-blue-600 bg-blue-500/10',
      trend: trend === 'up' ? 'text-emerald-600' : 'text-red-500',
      accent: 'from-blue-500 to-blue-600'
    },
    emerald: {
      icon: 'text-emerald-600 bg-emerald-500/10',
      trend: trend === 'up' ? 'text-emerald-600' : 'text-red-500',
      accent: 'from-emerald-500 to-emerald-600'
    },
    purple: {
      icon: 'text-purple-600 bg-purple-500/10',
      trend: trend === 'up' ? 'text-emerald-600' : 'text-red-500',
      accent: 'from-purple-500 to-purple-600'
    },
    amber: {
      icon: 'text-amber-600 bg-amber-500/10',
      trend: trend === 'up' ? 'text-emerald-600' : 'text-red-500',
      accent: 'from-amber-500 to-amber-600'
    }
  };

  const currentColor = colorClasses[color];

  return (
    <div className={`
      group relative overflow-hidden backdrop-blur-xl rounded-2xl p-6 border shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105
      ${theme === 'dark'
        ? 'bg-slate-800/80 border-slate-700/50'
        : 'bg-white/90 border-slate-200/80 shadow-slate-200/50 hover:shadow-slate-300/60'
      }
      ${className}
    `}>
      {/* Gradient background */}
      <div className={`absolute inset-0 bg-gradient-to-br ${currentColor.accent} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
      
      {/* Icon */}
      <div className={`relative inline-flex items-center justify-center w-14 h-14 ${currentColor.icon} rounded-xl mb-4 group-hover:scale-110 transition-transform duration-300`}>
        {Icon && <Icon className="w-7 h-7" />}
      </div>
      
      {/* Content */}
      <div className="relative space-y-3">
        <div className="flex items-center justify-between">
          <h3 className={`text-sm font-semibold uppercase tracking-wide ${
            theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
          }`}>
            {title}
          </h3>
          {status && <StatusIndicator status={status} size="sm" />}
        </div>
        
        <div className="space-y-2">
          <div className={`text-3xl font-black ${
            theme === 'dark' ? 'text-white' : 'text-slate-900'
          }`}>
            {animated ? (
              <AnimatedCounter 
                end={parseFloat(value.replace(/[^\d.]/g, ''))} 
                suffix={value.replace(/[\d.]/g, '')}
                duration={2000}
              />
            ) : (
              value
            )}
          </div>
          
          {change && (
            <div className={`flex items-center space-x-2 text-sm font-bold ${currentColor.trend}`}>
              {trend === 'up' ? (
                <TrendingUp className="w-4 h-4" />
              ) : (
                <TrendingDown className="w-4 h-4" />
              )}
              <span>{change}</span>
            </div>
          )}
          
          {description && (
            <p className={`text-sm ${
              theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
            }`}>
              {description}
            </p>
          )}
        </div>
      </div>
      
      {/* Hover effect indicator */}
      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
      </div>
    </div>
  );
};

export default MetricCard;

