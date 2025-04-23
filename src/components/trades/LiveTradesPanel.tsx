import { MetatraderPositionConfig } from '@/types/trade';
import ProfitCard from './ProfitCard';
import TradesList from './TradesList';


interface LiveTradesPanelProps {
  trades: MetatraderPositionConfig[];
  onModify?: (tradeId: string) => void;
  onClose?: (tradeId: string) => void;
}

export default function LiveTradesPanel({ trades, onModify, onClose }: LiveTradesPanelProps) {
  const totalProfit = trades.reduce((sum, trade) => sum + trade.profit, 0);
  const dailyTarget = 1000;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      <div className="lg:col-span-1">
        <ProfitCard 
          activeProfit={totalProfit} 
          dailyTarget={dailyTarget}
        />
      </div>
      <div className="lg:col-span-3">
        <TradesList 
          trades={trades}
          onModify={onModify}
          onClose={onClose}
        />
      </div>
    </div>
  );
}