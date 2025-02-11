import React from 'react';
import { 
  X, TrendingUp, TrendingDown, Clock, ArrowRight, 
  AlertCircle, CheckCircle2, Webhook, Users,
  PlayCircle, Edit3, BarChart2, DollarSign
} from 'lucide-react';
import { formatCurrency } from '../../utils/format';

interface Trade {
  id: string;
  symbol: string;
  type: 'buy' | 'sell';
  openPrice: number;
  currentPrice: number;
  stopLoss?: number;
  takeProfit?: number;
  lot: number;
  profit: number;
  profitPercentage: number;
  time: string;
  source: {
    type: 'webhook' | 'copy_trade';
    name: string;
    avatar?: string;
  };
}

interface TradeDetailsModalProps {
  trade: Trade;
  isOpen: boolean;
  onClose: () => void;
  onModify?: () => void;
  onClose?: () => void;
}

export default function TradeDetailsModal({ 
  trade, 
  isOpen, 
  onClose, 
  onModify,
  onCloseTrade 
}: TradeDetailsModalProps) {
  if (!isOpen) return null;

  const isProfit = trade.profit > 0;
  const riskRewardRatio = trade.takeProfit && trade.stopLoss 
    ? Math.abs((trade.takeProfit - trade.openPrice) / (trade.openPrice - trade.stopLoss))
    : null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      
      <div className="glass-panel rounded-2xl w-full max-w-2xl z-10 p-0 overflow-hidden">
        {/* Header */}
        <div className="relative p-6 border-b border-dark-300/50">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 p-2 text-gray-400 hover:text-white 
                     hover:bg-dark-200/50 rounded-lg transition-all duration-300"
          >
            <X className="h-5 w-5" />
          </button>
          
          <div className="flex items-center space-x-4">
            <div className={`p-2 rounded-lg ${
              trade.source.type === 'webhook' 
                ? 'bg-accent/10' 
                : 'bg-purple-500/10'
            }`}>
              {trade.source.type === 'webhook' ? (
                <Webhook className="h-5 w-5 text-accent" />
              ) : (
                <Users className="h-5 w-5 text-purple-400" />
              )}
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-xl font-medium text-white">{trade.symbol}</h3>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  trade.type === 'buy'
                    ? 'bg-emerald-500/20 text-emerald-400'
                    : 'bg-red-500/20 text-red-400'
                }`}>
                  {trade.type.toUpperCase()}
                </span>
              </div>
              <div className="flex items-center space-x-2 mt-1">
                <span className="text-gray-400">{trade.source.name}</span>
                {trade.source.avatar && (
                  <img 
                    src={trade.source.avatar} 
                    alt={trade.source.name}
                    className="w-6 h-6 rounded-full border border-accent/20"
                  />
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Price Info */}
          <div className="grid grid-cols-3 gap-4">
            <div className="glass-panel rounded-lg p-4">
              <div className="text-sm text-gray-400 mb-1">Entry Price</div>
              <div className="text-lg font-medium text-white">{trade.openPrice}</div>
            </div>
            <div className="glass-panel rounded-lg p-4">
              <div className="text-sm text-gray-400 mb-1">Current Price</div>
              <div className={`text-lg font-medium ${
                trade.currentPrice > trade.openPrice 
                  ? 'text-emerald-400' 
                  : 'text-red-400'
              }`}>
                {trade.currentPrice}
              </div>
            </div>
            <div className="glass-panel rounded-lg p-4">
              <div className="text-sm text-gray-400 mb-1">Lot Size</div>
              <div className="text-lg font-medium text-white">{trade.lot}</div>
            </div>
          </div>

          {/* Profit/Loss */}
          <div className="glass-panel rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="text-gray-400">Profit/Loss</div>
              <div className={`flex items-center ${isProfit ? 'text-emerald-400' : 'text-red-400'}`}>
                {isProfit ? (
                  <TrendingUp className="h-4 w-4 mr-2" />
                ) : (
                  <TrendingDown className="h-4 w-4 mr-2" />
                )}
                <span className="text-lg font-medium">
                  {formatCurrency(trade.profit)} ({trade.profitPercentage}%)
                </span>
              </div>
            </div>
          </div>

          {/* Risk Management */}
          {(trade.stopLoss || trade.takeProfit) && (
            <div className="glass-panel rounded-lg p-4 space-y-4">
              <h4 className="text-white font-medium">Risk Management</h4>
              
              <div className="grid grid-cols-2 gap-4">
                {trade.stopLoss && (
                  <div>
                    <div className="text-sm text-gray-400 mb-1">Stop Loss</div>
                    <div className="text-red-400">{trade.stopLoss}</div>
                  </div>
                )}
                {trade.takeProfit && (
                  <div>
                    <div className="text-sm text-gray-400 mb-1">Take Profit</div>
                    <div className="text-emerald-400">{trade.takeProfit}</div>
                  </div>
                )}
              </div>

              {riskRewardRatio && (
                <div className="pt-4 border-t border-dark-300/30">
                  <div className="text-sm text-gray-400 mb-1">Risk/Reward Ratio</div>
                  <div className="text-white">1:{riskRewardRatio.toFixed(2)}</div>
                </div>
              )}
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center space-x-4">
            {onModify && (
              <button 
                onClick={onModify}
                className="flex-1 premium-button py-2.5 flex items-center justify-center"
              >
                <Edit3 className="h-4 w-4 mr-2" />
                Modify Trade
              </button>
            )}
            {onCloseTrade && (
              <button 
                onClick={onCloseTrade}
                className="flex-1 px-4 py-2.5 text-red-400 border border-red-400/30 
                         rounded-lg hover:bg-red-400/10 transition-all duration-300"
              >
                <X className="h-4 w-4 mr-2" />
                Close Trade
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}