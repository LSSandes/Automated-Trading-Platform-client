import { Star, MessageCircle } from 'lucide-react';

interface SignalProvidersProps {
  copyingTraders: string[];
  onCopyTrader: (traderId: string, name: string, profit: number, winRate: number, price: number) => void;
  onChat: (traderId: string) => void;
  onViewChange: (view: string) => void;
}

const providers = [
  {
    id: "alex",
    name: "Alex Trading",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=80&h=80",
    profit: 32.5,
    winRate: 92,
    price: 49.99
  },
  {
    id: "pro",
    name: "Pro Signals",
    avatar: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=80&h=80",
    profit: 28.7,
    winRate: 88,
    price: 39.99
  },
  {
    id: "master",
    name: "Master Trader",
    avatar: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&w=80&h=80",
    profit: 45.2,
    winRate: 95,
    price: 59.99
  }
];

export default function SignalProviders({ copyingTraders, onCopyTrader, onChat, onViewChange }: SignalProvidersProps) {
  return (
    <div className="glass-panel rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-medium text-white">Signal Providers</h2>
        <div className="text-sm text-gray-400">{copyingTraders.length} active</div>
      </div>

      <div className="space-y-4">
        {providers.map((provider) => (
          <div 
            key={provider.id}
            className="glass-panel rounded-lg p-4 hover:bg-dark-200/30 transition-colors"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-3">
                <img
                  src={provider.avatar}
                  alt={provider.name}
                  className="w-10 h-10 rounded-full border border-accent/20"
                />
                <div>
                  <div className="text-white font-medium">{provider.name}</div>
                  <div className="flex items-center space-x-2 text-sm">
                    <div className="flex items-center text-yellow-400">
                      <Star className="h-4 w-4 mr-1 fill-current" />
                      <span>{provider.winRate}%</span>
                    </div>
                    <span className="text-emerald-400">+{provider.profit}%</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => onChat(provider.id)}
                  className="p-2 text-gray-400 hover:text-white hover:bg-dark-200/50 rounded-lg transition-all"
                >
                  <MessageCircle className="h-5 w-5" />
                </button>
                <button
                  onClick={() => onCopyTrader(
                    provider.id,
                    provider.name,
                    provider.profit,
                    provider.winRate,
                    provider.price
                  )}
                  className={`px-3 py-1.5 rounded-lg text-sm transition-all ${
                    copyingTraders.includes(provider.id)
                      ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30'
                      : 'premium-button'
                  }`}
                >
                  {copyingTraders.includes(provider.id) ? 'Stop Copy' : 'Copy'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button 
        onClick={() => onViewChange('leaderboard')}
        className="w-full mt-4 px-4 py-2 border border-accent/30 text-accent rounded-lg
                 hover:bg-accent/10 transition-all duration-300"
      >
        Browse More Traders
      </button>
    </div>
  );
}