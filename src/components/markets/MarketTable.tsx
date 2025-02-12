import { Star, TrendingUp, TrendingDown } from 'lucide-react';
import { Market } from '../../types/market';

interface MarketTableProps {
  markets: Market[];
  onSelectMarket: (market: Market) => void;
  onShowAutomation: (market: Market) => void;
}

export default function MarketTable({ 
  markets, 
  onSelectMarket,
  onShowAutomation 
}: MarketTableProps) {
  return (
    <div className="glass-panel rounded-xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-dark-200/50">
              <th className="text-left text-xs font-medium text-gray-400 p-4">Market</th>
              <th className="text-left text-xs font-medium text-gray-400 p-4">Price</th>
              <th className="text-left text-xs font-medium text-gray-400 p-4">24h Change</th>
              <th className="text-left text-xs font-medium text-gray-400 p-4">Volume</th>
              <th className="text-left text-xs font-medium text-gray-400 p-4">Signal</th>
              <th className="text-left text-xs font-medium text-gray-400 p-4">Strength</th>
              <th className="text-right text-xs font-medium text-gray-400 p-4">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-dark-300/30">
            {markets.map((market) => (
              <tr 
                key={market.symbol}
                className="hover:bg-dark-200/30 transition-colors cursor-pointer"
                onClick={() => onSelectMarket(market)}
              >
                <td className="p-4">
                  <div className="flex items-center space-x-3">
                    <button className="text-gray-400 hover:text-yellow-400 transition-colors">
                      <Star className="h-4 w-4" />
                    </button>
                    <div>
                      <div className="text-white font-medium">{market.symbol}</div>
                      <div className="text-sm text-gray-400">{market.name}</div>
                    </div>
                    {market.trending && (
                      <span className="px-2 py-1 text-xs rounded-full bg-accent/10 text-accent">
                        Trending
                      </span>
                    )}
                  </div>
                </td>
                <td className="p-4">
                  <div className="text-white font-medium">
                    ${market.price.toLocaleString()}
                  </div>
                </td>
                <td className="p-4">
                  <div className={`flex items-center ${
                    market.change >= 0 ? 'text-emerald-400' : 'text-red-400'
                  }`}>
                    {market.change >= 0 ? (
                      <TrendingUp className="h-4 w-4 mr-1" />
                    ) : (
                      <TrendingDown className="h-4 w-4 mr-1" />
                    )}
                    {market.change >= 0 ? '+' : ''}{market.change}%
                  </div>
                </td>
                <td className="p-4">
                  <div className="text-gray-300">
                    ${(market.volume / 1e9).toFixed(1)}B
                  </div>
                </td>
                <td className="p-4">
                  <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                    market.signal === 'buy' 
                      ? 'bg-emerald-500/20 text-emerald-400'
                      : market.signal === 'sell'
                      ? 'bg-red-500/20 text-red-400'
                      : 'bg-gray-500/20 text-gray-400'
                  }`}>
                    {market.signal?.toUpperCase()}
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex items-center space-x-2">
                    <div className="flex-1 h-1.5 bg-dark-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-accent rounded-full"
                        style={{ width: `${market.strength}%` }}
                      />
                    </div>
                    <span className="text-sm text-gray-400">{market.strength}%</span>
                  </div>
                </td>
                <td className="p-4 text-right">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      onShowAutomation(market);
                    }}
                    className="premium-button px-3 py-1.5 text-sm"
                  >
                    Trade
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}