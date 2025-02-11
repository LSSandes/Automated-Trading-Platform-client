import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSetAtom } from "jotai";
import { collapsedAtom } from "@/store/atoms";
// import { SignalProvider } from "@/types/sidemenu";
import { SideMenuProps } from "@/types/sidemenu";
import {
  BarChart2,
  // Bot,
  ChevronLeft,
  // Cpu,
  // Globe,
  // LineChart,
  // Settings,
  Webhook,
  // Sliders,
  // Wallet,
  // AlertTriangle,
  // TrendingUp,
  ChevronRight,
  // Home,
  // Bell,
  ChevronDown,
  Box,
  // MessageCircle,
  // Coins,
  // Trophy,
  // Users,
  // DollarSign,
  // Shield,
  // Lock,
  // CheckCircle2,
  Zap,
  // Clock,
} from "lucide-react";
// import { useMetaAccounts } from "../hooks/useMetaAccount";

const SideMenu = ({
  activeView,
  onViewChange,
  isCollapsed,
  onCollapsedChange,
}: SideMenuProps) => {
  const [isAppsExpanded, setIsAppsExpanded] = useState(true);
  const setCollapsedGlobal = useSetAtom(collapsedAtom);
  // const { data: accounts } = useMetaAccounts();

  // const [activeProviders, setActiveProviders] = useState<SignalProvider[]>([
  //   {
  //     id: "1",
  //     name: "Gold Scalper Pro",
  //     rank: 1,
  //     subscribers: 1234,
  //     monthlyRevenue: 12450,
  //     active: true,
  //   },
  //   {
  //     id: "2",
  //     name: "Crypto Momentum",
  //     rank: 2,
  //     subscribers: 856,
  //     monthlyRevenue: 8890,
  //     active: true,
  //   },
  //   {
  //     id: "3",
  //     name: "Forex Elite",
  //     rank: 3,
  //     subscribers: 2341,
  //     monthlyRevenue: 15680,
  //     active: true,
  //   },
  // ]);
  const navigate = useNavigate();
  const menuItems = [
    {
      id: "dashboard",
      icon: <BarChart2 className="h-5 w-5" />,
      label: "Dashboard",
    },
    // {
    //   id: "alerts",
    //   icon: <Bell className="h-5 w-5" />,
    //   label: "Alerts",
    //   badge: "3",
    // },
    // { id: "trades", icon: <LineChart className="h-5 w-5" />, label: "Trades" },
    {
      id: "signals",
      icon: <Webhook className="h-5 w-5" />,
      label: "Webhooks",
      badge: "5",
    },
    // { id: "markets", icon: <Globe className="h-5 w-5" />, label: "Markets" },
    // {
    //   id: "leaderboard",
    //   icon: <Trophy className="h-5 w-5" />,
    //   label: "Leaderboard",
    // },
  ];
  const handleNavigate = (item: string) => {
    navigate(`/${item}`);
  };
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
      status: (
        <div className="space-y-1">
          <div className="flex items-center text-emerald-400 text-xs">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mr-1"></div>
            Connected
          </div>
          <div className="flex items-center space-x-2 text-xs">
            <div className="flex items-center text-accent">
              <Zap className="h-3 w-3 mr-1" />
              <span>0.04s execution</span>
            </div>
          </div>
        </div>
      ),
    },
    // {
    //   id: "binance",
    //   icon: <Coins className="h-5 w-5" />,
    //   label: "Binance",
    //   status: (
    //     <div className="space-y-1">
    //       <div className="flex items-center text-gray-400 text-xs">
    //         <div className="w-1.5 h-1.5 rounded-full bg-gray-400 mr-1"></div>
    //         Not Connected
    //       </div>
    //       <div className="flex items-center space-x-2 text-xs text-gray-500">
    //         <Clock className="h-3 w-3 mr-1" />
    //         <span>No data</span>
    //       </div>
    //     </div>
    //   ),
    // },
    // {
    //   id: "bitget",
    //   icon: (
    //     <img
    //       src="/bitget-logo.svg"
    //       alt="Bitget"
    //       className="h-5 w-5 filter invert opacity-60"
    //     />
    //   ),
    //   label: "Bitget",
    //   status: (
    //     <div className="space-y-1">
    //       <div className="flex items-center text-gray-400 text-xs">
    //         <div className="w-1.5 h-1.5 rounded-full bg-gray-400 mr-1"></div>
    //         Not Connected
    //       </div>
    //       <div className="flex items-center space-x-2 text-xs text-gray-500">
    //         <Clock className="h-3 w-3 mr-1" />
    //         <span>No data</span>
    //       </div>
    //     </div>
    //   ),
    // },
    // {
    //   id: "telegram",
    //   icon: <MessageCircle className="h-5 w-5" />,
    //   label: "Telegram",
    //   status: (
    //     <div className="space-y-1">
    //       <div className="flex items-center text-emerald-400 text-xs">
    //         <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mr-1"></div>
    //         99.9% Uptime
    //       </div>
    //       <div className="flex items-center space-x-2 text-xs">
    //         <div className="flex items-center text-accent">
    //           <Zap className="h-3 w-3 mr-1" />
    //           <span>0.1s latency</span>
    //         </div>
    //       </div>
    //     </div>
    //   ),
    // },
  ];

  // const bottomMenuItems = [
  //   { id: 'admin', icon: <Lock className="h-5 w-5" />, label: 'Admin Panel', adminOnly: true },
  //   { id: 'settings', icon: <Settings className="h-5 w-5" />, label: 'Settings' }
  // ];

  // const toggleProvider = (id: string) => {
  //   setActiveProviders(providers =>
  //     providers.map(provider =>
  //       provider.id === id ? { ...provider, active: !provider.active } : provider
  //     )
  //   );
  // };

  // Simulated admin check - replace with actual auth logic
  // const isAdmin = true;

  return (
    <div
      className={`fixed left-0 top-24 bg-dark/95 backdrop-blur-xl 
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
        {/* {!isCollapsed && (
          <div className="grid grid-cols-2 gap-2 mb-6">
            <div className="bg-dark-200/30 rounded-lg p-3">
              <div className="flex items-center space-x-2 text-gray-400 mb-1">
                <Trophy className="h-4 w-4" />
                <span className="text-xs">Top Rank</span>
              </div>
              <div className="text-xl font-semibold text-white">#12</div>
            </div>
            <div className="bg-dark-200/30 rounded-lg p-3">
              <div className="flex items-center space-x-2 text-gray-400 mb-1">
                <DollarSign className="h-4 w-4" />
                <span className="text-xs">Revenue</span>
              </div>
              <div className="text-xl font-semibold text-emerald-400">$15.2K</div>
            </div>
          </div>
        )} */}

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
              {!isCollapsed && item.badge && (
                <span className="px-2 py-1 text-xs bg-accent/10 text-accent rounded-full">
                  {item.badge}
                </span>
              )}
            </button>
          ))}
        </nav>

        <div className="my-6">
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
            <div className="space-y-1 mt-1">
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
                        {app.status && (
                          <div className="mt-0.5">{app.status}</div>
                        )}
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
        {/* 
        <nav className="space-y-2">
          {bottomMenuItems
            .filter(item => !item.adminOnly || isAdmin)
            .map((item) => (
              <button
                key={item.id}
                onClick={() => onViewChange(item.id)}
                className={`w-full flex items-center ${
                  isCollapsed ? 'justify-center' : 'justify-between'
                } p-3 text-gray-300 hover:bg-dark-100/80 rounded-lg transition-all duration-300
                  ${activeView === item.id ? 'bg-dark-100/80 text-white' : ''}`}
              >
                <div className="flex items-center space-x-3">
                  <div className={activeView === item.id ? 'text-white' : 'text-gray-500'}>
                    {item.icon}
                  </div>
                  {!isCollapsed && <span>{item.label}</span>}
                </div>
              </button>
            ))}
        </nav> */}

        {/* {!isCollapsed && (
          <div className="mt-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-400">Top Signal Providers</h3>
              <button className="text-accent text-sm hover:text-accent-dark transition-colors">
                View All
              </button>
            </div>
            <div className="space-y-3">
              {activeProviders.map(provider => (
                <div
                  key={provider.id}
                  className="bg-dark-200/30 rounded-lg p-3 border border-dark-300/30"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <Trophy className="h-4 w-4 text-yellow-400" />
                      <span className="text-sm text-white">{provider.name}</span>
                    </div>
                    <button
                      onClick={() => toggleProvider(provider.id)}
                      className={`relative inline-flex h-5 w-9 items-center rounded-full ${
                        provider.active ? 'bg-accent' : 'bg-dark-300'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                          provider.active ? 'translate-x-5' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center space-x-2">
                      <Users className="h-3 w-3 text-accent" />
                      <span className="text-gray-400">{provider.subscribers} subs</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <DollarSign className="h-3 w-3 text-emerald-400" />
                      <span className="text-emerald-400">${provider.monthlyRevenue.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )} */}
      </div>
    </div>
  );
};

export default SideMenu;
