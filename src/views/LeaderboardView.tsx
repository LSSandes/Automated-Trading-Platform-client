import React, { useState } from 'react';
import { 
  Trophy, Search, Filter, ChevronDown, Users, ArrowRight,
  TrendingUp, Star, Shield, DollarSign, Clock, BarChart2
} from 'lucide-react';
import GlobalStats from '../components/leaderboard/GlobalStats';
import CategoryTabs from '../components/leaderboard/CategoryTabs';
import TraderCard from '../components/leaderboard/TraderCard';

// Mock traders data with more realistic and impressive stats
const traders = [
  {
    id: '1',
    rank: 1,
    name: "Alex Trading",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=80&h=80",
    verified: true,
    winRate: 92.5,
    performance: {
      daily: 2.3,
      weekly: 15.8,
      monthly: 45.2,
      allTime: 245.8
    },
    followers: 12445,
    trades: 1234,
    assets: ["EURUSD", "GBPUSD", "USDJPY"],
    subscription: {
      price: 49.99,
      interval: "monthly"
    },
    stats: {
      avgTrade: 325.50,
      bestTrade: 2850.75,
      avgHoldTime: "2h 15m",
      riskReward: 1.5
    }
  },
  {
    id: '2',
    rank: 2,
    name: "Pro Signals",
    avatar: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=80&h=80",
    verified: true,
    winRate: 88.3,
    performance: {
      daily: 1.8,
      weekly: 12.5,
      monthly: 38.7,
      allTime: 198.4
    },
    followers: 8923,
    trades: 856,
    assets: ["BTCUSD", "ETHUSD", "XAUUSD"],
    subscription: {
      price: 39.99,
      interval: "monthly"
    },
    stats: {
      avgTrade: 285.25,
      bestTrade: 2150.50,
      avgHoldTime: "4h 30m",
      riskReward: 1.8
    }
  },
  {
    id: '3',
    rank: 3,
    name: "Master Trader",
    avatar: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&w=80&h=80",
    verified: true,
    winRate: 95.1,
    performance: {
      daily: 3.2,
      weekly: 18.5,
      monthly: 52.8,
      allTime: 312.5
    },
    followers: 15678,
    trades: 2341,
    assets: ["NAS100", "US30", "XAUUSD"],
    subscription: {
      price: 59.99,
      interval: "monthly"
    },
    stats: {
      avgTrade: 425.75,
      bestTrade: 3450.25,
      avgHoldTime: "1h 45m",
      riskReward: 2.1
    }
  },
  // Add more traders...
];

const featuredTrader = {
  name: "Alex Trading",
  avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=80&h=80",
  verified: true,
  description: "Professional forex trader with 5+ years of experience. Specializing in algorithmic trading and risk management.",
  performance: {
    monthly: 45.2,
    yearly: 245.8
  },
  followers: 12445,
  testimonials: [
    {
      name: "John D.",
      content: "Made $15,000 in my first month copying Alex's trades!",
      profit: "+32.5%"
    },
    {
      name: "Sarah M.",
      content: "Best trading signals I've ever followed. Consistent profits.",
      profit: "+28.7%"
    }
  ]
};

