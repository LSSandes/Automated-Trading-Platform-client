import { TrendingUp, TrendingDown, DollarSign } from 'lucide-react';

interface TotalOverviewCardProps {
  title: string;
  value: number;
  change: number;
  timeframe: string;
}

export default function TotalOverviewCard({ 
  title, 
  value, 
  change, 
  timeframe 
}: TotalOverviewCardProps) {
  const isPositive = change >= 0;

  return (
    <div className="glass-panel rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-gray-400">{title}</h3>
        <div className={`flex items-center space-x-1 ${
          isPositive ? 'text-emerald-400' : 'text-red-400'
        }`}>
          {isPositive ? (
            <TrendingUp className="h-4 w-4" />
          ) : (
            <TrendingDown className="h-4 w-4" />
          )}
          <span className="text-sm font-medium">
            {isPositive ? '+' : ''}{change}%
          </span>
        </div>
      </div>
      
      <div className="flex items-baseline space-x-2 mb-2">
        <DollarSign className="h-5 w-5 text-gray-400" />
        <span className="text-2xl font-bold text-white">
          {value.toLocaleString()}
        </span>
      </div>
      
      <p className="text-sm text-gray-400">
        vs previous {timeframe}
      </p>
    </div>
  );
}