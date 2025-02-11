export interface MetaAccount {
  id: string;
  name: string;
  type: "demo" | "live";
  login: string;
  server: string;
  connectionStatus: "connected" | "disconnected" | "connecting";
  balance: number;
  equity: number;
  margin: number;
  freeMargin: number;
  leverage: number;
  currency: string;
  platform: "mt4" | "mt5";
  userId: string;
  trades?: {
    total: number;
    winning: number;
    losing: number;
  };
  winRate?: number;
  profit?: number;
  profitPercentage?: number;
}

export interface CreateAccountParams {
  name: string;
  login: string;
  password: string;
  server: string;
  platform?: "mt4" | "mt5";
  broker: string;
  userId: string;
}

export interface MetaAccountParams {
  accountId: string;
  accountName: string;
  platform: string;
  server: string;
  login: string;
  password: string;
}

export interface MetaAccountInfo {
  platform: string;
  broker: string;
  currency: string;
  server: string;
  balance: number;
  equity: number;
  margin: number;
  freeMargin: number;
  leverage: number;
  marginLevel: number;
  name: string;
  login: number;
  credit: number;
  tradeAllowed: boolean;
  investorMode: boolean;
  marginMode: string;
  type: string;
}

export interface MetaAccountStateProps {
  accounts: MetaAccountParams[];
  error: object | string | null;
}

export interface MetaAccountInfoProps {
  accountsInfo: MetaAccountInfo[];
  error: object | string | null;
}

export interface AccountCardProps {
  accountInfo: MetaAccountInfo | undefined;
  account: MetaAccountParams;
  isLoading: boolean;
  connectionStatus: boolean;
  onDelete: (id: string) => void;
  onRefresh: (id: string) => void;
  onSettings: (id: string) => void;
  onShowStats: () => void;
}
