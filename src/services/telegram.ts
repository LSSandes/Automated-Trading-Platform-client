import axios from 'axios';
import { env } from '../config/env';

const TELEGRAM_API_BASE = `https://api.telegram.org/bot${env.TELEGRAM_API_TOKEN}`;

interface SendMessageParams {
  chatId: string;
  text: string;
  parseMode?: 'HTML' | 'Markdown';
  disableNotification?: boolean;
}

interface TradeAlert {
  symbol: string;
  type: 'buy' | 'sell';
  entryPrice: number;
  stopLoss?: number;
  takeProfit?: number;
  profit?: number;
  lots?: number;
}

export const telegramService = {
  sendMessage: async ({ chatId, text, parseMode = 'HTML', disableNotification = false }: SendMessageParams) => {
    try {
      const response = await axios.post(`${TELEGRAM_API_BASE}/sendMessage`, {
        chat_id: chatId,
        text,
        parse_mode: parseMode,
        disable_notification: disableNotification
      });
      return response.data;
    } catch (error) {
      console.error('Failed to send Telegram message:', error);
      throw error;
    }
  },

  sendTradeAlert: async (chatId: string, trade: TradeAlert) => {
    const message = `
🔔 <b>Trade Alert</b>

${trade.type === 'buy' ? '🟢 BUY' : '🔴 SELL'} ${trade.symbol}
Entry: ${trade.entryPrice}
${trade.stopLoss ? `SL: ${trade.stopLoss}` : ''}
${trade.takeProfit ? `TP: ${trade.takeProfit}` : ''}
${trade.lots ? `Size: ${trade.lots} lots` : ''}
${trade.profit ? `P/L: ${trade.profit > 0 ? '✅' : '❌'} ${trade.profit}` : ''}
`;

    return telegramService.sendMessage({
      chatId,
      text: message,
      parseMode: 'HTML'
    });
  },

  sendErrorAlert: async (chatId: string, error: string) => {
    const message = `
⚠️ <b>Error Alert</b>

${error}

Time: ${new Date().toISOString()}
`;

    return telegramService.sendMessage({
      chatId,
      text: message,
      parseMode: 'HTML'
    });
  },

  sendAccountAlert: async (chatId: string, {
    type,
    message,
    balance,
    equity
  }: {
    type: 'margin' | 'equity' | 'balance';
    message: string;
    balance: number;
    equity: number;
  }) => {
    const alertMessage = `
⚠️ <b>${type.toUpperCase()} Alert</b>

${message}

Balance: $${balance.toFixed(2)}
Equity: $${equity.toFixed(2)}
Time: ${new Date().toISOString()}
`;

    return telegramService.sendMessage({
      chatId,
      text: alertMessage,
      parseMode: 'HTML'
    });
  }
};