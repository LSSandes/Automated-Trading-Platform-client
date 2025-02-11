import { useMutation, useQueryClient } from '@tanstack/react-query';
import { sellixService, type CreateCheckoutParams } from '../services/sellix';
import { telegramService } from '../services/telegram';

export function useCreateCheckout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: CreateCheckoutParams) => {
      const checkout = await sellixService.createCheckout(params);
      
      // Send Telegram notification for new checkout
      try {
        await telegramService.sendMessage({
          chatId: process.env.VITE_TELEGRAM_ADMIN_CHAT_ID || '',
          text: `🛒 New checkout created!\n\nEmail: ${params.email}\nProduct: ${params.productId}`,
          parseMode: 'HTML'
        });
      } catch (error) {
        console.error('Failed to send Telegram notification:', error);
      }

      return checkout;
    },
    onSuccess: () => {
      // Invalidate relevant queries
      queryClient.invalidateQueries({ queryKey: ['subscriptions'] });
    }
  });
}