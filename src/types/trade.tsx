export interface TradelockerOrderHistoryParams {
  id: string;
  symbol: string;
  routeId: string;
  qty: string;
  side: string;
  type: string;
  status: string;
  filledQty: string;
  avgPrice: string;
  price: string;
  stopPrice: string;
  validity: string;
  expireDate: string;
  createdDate: string;
  lastModified: string;
  isOpen: string;
  positionId: string;
  stopLoss: string;
  stopLossType: string;
  takeProfit: string;
  takeProfitType: string;
  strategyId: string;
}

export interface TotalTradesStats {
  totalProfit: number;
  averageProfit: number;
  totalTrades: number;
  avgTradeDuration: number;
  totalLots: number;
  bestTrade: number;
  worstTrade: number;
  averageRRRatio: number;
  currentMonthProfit: number;
  currentMonthLots: number;
  currentMonthTrades: number;
  profitPercent: number;
  lotsPercent: number;
  tradesPercent: number;
  winRate: number;
  lossRate: number;
  wonTrades: number;
  lostTrades: number;
  profitFactor: number;
  cagr: number;
  riskScore: String;
  maxDrawdown: number;
  sharpeRatio: number;
  sortinoRatio: number;
  winLossRatio: number;
  recoveryFactor: number;
  avgPositionSize: number;
  marginLevel: number;
  freeMargin: number;
  marginUsage: number;
}

export interface DayStats {
  trades: number;
  profit: number;
  bestTrade: number;
  worstTrade: number;
  winRate: number;
}
export interface MonthStats {
  [key: number]: DayStats; // Key is the day of the month (1-31)
}

export interface MetatraderPositionConfig {
  id: string;
  type: string;
  symbol: string;
  openPrice: number;
  currentPrice: number;
  volume: number;
  profit: number;
  time: string;
  webhookName: string;
}

export interface TradesStateProps {
  error: object | string | null;
  tradelockerOrdersHistory: TradelockerOrderHistoryParams[];
  totalTradesStats: TotalTradesStats;
  monthStats: MonthStats;
  positionsMetatrader: MetatraderPositionConfig[];
}
