import React from 'react';
import { 
  TrendingUp, TrendingDown, Bot, DollarSign, 
  Percent, Zap, Clock 
} from 'lucide-react';
import { Market } from '../../types/market';

interface MarketChartProps {
  market: Market;
  onShowAutomation: () => void;
}

export default function MarketChart({ market, onShowAutomation }: MarketChartProps) {
  return (
    <div className="glass-panel rounded-xl p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h2 className="text-xl font-medium text-white">{market.symbol}</h2>
          <div className={`flex items-center ${
            market.change >= 0 ? 'text-emerald-400' : 'text-red-400'
          }`}>
            {market.change >= 0 ? (
              <TrendingUp className="h-5 w-5 mr-1" />
            ) : (
              <TrendingDown className="h-5 w-5 mr-1" />
            )}
            <span className="text-lg font-medium">
              ${market.price.toLocaleString()}
            </span>
            <span className="ml-2">
              ({market.change >= 0 ? '+' : ''}{market.change}%)
            </span>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <button 
            onClick={onShowAutomation}
            className="premium-button flex items-center space-x-2"
          >
            <Bot className="h-4 w-4" />
            <span>Create Strategy</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <div className="glass-panel rounded-lg p-3">
          <div className="flex items-center space-x-2 text-gray-400 text-sm mb-1">
            <DollarSign className="h-4 w-4" />
            <span>Volume</span>
          </div>
          <div className="text-white font-medium">
            ${(market.volume / 1e9).toFixed(1)}B
          </div>
        </div>
        <div className="glass-panel rounded-lg p-3">
          <div className="flex items-center space-x-2 text-gray-400 text-sm mb-1">
            <Percent className="h-4 w-4" />
            <span>Volatility</span>
          </div>
          <div className="text-white font-medium">{market.volatility}%</div>
        </div>
        <div className="glass-panel rounded-lg p-3">
          <div className="flex items-center space-x-2 text-gray-400 text-sm mb-1">
            <Zap className="h-4 w-4" />
            <span>Signal Strength</span>
          </div>
          <div className="text-white font-medium">{market.strength}%</div>
        </div>
        <div className="glass-panel rounded-lg p-3">
          <div className="flex items-center space-x-2 text-gray-400 text-sm mb-1">
            <Clock className="h-4 w-4" />
            <span>Updated</span>
          </div>
          <div className="text-white font-medium">Just now</div>
        </div>
      </div>

      <div className="relative aspect-video rounded-lg overflow-hidden bg-dark-200/30">
        <div 
          className="tradingview-widget-container" 
          style={{ height: "100%", width: "100%" }}
        >
          <iframe
            src={`https://s.tradingview.com/widgetembed/?frameElementId=tradingview_b3d06&symbol=${market.symbol}&interval=D&hidesidetoolbar=0&symboledit=1&saveimage=1&toolbarbg=dark&studies=%5B%5D&theme=dark&style=1&timezone=exchange`}
            style={{
              width: "100%",
              height: "100%",
              margin: "0 !important",
              padding: "0 !important",
            }}
            frameBorder="0"
            scrolling="no"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
}