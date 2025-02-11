import { env } from '@/config/env';
import axios from 'axios';
const api = axios.create({
    baseURL: `${env.BASE_URL}`,
    headers: {
      'Content-Type': 'application/json'
    }
  });

  export default api;