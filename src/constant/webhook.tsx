import { WebhookApp } from "@/types/webhook";

export const apps: WebhookApp[] = [
  {
    id: "mt5",
    appName: "MetaTrader",
    description: "Execute trades directly on MT4/MT5 platform",
    icon: "/mt5-logo.svg",
  },
  {
    id: "tradelocker",
    appName: "TradeLocker",
    description: "Execute trades directly on TradeLocker",
    icon: "/tradelocker-logo.svg",
  },
  {
    id: "acttrader",
    appName:  "ActTrader",
    description: "Execute trades directly on ActTrader",
    icon: "/acttrader_logo.svg",
  }
];

export const tooltips = {
  webhookName: "A unique name to identify your webhook",
  messageName: "Name of the message template that will be sent to TradingView",
  pair: "Trading pair symbol (e.g., BTCUSD, EURUSD)",
  orderDirection: "Type of order to execute",
  sizeType: "Choose between percentage of account balance or fixed lot size",
  stopLoss: "Price level where the trade will be closed to limit losses",
  takeProfit: "Price level where the trade will be closed to secure profits",
  partialClose: "Close only a portion of the open position",
  allTrades: "Close all open trades for this symbol",
  modifyPrice: "New price level for stop loss or take profit",
  closeType: "Method of closing the trade",
  fixedSize: "Trading volume in lots",
  percentageSize: "Position size as a percentage of account balance",
  modifyType: "Parameter you are trying to move as modify order",
  trailingStoploss:
    "A trailing stop-loss moves with the price to protect your profits.",
  orderType: "Market Order, stop order, limit order buy or sell signal",
  openPrice: " OpenPrice field is a final open price value.",
  stopLimitPrice: "Price at which the StopLimit order will be placed"
};
