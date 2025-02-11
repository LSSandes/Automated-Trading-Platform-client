import React from 'react';
import { ChevronDown } from 'lucide-react';

interface FilterSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: string[];
  icon?: React.ReactNode;
  className?: string;
  placeholder?: string;
}

export default function FilterSelect({ 
  value, 
  onChange, 
  options, 
  icon, 
  className = '',
  placeholder
}: FilterSelectProps) {
  return (
    <div className={`relative flex-shrink-0 ${className}`}>
      {icon && (
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
          {icon}
        </div>
      )}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`h-10 w-full bg-dark-200/50 text-gray-300 rounded-lg cursor-pointer
                   border border-dark-300/30 focus:outline-none focus:ring-1 focus:ring-accent/50
                   hover:bg-dark-200/70 transition-colors ${
                     icon ? 'pl-10 pr-10' : 'pl-4 pr-10'
                   }`}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map(option => (
          <option 
            key={option} 
            value={option}
            className="bg-dark-100 text-gray-300 hover:bg-dark-200"
          >
            {option}
          </option>
        ))}
      </select>
      <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
    </div>
  );
}