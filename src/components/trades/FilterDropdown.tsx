import React from 'react';
import { Filter, ChevronDown } from 'lucide-react';

interface FilterDropdownProps {
  value: string;
  onChange: (value: string) => void;
  options: string[];
  placeholder?: string;
}

export default function FilterDropdown({ value, onChange, options, placeholder }: FilterDropdownProps) {
  return (
    <div className="relative">
      <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-10 pr-8 py-2 bg-dark-200/30 text-gray-300 rounded-lg 
                 border border-dark-300/30 appearance-none cursor-pointer
                 focus:outline-none focus:ring-1 focus:ring-accent/50"
      >
        {placeholder && (
          <option value="">{placeholder}</option>
        )}
        {options.map(option => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
      <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
    </div>
  );
}