import { TrendingUp, TrendingDown, Target, AlertCircle } from 'lucide-react';

interface TradeProgressionCardProps {
  symbol: string;
  entryPrice: number;
  currentPrice: number;
  stopLoss: number;
  takeProfit: number;
  type: 'buy' | 'sell';
  profitAmount?: number;
  profitPercentage?: number;
}

export default function TradeProgressionCard({
  symbol,
  entryPrice,
  currentPrice,
  stopLoss,
  takeProfit,
  type,
  profitAmount,
  profitPercentage
}: TradeProgressionCardProps) {
  const calculateProgress = () => {
    if (type === 'buy') {
      const totalDistance = takeProfit - stopLoss;
      const currentDistance = currentPrice - stopLoss;
      return (currentDistance / totalDistance) * 100;
    } else {
      const totalDistance = stopLoss - takeProfit;
      const currentDistance = stopLoss - currentPrice;
      return (currentDistance / totalDistance) * 100;
    }
  };

  const progress = calculateProgress();
  const isProfit = type === 'buy' ? currentPrice > entryPrice : currentPrice < entryPrice;

  return (
    <div className="glass-panel rounded-xl p-4">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-medium text-white">{symbol}</h3>
          <div className="flex items-center space-x-2 mt-1">
            <span className={`text-sm ${type === 'buy' ? 'text-emerald-400' : 'text-red-400'}`}>
              {type.toUpperCase()}
            </span>
            {profitAmount !== undefined && (
              <span className={`text-sm ${isProfit ? 'text-emerald-400' : 'text-red-400'}`}>
                {isProfit ? '+' : ''}{profitAmount.toFixed(2)} USD
                {profitPercentage && ` (${isProfit ? '+' : ''}${profitPercentage.toFixed(2)}%)`}
              </span>
            )}
          </div>
        </div>
        {isProfit ? 
          <TrendingUp className="h-6 w-6 text-emerald-400" /> : 
          <TrendingDown className="h-6 w-6 text-red-400" />
        }
      </div>

      {/* Price Progress Bar */}
      <div className="relative h-2 bg-dark-200 rounded-full mb-4">
        {/* Stop Loss Marker */}
        <div 
          className="absolute w-0.5 h-4 bg-red-400 -top-1 rounded-full"
          style={{ left: type === 'buy' ? '0%' : '100%' }}
        />
        
        {/* Entry Price Marker */}
        <div 
          className="absolute w-0.5 h-4 bg-white -top-1 rounded-full"
          style={{ 
            left: type === 'buy' ? 
              `${((entryPrice - stopLoss) / (takeProfit - stopLoss)) * 100}%` : 
              `${((stopLoss - entryPrice) / (stopLoss - takeProfit)) * 100}%` 
          }}
        />
        
        {/* Take Profit Marker */}
        <div 
          className="absolute w-0.5 h-4 bg-emerald-400 -top-1 rounded-full"
          style={{ left: type === 'buy' ? '100%' : '0%' }}
        />
        
        {/* Progress Fill */}
        <div 
          className={`h-full rounded-full transition-all duration-300 ${
            isProfit ? 'bg-emerald-400' : 'bg-red-400'
          }`}
          style={{ width: `${Math.max(0, Math.min(100, progress))}%` }}
        />
      </div>

      {/* Price Levels */}
      <div className="grid grid-cols-3 gap-4">
        <div>
          <div className="flex items-center space-x-1 text-red-400 mb-1">
            <AlertCircle className="h-4 w-4" />
            <span className="text-xs">Stop Loss</span>
          </div>
          <span className="text-sm font-medium text-white">{stopLoss.toFixed(5)}</span>
        </div>
        
        <div>
          <div className="flex items-center space-x-1 text-gray-400 mb-1">
            <div className="w-1 h-4 bg-white rounded-full" />
            <span className="text-xs">Entry</span>
          </div>
          <span className="text-sm font-medium text-white">{entryPrice.toFixed(5)}</span>
        </div>
        
        <div>
          <div className="flex items-center space-x-1 text-emerald-400 mb-1">
            <Target className="h-4 w-4" />
            <span className="text-xs">Take Profit</span>
          </div>
          <span className="text-sm font-medium text-white">{takeProfit.toFixed(5)}</span>
        </div>
      </div>

      {/* Current Price */}
      <div className="mt-4 p-3 bg-dark-200/50 rounded-lg">
        <div className="flex items-center justify-between">
          <span className="text-gray-400">Current Price</span>
          <span className={`text-lg font-medium ${
            isProfit ? 'text-emerald-400' : 'text-red-400'
          }`}>
            {currentPrice.toFixed(5)}
          </span>
        </div>
      </div>
    </div>
  );
}