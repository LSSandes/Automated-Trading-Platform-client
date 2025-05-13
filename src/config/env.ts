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
  CLIENT_SECRET: import.meta.env.VITE_CLIENT_SECRET,
  REDIRECT_URL: import.meta.env.VITE_REDIRECT_URL,
  PRODUCT_ID: import.meta.env.VITE_PRODUCT_ID,

  BASIC_PLAN_1: import.meta.env.VITE_BASIC_PLAN_1,
  BASIC_PLAN_2: import.meta.env.VITE_BASIC_PLAN_2,
  BASIC_PLAN_3: import.meta.env.VITE_BASIC_PLAN_3,
  BASIC_PLAN_4: import.meta.env.VITE_BASIC_PLAN_4,
  BASIC_PLAN_5: import.meta.env.VITE_BASIC_PLAN_5,
  BASIC_PLAN_6: import.meta.env.VITE_BASIC_PLAN_6,
  BASIC_PLAN_7: import.meta.env.VITE_BASIC_PLAN_7,
  BASIC_PLAN_8: import.meta.env.VITE_BASIC_PLAN_8,
  BASIC_PLAN_9: import.meta.env.VITE_BASIC_PLAN_9,
  BASIC_PLAN_10: import.meta.env.VITE_BASIC_PLAN_10,
  BASIC_PLAN_11: import.meta.env.VITE_BASIC_PLAN_11,
  
  PREMIUM_PLAN_1: import.meta.env.VITE_PREMIUM_PLAN_1,
  PREMIUM_PLAN_2: import.meta.env.VITE_PREMIUM_PLAN_2,
  PREMIUM_PLAN_3: import.meta.env.VITE_PREMIUM_PLAN_3,
  PREMIUM_PLAN_4: import.meta.env.VITE_PREMIUM_PLAN_4,
  PREMIUM_PLAN_5: import.meta.env.VITE_PREMIUM_PLAN_5,
  PREMIUM_PLAN_6: import.meta.env.VITE_PREMIUM_PLAN_6,
  PREMIUM_PLAN_7: import.meta.env.VITE_PREMIUM_PLAN_7,
  PREMIUM_PLAN_8: import.meta.env.VITE_PREMIUM_PLAN_8,
  PREMIUM_PLAN_9: import.meta.env.VITE_PREMIUM_PLAN_9,
  PREMIUM_PLAN_10: import.meta.env.VITE_PREMIUM_PLAN_10,
  PREMIUM_PLAN_11: import.meta.env.VITE_PREMIUM_PLAN_11,
  
  ADVANCED_PLAN_1: import.meta.env.VITE_ADVANCED_PLAN_1,
  ADVANCED_PLAN_2: import.meta.env.VITE_ADVANCED_PLAN_2,
  ADVANCED_PLAN_3: import.meta.env.VITE_ADVANCED_PLAN_3,
  ADVANCED_PLAN_4: import.meta.env.VITE_ADVANCED_PLAN_4,
  ADVANCED_PLAN_5: import.meta.env.VITE_ADVANCED_PLAN_5,
  ADVANCED_PLAN_6: import.meta.env.VITE_ADVANCED_PLAN_6,
  ADVANCED_PLAN_7: import.meta.env.VITE_ADVANCED_PLAN_7,
  ADVANCED_PLAN_8: import.meta.env.VITE_ADVANCED_PLAN_8,
  ADVANCED_PLAN_9: import.meta.env.VITE_ADVANCED_PLAN_9,
  ADVANCED_PLAN_10: import.meta.env.VITE_ADVANCED_PLAN_10,
  ADVANCED_PLAN_11: import.meta.env.VITE_ADVANCED_PLAN_11,
  
  LIFETIME_PLAN_1: import.meta.env.VITE_LIFETIME_PLAN_1,

  BASIC_PLAN_ID: import.meta.env.VITE_BASIC_PLAN_ID,
  PREMIUM_PLAN_ID: import.meta.env.VITE_PREMIUM_PLAN_ID,
  ADVANCED_PLAN_ID: import.meta.env.VITE_ADVANCED_PLAN_ID,
  LIFETIME_PLAN_ID: import.meta.env.VITE_LIFETIME_PLAN_ID,
};
