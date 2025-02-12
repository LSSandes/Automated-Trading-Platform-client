import { Trophy, TrendingUp, DollarSign } from 'lucide-react';

interface LeaderboardEntry {
  rank: number;
  name: string;
  profit: number;
  winRate: number;
  assets: string[];
  totalTrades: number;
  price: number;
  isCopying: boolean;
  onCopyToggle: () => void;
}

interface LeaderboardProps {
  entries: LeaderboardEntry[];
}

export default function Leaderboard({ entries }: LeaderboardProps) {
  const getAvatarUrl = (name: string) => `https://images.unsplash.com/photo-${
    name === "Alex Trading" ? "1560250097-0b93528c311a" :
    name === "Pro Signals" ? "1573497019940-1c28c88b4f3e" :
    "1566492031773-4f4e44671857"
  }?auto=format&fit=crop&w=80&h=80`;

  return (
    <div className="glass-panel rounded-xl overflow-hidden">
      <div className="p-4 border-b border-dark-300/50">
        <div className="flex items-center space-x-2">
          <Trophy className="h-5 w-5 text-yellow-500" />
          <h2 className="text-lg font-medium text-white tracking-tight">Top Traders Leaderboard</h2>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-dark-200/50">
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Rank</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Trader</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Assets</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Profit</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Win Rate</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Price</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Trades</th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-dark-300/50">
            {entries.map((entry) => (
              <tr key={entry.rank} className="hover:bg-dark-200/30 transition-colors duration-200">
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="flex items-center">
                    {entry.rank <= 3 ? (
                      <span className={`w-6 h-6 flex items-center justify-center rounded-full ${
                        entry.rank === 1 ? 'bg-gradient-to-br from-yellow-400 to-yellow-600' :
                        entry.rank === 2 ? 'bg-gradient-to-br from-gray-300 to-gray-500' :
                        'bg-gradient-to-br from-amber-600 to-amber-800'
                      } text-white text-xs font-bold shadow-lg`}>
                        {entry.rank}
                      </span>
                    ) : (
                      <span className="text-gray-400 font-medium">{entry.rank}</span>
                    )}
                  </div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="flex items-center space-x-3">
                    <img
                      src={getAvatarUrl(entry.name)}
                      alt={entry.name}
                      className="w-8 h-8 rounded-full border border-accent/20"
                    />
                    <div className="text-sm font-medium text-white">{entry.name}</div>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="flex flex-wrap gap-1">
                    {entry.assets.map((asset) => (
                      <span key={asset} className="px-2 py-1 text-xs rounded-full bg-dark-300/50 text-gray-300 backdrop-blur-sm">
                        {asset}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="flex items-center text-emerald-400">
                    <TrendingUp className="h-4 w-4 mr-1" />
                    <span>+{entry.profit}%</span>
                  </div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <span className="text-gray-300">{entry.winRate}%</span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="flex items-center text-gray-300">
                    <DollarSign className="h-4 w-4 mr-1" />
                    <span>{entry.price}/mo</span>
                  </div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <span className="text-gray-300">{entry.totalTrades}</span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-right">
                  <button
                    onClick={entry.onCopyToggle}
                    className={entry.isCopying ? 'premium-button-outline' : 'premium-button'}
                  >
                    {entry.isCopying ? 'Stop Copying' : 'Copy'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}