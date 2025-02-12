import { TrendingUp, Users, MessageCircle, DollarSign } from 'lucide-react';

interface CopyTraderCardProps {
  name: string;
  profit: number;
  followers: number;
  winRate: number;
  isCopying: boolean;
  price: number;
  onCopyToggle: () => void;
  onChat: () => void;
}

export default function CopyTraderCard({
  name,
  profit,
  followers,
  winRate,
  isCopying,
  price,
  onCopyToggle,
  onChat,
}: CopyTraderCardProps) {
  const avatarUrl = `https://images.unsplash.com/photo-${
    name === "Alex Trading" ? "1560250097-0b93528c311a" :
    name === "Pro Signals" ? "1573497019940-1c28c88b4f3e" :
    "1566492031773-4f4e44671857"
  }?auto=format&fit=crop&w=80&h=80`;

  return (
    <div className="glass-panel glass-panel-hover rounded-xl p-6">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center space-x-3">
          <img
            src={avatarUrl}
            alt={name}
            className="w-12 h-12 rounded-full border-2 border-accent/20"
          />
          <div>
            <h3 className="text-lg font-medium text-white tracking-tight">{name}</h3>
            <div className="flex items-center space-x-4 mt-2">
              <div className="flex items-center text-gray-400">
                <Users className="h-4 w-4 mr-1" />
                <span className="text-sm">{followers}</span>
              </div>
              <div className="flex items-center text-emerald-400">
                <TrendingUp className="h-4 w-4 mr-1" />
                <span className="text-sm">{winRate}% Win</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={onChat}
            className="p-2 text-gray-400 hover:text-white hover:bg-dark-200/50 
                     rounded-lg transition-all duration-300"
          >
            <MessageCircle className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold text-emerald-400">+{profit}%</span>
            <p className="text-sm text-gray-400">Monthly Return</p>
          </div>
          <div className="flex flex-col items-end">
            <div className="flex items-center text-gray-300 mb-2">
              <DollarSign className="h-4 w-4 mr-1" />
              <span>{price}/month</span>
            </div>
            <button
              onClick={onCopyToggle}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                isCopying
                  ? 'bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30'
                  : 'premium-button'
              }`}
            >
              {isCopying ? 'Stop Copying' : 'Copy Trader'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}