import { Activity, TrendingUp, TrendingDown } from "lucide-react";

interface LiveTrade {
  id: string;
  symbol: string;
  type: "buy" | "sell";
  profit: number;
  duration: string;
}

export default function LiveTradesCounter() {
  const liveTrades :LiveTrade[] = [
    {
      id: "1",
      symbol: "EURUSD",
      type: "buy",
      profit: 125.5,
      duration: "2h 15m",
    },
    {
      id: "2",
      symbol: "XAUUSD",
      type: "sell",
      profit: -45.2,
      duration: "45m",
    },
    {
      id: "3",
      symbol: "BTCUSD",
      type: "buy",
      profit: 350.75,
      duration: "1h 30m",
    },
  ];

  const totalProfit = liveTrades.reduce((sum, trade) => sum + trade.profit, 0);
  const profitableTrades = liveTrades.filter(
    (trade) => trade.profit > 0
  ).length;

  return (
    <div className="glass-panel rounded-xl p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Activity className="h-5 w-5 text-accent animate-pulse" />
          <span className="text-white font-medium">Live Trades</span>
        </div>
        <span className="px-2 py-1 bg-accent/10 text-accent rounded-full text-sm">
          {liveTrades.length} Active
        </span>
      </div>

      <div className="space-y-3">
        {liveTrades.map((trade) => (
          <div
            key={trade.id}
            className="flex items-center justify-between p-2 bg-dark-200/30 rounded-lg"
          >
            <div className="flex items-center space-x-3">
              <div
                className={`p-1.5 rounded-lg ${
                  trade.type === "buy" ? "bg-emerald-500/10" : "bg-red-500/10"
                }`}
              >
                {trade.type === "buy" ? (
                  <TrendingUp className="h-4 w-4 text-emerald-400" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-red-400" />
                )}
              </div>
              <div>
                <div className="text-white">{trade.symbol}</div>
                <div className="text-sm text-gray-400">{trade.duration}</div>
              </div>
            </div>
            <div
              className={`text-sm font-medium ${
                trade.profit >= 0 ? "text-emerald-400" : "text-red-400"
              }`}
            >
              {trade.profit >= 0 ? "+" : ""}
              {trade.profit.toFixed(2)}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-dark-300/30">
        <div className="flex items-center justify-between text-sm">
          <div className="text-gray-400">Total Profit</div>
          <div
            className={`font-medium ${
              totalProfit >= 0 ? "text-emerald-400" : "text-red-400"
            }`}
          >
            {totalProfit >= 0 ? "+" : ""}
            {totalProfit.toFixed(2)} USD
          </div>
        </div>
        <div className="flex items-center justify-between text-sm mt-2">
          <div className="text-gray-400">Win Rate</div>
          <div className="text-white font-medium">
            {((profitableTrades / liveTrades.length) * 100).toFixed(1)}%
          </div>
        </div>
      </div>
    </div>
  );
}
