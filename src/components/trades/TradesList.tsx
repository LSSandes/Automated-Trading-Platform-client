import { useState } from "react";
import { Edit2, X } from "lucide-react";
import TradeCounts from "./TradeCounts";
import { MetatraderPositionConfig } from "@/types/trade";

interface TradesListProps {
  trades: MetatraderPositionConfig[];
  onModify?: (tradeId: string) => void;
  onClose?: (tradeId: string) => void;
}

export default function TradesList({
  trades,
  onModify,
  onClose,
}: TradesListProps) {
  const [filterType, setFilterType] = useState<"all" | "buy" | "sell">("all");

  const tradeCounts = trades.reduce(
    (acc, trade) => ({
      buys: acc.buys + (trade.type === "BUY" ? 1 : 0),
      sells: acc.sells + (trade.type === "SELL" ? 1 : 0),
    }),
    { buys: 0, sells: 0 }
  );
  const filteredTrades = trades.filter((trade) => {
    if (filterType === "all") return true;
    return trade.type === filterType.toUpperCase();
  });

  return (
    <div className="glass-panel rounded-xl">
      <div className="p-4 border-b border-dark-300/30">
        <div className="flex items-center justify-between">
          <TradeCounts
            total={trades.length}
            buys={tradeCounts.buys}
            sells={tradeCounts.sells}
          />

          {/* Filters and Bulk Actions */}
          <div className="flex items-center space-x-4">
            <select
              value={filterType}
              onChange={(e) =>
                setFilterType(e.target.value as "all" | "buy" | "sell")
              }
              className="px-4 py-2 bg-dark-200/30 text-gray-300 rounded-lg 
                       border border-dark-300/30 focus:outline-none focus:ring-1 
                       focus:ring-accent/50"
            >
              <option value="all">All Types</option>
              <option value="buy">Buy Only</option>
              <option value="sell">Sell Only</option>
            </select>

            {/* {selectedTrades.length > 0 && (
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleBulkModify}
                  className="flex items-center space-x-2 px-3 py-2 text-accent 
                           hover:bg-accent/10 rounded-lg transition-colors"
                >
                  <Edit2 className="h-4 w-4" />
                  <span>Modify ({selectedTrades.length})</span>
                </button>
                <button
                  onClick={handleBulkClose}
                  className="flex items-center space-x-2 px-3 py-2 text-red-400 
                           hover:bg-red-400/10 rounded-lg transition-colors"
                >
                  <X className="h-4 w-4" />
                  <span>Close ({selectedTrades.length})</span>
                </button>
              </div>
            )} */}
          </div>
        </div>
      </div>

      <div className="divide-dark-300/30 max-h-[300px] overflow-y-auto">
        {filteredTrades.map((trade) => (
          <div
            key={trade.id}
            className="p-4 hover:bg-dark-200/30 transition-colors"
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="text-white font-medium">{trade.symbol}</span>
                  <span className="text-gray-400">{trade.webhookName}</span>
                </div>
                <div className="text-sm text-gray-400 mt-1">
                  {trade.volume} lots @ {trade.openPrice}
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div
                  className={
                    trade.profit >= 0 ? "text-emerald-400" : "text-red-400"
                  }
                >
                  {trade.profit >= 0 ? "+" : ""}
                  {trade.profit.toFixed(2)} USD
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => onModify?.(trade.id)}
                    className="p-2 text-accent hover:bg-accent/10 rounded-lg transition-colors"
                  >
                    <Edit2 className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => onClose?.(trade.id)}
                    className="p-2 text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
