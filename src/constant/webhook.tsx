import { WebhookApp } from "@/types/webhook";

export  const apps: WebhookApp[] = [
    {
      id: "mt5",
      appName: "MetaTrader",
      description: "Execute trades directly on MT5 platform",
      icon: "/mt5-logo.svg",
    },
    {
      id: "binance",
      appName: "Binance",
      description: "Trade crypto on Binance spot and futures",
      icon: "/binance-logo.svg",
    },
    {
      id: "bitget",
      appName: "Bitget",
      description: "Connect to Bitget exchange API",
      icon: "/bitget-logo.svg",
    },
    {
      id: "tradingview",
      appName: "TradingView",
      description: "Import alerts from TradingView",
      icon: "/tradingview-logo.svg",
    },
  ];

export const tooltips = {
  webhookName: "A unique name to identify your webhook",
  messageName: "Name of the message template that will be sent to TradingView",
  pair: "Trading pair symbol (e.g., BTCUSD, EURUSD)",
  orderType: "Type of order to execute",
  sizeType: "Choose between percentage of account balance or fixed lot size",
  stopLoss: "Price level where the trade will be closed to limit losses",
  takeProfit: "Price level where the trade will be closed to secure profits",
  partialClose: "Close only a portion of the open position",
  allTrades: "Close all open trades for this symbol",
  modifyPrice: "New price level for stop loss or take profit",
  closeType: "Method of closing the trade",
  fixedSize: "Trading volume in lots",
  percentageSize: "Position size as a percentage of account balance",
};