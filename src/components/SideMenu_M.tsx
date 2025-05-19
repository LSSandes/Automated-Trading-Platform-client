import {
  BarChart2,
  Webhook,
  Globe,
  ChevronDown,
  Box,
  LineChart,
  Bell,
} from "lucide-react";
import { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "@/app/store";
const SideMenu_M = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const sideMenuRef = useRef<HTMLDivElement>(null);
  const [isAppsExpanded, setIsAppsExpanded] = useState(true);
  const navigate = useNavigate();
  const alerts = useSelector((state) => state.alert.alerts);
  console.log("alerts--->", alerts);
  const unviewedAlerts = alerts.filter((alert) => alert.view === false);
  console.log("unviewedAlerts--->", unviewedAlerts);
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        sideMenuRef.current &&
        !sideMenuRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);
  const menuItems = [
    {
      id: "dashboard",
      icon: <BarChart2 className="h-5 w-5" />,
      label: "Dashboard",
    },
    {
      id: "alerts",
      icon: <Bell className="h-5 w-5" />,
      label: "Alerts",
      badge: unviewedAlerts.length,
    },
    { id: "trades", icon: <LineChart className="h-5 w-5" />, label: "Trades" },
    {
      id: "signals",
      icon: <Webhook className="h-5 w-5" />,
      label: "Webhooks",
    },
    { id: "markets", icon: <Globe className="h-5 w-5" />, label: "Markets" },
  ];
  const apps = [
    {
      id: "metatrader",
      icon: (
        <img
          src="/mt5-logo.svg"
          alt="MT5"
          className="h-5 w-5 filter invert opacity-60"
        />
      ),
      label: "MetaTrader",
    },
    {
      id: "tradelocker",
      icon: (
        <img
          src="/tradelocker-logo.svg"
          alt="tradelocker"
          className="h-5 w-5  opacity-60 "
        />
      ),
      label: "TradeLocker",
    },
    {
      id: "acttrader",
      icon: (
        <img
          src="/acttrader.svg"
          alt="acttrader"
          className="h-5 w-5 opacity-60"
        />
      ),
      label: "ActTrader",
    },
  ];
  const handleNavigate = (item: string) => {
    navigate(`/${item}`);
  };
  return (
    <div
      ref={sideMenuRef}
      className={`fixed left-0 top-24 bg-dark/95 backdrop-blur-xl 
                  border-r border-dark-300/30 transition-all duration-300 z-40 rounded-xl ${
                    isOpen ? "translate-x-0" : "-translate-x-full"
                  }`}
    >
      <div className="p-4 flex flex-col overflow-y-auto">
        <nav className="space-y-2">
          {menuItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center space-x-2 p-2 rounded-lg 
                             hover:bg-dark-200/50 transition-all duration-300 cursor-pointer"
              onClick={() => handleNavigate(item.id)}
            >
              {item.icon}
              <span className="text-white">{item.label}</span>
              {item.badge && (
                <span className="p-1 w-5 h-5 bg-accent text-white rounded-full flex justify-center items-center">
                  {item.badge}
                </span>
              )}
            </div>
          ))}
        </nav>
        <div className="my-6">
          <button
            onClick={() => isOpen && setIsAppsExpanded(!isAppsExpanded)}
            className={`w-full flex items-center ${
              isOpen ? "justify-start" : "justify-between"
            } p-3 text-gray-400 hover:text-white transition-colors duration-300 gap-3`}
          >
            <div className="flex items-center space-x-3">
              <Box className="h-5 w-5" />
              <span>Apps</span>
            </div>
            <ChevronDown
              className={`h-4 w-4 transition-transform duration-300 ${
                isAppsExpanded ? "rotate-180" : ""
              }`}
            />
          </button>
          {isAppsExpanded && (
            <div className="space-y-1 mt-1">
              {apps.map((app) => (
                <button
                  key={app.id}
                  onClick={() => {
                    handleNavigate(app.id);
                  }}
                  className={`w-full flex items-center ${
                    isOpen ? "justify-center" : "justify-between"
                  } p-3 text-gray-400 hover:text-white hover:bg-dark-200/30 
                    rounded-lg transition-all duration-300 
                                      }`}
                >
                  <div className="flex items-center space-x-3">
                    {app.icon}

                    <div className="flex flex-col items-start">
                      <span>{app.label}</span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SideMenu_M;
