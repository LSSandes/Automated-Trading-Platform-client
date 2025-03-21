import { atom } from "jotai";
import type {
  User,
  Trade,
  Alert,
  WebhookConfig,
  TelegramConfig,
  Profile,
} from "../types";

// Auth
export const userAtom = atom<User | null>(null);
export const isAuthenticatedAtom = atom((get) => !!get(userAtom));

// Trading
export const activeTradesAtom = atom<Trade[]>([]);
export const tradingBalanceAtom = atom(0);
export const tradingStatsAtom = atom({
  winRate: 0,
  totalTrades: 0,
  profitFactor: 0,
  averageWin: 0,
  averageLoss: 0,
});

// Alerts & Notifications
export const alertsAtom = atom<Alert[]>([]);
export const unreadAlertsAtom = atom(
  (get) => get(alertsAtom).filter((alert) => !alert.read).length
);

// Webhooks
export const webhooksAtom = atom<WebhookConfig[]>([]);
export const activeWebhooksAtom = atom((get) =>
  get(webhooksAtom).filter((webhook) => webhook.isActive)
);

// Telegram Configuration
export const telegramConfigAtom = atom<TelegramConfig>({
  enabled: false,
  notifications: {
    trades: true,
    signals: true,
    alerts: true,
    performance: false,
    risk: true,
  },
});

// UI State
export const sidebarCollapsedAtom = atom(false);
export const activeViewAtom = atom("dashboard");
export const themeAtom = atom<"light" | "dark">("dark");

//SideMenu
export const collapsedAtom = atom<boolean>(false);

//Profile

export const profileAtom = atom<Profile | null>(null);

//Account

export const accountNameAtom = atom<string>("");

//trade filter

export const selectedAccountAtom = atom<string>("");
export const selectedAccountTypeAtom = atom<string>("MetaTrader");

//open trade action type (market order, close order, modify order)

export const actionTypeAtom = atom<string>("create");
export const allTradesAtom = atom<boolean>(false);

export const trailingStopLossAtom = atom<boolean>(false);

export const messageDataAtom = atom<string>("");
