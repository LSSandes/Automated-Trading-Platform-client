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

export interface TradesStateProps {
  error: object | string | null;
  tradelockerOrdersHistory: TradelockerOrderHistoryParams[];
}
