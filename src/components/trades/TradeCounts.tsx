import { useState, useEffect } from 'react';
import { Activity, TrendingUp, TrendingDown } from 'lucide-react';
import { format } from 'date-fns';

interface TradeCountsProps {
  total: number;
  buys: number;
  sells: number;
}

export default function TradeCounts({ total, buys, sells }: TradeCountsProps) {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex items-center space-x-6 bg-dark-200/20 rounded-xl p-3">
      <div className="flex flex-col items-center">
        <div className="flex items-center space-x-2.5 px-3 py-1.5 bg-emerald-500/10 rounded-lg border border-emerald-500/20">
          <div className="w-2.5 h-2.5 bg-emerald-400 rounded-full animate-pulse"></div>
          <span className="text-emerald-400 font-medium tracking-wide">LIVE</span>
        </div>
        <span className="text-xs text-gray-400 mt-1.5">
          {format(currentTime, 'HH:mm:ss')}
        </span>
      </div>

      <div className="h-8 w-px bg-dark-300/50"></div>

      <div className="flex items-center space-x-4">
        <div className="flex flex-col items-center">
          <div className="flex items-center space-x-2 px-4 py-1.5 rounded-lg bg-dark-200/30 border border-dark-300/30">
            <Activity className="h-4 w-4 text-accent" />
            <span className="text-white font-medium">{total}</span>
          </div>
          <span className="text-xs text-gray-400 mt-1.5">Open</span>
        </div>

        <div className="flex flex-col items-center">
          <div className="flex items-center space-x-2 px-4 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
            <TrendingUp className="h-4 w-4 text-emerald-400" />
            <span className="text-emerald-400 font-medium">{buys}</span>
          </div>
          <span className="text-xs text-gray-400 mt-1.5">Buys</span>
        </div>

        <div className="flex flex-col items-center">
          <div className="flex items-center space-x-2 px-4 py-1.5 rounded-lg bg-red-500/10 border border-red-500/20">
            <TrendingDown className="h-4 w-4 text-red-400" />
            <span className="text-red-400 font-medium">{sells}</span>
          </div>
          <span className="text-xs text-gray-400 mt-1.5">Sells</span>
        </div>
      </div>
    </div>
  );
}