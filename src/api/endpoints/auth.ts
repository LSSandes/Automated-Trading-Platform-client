import { z } from 'zod';
import apiClient from '../client';
import type { User, ApiResponse } from '../../types';

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
});

const registerSchema = loginSchema.extend({
  name: z.string().min(2),
  acceptTerms: z.boolean().refine(val => val === true)
});

export const auth = {
  login: async (data: z.infer<typeof loginSchema>) => {
    const validated = loginSchema.parse(data);
    const response = await apiClient.post<ApiResponse<{ token: string; user: User }>>(
      '/auth/login',
      validated
    );
    return response.data;
  },

  register: async (data: z.infer<typeof registerSchema>) => {
    const validated = registerSchema.parse(data);
    const response = await apiClient.post<ApiResponse<{ token: string; user: User }>>(
      '/auth/register',
      validated
    );
    return response.data;
  },

  logout: async () => {
    await apiClient.post('/auth/logout');
    localStorage.removeItem('auth_token');
  },

  me: async () => {
    const response = await apiClient.get<ApiResponse<User>>('/auth/me');
    return response.data;
  },

  resetPassword: async (email: string) => {
    const response = await apiClient.post<ApiResponse<void>>('/auth/reset-password', { email });
    return response.data;
  }
};