import axios from 'axios';
import { env } from '../config/env';

const SELLIX_API_BASE = 'https://dev.sellix.io/v1';

const sellixClient = axios.create({
  baseURL: SELLIX_API_BASE,
  headers: {
    'Authorization': `Bearer ${env.SELLIX_API_KEY}`,
    'X-Sellix-Merchant': env.SELLIX_MERCHANT_ID,
    'Content-Type': 'application/json'
  }
});

export interface Product {
  id: string;
  title: string;
  price: number;
  description: string;
  type: 'subscription' | 'one_time';
  recurring_interval?: 'monthly' | 'yearly';
}

export interface CreateCheckoutParams {
  productId: string;
  email: string;
  customFields?: Record<string, string>;
  returnUrl?: string;
  webhookUrl?: string;
}

export const sellixService = {
  getProducts: async (): Promise<Product[]> => {
    try {
      const response = await sellixClient.get('/products');
      return response.data.data.products;
    } catch (error) {
      console.error('Failed to fetch Sellix products:', error);
      throw error;
    }
  },

  createCheckout: async ({
    productId,
    email,
    customFields,
    returnUrl,
    webhookUrl
  }: CreateCheckoutParams) => {
    try {
      const response = await sellixClient.post('/payments', {
        product_id: productId,
        email,
        custom_fields: customFields,
        return_url: returnUrl || `${env.APP_URL}/checkout/success`,
        webhook_url: webhookUrl || `${env.WEBHOOK_RECEIVER_URL}/webhooks/sellix`
      });
      return response.data;
    } catch (error) {
      console.error('Failed to create Sellix checkout:', error);
      throw error;
    }
  },

  // verifyWebhook: (signature: string, body: string): boolean => {
  //   // Implement webhook signature verification using env.SELLIX_WEBHOOK_SECRET
  //   // This is a placeholder - implement actual HMAC verification
  //   return true;
  // }
};