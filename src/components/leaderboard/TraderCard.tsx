import { 
  TrendingUp, Users, Shield, Star, MessageCircle, 
  ArrowRight, DollarSign, Activity, BarChart2
} from 'lucide-react';

interface TraderCardProps {
  trader: {
    id: string;
    rank: number;
    name: string;
    avatar: string;
    verified: boolean;
    winRate: number;
    performance: Record<string, number>;
    followers: number;
    trades: number;
    assets: string[];
    subscription: {
      price: number;
      interval: string;
    };
  };
  timeframe: string;
  selected: boolean;
  onSelect: (traderId: string) => void;
}

export default function TraderCard({ trader, timeframe, selected, onSelect }: TraderCardProps) {
  return (
    <div 
      className={`glass-panel glass-panel-hover rounded-xl p-6 transition-all duration-300 ${
        selected ? 'border-2 border-accent' : ''
      }`}
      onClick={() => onSelect(trader.id)}
    >
      {/* Rank Badge */}
      <div className="absolute -top-3 -right-3">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
          trader.rank === 1 ? 'bg-yellow-500 text-black' :
          trader.rank === 2 ? 'bg-gray-300 text-black' :
          trader.rank === 3 ? 'bg-amber-700 text-white' :
          'bg-dark-300 text-gray-400'
        }`}>
          #{trader.rank}
        </div>
      </div>

      {/* Trader Info */}
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <img
              src={trader.avatar}
              alt={trader.name}
              className="w-12 h-12 rounded-full border-2 border-accent/20"
            />
            {trader.verified && (
              <div className="absolute -top-1 -right-1 bg-accent rounded-full p-0.5">
                <Shield className="h-3 w-3 text-white" />
              </div>
            )}
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="text-lg font-medium text-white">{trader.name}</h3>
              <div className="flex items-center space-x-1 text-yellow-400">
                <Star className="h-4 w-4 fill-current" />
                <span className="text-sm">{trader.winRate}%</span>
              </div>
            </div>
            <div className="flex items-center space-x-3 mt-1">
              <div className="flex items-center text-emerald-400">
                <TrendingUp className="h-4 w-4 mr-1" />
                <span>+{trader.performance[timeframe]}%</span>
              </div>
              <span className="text-gray-400">•</span>
              <div className="flex items-center text-gray-400">
                <Users className="h-4 w-4 mr-1" />
                <span>{trader.followers.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Performance Chart */}
      <div className="h-24 mb-6 relative">
        <div className="absolute inset-0 bg-gradient-to-t from-accent/5 to-transparent rounded-lg"></div>
        <div className="absolute bottom-0 left-0 w-full h-px bg-accent/20"></div>
        <div className="absolute left-0 top-0 h-full w-px bg-accent/20"></div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="glass-panel rounded-lg p-3">
          <div className="flex items-center space-x-2 text-gray-400 text-sm mb-1">
            <Activity className="h-4 w-4" />
            <span>Win Rate</span>
          </div>
          <div className="text-lg font-medium text-white">{trader.winRate}%</div>
        </div>
        <div className="glass-panel rounded-lg p-3">
          <div className="flex items-center space-x-2 text-gray-400 text-sm mb-1">
            <BarChart2 className="h-4 w-4" />
            <span>Total Trades</span>
          </div>
          <div className="text-lg font-medium text-white">{trader.trades}</div>
        </div>
      </div>

      {/* Assets */}
      <div className="flex flex-wrap gap-2 mb-6">
        {trader.assets.map((asset) => (
          <span 
            key={asset}
            className="px-2 py-1 text-xs rounded-lg bg-dark-200/50 text-gray-300"
          >
            {asset}
          </span>
        ))}
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <DollarSign className="h-4 w-4 text-gray-400" />
          <span className="text-gray-300">
            ${trader.subscription.price}/{trader.subscription.interval.charAt(0)}
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <button className="p-2 text-gray-400 hover:text-white hover:bg-dark-200/50 rounded-lg transition-all">
            <MessageCircle className="h-5 w-5" />
          </button>
          <button className="premium-button px-4 py-2 flex items-center">
            Copy Trader
            <ArrowRight className="ml-2 h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}