import { z } from 'zod';
import apiClient from '../client';
import type { Trade, ApiResponse } from '../../types';

const openTradeSchema = z.object({
  symbol: z.string(),
  type: z.enum(['buy', 'sell']),
  volume: z.number().positive(),
  stopLoss: z.number().optional(),
  takeProfit: z.number().optional()
});

export const trading = {
  getTrades: async (params?: {
    status?: 'open' | 'closed';
    from?: string;
    to?: string;
    limit?: number;
  }) => {
    const response = await apiClient.get<ApiResponse<Trade[]>>('/trading/trades', { params });
    return response.data;
  },

  openTrade: async (data: z.infer<typeof openTradeSchema>) => {
    const validated = openTradeSchema.parse(data);
    const response = await apiClient.post<ApiResponse<Trade>>('/trading/trades', validated);
    return response.data;
  },

  closeTrade: async (tradeId: string, params?: { partial?: number }) => {
    const response = await apiClient.post<ApiResponse<Trade>>(
      `/trading/trades/${tradeId}/close`,
      params
    );
    return response.data;
  },

  modifyTrade: async (tradeId: string, data: {
    stopLoss?: number;
    takeProfit?: number;
  }) => {
    const response = await apiClient.patch<ApiResponse<Trade>>(
      `/trading/trades/${tradeId}`,
      data
    );
    return response.data;
  },

  getStats: async (params?: {
    from?: string;
    to?: string;
  }) => {
    const response = await apiClient.get<ApiResponse<{
      totalTrades: number;
      winRate: number;
      profit: number;
      profitFactor: number;
    }>>('/trading/stats', { params });
    return response.data;
  }
};