// import { useAtom } from 'jotai';
// import { tradesFilterAtom } from '../../store/tradesFilterStore';

export default function TradesTable() {
  // const [filters] = useAtom(tradesFilterAtom);

  // const filterTrades = (trades: any[]) => {
  //   return trades.filter(trade => {
  //     // Filter by trade type
  //     if (filters.tradeType !== 'All Types' && trade.type !== filters.tradeType) {
  //       return false;
  //     }

  //     // Filter by pair
  //     if (filters.pair !== 'All Pairs' && trade.symbol !== filters.pair) {
  //       return false;
  //     }

  //     // Filter by outcome
  //     if (filters.outcome !== 'All Outcomes') {
  //       const isProfit = trade.profit > 0;
  //       if (filters.outcome === 'Profit' && !isProfit) return false;
  //       if (filters.outcome === 'Loss' && isProfit) return false;
  //       if (filters.outcome === 'Break Even' && trade.profit !== 0) return false;
  //     }

  //     // Filter by search query
  //     if (filters.search) {
  //       const searchLower = filters.search.toLowerCase();
  //       return (
  //         trade.symbol.toLowerCase().includes(searchLower) ||
  //         trade.type.toLowerCase().includes(searchLower) ||
  //         trade.tradeBy.toLowerCase().includes(searchLower)
  //       );
  //     }

  //     return true;
  //   });
  // };

  // Rest of your TradesTable component implementation...
  return (
    <div className="glass-panel rounded-xl p-6">
      <h3 className="text-lg font-medium text-white mb-4">Trades History</h3>
      {/* Implement your trades table UI here using the filtered trades */}
    </div>
  );
}