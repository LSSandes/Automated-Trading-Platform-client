import { LineChart, Clock, TrendingUp, TrendingDown } from 'lucide-react';

interface TradeDetailsChartProps {
  symbol: string;
  type: 'buy' | 'sell';
  entryPrice: number;
  currentPrice: number;
  profitAmount?: number;
  profitPercentage?: number;
  duration?: string;
}

export default function TradeDetailsChart({
  symbol,
  type,
  entryPrice,
  currentPrice,
  profitAmount,
  profitPercentage,
  duration
}: TradeDetailsChartProps) {
  const isProfit = type === 'buy' ? currentPrice > entryPrice : currentPrice < entryPrice;

  return (
    <div className="glass-panel rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-accent/10 rounded-lg">
            <LineChart className="h-5 w-5 text-accent" />
          </div>
          <div>
            <h3 className="text-lg font-medium text-white">{symbol}</h3>
            <div className="flex items-center space-x-2 mt-1">
              <span className={`text-sm ${type === 'buy' ? 'text-emerald-400' : 'text-red-400'}`}>
                {type.toUpperCase()}
              </span>
              {duration && (
                <>
                  <span className="text-gray-400">•</span>
                  <div className="flex items-center text-gray-400 text-sm">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>{duration}</span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {isProfit ? (
            <TrendingUp className="h-5 w-5 text-emerald-400" />
          ) : (
            <TrendingDown className="h-5 w-5 text-red-400" />
          )}
          {profitAmount !== undefined && (
            <span className={`text-lg font-medium ${
              isProfit ? 'text-emerald-400' : 'text-red-400'
            }`}>
              {isProfit ? '+' : ''}{profitAmount.toFixed(2)} USD
              {profitPercentage && ` (${isProfit ? '+' : ''}${profitPercentage.toFixed(2)}%)`}
            </span>
          )}
        </div>
      </div>

      <div className="relative h-48 mb-6">
        <div className="absolute inset-0 bg-gradient-to-t from-accent/5 to-transparent rounded-lg"></div>
        <div className="absolute bottom-0 left-0 w-full h-px bg-accent/20"></div>
        <div className="absolute left-0 top-0 h-full w-px bg-accent/20"></div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="glass-panel rounded-lg p-4">
          <div className="text-sm text-gray-400 mb-1">Entry Price</div>
          <div className="text-lg font-medium text-white">{entryPrice.toFixed(5)}</div>
        </div>
        <div className="glass-panel rounded-lg p-4">
          <div className="text-sm text-gray-400 mb-1">Current Price</div>
          <div className={`text-lg font-medium ${
            isProfit ? 'text-emerald-400' : 'text-red-400'
          }`}>
            {currentPrice.toFixed(5)}
          </div>
        </div>
      </div>
    </div>
  );
}