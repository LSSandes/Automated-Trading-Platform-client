import React, { useState } from 'react';
import { Bell, Filter, Search } from 'lucide-react';
import AlertsList from '../components/AlertsList';

export default function AlertsView() {
  const [filterType, setFilterType] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const alerts = [
    {
      id: '1',
      type: 'webhook',
      webhookAction: 'market_execution',
      title: 'EURUSD Buy Signal',
      message: 'Buy EURUSD at 1.0950, SL: 1.0930, TP: 1.0980',
      timestamp: '2 minutes ago',
      status: 'success',
      tradeStatus: 'active',
      profitAmount: 125.50,
      profitPercentage: 1.25,
      symbol: 'EURUSD',
      entryPrice: 1.0950,
      currentPrice: 1.0965,
      stopLoss: 1.0930,
      takeProfit: 1.0980,
      volume: 1.0,
      duration: '2h 15m',
      tradeType: 'buy'
    },
    {
      id: '2',
      type: 'copy_trade',
      title: 'Alex Trading',
      message: 'Opened XAUUSD long position',
      timestamp: '5 minutes ago',
      status: 'pending',
      tradeStatus: 'active',
      profitAmount: -45.20,
      profitPercentage: -0.45,
      traderAvatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=80&h=80',
      symbol: 'XAUUSD',
      entryPrice: 2015.50,
      currentPrice: 2014.80,
      stopLoss: 2010.00,
      takeProfit: 2025.00,
      volume: 0.5,
      duration: '45m',
      tradeType: 'buy'
    },
    {
      id: '3',
      type: 'webhook',
      webhookAction: 'modify_order',
      title: 'NAS100 Modify Order',
      message: 'Modified SL to 17680, TP to 17580',
      timestamp: '10 minutes ago',
      status: 'success',
      tradeStatus: 'active',
      profitAmount: 180.30,
      profitPercentage: 1.8,
      symbol: 'NAS100',
      entryPrice: 17550,
      currentPrice: 17620,
      stopLoss: 17680,
      takeProfit: 17580,
      volume: 1.0,
      duration: '1h 30m',
      tradeType: 'sell'
    },
    {
      id: '4',
      type: 'webhook',
      webhookAction: 'close_trade',
      title: 'GBPUSD Close Trade',
      message: 'Closed GBPUSD position at 1.2650',
      timestamp: '15 minutes ago',
      status: 'success',
      tradeStatus: 'closed',
      profitAmount: 345.60,
      profitPercentage: 3.45,
      symbol: 'GBPUSD',
      entryPrice: 1.2600,
      currentPrice: 1.2650,
      volume: 2.0,
      duration: '4h 20m',
      tradeType: 'buy'
    },
    {
      id: '5',
      type: 'copy_trade',
      title: 'Pro Signals',
      message: 'Closed BTCUSD position with +2.3% profit',
      timestamp: '20 minutes ago',
      status: 'success',
      tradeStatus: 'closed',
      profitAmount: 230.50,
      profitPercentage: 2.3,
      traderAvatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=80&h=80',
      symbol: 'BTCUSD',
      entryPrice: 42150,
      currentPrice: 42300,
      volume: 0.1,
      duration: '3h 45m',
      tradeType: 'buy'
    }
  ];

  const filteredAlerts = alerts.filter(alert => {
    const matchesType = filterType === 'all' || alert.type === filterType;
    const matchesSearch = 
      alert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alert.message.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <Bell className="h-8 w-8 text-accent" />
          <div>
            <h1 className="text-3xl font-medium text-white tracking-tight">Alerts</h1>
            <p className="text-gray-400 mt-1">Monitor your trading signals and notifications</p>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Filter className="h-5 w-5 text-gray-400" />
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="bg-dark-200/30 text-gray-300 pl-3 pr-8 py-2 rounded-lg 
                       border border-dark-300/30 appearance-none cursor-pointer
                       focus:outline-none focus:ring-1 focus:ring-accent/50"
            >
              <option value="all">All Alerts</option>
              <option value="webhook">Webhook Signals</option>
              <option value="copy_trade">Copy Trades</option>
            </select>
          </div>
        </div>

        <div className="relative w-full sm:w-auto">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search alerts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full sm:w-64 pl-10 pr-4 py-2 bg-dark-200/30 text-gray-300 rounded-lg 
                     border border-dark-300/30 focus:outline-none focus:ring-1 
                     focus:ring-accent/50 transition-all duration-300"
          />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="glass-panel rounded-xl p-4">
          <div className="text-gray-400 text-sm mb-1">Total Alerts</div>
          <div className="text-2xl font-semibold text-white">{alerts.length}</div>
        </div>
        <div className="glass-panel rounded-xl p-4">
          <div className="text-gray-400 text-sm mb-1">Active Trades</div>
          <div className="text-2xl font-semibold text-white">
            {alerts.filter(a => a.tradeStatus === 'active').length}
          </div>
        </div>
        <div className="glass-panel rounded-xl p-4">
          <div className="text-gray-400 text-sm mb-1">Today's Profit</div>
          <div className="text-2xl font-semibold text-emerald-400">
            +${alerts.reduce((sum, alert) => sum + (alert.profitAmount || 0), 0).toFixed(2)}
          </div>
        </div>
      </div>

      {/* Alerts List */}
      <AlertsList alerts={filteredAlerts} expanded={true} />
    </div>
  );
}