export interface TradeLockerUser {
  email: string;
  server: string;
}

export interface TradeLockerAccount {
  id: string;
  name: string;
  currency: string;
  accNum: string;
  accountBalance: string;
  status: string;
}

export interface TradeLockerStateProps {
  accounts: TradeLockerAccount[];
  error: object | string | null;
}

export interface TradeLockerInfoStateProps {
  accountInfo: TradeLockerInfoParams[];
  error: Object | string | null;
}

export interface TradeLockerInfoParams {
  accountId: string;
  accNum: string;
  balance: number;
  projectedBalance: number;
  availableFunds: number;
  blockedBalance: number;
  cashBalance: number;
  unsettledCash: number;
  withdrawalAvailable: number;
  stocksValue: number;
  optionValue: number;
  initialMarginReq: number;
  maintMarginReq: number;
  marginWarningLevel: number;
  blockedForStocks: number;
  stockOrdersReq: number;
  stopOutLevel: number;
  warningMarginReq: number;
  marginBeforeWarning: number;
  todayGross: number;
  todayNet: number;
  todayFees: number;
  todayVolume: number;
  todayTradesCount: number;
  openGrossPnL: number;
  openNetPnL: number;
  positionsCount: number;
  ordersCount: number;
}

export interface UserParams {
  accountType: string;
  email: string;
  server: string;
}

export interface TradeLockerAccountListProps {
  onLogout: () => void;
}
