// import React, { useState } from 'react';
import {  TrendingUp,/*Plus,TrendingDown, Users, Shield, Clock, Webhook,*/ Bot,  DollarSign, BarChart2, Zap } from 'lucide-react';
import QuickActions from '../components/QuickActions';
import PerformanceChart from '../components/dashboard/PerformanceChart';
import ActiveTrades from '../components/dashboard/ActiveTrades';
import SignalProviders from '../components/dashboard/SignalProviders';
import RecentAlerts from '../components/dashboard/RecentAlerts';
import AccountsOverview from '../components/dashboard/AccountsOverview';
// import NewWebhookModal from '../components/webhooks/NewWebhookModal';

interface DashboardViewProps {
  onCopyTrader: (traderId: string, name: string, profit: number, winRate: number, price: number) => void;
  onChat: (traderId: string) => void;
  copyingTraders: string[];
  onViewChange: (view: string) => void;
}

export default function DashboardView({ onCopyTrader, onChat, copyingTraders, onViewChange }: DashboardViewProps) {
  // const [showWebhookModal, setShowWebhookModal] = useState(false);

  const stats = [
    {
      title: "Total Balance",
      value: "$48,256.32",
      change: "+12.5%",
      timeframe: "vs last month",
      icon: <DollarSign className="h-5 w-5 text-accent" />,
      trend: "up"
    },
    {
      title: "Total Profit",
      value: "$15,234.50",
      change: "+8.3%",
      timeframe: "vs last week",
      icon: <TrendingUp className="h-5 w-5 text-emerald-400" />,
      trend: "up"
    },
    {
      title: "Win Rate",
      value: "89.5%",
      change: "+2.1%",
      timeframe: "vs last week",
      icon: <BarChart2 className="h-5 w-5 text-purple-400" />,
      trend: "up"
    },
    {
      title: "Active Trades",
      value: "12",
      change: "+3",
      timeframe: "since yesterday",
      icon: <Bot className="h-5 w-5 text-accent" />,
      trend: "up"
    }
  ];

  // const handleCreateWebhook = (name: string) => {
  //   console.log('Creating webhook:', name);
  //   // setShowWebhookModal(false);
  // };

  return (
    <div className="space-y-8" style={{ height: "calc(100vh - 80px)" }}>
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-medium text-white tracking-tight">Dashboard</h1>
          <p className="text-gray-400 mt-1">Welcome back, your portfolio is up 23% this week</p>
        </div>
        <button className="premium-button flex items-center space-x-2 px-6 self-start lg:self-auto">
          <Zap className="h-5 w-5" />
          <div>
            <span className="block text-sm">Upgrade to Pro</span>
            <span className="block text-xs opacity-80">Unlock Advanced Features</span>
          </div>
        </button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="glass-panel rounded-xl p-6 transition-all duration-300 hover:scale-[1.02]">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-dark-200/50 rounded-lg">
                {stat.icon}
              </div>
              <div className={`text-sm ${
                stat.trend === 'up' ? 'text-emerald-400' : 'text-red-400'
              }`}>
                {stat.change}
              </div>
            </div>
            <div className="space-y-1">
              <div className="text-2xl font-semibold text-white">{stat.value}</div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">{stat.title}</span>
                <span className="text-xs text-gray-500">{stat.timeframe}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <QuickActions onNewWebhook={() => /*setShowWebhookModal(true)*/{}} onViewChange={onViewChange} />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Performance Chart */}
        <div className="lg:col-span-2">
          <PerformanceChart />
        </div>

        {/* Right Column - Active Trades */}
        <div>
          <ActiveTrades onViewChange={onViewChange} />
        </div>
      </div>

      {/* Bottom Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Connected Accounts */}
        <div>
          <AccountsOverview />
        </div>

        {/* Signal Providers */}
        <div>
          <SignalProviders 
            copyingTraders={copyingTraders}
            onCopyTrader={onCopyTrader}
            onChat={onChat}
            onViewChange={onViewChange}
          />
        </div>

        {/* Recent Alerts */}
        <div>
          <RecentAlerts />
        </div>
      </div>

      {/* <NewWebhookModal
        isOpen={showWebhookModal}
        onClose={() => setShowWebhookModal(false)}
        onCreateWebhook={handleCreateWebhook}
      /> */}
    </div>
  );
}