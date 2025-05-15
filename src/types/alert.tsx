export interface AlertConfig {
  id: string;
  userId: number;
  orderType: string;
  webhookName: string;
  webhookMode: string;
  symbol: string;
  orderDirection: string;
  appName: string;
  volume: string;
  takeProfit: number;
  stopLoss: number;
  positionId_m: string;
  positionId_t: string;
  tradeStartTime: string;
  messageData: string;
  view: boolean;
  createdAt: string;
}

export interface AlertStateProps {
  error: object | string | null;
  alerts: AlertConfig[];
}