export default function LeaderboardView() {
  const [filterType, setFilterType] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [timeframe, setTimeframe] = useState('weekly');
  const [selectedTrader, setSelectedTrader] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <Trophy className="h-8 w-8 text-accent" />
          <div>
            <h1 className="text-3xl font-medium text-white tracking-tight">Leaderboard</h1>
            <p className="text-gray-400 mt-1">Follow and copy top-performing traders</p>
          </div>
        </div>
        <button className="premium-button flex items-center">
          <Users className="h-5 w-5 mr-2" />
          Become a Signal Provider
        </button>
      </div>

      {/* Featured Trader */}
      <div className="glass-panel rounded-xl p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Trader Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-4 mb-6">
              <div className="relative">
                <img
                  src={featuredTrader.avatar}
                  alt={featuredTrader.name}
                  className="w-20 h-20 rounded-full border-2 border-accent/20"
                />
                {featuredTrader.verified && (
                  <div className="absolute -top-1 -right-1 bg-accent rounded-full p-1">
                    <Shield className="h-4 w-4 text-white" />
                  </div>
                )}
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h2 className="text-2xl font-bold text-white">{featuredTrader.name}</h2>
                  <div className="px-2 py-1 bg-yellow-500/20 text-yellow-400 text-sm rounded-full">
                    #1 Ranked
                  </div>
                </div>
                <p className="text-gray-400 mt-2">{featuredTrader.description}</p>
              </div>
            </div>

            {/* Performance Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
              <div className="glass-panel rounded-lg p-4">
                <div className="flex items-center space-x-2 text-gray-400 mb-1">
                  <TrendingUp className="h-4 w-4" />
                  <span>Monthly</span>
                </div>
                <div className="text-xl font-bold text-emerald-400">
                  +{featuredTrader.performance.monthly}%
                </div>
              </div>
              <div className="glass-panel rounded-lg p-4">
                <div className="flex items-center space-x-2 text-gray-400 mb-1">
                  <Star className="h-4 w-4" />
                  <span>Yearly</span>
                </div>
                <div className="text-xl font-bold text-emerald-400">
                  +{featuredTrader.performance.yearly}%
                </div>
              </div>
              <div className="glass-panel rounded-lg p-4">
                <div className="flex items-center space-x-2 text-gray-400 mb-1">
                  <Users className="h-4 w-4" />
                  <span>Followers</span>
                </div>
                <div className="text-xl font-bold text-white">
                  {featuredTrader.followers.toLocaleString()}
                </div>
              </div>
              <div className="glass-panel rounded-lg p-4">
                <div className="flex items-center space-x-2 text-gray-400 mb-1">
                  <DollarSign className="h-4 w-4" />
                  <span>Subscription</span>
                </div>
                <div className="text-xl font-bold text-white">$49.99/m</div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-4">
              <button className="premium-button flex-1 py-3 flex items-center justify-center">
                Copy Trader
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
              <button className="flex-1 px-4 py-3 border border-accent/30 text-accent rounded-lg
                             hover:bg-accent/10 transition-all duration-300">
                View Profile
              </button>
            </div>
          </div>

          {/* Testimonials */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-white mb-4">Recent Results</h3>
            {featuredTrader.testimonials.map((testimonial, index) => (
              <div key={index} className="glass-panel rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white font-medium">{testimonial.name}</span>
                  <span className="text-emerald-400">{testimonial.profit}</span>
                </div>
                <p className="text-gray-400 text-sm">{testimonial.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Global Stats */}
      <GlobalStats />

      {/* Category Tabs */}
      <CategoryTabs 
        activeCategory={filterType} 
        onCategoryChange={setFilterType} 
      />

      {/* Filters */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <select
              value={timeframe}
              onChange={(e) => setTimeframe(e.target.value)}
              className="pl-10 pr-8 py-2 bg-dark-200/30 text-gray-300 rounded-lg 
                       border border-dark-300/30 appearance-none cursor-pointer
                       focus:outline-none focus:ring-1 focus:ring-accent/50"
            >
              <option value="daily">24H Performance</option>
              <option value="weekly">7D Performance</option>
              <option value="monthly">30D Performance</option>
              <option value="allTime">All Time</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
          </div>
        </div>

        <div className="relative w-full sm:w-auto">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name or trading style..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full sm:w-80 pl-10 pr-4 py-2 bg-dark-200/30 text-gray-300 rounded-lg 
                     border border-dark-300/30 focus:outline-none focus:ring-1 
                     focus:ring-accent/50 transition-all duration-300"
          />
        </div>
      </div>

      {/* Traders Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {traders.map((trader) => (
          <TraderCard
            key={trader.id}
            trader={trader}
            timeframe={timeframe}
            selected={selectedTrader === trader.id}
            onSelect={setSelectedTrader}
          />
        ))}
      </div>

      {/* CTA Section */}
      <div className="glass-panel rounded-xl p-8 text-center">
        <h3 className="text-2xl font-bold text-white mb-4">
          Want to Become a Signal Provider?
        </h3>
        <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
          Turn your trading expertise into passive income. Join our marketplace and start selling your signals to thousands of traders.
        </p>
        <button className="premium-button px-8 py-3 inline-flex items-center">
          Start Earning
          <ArrowRight className="ml-2 h-5 w-5" />
        </button>
      </div>
    </div>
  );
}