import { env } from "@/config/env";
import axios from "axios";
const api = axios.create({
  baseURL: `${env.BASE_URL}`,
  headers: {
    "Content-Type": "application/json",
    "ngrok-skip-browser-warning": true,
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("jwtToken"); // Adjust this if the key is different
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    if (error.response.status === 401) {
      localStorage.removeItem("jwtToken");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);
export default api;
