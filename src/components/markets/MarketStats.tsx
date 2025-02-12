
interface MarketStatsProps {
  totalVolume: number;
  activeSignals: number;
  sentiment: string;
  volatilityIndex: number;
}

export default function MarketStats({ 
  totalVolume, 
  activeSignals, 
  sentiment, 
  volatilityIndex 
}: MarketStatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="glass-panel rounded-xl p-4">
        <div className="text-gray-400 text-sm mb-1">Total Volume</div>
        <div className="text-2xl font-semibold text-white">${totalVolume}B</div>
        <div className="text-emerald-400 text-sm">+12.5% vs yesterday</div>
      </div>
      <div className="glass-panel rounded-xl p-4">
        <div className="text-gray-400 text-sm mb-1">Active Signals</div>
        <div className="text-2xl font-semibold text-white">{activeSignals}</div>
        <div className="text-emerald-400 text-sm">8 new signals today</div>
      </div>
      <div className="glass-panel rounded-xl p-4">
        <div className="text-gray-400 text-sm mb-1">Market Sentiment</div>
        <div className="text-2xl font-semibold text-emerald-400">{sentiment}</div>
        <div className="text-emerald-400 text-sm">65% buy signals</div>
      </div>
      <div className="glass-panel rounded-xl p-4">
        <div className="text-gray-400 text-sm mb-1">Volatility Index</div>
        <div className="text-2xl font-semibold text-white">{volatilityIndex}</div>
        <div className="text-red-400 text-sm">High volatility</div>
      </div>
    </div>
  );
}