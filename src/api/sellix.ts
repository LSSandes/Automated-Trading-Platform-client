// import axios from 'axios';
// import { config } from '../config/env';

// const sellixClient = axios.create({
//   baseURL: config.sellix.baseUrl,
//   headers: {
//     'X-Sellix-Merchant': config.sellix.webhookSecret,
//     'Content-Type': 'application/json'
//   }
// });

// export interface Product {
//   id: string;
//   title: string;
//   price: number;
//   description: string;
//   type: 'subscription' | 'one_time';
//   recurring_interval?: 'monthly' | 'yearly';
// }

// export const sellix = {
//   // Products
//   getProducts: async (): Promise<Product[]> => {
//     const response = await sellixClient.get('/products');
//     return response.data.data.products;
//   },

//   // Create checkout session
//   createCheckout: async (data: {
//     productId: string;
//     email: string;
//     customFields?: Record<string, string>;
//   }) => {
//     const response = await sellixClient.post('/payments', {
//       product_id: data.productId,
//       email: data.email,
//       custom_fields: data.customFields
//     });
//     return response.data;
//   },

//   // Verify webhook signature
//   verifyWebhook: (signature: string, body: string): boolean => {
//     // Implement webhook signature verification
//     return true; // Placeholder
//   }
// };