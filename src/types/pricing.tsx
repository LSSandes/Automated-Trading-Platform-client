export interface PricingFeature {
    text: string;
    included: boolean;
  }
  
  export interface PricingTier {
    id: string;
    name: string;
    price: number;
    description: string;
    features: PricingFeature[];
    buttonText: string;
    isLifetime?: boolean;
    additionalAccountPrice?: number;
  }
  
  export interface TradingPlatform {
    id: string;
    name: string;
    icon: string;
    description: string;
    status: "available" | "coming-soon";
    features?: string[];
  }
  
  export interface AddonOption {
    id: string;
    count: number;
    name: string;
    description: string;
    price: number;
    icon: string;
    status: "available" | "coming-soon";
    features?: string[];  
  }
  