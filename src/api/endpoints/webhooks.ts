import { z } from 'zod';
import apiClient from '../client';
import type { WebhookConfig, ApiResponse } from '../../types';

const webhookSchema = z.object({
  name: z.string(),
  symbols: z.array(z.string()),
  type: z.enum(['basic', 'advanced']),
  settings: z.object({
    riskManagement: z.object({
      maxDailyLoss: z.number().optional(),
      maxDrawdown: z.number().optional(),
      newsFilter: z.boolean()
    }),
    tradingHours: z.object({
      enabled: z.boolean(),
      timezone: z.string(),
      start: z.string(),
      end: z.string(),
      days: z.array(z.string())
    }).optional()
  })
});

export const webhooks = {
  getAll: async () => {
    const response = await apiClient.get<ApiResponse<WebhookConfig[]>>('/webhooks');
    return response.data;
  },

  create: async (data: z.infer<typeof webhookSchema>) => {
    const validated = webhookSchema.parse(data);
    const response = await apiClient.post<ApiResponse<WebhookConfig>>('/webhooks', validated);
    return response.data;
  },

  update: async (id: string, data: Partial<z.infer<typeof webhookSchema>>) => {
    const response = await apiClient.patch<ApiResponse<WebhookConfig>>(`/webhooks/${id}`, data);
    return response.data;
  },

  delete: async (id: string) => {
    const response = await apiClient.delete<ApiResponse<void>>(`/webhooks/${id}`);
    return response.data;
  },

  getStats: async (id: string) => {
    const response = await apiClient.get<ApiResponse<{
      totalTrades: number;
      winRate: number;
      profit: number;
      subscribers?: number;
    }>>(`/webhooks/${id}/stats`);
    return response.data;
  }
};