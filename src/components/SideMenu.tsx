import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "@/app/store";
import { useSetAtom } from "jotai";
import { collapsedAtom } from "@/store/atoms";
import { SideMenuProps } from "@/types/sidemenu";
import {
  BarChart2,
  ChevronLeft,
  Globe,
  Webhook,
  ChevronRight,
  LineChart,
  ChevronDown,
  Box,
  Bell,
} from "lucide-react";
const SideMenu = ({
  activeView,
  onViewChange,
  isCollapsed,
  onCollapsedChange,
}: SideMenuProps) => {
  const [isAppsExpanded, setIsAppsExpanded] = useState(true);
  const setCollapsedGlobal = useSetAtom(collapsedAtom);
  const alerts = useSelector((state) => state.alert.alerts);
  console.log("alerts--->", alerts);
  const unviewedAlerts = alerts.filter((alert) => alert.view === false);
  console.log("unviewedAlerts--->", unviewedAlerts);
  const navigate = useNavigate();
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
      className={`bg-dark/95 backdrop-blur-xl 
                  border-r border-dark-300/30 transition-all duration-300 z-40 h-full
                  ${isCollapsed ? "w-20" : "w-80"}`}
    >
      <button
        onClick={() => {
          onCollapsedChange(!isCollapsed);
          setCollapsedGlobal(!isCollapsed);
        }}
        className="absolute -right-3 top-6 p-1.5 rounded-full bg-dark-200 border border-dark-300/30
                   text-gray-400 hover:text-white transition-colors duration-300"
      >
        {isCollapsed ? (
          <ChevronRight className="h-4 w-4" />
        ) : (
          <ChevronLeft className="h-4 w-4" />
        )}
      </button>

      <div className="p-4 h-full flex flex-col overflow-y-auto">
        <nav className="space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                onViewChange(item.id);
                handleNavigate(item.id);
              }}
              className={`w-full flex items-center ${
                isCollapsed ? "justify-center" : "justify-between"
              } p-3 text-gray-300 hover:bg-dark-100/80 rounded-lg transition-all duration-300
                ${activeView === item.id ? "bg-dark-100/80 text-white" : ""}`}
            >
              <div className="flex items-center space-x-3">
                <div
                  className={
                    activeView === item.id ? "text-white" : "text-gray-500"
                  }
                >
                  {item.icon}
                </div>
                {!isCollapsed && <span>{item.label}</span>}
              </div>
              {!isCollapsed && item.badge && item.badge != 0 ? (
                <span className="px-2 py-1 text-xs bg-red-500 text-white rounded-full">
                  {item.badge}
                </span>
              ) : (
                <></>
              )}
            </button>
          ))}
        </nav>
        <div className="my-6 border-t border-dark-400">
          <button
            onClick={() => !isCollapsed && setIsAppsExpanded(!isAppsExpanded)}
            className={`w-full flex items-center ${
              isCollapsed ? "justify-center" : "justify-between"
            } p-3 text-gray-400 hover:text-white transition-colors duration-300`}
          >
            <div className="flex items-center space-x-3">
              <Box className="h-5 w-5" />
              {!isCollapsed && <span>Apps</span>}
            </div>
            {!isCollapsed && (
              <ChevronDown
                className={`h-4 w-4 transition-transform duration-300 ${
                  isAppsExpanded ? "rotate-180" : ""
                }`}
              />
            )}
          </button>
          {(isAppsExpanded || isCollapsed) && (
            <div className="w-full justify-end items-center flex">
              <div className="space-y-1 mt-1 w-[90%] flex flex-col justify-center items-center">
                {apps.map((app) => (
                  <button
                    key={app.id}
                    onClick={() => {
                      onViewChange(app.id);
                      handleNavigate(app.id);
                    }}
                    className={`w-full flex items-center ${
                      isCollapsed ? "justify-center" : "justify-between"
                    } p-3 text-gray-400 hover:text-white hover:bg-dark-200/30 
                    rounded-lg transition-all duration-300 ${
                      activeView === app.id ? "bg-dark-200/30 text-white" : ""
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      {app.icon}
                      {!isCollapsed && (
                        <div className="flex flex-col items-start">
                          <span>{app.label}</span>
                        </div>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SideMenu;
