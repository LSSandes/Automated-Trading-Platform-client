import { Plus, Wallet, TrendingUp, TrendingDown } from 'lucide-react';

const accounts = [
  {
    name: "MT5 Demo",
    balance: 10000,
    profit: 1250.50,
    change: 12.5,
    type: "demo"
  },
  {
    name: "MT4 Live",
    balance: 25000,
    profit: -450.25,
    change: -1.8,
    type: "live"
  },
  {
    name: "Binance Futures",
    balance: 15000,
    profit: 850.75,
    change: 5.7,
    type: "live"
  }
];

export default function AccountsOverview() {
  return (
    <div className="glass-panel rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-medium text-white">Connected Accounts</h2>
        <button className="p-2 text-gray-400 hover:text-white hover:bg-dark-200/50 rounded-lg transition-all">
          <Plus className="h-5 w-5" />
        </button>
      </div>

      <div className="space-y-4">
        {accounts.map((account, index) => (
          <div 
            key={index}
            className="glass-panel rounded-lg p-4 hover:bg-dark-200/30 transition-colors"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-dark-200/50 rounded-lg">
                  <Wallet className="h-4 w-4 text-accent" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-white font-medium">{account.name}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      account.type === 'live'
                        ? 'bg-emerald-500/20 text-emerald-400'
                        : 'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {account.type.toUpperCase()}
                    </span>
                  </div>
                  <div className="text-sm text-gray-400 mt-1">
                    ${account.balance.toLocaleString()}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className={`flex items-center ${
                  account.change >= 0 ? 'text-emerald-400' : 'text-red-400'
                }`}>
                  {account.change >= 0 ? (
                    <TrendingUp className="h-4 w-4 mr-1" />
                  ) : (
                    <TrendingDown className="h-4 w-4 mr-1" />
                  )}
                  <span>{account.change}%</span>
                </div>
                <div className={`text-sm ${
                  account.profit >= 0 ? 'text-emerald-400' : 'text-red-400'
                }`}>
                  {account.profit >= 0 ? '+' : ''}{account.profit.toFixed(2)} USD
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button className="w-full mt-4 px-4 py-2 border border-accent/30 text-accent rounded-lg
                       hover:bg-accent/10 transition-all duration-300">
        Manage Accounts
      </button>
    </div>
  );
}