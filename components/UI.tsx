
import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon, MapPin } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  icon?: LucideIcon;
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  className = '', 
  children, 
  icon: Icon, 
  fullWidth = false,
  ...props 
}) => {
  const baseStyles = "flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold transition-all duration-200 active:scale-95";
  
  const variants = {
    primary: "bg-primary text-text hover:brightness-95 shadow-lg shadow-primary/20",
    secondary: "bg-text text-white hover:bg-gray-800",
    outline: "border-2 border-gray-200 text-gray-700 hover:border-primary hover:bg-primary/5",
    ghost: "bg-transparent text-gray-600 hover:bg-gray-100"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {Icon && <Icon size={20} />}
      {children}
    </button>
  );
};

export const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement> & { label?: string; icon?: LucideIcon; error?: string }> = ({ 
  label, 
  className = '', 
  icon: Icon,
  error,
  ...props 
}) => (
  <div className="space-y-1.5 w-full">
    {label && <label className="text-xs font-medium text-gray-500 ml-1 uppercase tracking-wider">{label}</label>}
    <div className="relative">
      {Icon && <Icon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />}
      <input 
        className={`w-full bg-gray-50 border ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-100' : 'border-gray-100 focus:border-primary focus:ring-primary/20'} focus:ring-2 rounded-xl px-4 py-3.5 outline-none transition-all text-gray-800 placeholder:text-gray-400 ${Icon ? 'pl-11' : ''} ${className}`}
        {...props}
      />
    </div>
    {error && <p className="text-xs text-red-500 ml-1 font-medium animate-pulse">{error}</p>}
  </div>
);

export const Badge: React.FC<{ children: React.ReactNode, color?: string }> = ({ children, color = "bg-primary/20 text-green-800" }) => (
  <span className={`px-2.5 py-1 rounded-lg text-xs font-medium ${color}`}>
    {children}
  </span>
);

export const SectionHeader: React.FC<{ title: string, action?: React.ReactNode }> = ({ title, action }) => (
  <div className="flex items-center justify-between mb-4">
    <h2 className="text-lg font-bold text-gray-900">{title}</h2>
    {action}
  </div>
);

export const Toggle: React.FC<{ checked: boolean; onChange: (c: boolean) => void }> = ({ checked, onChange }) => (
  <button 
    onClick={() => onChange(!checked)}
    className={`w-11 h-6 rounded-full relative transition-colors duration-200 ease-in-out ${checked ? 'bg-primary' : 'bg-gray-200'}`}
  >
    <span className={`block w-5 h-5 bg-white rounded-full shadow-sm transform transition-transform duration-200 ease-in-out mt-0.5 ml-0.5 ${checked ? 'translate-x-5' : 'translate-x-0'}`} />
  </button>
);

export const Logo: React.FC<{ size?: 'sm' | 'md' | 'lg', showTagline?: boolean }> = ({ size = 'md', showTagline = false }) => {
  const sizeClasses = {
    sm: 'text-xl',
    md: 'text-3xl',
    lg: 'text-4xl'
  };

  const iconSizes = {
    sm: 20,
    md: 32,
    lg: 40
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className={`flex items-center font-bold text-gray-900 ${sizeClasses[size]} tracking-tight`}>
        <span>Hunt</span>
        <div className="relative mx-0.5 flex items-center justify-center">
          <MapPin fill="#FF4E4E" stroke="#FF4E4E" size={iconSizes[size]} className="drop-shadow-sm" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-2/3 w-1.5 h-1.5 bg-white rounded-full" />
        </div>
        <span>roperty</span>
      </div>
      {showTagline && (
        <p className="text-[10px] sm:text-xs text-gray-500 tracking-[0.2em] uppercase mt-1 font-medium">
          Think Wisely Invest Smartly
        </p>
      )}
    </div>
  );
};
