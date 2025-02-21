export interface MetaStatsStateProps {
  error: object | string | null;
  stats: MetaTradesParams[];
  won_lost: WonLostParams[];
  trades_by_week: TradesByWeekParams[];
  trades_by_hour: TradesByHourParams[];
}

export interface WonLostParams {
  name: string;
  value: number;
}

export interface TradesByHourParams {
  hour: string;
  lostProfit: number;
  wonProfit: number;
}

export interface TradesByWeekParams {
  name: string;
  lostProfit: number;
  wonProfit: number;
}

export interface MetaTradesParams {
  _id: string;
  symbol: string;
  type: string;
  volume: number;
  openPrice: number;
  closePrice: number;
  profit: number;
  openTime: string;
  closeTime: string;
}

export interface MetaTotalStatsStateProps {
  error: object | string | null;
  totalStats: MetaTotalStatsParams;
}

export interface MetaTotalStatsParams {
  balance: number;
  equity: number;
  profit: number;
  todayWinRate: number;
  totalTrades: number;
  winTrades: number;
  avgHoldTime: number;
  successRate: number;
}

export interface MetaVisualTradesProps {
  error: object | string | null;
  visualTrades: MetaVisualTradesParams[];
}
export interface MetaVisualTradesParams {
  date: string;
  profit: number;
  loss: number;
}
