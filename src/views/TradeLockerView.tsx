import { useEffect, useState } from "react";
import TradeLockerLogin from "@/components/tradelocker/TradeLockerLogin";
import TradeLockerAccountList from "@/components/tradelocker/TradeLockerAccountList";
export default function TradeLockerView() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const handleAuthenticationSuccess = (): void => {
    setIsAuthenticated(true);
  };
  const handleLogout = (): void => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    setIsAuthenticated(false);
  };
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      setIsAuthenticated(true);
    }
  }, []);
  return (
    <div className="w-full flex justify-center items-center h-full">
      {isAuthenticated ? (
        <TradeLockerAccountList onLogout={handleLogout} />
      ) : (
        <TradeLockerLogin onAuthSuccess={handleAuthenticationSuccess} />
      )}
    </div>
  );
}
