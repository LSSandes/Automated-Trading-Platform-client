import React, { useState } from 'react';
import { 
  AlertCircle, CheckCircle2, Clock, Webhook, Users, 
  TrendingUp, TrendingDown, ArrowRightLeft, X, 
  Edit3, PlayCircle
} from 'lucide-react';
import TradeDetailsModal from './TradeDetailsModal';

interface Alert {
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
  // Additional trade details
  symbol?: string;
  entryPrice?: number;
  currentPrice?: number;
  stopLoss?: number;
  takeProfit?: number;
  volume?: number;
  duration?: string;
  tradeType?: 'buy' | 'sell';
}

interface AlertsListProps {
  alerts: Alert[];
  expanded: boolean;
}

export default function AlertsList({ alerts, expanded }: AlertsListProps) {
  const [selectedTrade, setSelectedTrade] = useState<Alert | null>(null);

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

  const getWebhookActionLabel = (action?: string) => {
    switch (action) {
      case 'market_execution':
        return 'Market Execution';
      case 'modify_order':
        return 'Modify Order';
      case 'close_trade':
        return 'Close Trade';
      default:
        return '';
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

  const getProfitDisplay = (amount?: number, percentage?: number) => {
    if (amount === undefined) return null;
    
    const isPositive = amount >= 0;
    return (
      <div className={`flex items-center ${isPositive ? 'text-emerald-400' : 'text-red-400'}`}>
        {isPositive ? <TrendingUp className="h-4 w-4 mr-1" /> : <TrendingDown className="h-4 w-4 mr-1" />}
        <span className="font-medium">
          {isPositive ? '+' : ''}{amount.toFixed(2)} USD
          {percentage && ` (${isPositive ? '+' : ''}${percentage.toFixed(2)}%)`}
        </span>
      </div>
    );
  };

  return (
    <>
      <div className="grid grid-cols-1 gap-4">
        {alerts.map((alert) => (
          <button 
            key={alert.id}
            onClick={() => setSelectedTrade(alert)}
            className="w-full text-left glass-panel rounded-xl p-4 hover:bg-dark-200/30 transition-colors duration-300"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-4">
                <div className="p-2 bg-dark-200/50 rounded-lg">
                  {getTypeIcon(alert.type)}
                </div>
                <div>
                  <div className="flex items-center space-x-3 mb-1">
                    {alert.type === 'copy_trade' && alert.traderAvatar && (
                      <img 
                        src={alert.traderAvatar} 
                        alt={alert.title}
                        className="w-6 h-6 rounded-full border border-accent/20" 
                      />
                    )}
                    <h3 className="text-white font-medium">{alert.title}</h3>
                    {alert.type === 'webhook' && alert.webhookAction && (
                      <div className="flex items-center space-x-1.5 px-2 py-1 rounded-full bg-dark-200/50">
                        {getWebhookActionIcon(alert.webhookAction)}
                        <span className="text-xs text-gray-300">
                          {getWebhookActionLabel(alert.webhookAction)}
                        </span>
                      </div>
                    )}
                  </div>
                  <p className="text-gray-400 text-sm">{alert.message}</p>
                  <div className="flex items-center space-x-4 mt-2">
                    <span className="text-xs text-gray-500">{alert.timestamp}</span>
                    {alert.tradeStatus && (
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        alert.tradeStatus === 'active' 
                          ? 'bg-accent/10 text-accent' 
                          : 'bg-gray-500/10 text-gray-400'
                      }`}>
                        {alert.tradeStatus.charAt(0).toUpperCase() + alert.tradeStatus.slice(1)}
                      </span>
                    )}
                    {getProfitDisplay(alert.profitAmount, alert.profitPercentage)}
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                {getStatusIcon(alert.status)}
              </div>
            </div>
          </button>
        ))}

        {expanded && (
          <button className="glass-panel rounded-xl p-4 text-center text-accent hover:bg-dark-200/30 transition-colors duration-300">
            Load More Alerts
          </button>
        )}
      </div>

      {selectedTrade && (
        <TradeDetailsModal 
          trade={selectedTrade}
          isOpen={true}
          onClose={() => setSelectedTrade(null)}
        />
      )}
    </>
  );
}