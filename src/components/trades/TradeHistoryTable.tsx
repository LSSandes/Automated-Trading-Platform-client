import React, { useState } from 'react';
import { 
  ArrowUpRight, ArrowDownRight, ChevronDown, Clock, 
  DollarSign, TrendingUp, TrendingDown, Webhook, Users,
  ExternalLink
} from 'lucide-react';
import { formatCurrency } from '../../utils/format';
import TradeDetailsModal from './TradeDetailsModal';

interface Trade {
  id: string;
  symbol: string;
  type: 'buy' | 'sell';
  openPrice: number;
  closePrice: number;
  profit: number;
  lots: number;
  openTime: string;
  closeTime: string;
  source: {
    type: 'webhook' | 'copy_trade';
    name: string;
    avatar?: string;
  };
}

interface TradeHistoryTableProps {
  trades: Trade[];
  onViewDetails?: (trade: Trade) => void;
}

export default function TradeHistoryTable({ trades, onViewDetails }: TradeHistoryTableProps) {
  const [selectedTrade, setSelectedTrade] = useState<Trade | null>(null);
  const [sortField, setSortField] = useState<keyof Trade>('openTime');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  const handleSort = (field: keyof Trade) => {
    if (sortField === field) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedTrades = [...trades].sort((a, b) => {
    const aValue = a[sortField];
    const bValue = b[sortField];
    const direction = sortDirection === 'asc' ? 1 : -1;

    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return aValue.localeCompare(bValue) * direction;
    }
    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return (aValue - bValue) * direction;
    }
    return 0;
  });

  const SortIcon = ({ field }: { field: keyof Trade }) => (
    <ChevronDown className={`h-4 w-4 transition-transform ${
      sortField === field 
        ? sortDirection === 'desc' 
          ? 'rotate-180' 
          : ''
        : 'text-gray-600'
    }`} />
  );

  return (
    <>
      <div className="glass-panel rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-dark-200/50">
                <th 
                  className="text-left text-xs font-medium text-gray-400 p-4 cursor-pointer"
                  onClick={() => handleSort('symbol')}
                >
                  <div className="flex items-center space-x-2">
                    <span>Symbol</span>
                    <SortIcon field="symbol" />
                  </div>
                </th>
                <th 
                  className="text-left text-xs font-medium text-gray-400 p-4 cursor-pointer"
                  onClick={() => handleSort('type')}
                >
                  <div className="flex items-center space-x-2">
                    <span>Type</span>
                    <SortIcon field="type" />
                  </div>
                </th>
                <th className="text-left text-xs font-medium text-gray-400 p-4">Source</th>
                <th 
                  className="text-left text-xs font-medium text-gray-400 p-4 cursor-pointer"
                  onClick={() => handleSort('openPrice')}
                >
                  <div className="flex items-center space-x-2">
                    <span>Entry</span>
                    <SortIcon field="openPrice" />
                  </div>
                </th>
                <th 
                  className="text-left text-xs font-medium text-gray-400 p-4 cursor-pointer"
                  onClick={() => handleSort('closePrice')}
                >
                  <div className="flex items-center space-x-2">
                    <span>Exit</span>
                    <SortIcon field="closePrice" />
                  </div>
                </th>
                <th 
                  className="text-left text-xs font-medium text-gray-400 p-4 cursor-pointer"
                  onClick={() => handleSort('lots')}
                >
                  <div className="flex items-center space-x-2">
                    <span>Size</span>
                    <SortIcon field="lots" />
                  </div>
                </th>
                <th 
                  className="text-left text-xs font-medium text-gray-400 p-4 cursor-pointer"
                  onClick={() => handleSort('profit')}
                >
                  <div className="flex items-center space-x-2">
                    <span>Profit</span>
                    <SortIcon field="profit" />
                  </div>
                </th>
                <th 
                  className="text-left text-xs font-medium text-gray-400 p-4 cursor-pointer"
                  onClick={() => handleSort('openTime')}
                >
                  <div className="flex items-center space-x-2">
                    <span>Time</span>
                    <SortIcon field="openTime" />
                  </div>
                </th>
                <th className="text-right text-xs font-medium text-gray-400 p-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-dark-300/20">
              {sortedTrades.map((trade) => (
                <tr 
                  key={trade.id}
                  onClick={() => setSelectedTrade(trade)}
                  className="hover:bg-dark-200/30 transition-colors cursor-pointer"
                >
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-white font-medium">{trade.symbol}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className={`flex items-center ${
                      trade.type === 'buy' ? 'text-emerald-400' : 'text-red-400'
                    }`}>
                      {trade.type === 'buy' ? (
                        <ArrowUpRight className="h-4 w-4 mr-1" />
                      ) : (
                        <ArrowDownRight className="h-4 w-4 mr-1" />
                      )}
                      {trade.type.toUpperCase()}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      {trade.source.type === 'webhook' ? (
                        <div className="p-1.5 bg-accent/10 rounded-lg">
                          <Webhook className="h-4 w-4 text-accent" />
                        </div>
                      ) : (
                        <div className="flex items-center space-x-2">
                          <img 
                            src={trade.source.avatar}
                            alt={trade.source.name}
                            className="w-6 h-6 rounded-full border border-accent/20"
                          />
                          <Users className="h-4 w-4 text-purple-400" />
                        </div>
                      )}
                      <span className="text-gray-300">{trade.source.name}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="text-gray-300">{trade.openPrice}</span>
                  </td>
                  <td className="p-4">
                    <span className="text-gray-300">{trade.closePrice}</span>
                  </td>
                  <td className="p-4">
                    <span className="text-gray-300">{trade.lots} lots</span>
                  </td>
                  <td className="p-4">
                    <div className={`flex items-center ${
                      trade.profit >= 0 ? 'text-emerald-400' : 'text-red-400'
                    }`}>
                      {trade.profit >= 0 ? (
                        <TrendingUp className="h-4 w-4 mr-1" />
                      ) : (
                        <TrendingDown className="h-4 w-4 mr-1" />
                      )}
                      <span className="font-medium">
                        {formatCurrency(trade.profit)}
                      </span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center space-x-2 text-gray-400">
                      <Clock className="h-4 w-4" />
                      <span>{trade.openTime}</span>
                    </div>
                  </td>
                  <td className="p-4 text-right">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        onViewDetails?.(trade);
                      }}
                      className="p-2 text-gray-400 hover:text-white hover:bg-dark-200/50 rounded-lg transition-all"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Table Footer */}
        <div className="p-4 border-t border-dark-300/30 flex items-center justify-between">
          <div className="text-sm text-gray-400">
            Showing {trades.length} trades
          </div>
          <div className="flex items-center space-x-2">
            <button className="px-3 py-1.5 text-sm border border-accent/30 text-accent rounded-lg
                           hover:bg-accent/10 transition-all duration-300">
              Export CSV
            </button>
            <button className="px-3 py-1.5 text-sm premium-button">
              Load More
            </button>
          </div>
        </div>
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