import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { trading, webhooks } from '../api/endpoints';

// Trading Queries
export const useTrades = (params?: Parameters<typeof trading.getTrades>[0]) => {
  return useQuery({
    queryKey: ['trades', params],
    queryFn: () => trading.getTrades(params),
    staleTime: 30000, // Consider data fresh for 30 seconds
    refetchInterval: 60000 // Refetch every minute
  });
};

export const useTradeStats = (params?: Parameters<typeof trading.getStats>[0]) => {
  return useQuery({
    queryKey: ['tradeStats', params],
    queryFn: () => trading.getStats(params),
    staleTime: 60000 // Consider data fresh for 1 minute
  });
};

// Trading Mutations
export const useOpenTrade = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: trading.openTrade,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['trades'] });
      queryClient.invalidateQueries({ queryKey: ['tradeStats'] });
    }
  });
};

export const useCloseTrade = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ tradeId, params }: { tradeId: string; params?: { partial?: number } }) => 
      trading.closeTrade(tradeId, params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['trades'] });
      queryClient.invalidateQueries({ queryKey: ['tradeStats'] });
    }
  });
};

export const useModifyTrade = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ tradeId, data }: { 
      tradeId: string; 
      data: Parameters<typeof trading.modifyTrade>[1];
    }) => trading.modifyTrade(tradeId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['trades'] });
    }
  });
};

// Webhook Queries
export const useWebhooks = () => {
  return useQuery({
    queryKey: ['webhooks'],
    queryFn: webhooks.getAll,
    staleTime: 300000 // Consider data fresh for 5 minutes
  });
};

export const useWebhookStats = (webhookId: string) => {
  return useQuery({
    queryKey: ['webhookStats', webhookId],
    queryFn: () => webhooks.getStats(webhookId),
    staleTime: 60000 // Consider data fresh for 1 minute
  });
};