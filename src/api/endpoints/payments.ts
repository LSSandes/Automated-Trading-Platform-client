import { z } from 'zod';
import apiClient from '../client';
import type { Plan, Subscription, ApiResponse } from '../../types';

const paymentMethodSchema = z.object({
  type: z.enum(['card']),
  card: z.object({
    number: z.string(),
    expMonth: z.number(),
    expYear: z.number(),
    cvc: z.string()
  })
});

export const payments = {
  getPlans: async () => {
    const response = await apiClient.get<ApiResponse<Plan[]>>('/payments/plans');
    return response.data;
  },

  getSubscription: async () => {
    const response = await apiClient.get<ApiResponse<Subscription>>('/payments/subscription');
    return response.data;
  },

  subscribe: async (planId: string, paymentMethod: z.infer<typeof paymentMethodSchema>) => {
    const validated = paymentMethodSchema.parse(paymentMethod);
    const response = await apiClient.post<ApiResponse<Subscription>>('/payments/subscribe', {
      planId,
      paymentMethod: validated
    });
    return response.data;
  },

  cancelSubscription: async () => {
    const response = await apiClient.post<ApiResponse<Subscription>>('/payments/cancel');
    return response.data;
  },

  updatePaymentMethod: async (paymentMethod: z.infer<typeof paymentMethodSchema>) => {
    const validated = paymentMethodSchema.parse(paymentMethod);
    const response = await apiClient.post<ApiResponse<void>>('/payments/payment-method', validated);
    return response.data;
  }
};