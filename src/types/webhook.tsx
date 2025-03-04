export interface WebhookConfig {
  id: string;
  accountId: string;
  webhookName: string;
  symbol: string;
  isActive: boolean;
  isPublic: boolean;
  connectionStatus: boolean;
  orderDirection: string;
  webhookMode: string;
  tradeExecutionTime?: string;
  volume: number;
  stopLoss_pips: number;
  takeProfit_pips: number;
  successRate?: number;
  totalTrades?: number;
  appName?: string;
  hashedWebhook: string;
  price?: number;
}

export interface WebhookCardProps {
  webhook: WebhookConfig;
  onChangeColor: (id: string) => void;
  onToggleActive: (id: string) => void;
  onTogglePublic: (id: string) => void;
  onSetPrice?: (id: string, price: number, interval: string) => void;
}

export interface CloseOrderCardProps {
  closeOrder: CloseOrderConfig;
  onToggleActive: (id: number) => void;
  onTogglePublic: (id: number) => void;
}

export interface WebhookStats {
  id: string;
  webhookName: string;
  webhookMode: string;
  connectionStatus: boolean;
  tradeExecutionTime?: string;
  successRate?: number;
  totalTrades?: number;
  symbol: string;
  // color?: string;
  recentAlerts?: Alert[];
}

export interface Alert {
  id: string;
  type: "market_execution" | "modify_order" | "close_trade";
  symbol: string;
  message: string;
  timestamp: string;
  status: "success" | "pending" | "error";
  profitAmount?: number;
  profitPercentage?: number;
}

export interface WebhookStatsModalProps {
  isOpen: boolean;
  onClose: () => void;
  webhook: WebhookStats;
}

export interface EditWebhookModalProps {
  isOpen: boolean;
  onClose: () => void;
  webhook: WebhookConfig;
}

export interface EditCloseOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  closeOrder: CloseOrderConfig;
}

export interface MarketOrderStrategyProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface WebhookStateProps {
  webhooks: WebhookConfig[];
  error: object | string | null;
}

export interface CloseOrderStateProps {
  closeOrders: CloseOrderConfig[];
  error: object | string | null;
}

export interface CloseOrderConfig {
  id: number;
  accountId: string;
  webhookName: string;
  webhookMode: string;
  symbol: string;
  connectionStatus: boolean;
  tradeStartTime: string;
  hashedWebhook: string;
  isActive: boolean;
  isPublic: boolean;
}

export interface WebhookStatsModalProps {
  isOpen: boolean;
  onClose: () => void;
  webhook: WebhookStats;
}

export interface SetPriceModalProps {
  isOpen: boolean;
  onClose: () => void;
  webhook: {
    id: string;
    webhookName: string;
    currentPrice?: number;
    subscribers?: number;
  };
  onSavePrice: (price: number, interval: string) => void;
}

export interface RiskManagementModalProps {
  isOpen: boolean;
  onClose: () => void;
  webhook: {
    id: string;
    webhookName: string;
  };
  onSave: (settings: RiskSettings) => void;
}

export interface RiskSettings {
  newsFilter: boolean;
  maxDailyLoss: number;
  maxLossPercent: number;
  maxDrawdown: number;
  tradingHours: boolean;
  tradingSchedule: {
    timezone: string;
    startTime: string;
    endTime: string;
    days: string[];
  };
}

export interface WebhookApp {
  id: string;
  appName: string;
  description: string;
  icon: string;
}

export interface WebhookAppsModalProps {
  isOpen: boolean;
  onClose: () => void;
  webhook: WebhookConfig;
  accountName: string;
}

export interface NewWebhookModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface WebhookMenuProps {
  onEdit: () => void;
  // onChangeColor: () => void;
  onDelete: () => void;
  onSetPrice: () => void;
  onManageRisk: () => void;
  onManageApps: () => void;
  isPublic: boolean;
}

export interface CloseOrderMenuProps {
  onEdit: () => void;
  onDelete: () => void;
  onManageApps: () => void;
}

export interface CloseOrderAppModalProps {
  isOpen: boolean;
  onClose: () => void;
  closeOrder: CloseOrderConfig;
}
