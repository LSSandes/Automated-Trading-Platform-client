import React, { useState } from 'react';
import { 
  Brain, TrendingUp, TrendingDown, AlertTriangle, Clock, 
  BarChart2, Target, Zap, Shield, DollarSign, Users,
  ArrowRight, Calendar, Filter, Search
} from 'lucide-react';

interface TradePattern {
  id: string;
  name: string;
  description: string;
  winRate: number;
  profitFactor: number;
  avgProfit: number;
  occurrences: number;
  lastSeen: string;
  status: 'active' | 'inactive';
  type: 'bullish' | 'bearish' | 'neutral';
}

export default function AITradeAnalyzerView() {
  const [timeframe, setTimeframe] = useState('1W');
  const [searchQuery, setSearchQuery] = useState('');
  const [patternType, setPatternType] = useState('all');

  const patterns: TradePattern[] = [
    {
      id: '1',
      name: "Double Bottom Breakout",
      description: "Price forms two consecutive lows at similar levels followed by upward breakout",
      winRate: 78.5,
      profitFactor: 2.3,
      avgProfit: 125.50,
      occurrences: 45,
      lastSeen: "2 hours ago",
      status: 'active',
      type: 'bullish'
    },
    {
      id: '2',
      name: "RSI Divergence",
      description: "Price makes lower lows while RSI makes higher lows",
      winRate: 82.3,
      profitFactor: 2.8,
      avgProfit: 245.75,
      occurrences: 32,
      lastSeen: "4 hours ago",
      status: 'active',
      type: 'bullish'
    },
    {
      id: '3',
      name: "Moving Average Crossover",
      description: "Fast MA crosses above slow MA with volume confirmation",
      winRate: 75.8,
      profitFactor: 2.1,
      avgProfit: 98.25,
      occurrences: 67,
      lastSeen: "1 hour ago",
      status: 'active',
      type: 'neutral'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <Brain className="h-8 w-8 text-accent" />
          <div>
            <h1 className="text-3xl font-medium text-white tracking-tight">AI Trade Analysis</h1>
            <p className="text-gray-400 mt-1">Advanced pattern recognition and trade optimization</p>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="glass-panel rounded-xl p-4">
          <div className="text-gray-400 text-sm mb-1">Pattern Accuracy</div>
          <div className="text-2xl font-semibold text-white">92.5%</div>
          <div className="text-emerald-400 text-sm">+5.2% vs last week</div>
        </div>
        <div className="glass-panel rounded-xl p-4">
          <div className="text-gray-400 text-sm mb-1">Active Patterns</div>
          <div className="text-2xl font-semibold text-white">12</div>
          <div className="text-emerald-400 text-sm">3 new patterns found</div>
        </div>
        <div className="glass-panel rounded-xl p-4">
          <div className="text-gray-400 text-sm mb-1">Profit Optimization</div>
          <div className="text-2xl font-semibold text-emerald-400">+18.5%</div>
          <div className="text-emerald-400 text-sm">Improved win rate</div>
        </div>
        <div className="glass-panel rounded-xl p-4">
          <div className="text-gray-400 text-sm mb-1">Analysis Time</div>
          <div className="text-2xl font-semibold text-white">0.15s</div>
          <div className="text-emerald-400 text-sm">-25ms response time</div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div className="flex items-center space-x-4">
          <div className="flex rounded-lg bg-dark-200/30 p-1">
            {['1D', '1W', '1M', '3M'].map((period) => (
              <button
                key={period}
                onClick={() => setTimeframe(period)}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-all ${
                  timeframe === period 
                    ? 'bg-accent text-white' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {period}
              </button>
            ))}
          </div>

          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <select
              value={patternType}
              onChange={(e) => setPatternType(e.target.value)}
              className="pl-10 pr-8 py-2 bg-dark-200/30 text-gray-300 rounded-lg 
                       border border-dark-300/30 appearance-none cursor-pointer
                       focus:outline-none focus:ring-1 focus:ring-accent/50"
            >
              <option value="all">All Patterns</option>
              <option value="bullish">Bullish</option>
              <option value="bearish">Bearish</option>
              <option value="neutral">Neutral</option>
            </select>
          </div>
        </div>

        <div className="relative w-full sm:w-auto">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search patterns..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full sm:w-64 pl-10 pr-4 py-2 bg-dark-200/30 text-gray-300 rounded-lg 
                     border border-dark-300/30 focus:outline-none focus:ring-1 
                     focus:ring-accent/50 transition-all duration-300"
          />
        </div>
      </div>

      {/* Patterns Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {patterns.map((pattern) => (
          <div 
            key={pattern.id}
            className="glass-panel rounded-xl p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg ${
                  pattern.type === 'bullish' ? 'bg-emerald-500/10' :
                  pattern.type === 'bearish' ? 'bg-red-500/10' :
                  'bg-accent/10'
                }`}>
                  {pattern.type === 'bullish' ? (
                    <TrendingUp className="h-5 w-5 text-emerald-400" />
                  ) : pattern.type === 'bearish' ? (
                    <TrendingDown className="h-5 w-5 text-red-400" />
                  ) : (
                    <BarChart2 className="h-5 w-5 text-accent" />
                  )}
                </div>
                <div>
                  <h3 className="text-lg font-medium text-white">{pattern.name}</h3>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className={`text-sm ${
                      pattern.status === 'active' ? 'text-emerald-400' : 'text-gray-400'
                    }`}>
                      {pattern.status === 'active' ? 'Active' : 'Inactive'}
                    </span>
                    <span className="text-gray-400">•</span>
                    <span className="text-sm text-gray-400">{pattern.lastSeen}</span>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-gray-400 text-sm mb-4">{pattern.description}</p>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="glass-panel rounded-lg p-3">
                <div className="text-sm text-gray-400 mb-1">Win Rate</div>
                <div className="text-lg font-medium text-emerald-400">{pattern.winRate}%</div>
              </div>
              <div className="glass-panel rounded-lg p-3">
                <div className="text-sm text-gray-400 mb-1">Profit Factor</div>
                <div className="text-lg font-medium text-white">{pattern.profitFactor}</div>
              </div>
              <div className="glass-panel rounded-lg p-3">
                <div className="text-sm text-gray-400 mb-1">Avg. Profit</div>
                <div className="text-lg font-medium text-emerald-400">
                  ${pattern.avgProfit}
                </div>
              </div>
              <div className="glass-panel rounded-lg p-3">
                <div className="text-sm text-gray-400 mb-1">Occurrences</div>
                <div className="text-lg font-medium text-white">{pattern.occurrences}</div>
              </div>
            </div>

            <button className="w-full premium-button py-2 flex items-center justify-center">
              View Details
              <ArrowRight className="ml-2 h-4 w-4" />
            </button>
          </div>
        ))}
      </div>

      {/* AI Insights */}
      <div className="glass-panel rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <Brain className="h-6 w-6 text-accent" />
            <h2 className="text-lg font-medium text-white">AI Insights</h2>
          </div>
          <button className="text-accent hover:text-accent-dark transition-colors">
            View All
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-panel rounded-xl p-4">
            <div className="flex items-center space-x-3 mb-3">
              <Target className="h-5 w-5 text-emerald-400" />
              <h3 className="text-white font-medium">Optimal Trading Hours</h3>
            </div>
            <p className="text-sm text-gray-400">
              Your win rate is 23% higher during London session. Consider focusing your trades during these hours.
            </p>
          </div>

          <div className="glass-panel rounded-xl p-4">
            <div className="flex items-center space-x-3 mb-3">
              <AlertTriangle className="h-5 w-5 text-yellow-400" />
              <h3 className="text-white font-medium">Risk Alert</h3>
            </div>
            <p className="text-sm text-gray-400">
              Current market conditions show increased volatility. Consider reducing position sizes by 25%.
            </p>
          </div>

          <div className="glass-panel rounded-xl p-4">
            <div className="flex items-center space-x-3 mb-3">
              <Zap className="h-5 w-5 text-accent" />
              <h3 className="text-white font-medium">Pattern Detected</h3>
            </div>
            <p className="text-sm text-gray-400">
              New high-probability setup detected on EURUSD. Success rate: 85% based on historical data.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}