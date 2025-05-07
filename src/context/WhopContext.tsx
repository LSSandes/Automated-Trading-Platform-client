import React, { createContext, useContext, useEffect, useState } from "react";
import { createAppIframeSDK } from "@whop-apps/sdk";
// import { env } from "@/config/env";

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
    // const sdk = createAppIframeSDK({
    //   onMessage: {},
    // });

    // // Use / Save a reference to the sdk here.
    // // For example you may want to pass it down in a react context.
    setSdk(null);
    setIsAuthenticated(true);
    // return () => {
    //   sdk._cleanupTransport();
    // };
  }, []);

  return (
    <WhopContext.Provider value={{ sdk, isAuthenticated }}>
      {children}
    </WhopContext.Provider>
  );
};
