import { useSelector } from "@/app/store";
import { TrendingUp, TrendingDown, Clock, DollarSign } from "lucide-react";

interface ActiveTradesProps {
  onViewChange: (view: string) => void;
}

const trades = [
  {
    id: 1,
    symbol: "EURUSD",
    type: "buy",
    openPrice: 1.095,
    currentPrice: 1.098,
    profit: 150.5,
    profitPercentage: 1.25,
    time: "2h 15m",
  },
  {
    id: 2,
    symbol: "XAUUSD",
    type: "sell",
    openPrice: 2025.5,
    currentPrice: 2015.8,
    profit: 485.25,
    profitPercentage: 2.15,
    time: "45m",
  },
  {
    id: 3,
    symbol: "BTCUSD",
    type: "buy",
    openPrice: 39850,
    currentPrice: 40200,
    profit: 350.75,
    profitPercentage: 0.85,
    time: "1h 30m",
  },
];

export default function ActiveTrades({ onViewChange }: ActiveTradesProps) {
  const accounts = useSelector((state) => state.metaAccount.accounts);
  console.log("dashboard accounts--------->", accounts);
  return (
    <div className="glass-panel rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-medium text-white">Active Trades</h2>
        <div className="text-emerald-400">+$986.50 total</div>
      </div>

      <div className="space-y-4">
        {trades.map((trade) => (
          <div
            key={trade.id}
            className="glass-panel rounded-lg p-4 hover:bg-dark-200/30 transition-colors cursor-pointer"
            onClick={() => onViewChange("trades")}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-3">
                <div
                  className={`p-2 rounded-lg ${
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
                  <div className="text-white font-medium">{trade.symbol}</div>
                  <div className="flex items-center space-x-2 text-sm">
                    <span
                      className={
                        trade.type === "buy"
                          ? "text-emerald-400"
                          : "text-red-400"
                      }
                    >
                      {trade.type.toUpperCase()}
                    </span>
                    <span className="text-gray-400">@{trade.openPrice}</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div
                  className={
                    trade.profit >= 0 ? "text-emerald-400" : "text-red-400"
                  }
                >
                  {trade.profit >= 0 ? "+" : ""}
                  {trade.profit.toFixed(2)} USD
                </div>
                <div className="text-sm text-gray-400">
                  ({trade.profitPercentage >= 0 ? "+" : ""}
                  {trade.profitPercentage}%)
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm text-gray-400">
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4" />
                <span>{trade.time}</span>
              </div>
              <div className="flex items-center space-x-2">
                <DollarSign className="h-4 w-4" />
                <span>Current: {trade.currentPrice}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={() => onViewChange("trades")}
        className="w-full mt-4 px-4 py-2 border border-accent/30 text-accent rounded-lg
                 hover:bg-accent/10 transition-all duration-300"
      >
        View All Trades
      </button>
    </div>
  );
}
