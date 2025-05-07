// Environment configuration for Vite
export const env = {
  // Meta API Configuration
  META_API_TOKEN: import.meta.env.VITE_META_API_TOKEN || "",

  // Telegram Configuration
  TELEGRAM_API_TOKEN: import.meta.env.VITE_TELEGRAM_API_TOKEN || "",
  TELEGRAM_BOT_USERNAME: "@AutomatedTraderBot",

  // Application URLs
  APP_URL: import.meta.env.VITE_APP_URL || "",
  LANDING_URL: import.meta.env.VITE_LANDING_URL || "/",

  // Sellix Configuration
  SELLIX_WEBHOOK_SECRET: import.meta.env.VITE_SELLIX_WEBHOOK_SECRET || "",

  // Analytics & Marketing
  GA_MEASUREMENT_ID: import.meta.env.VITE_GA_MEASUREMENT_ID || "",
  KLAVIO_PRIVATE_KEY: import.meta.env.VITE_KLAVIO_PRIVATE_KEY || "",

  // API Endpoints
  WEBHOOK_RECEIVER_URL:
    import.meta.env.VITE_WEBHOOK_RECEIVER_URL || "http://localhost:4000",
  TRADE_MANAGEMENT_URL:
    import.meta.env.VITE_TRADE_MANAGEMENT_URL || "http://localhost:4001",

  //
  VITE_TELEGRAM_API_TOKEN: import.meta.env.VITE_TELEGRAM_API_TOKEN,
  // Feature Flags
  IS_PRODUCTION: import.meta.env.PROD,
  IS_DEVELOPMENT: import.meta.env.DEV,
  MODE: import.meta.env.MODE,

  //Backend URL

  BASE_URL: import.meta.env.VITE_BASE_URL || "http://localhost:5000/api",
  AVATAR_URL: import.meta.env.VITE_IMAGE_URL || "http://localhost:5000",

  SELLIX_API_KEY: import.meta.env.SELLIX_API_KEY,
  SELLIX_MERCHANT_ID: import.meta.env.SELLIX_MERCHANT_ID,

  WHOP_APPID: import.meta.env.VITE_WHOP_APP_ID,
  CLINET_ID: import.meta.env.VITE_CLIENT_ID,
  REDIRECT_URL: import.meta.env.VITE_REDIRECT_URL
};
