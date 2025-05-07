import React, { createContext, useContext, useEffect, useState } from "react";
import { createAppIframeSDK } from "@whop-apps/sdk";
import { env } from "@/config/env";

type WhopContextType = {
  isAuthenticated: boolean;
  sdk: ReturnType<typeof createAppIframeSDK> | null;
};

const WhopContext = createContext<WhopContextType>({
  isAuthenticated: false,
  sdk: null,
});

export const useWhop = () => useContext(WhopContext);

export const WhopProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [sdk, setSdk] = useState<ReturnType<typeof createAppIframeSDK> | null>(
    null
  );
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const whopSdk = createAppIframeSDK({
      onMessage: {
        appPing: (data: any) => {
          if (data?.authenticated) {
            setIsAuthenticated(true);
          }
          return "app_pong";
        },
      },
      appId: env.WHOP_APPID,
    });

    setSdk(whopSdk);

    // Optional: auto-auth on mount

    return () => {
      whopSdk._cleanupTransport();
    };
  }, []);

  return (
    <WhopContext.Provider value={{ sdk, isAuthenticated }}>
      {children}
    </WhopContext.Provider>
  );
};
