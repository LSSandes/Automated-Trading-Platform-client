import { 
  X, Clock, ArrowRight, 
  AlertCircle, CheckCircle2, Webhook, Users,
  PlayCircle, Edit3, BarChart2, DollarSign
} from 'lucide-react';
import TradeProgressionCard from './TradeProgressionCard';

interface Trade {
  id: string;
  type: 'webhook' | 'copy_trade';
  webhookAction?: 'market_execution' | 'modify_order' | 'close_trade';
  title: string;
  message: string;
  timestamp: string;
  status: 'success' | 'pending' | 'error';
  tradeStatus?: 'active' | 'closed';
  profitAmount?: number;
  profitPercentage?: number;
  traderAvatar?: string;
  symbol?: string;
  entryPrice?: number;
  currentPrice?: number;
  stopLoss?: number;
  takeProfit?: number;
  volume?: number;
  duration?: string;
  tradeType?: 'buy' | 'sell';
}

interface TradeDetailsModalProps {
  trade: Trade;
  isOpen: boolean;
  onClose: () => void;
}

export default function TradeDetailsModal({ trade, isOpen, onClose }: TradeDetailsModalProps) {
  if (!isOpen) return null;

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle2 className="h-5 w-5 text-emerald-400" />;
      case 'pending':
        return <Clock className="h-5 w-5 text-yellow-400" />;
      case 'error':
        return <AlertCircle className="h-5 w-5 text-red-400" />;
      default:
        return null;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'webhook':
        return <Webhook className="h-5 w-5 text-accent" />;
      case 'copy_trade':
        return <Users className="h-5 w-5 text-purple-400" />;
      default:
        return null;
    }
  };

  const getWebhookActionIcon = (action?: string) => {
    switch (action) {
      case 'market_execution':
        return <PlayCircle className="h-4 w-4 text-emerald-400" />;
      case 'modify_order':
        return <Edit3 className="h-4 w-4 text-yellow-400" />;
      case 'close_trade':
        return <X className="h-4 w-4 text-red-400" />;
      default:
        return null;
    }
  };

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
            <div className="p-2 bg-dark-200/50 rounded-lg">
              {getTypeIcon(trade.type)}
            </div>
            <div>
              <div className="flex items-center space-x-3">
                {trade.type === 'copy_trade' && trade.traderAvatar && (
                  <img
                    src={trade.traderAvatar}
                    alt={trade.title}
                    className="w-8 h-8 rounded-full border-2 border-accent/20"
                  />
                )}
                <h3 className="text-xl font-medium text-white">{trade.title}</h3>
                {trade.type === 'webhook' && trade.webhookAction && (
                  <div className="flex items-center space-x-1.5 px-2 py-1 rounded-full bg-dark-200/50">
                    {getWebhookActionIcon(trade.webhookAction)}
                    <span className="text-xs text-gray-300">
                      {trade.webhookAction.replace('_', ' ')}
                    </span>
                  </div>
                )}
              </div>
              <div className="flex items-center space-x-3 mt-2">
                <span className="text-gray-400">{trade.timestamp}</span>
                <div className="flex items-center space-x-2">
                  {getStatusIcon(trade.status)}
                  <span className="text-sm capitalize">{trade.status}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Trade Progress */}
          {trade.tradeType && trade.entryPrice && trade.currentPrice && trade.stopLoss && trade.takeProfit && (
            <TradeProgressionCard
              symbol={trade.symbol || ''}
              entryPrice={trade.entryPrice}
              currentPrice={trade.currentPrice}
              stopLoss={trade.stopLoss}
              takeProfit={trade.takeProfit}
              type={trade.tradeType}
              profitAmount={trade.profitAmount}
              profitPercentage={trade.profitPercentage}
            />
          )}

          {/* Trade Details */}
          <div className="grid grid-cols-2 gap-4">
            <div className="glass-panel rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2 text-gray-400">
                  <BarChart2 className="h-4 w-4" />
                  <span>Symbol</span>
                </div>
                <span className="text-white font-medium">{trade.symbol || 'N/A'}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 text-gray-400">
                  <DollarSign className="h-4 w-4" />
                  <span>Volume</span>
                </div>
                <span className="text-white font-medium">{trade.volume || 'N/A'}</span>
              </div>
            </div>

            <div className="glass-panel rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2 text-gray-400">
                  <Clock className="h-4 w-4" />
                  <span>Duration</span>
                </div>
                <span className="text-white font-medium">{trade.duration || 'N/A'}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 text-gray-400">
                  <AlertCircle className="h-4 w-4" />
                  <span>Status</span>
                </div>
                <span className="text-white font-medium capitalize">{trade.tradeStatus || 'N/A'}</span>
              </div>
            </div>
          </div>

          {/* Message */}
          <div className="glass-panel rounded-xl p-4">
            <h4 className="text-gray-400 mb-2">Message</h4>
            <p className="text-white">{trade.message}</p>
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-3">
            <button className="premium-button-outline px-4 py-2" onClick={onClose}>
              Close
            </button>
            {trade.tradeStatus === 'active' && (
              <button className="premium-button px-4 py-2 flex items-center">
                View Chart
                <ArrowRight className="ml-2 h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}