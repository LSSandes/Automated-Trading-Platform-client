import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { env } from "@/config/env";

type WhopContextType = {
  hasAccess: boolean;
};

const WhopContext = createContext<WhopContextType>({
  hasAccess: false,
});

export const useWhop = () => useContext(WhopContext);

export const WhopProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [hasAccess, setHasAccess] = useState(false);
  const getHasAccess = async () => {
    const whopToken = localStorage.getItem("whopToken");
    const product_id = env.PRODUCT_ID;
    try {
      const response = await axios.post(`${env.BASE_URL}/auth/check`, {
        product_id,
        whopToken,
      });
      console.log("Whop API Response ============>", response.data.data);
      if (response.data.data.access) {
        setHasAccess(true);
      } else {
        setHasAccess(false);
      }
    } catch (error) {
      console.error("Error checking access:", error);
    }
  };
  useEffect(() => {
    getHasAccess();
  }, []);

  return (
    <WhopContext.Provider value={{ hasAccess }}>
      {children}
    </WhopContext.Provider>
  );
};
