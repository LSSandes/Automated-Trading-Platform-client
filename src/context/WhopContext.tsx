import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { env } from "@/config/env";

type WhopContextType = {
  hasAccess: boolean;
  loading: boolean;
};

const WhopContext = createContext<WhopContextType>({
  hasAccess: false,
  loading: false,
});

export const useWhop = () => useContext(WhopContext);

export const WhopProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [hasAccess, setHasAccess] = useState(false);
  const [loading, setLoading] = useState(true);

  const getHasAccess = async () => {
    setLoading(true);
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
      }
    } catch (error) {
      setHasAccess(false);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getHasAccess();
  }, []);

  return (
    <WhopContext.Provider value={{ hasAccess, loading }}>
      {children}
    </WhopContext.Provider>
  );
};
