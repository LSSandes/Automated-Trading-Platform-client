import React from 'react';
import { DollarSign, Target } from 'lucide-react';

interface TotalProfitDisplayProps {
  profit: number;
  dailyTarget?: number;
}

export default function TotalProfitDisplay({ profit, dailyTarget = 1000 }: TotalProfitDisplayProps) {
  // Calculate the percentage for the profit circle (max 100%)
  const percentage = Math.min(Math.abs(profit) / 1000 * 100, 100);
  
  // Calculate the percentage of daily target achieved
  const targetPercentage = Math.min((profit / dailyTarget) * 100, 100);
  
  // Calculate circle properties
  const size = 160; // Circle size in pixels
  const strokeWidth = 8; // Width of the circle stroke
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  // Calculate target meter properties
  const meterWidth = 200;
  const meterHeight = 6;

  return (
    <div className="text-center space-y-8">
      {/* Active Profit Circle */}
      <div>
        <h3 className="text-lg font-medium text-white mb-4">Active Profit</h3>
        <div className="relative inline-flex items-center justify-center">
          {/* Blur effect */}
          <div className={`absolute inset-0 rounded-full blur-xl ${
            profit >= 0 ? 'bg-emerald-500/20' : 'bg-red-500/20'
          }`} />

          {/* SVG Circle */}
          <div className="relative">
            <svg
              width={size}
              height={size}
              viewBox={`0 0 ${size} ${size}`}
              className="transform -rotate-90"
            >
              {/* Background circle */}
              <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="none"
                stroke="rgba(255, 255, 255, 0.1)"
                strokeWidth={strokeWidth}
              />
              
              {/* Progress circle */}
              <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="none"
                stroke={profit >= 0 ? '#34D399' : '#EF4444'}
                strokeWidth={strokeWidth}
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                className="transition-all duration-500 ease-out"
              />
            </svg>

            {/* Center Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <DollarSign className={`h-6 w-6 mb-1 ${
                profit >= 0 ? 'text-emerald-400' : 'text-red-400'
              }`} />
              <span className={`text-2xl font-bold ${
                profit >= 0 ? 'text-emerald-400' : 'text-red-400'
              }`}>
                {profit >= 0 ? '+' : ''}{profit.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Daily Target Meter */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <Target className="h-4 w-4 text-accent" />
            <span className="text-sm text-gray-400">Daily Target</span>
          </div>
          <span className="text-sm text-gray-400">${dailyTarget.toLocaleString()}</span>
        </div>

        {/* Target Progress Bar */}
        <div className="relative">
          {/* Background bar */}
          <div className="w-full h-1.5 bg-dark-200 rounded-full overflow-hidden">
            {/* Progress bar */}
            <div 
              className={`h-full transition-all duration-500 rounded-full ${
                targetPercentage >= 100 
                  ? 'bg-emerald-400' 
                  : targetPercentage >= 75
                  ? 'bg-accent'
                  : targetPercentage >= 50
                  ? 'bg-yellow-400'
                  : 'bg-red-400'
              }`}
              style={{ width: `${Math.max(0, targetPercentage)}%` }}
            />
          </div>

          {/* Percentage label */}
          <div className="mt-2 text-sm text-gray-400">
            {targetPercentage >= 0 ? '+' : ''}{targetPercentage.toFixed(1)}% of target
          </div>
        </div>
      </div>
    </div>
  );
}