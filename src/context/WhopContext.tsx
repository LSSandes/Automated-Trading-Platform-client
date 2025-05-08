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
    try {
      // const response = await axios.get(
      //   `https://access.api.whop.com/check/${env.PRODUCT_ID}`,
      //   {
      //     headers: {
      //       Authorization: `Bearer ${whopToken}`,
      //     },
      //   }
      // );
      const response = await axios.get(`/api/whop/check/${env.PRODUCT_ID}`, {
        headers: {
          Authorization: `Bearer ${whopToken}`,
        },
      });
      if (response.data.access) {
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
