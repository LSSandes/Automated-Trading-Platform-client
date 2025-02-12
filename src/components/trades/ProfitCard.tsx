import { Target } from 'lucide-react';

interface ProfitCardProps {
  activeProfit: number;
  dailyTarget: number;
}

export default function ProfitCard({ activeProfit, dailyTarget }: ProfitCardProps) {
  const targetProgress = Math.min((activeProfit / dailyTarget) * 100, 100);
  const formattedProfit = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  }).format(activeProfit);

  return (
    <div className="glass-panel rounded-xl p-6">
      <div className="relative w-48 h-48 mx-auto">
        {/* Circular Progress */}
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="50%"
            cy="50%"
            r="45%"
            fill="none"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="8"
          />
          <circle
            cx="50%"
            cy="50%"
            r="45%"
            fill="none"
            stroke={activeProfit >= 0 ? '#34D399' : '#EF4444'}
            strokeWidth="8"
            strokeDasharray={`${Math.min(targetProgress, 100) * 2.83} 283`}
            className="transition-all duration-700 ease-out"
          />
        </svg>
        
        {/* Center Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={`text-3xl font-bold mb-1 ${
            activeProfit >= 0 ? 'text-emerald-400' : 'text-red-400'
          }`}>
            {formattedProfit}
          </span>
          <span className="text-sm text-gray-400">Active Profit</span>
        </div>
      </div>

      {/* Daily Target */}
      <div className="mt-6">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2 text-sm text-gray-400">
            <Target className="h-4 w-4" />
            <span>Daily Target</span>
          </div>
          <span className="text-sm text-gray-400">${dailyTarget}</span>
        </div>
        <div className="relative h-2 bg-dark-200 rounded-full overflow-hidden">
          <div 
            className={`absolute inset-y-0 left-0 transition-all duration-700 rounded-full ${
              activeProfit >= dailyTarget ? 'bg-emerald-400' : 'bg-accent'
            }`}
            style={{ width: `${Math.min(targetProgress, 100)}%` }}
          />
        </div>
        <div className="mt-2 text-sm text-gray-400 text-center">
          {Math.round(targetProgress)}% of target
        </div>
      </div>
    </div>
  );
}