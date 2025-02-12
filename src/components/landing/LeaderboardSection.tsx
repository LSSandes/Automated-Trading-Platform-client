import { useState } from 'react';
import { Trophy, TrendingUp, Users, Star, ArrowRight, DollarSign, Clock, BarChart2 } from 'lucide-react';

interface Trader {
  id: string;
  name: string;
  avatar: string;
  profit: number;
  winRate: number;
  trades: number;
  followers: number;
  monthlyReturn: number;
  averageTrade: number;
  tradingTime: string;
  verified: boolean;
}

const topTraders: Trader[] = [
  {
    id: '1',
    name: "Alex Trading",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=80&h=80",
    profit: 892450.50,
    winRate: 92.5,
    trades: 1234,
    followers: 892,
    monthlyReturn: 45.8,
    averageTrade: 725.65,
    tradingTime: "2 years",
    verified: true
  },
  {
    id: '2',
    name: "Pro Signals",
    avatar: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=80&h=80",
    profit: 654320.75,
    winRate: 88.3,
    trades: 856,
    followers: 654,
    monthlyReturn: 38.2,
    averageTrade: 764.39,
    tradingTime: "1.5 years",
    verified: true
  },
  {
    id: '3',
    name: "Master Trader",
    avatar: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&w=80&h=80",
    profit: 1245680.25,
    winRate: 95.1,
    trades: 2341,
    followers: 1243,
    monthlyReturn: 52.4,
    averageTrade: 532.11,
    tradingTime: "3 years",
    verified: true
  }
];

export default function LeaderboardSection() {
  const [selectedTrader, setSelectedTrader] = useState<Trader | null>(null);

  return (
    <div className="py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-accent/10 text-accent mb-8
                        border border-accent/20 backdrop-blur-sm">
            <Trophy className="h-4 w-4 mr-2" />
            <span>Top Performing Traders</span>
          </div>
          <h2 className="text-4xl font-bold text-white mb-4">
            Copy the Best Traders
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Follow and automatically copy trades from our top-performing traders
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {topTraders.map((trader, index) => (
            <div 
              key={trader.id}
              className={`glass-panel rounded-xl p-6 transition-all duration-300 hover:scale-[1.02] ${
                selectedTrader?.id === trader.id ? 'border-2 border-accent' : ''
              }`}
              onClick={() => setSelectedTrader(trader)}
            >
              {/* Rank Badge */}
              <div className="absolute -top-4 left-6">
                <div className={`px-4 py-1 rounded-full text-sm font-medium ${
                  index === 0 ? 'bg-yellow-500 text-black' :
                  index === 1 ? 'bg-gray-300 text-black' :
                  'bg-amber-700 text-white'
                }`}>
                  #{index + 1} Ranked
                </div>
              </div>

              {/* Trader Info */}
              <div className="flex items-center space-x-4 mb-6">
                <img
                  src={trader.avatar}
                  alt={trader.name}
                  className="w-16 h-16 rounded-full border-2 border-accent/20"
                />
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="text-xl font-bold text-white">{trader.name}</h3>
                    {trader.verified && (
                      <div className="text-xs px-2 py-1 bg-accent/10 text-accent rounded-full">
                        Verified
                      </div>
                    )}
                  </div>
                  <div className="flex items-center space-x-3 mt-1">
                    <div className="flex items-center text-emerald-400">
                      <TrendingUp className="h-4 w-4 mr-1" />
                      <span>{trader.winRate}% Win Rate</span>
                    </div>
                    <span className="text-gray-400">•</span>
                    <div className="flex items-center text-gray-400">
                      <Users className="h-4 w-4 mr-1" />
                      <span>{trader.followers.toLocaleString()} followers</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="glass-panel rounded-lg p-3">
                  <div className="flex items-center space-x-2 text-gray-400 text-sm mb-1">
                    <DollarSign className="h-4 w-4" />
                    <span>Total Profit</span>
                  </div>
                  <div className="text-emerald-400 font-medium">
                    ${trader.profit.toLocaleString()}
                  </div>
                </div>
                <div className="glass-panel rounded-lg p-3">
                  <div className="flex items-center space-x-2 text-gray-400 text-sm mb-1">
                    <BarChart2 className="h-4 w-4" />
                    <span>Monthly Return</span>
                  </div>
                  <div className="text-emerald-400 font-medium">
                    +{trader.monthlyReturn}%
                  </div>
                </div>
                <div className="glass-panel rounded-lg p-3">
                  <div className="flex items-center space-x-2 text-gray-400 text-sm mb-1">
                    <Star className="h-4 w-4" />
                    <span>Avg Trade</span>
                  </div>
                  <div className="text-white font-medium">
                    ${trader.averageTrade.toFixed(2)}
                  </div>
                </div>
                <div className="glass-panel rounded-lg p-3">
                  <div className="flex items-center space-x-2 text-gray-400 text-sm mb-1">
                    <Clock className="h-4 w-4" />
                    <span>Experience</span>
                  </div>
                  <div className="text-white font-medium">
                    {trader.tradingTime}
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <button className="premium-button w-full flex items-center justify-center">
                Copy Trader
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="glass-panel rounded-xl p-6 text-center">
            <DollarSign className="h-8 w-8 text-accent mx-auto mb-4" />
            <div className="text-3xl font-bold text-white mb-2">$4.8M+</div>
            <div className="text-gray-400">Total Profit Copied</div>
          </div>
          <div className="glass-panel rounded-xl p-6 text-center">
            <Users className="h-8 w-8 text-accent mx-auto mb-4" />
            <div className="text-3xl font-bold text-white mb-2">15K+</div>
            <div className="text-gray-400">Active Copiers</div>
          </div>
          <div className="glass-panel rounded-xl p-6 text-center">
            <Star className="h-8 w-8 text-accent mx-auto mb-4" />
            <div className="text-3xl font-bold text-white mb-2">92.5%</div>
            <div className="text-gray-400">Average Win Rate</div>
          </div>
          <div className="glass-panel rounded-xl p-6 text-center">
            <Clock className="h-8 w-8 text-accent mx-auto mb-4" />
            <div className="text-3xl font-bold text-white mb-2">0.04s</div>
            <div className="text-gray-400">Copy Latency</div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <button className="premium-button inline-flex items-center px-8 py-3">
            <Trophy className="h-5 w-5 mr-2" />
            View Full Leaderboard
          </button>
          <p className="text-gray-400 mt-4">
            Join thousands of traders already copying our top performers
          </p>
        </div>
      </div>
    </div>
  );
}