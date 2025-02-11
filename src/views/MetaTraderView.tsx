import { useState } from "react";
import {
  /*Plus, Shield, DollarSign, Star, Clock, ArrowRight, Globe, Users, Award, Zap, Check,*/ Lock,
} from "lucide-react";
import MetaTrader from "@/components/metatrader/MetaTrader";
// import AccountList from '@/components/metatrader/AccountList';

interface MetaTraderViewProps {
  onLogin: () => void;
  isLoggedIn: boolean;
}

// interface RecommendedBroker {
//   id: string;
//   name: string;
//   logo: string;
//   description: string;
//   platforms: ("mt4" | "mt5")[];
//   minDeposit: number;
//   spread: string;
//   leverage: string;
//   features: string[];
//   featured?: boolean;
// }

export default function MetaTraderView({
  onLogin,
  isLoggedIn,
}: MetaTraderViewProps) {
  // const [showAddAccount, setShowAddAccount] = useState(false);
  // const [selectedBroker, setSelectedBroker] = useState<string | null>(null);

  // Pre-fill with demo account credentials
  const [login, setLogin] = useState("313902");
  const [password, setPassword] = useState("dKbqXqU835Sz5Zb");
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleLogin = async () => {
    setIsLoggingIn(true);
    // Simulate login delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    onLogin();
    setIsLoggingIn(false);
  };

  // const recommendedBrokers: RecommendedBroker[] = [
  //   {
  //     id: "fyntura",
  //     name: "Fyntura",
  //     logo: "/mt5-logo.svg",
  //     description:
  //       "Premium forex and CFD trading with institutional-grade liquidity",
  //     platforms: ["mt4", "mt5"],
  //     minDeposit: 100,
  //     spread: "From 0.0 pips",
  //     leverage: "Up to 1:500",
  //     features: [
  //       "Zero commission trading",
  //       "Advanced trading tools",
  //       "Expert advisor support",
  //       "Multi-asset trading",
  //       "VPS hosting included",
  //       "24/7 support",
  //     ],
  //     featured: true,
  //   },
  //   // ... rest of the brokers remain the same
  // ];

  // const handleBrokerSelect = (brokerId: string) => {
  //   setSelectedBroker(brokerId);
  //   setShowAddAccount(true);
  // };

  // If not logged in, show login form first
  if (!isLoggedIn) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="glass-panel rounded-xl p-8 max-w-md w-full">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Lock className="h-8 w-8 text-accent" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">
              MetaTrader Login
            </h2>
            <p className="text-gray-400">
              Connect your trading account to get started
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-2">Login</label>
              <input
                type="text"
                value={login}
                onChange={(e) => setLogin(e.target.value)}
                className="w-full bg-dark-200/50 text-white rounded-lg px-4 py-3
                         border border-dark-300/50 focus:outline-none focus:ring-1 
                         focus:ring-accent/50"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-dark-200/50 text-white rounded-lg px-4 py-3
                         border border-dark-300/50 focus:outline-none focus:ring-1 
                         focus:ring-accent/50"
              />
            </div>

            <button
              onClick={handleLogin}
              disabled={isLoggingIn}
              className="premium-button w-full py-3 flex items-center justify-center mt-6"
            >
              {isLoggingIn ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Connecting...
                </>
              ) : (
                <>
                  <Lock className="h-5 w-5 mr-2" />
                  Connect Account
                </>
              )}
            </button>

            {/* <div className="text-center mt-6">
              <p className="text-sm text-gray-400">
                Don't have an account?{" "}
                <button
                  onClick={() => handleBrokerSelect("fyntura")}
                  className="text-accent hover:text-accent-dark"
                >
                  Open Demo Account
                </button>
              </p>
            </div> */}
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-4 mt-8">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">0.04s</div>
              <div className="text-xs text-gray-400 mt-1">Execution Time</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">99.9%</div>
              <div className="text-xs text-gray-400 mt-1">Uptime</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">50K+</div>
              <div className="text-xs text-gray-400 mt-1">Active Users</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Rest of the MetaTraderView component remains the same
  return (
    <div className="space-y-8">
      {/* ... rest of the component code ... */}
      <MetaTrader />
    </div>
  );
}
