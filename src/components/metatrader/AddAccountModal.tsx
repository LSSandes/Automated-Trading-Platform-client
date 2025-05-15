import { useState, useEffect } from "react";
import { X, HelpCircle, AlertTriangle, Loader, Check } from "lucide-react";
import { useAtom } from "jotai";
import { userAtom } from "@/store/atoms";
import { dispatch } from "@/app/store";
import { addAccount } from "@/app/reducers/metaAccount";
import Tooltip from "../ui/Tooltip";

interface AddAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedBroker?: string | null;
  onSuccess?: () => void;
}

interface FormErrors {
  broker?: string;
  server?: string;
  login?: string;
  password?: string;
  name?: string;
  general?: string;
}

const commonServers = [
  { name: "Fyntura MT5", server: "Fyntura-Demo", broker: "Fyntura" },
  { name: "IC Markets MT4", server: "ICMarkets-Live1", broker: "IC Markets" },
  { name: "IC Markets MT5", server: "ICMarkets-Live5", broker: "IC Markets" },
  {
    name: "Pepperstone MT4",
    server: "Pepperstone-Live1",
    broker: "Pepperstone",
  },
  {
    name: "Pepperstone MT5",
    server: "Pepperstone-Live5",
    broker: "Pepperstone",
  },
];

export default function AddAccountModal({
  isOpen,
  onClose,
  selectedBroker,
  onSuccess,
}: AddAccountModalProps) {
  const [user] = useAtom(userAtom);
  const [platform, setPlatform] = useState<"mt4" | "mt5">("mt4");
  const [server, setServer] = useState("ICMarketsSC-Demo06");
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectionSuccess, setConnectionSuccess] = useState(false);
  const [showCommonServers, setShowCommonServers] = useState(false);

  useEffect(() => {
    if (selectedBroker) {
      const brokerServer = commonServers.find(
        (s) => s.broker.toLowerCase() === selectedBroker.toLowerCase()
      );
      if (brokerServer) {
        setServer(brokerServer.server);
        setPlatform(brokerServer.server.includes("MT5") ? "mt5" : "mt4");
      }
    }
  }, [selectedBroker]);
  if (!isOpen) return null;
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    if (!server.trim()) {
      newErrors.server = "Server address is required";
    }
    if (!login.trim()) {
      newErrors.login = "Login number is required";
    } else if (!/^\d+$/.test(login)) {
      newErrors.login = "Login must be a number";
    }
    if (!password.trim()) {
      newErrors.password = "Password is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }
    const whopToken = localStorage.getItem("whopToken");
    if (!whopToken) {
      setErrors({ general: "Whop token is required" });
      return;
    }
    setIsConnecting(true);
    setErrors({});
    try {
      if (user?.email) {
        await dispatch(
          addAccount({
            email: user.email,
            login,
            password,
            server,
            platform,
            whopToken,
          }) as any
        ).then(() => {
          setTimeout(() => {
            onClose();
            onSuccess?.();
            setServer("ICMarketsSC-Demo06");
            setLogin("");
            setPassword("");
            setConnectionSuccess(false);
            setIsConnecting(false);
          }, 500);
        });
      } else {
        setErrors({ general: "User email is required" });
        setIsConnecting(false);
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to connect to broker";
      setErrors({
        general: errorMessage,
      });
      setIsConnecting(false);
    }
  };

  const selectCommonServer = (serverInfo: {
    name: string;
    server: string;
    broker: string;
  }) => {
    // setBroker(serverInfo.broker);
    setServer(serverInfo.server);
    setPlatform(serverInfo.name.includes("MT5") ? "mt5" : "mt4");
    setShowCommonServers(false);
  };

  const isFormValid = /*broker &&*/ server && login && password; /*&& name;*/

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="glass-panel rounded-2xl w-full max-w-lg z-10 p-0 overflow-hidden">
        <div className="relative p-6 border-b border-dark-300/50">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 p-2 text-gray-400 hover:text-white 
                     hover:bg-dark-200/50 rounded-lg transition-all duration-300"
          >
            <X className="h-5 w-5" />
          </button>

          <h3 className="text-xl font-medium text-white tracking-tight">
            Add MetaTrader Account
          </h3>
          <p className="text-gray-400 mt-1">
            Connect your MT4/MT5 account to start automated trading
          </p>
        </div>

        <div className="p-6 space-y-6 max-h-[calc(100vh-300px)] overflow-y-auto">
          {/* Platform Selection */}
          <div className="flex rounded-lg bg-dark-200/30 p-1">
            <button
              onClick={() => setPlatform("mt4")}
              className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                platform === "mt4"
                  ? "text-white bg-blue-500 outline-1 outline-dashed outline-blue-500 outline-offset-2"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              MetaTrader 4
            </button>
            <button
              onClick={() => setPlatform("mt5")}
              className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                platform === "mt5"
                  ? "text-white bg-blue-500 outline-1 outline-dashed outline-blue-500 outline-offset-2"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              MetaTrader 5
            </button>
          </div>

          {/* Form Fields */}
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="flex items-center space-x-2 text-sm text-gray-400">
                  <span>Server</span>
                  <Tooltip content="Enter your broker's server address (found in MT4/MT5 login window)">
                    <HelpCircle className="h-4 w-4" />
                  </Tooltip>
                </label>
                <button
                  onClick={() => setShowCommonServers(!showCommonServers)}
                  className="text-sm text-accent hover:text-accent-dark"
                >
                  Common Servers
                </button>
              </div>
              <input
                type="text"
                value={server}
                onChange={(e) => setServer(e.target.value)}
                placeholder="e.g., ICMarkets-Live01"
                className={`w-full bg-dark-200/50 text-white rounded-lg px-4 py-2.5
                         border focus:outline-none focus:ring-1 transition-colors
                         ${
                           errors.server
                             ? "border-red-500 focus:ring-red-500/50"
                             : "border-dark-300/50 focus:ring-accent/50"
                         }`}
              />
              {errors.server && (
                <p className="text-red-400 text-sm mt-1">{errors.server}</p>
              )}

              {showCommonServers && (
                <div className="mt-2 glass-panel rounded-lg p-2 border border-dark-300/30">
                  <div className="text-sm text-gray-400 mb-2">
                    Common Servers:
                  </div>
                  <div className="space-y-1">
                    {commonServers.map((serverInfo) => (
                      <button
                        key={serverInfo.server}
                        onClick={() => selectCommonServer(serverInfo)}
                        className="w-full text-left px-3 py-2 text-sm text-gray-300 
                                 hover:bg-dark-200/50 rounded-lg transition-colors"
                      >
                        {serverInfo.name} - {serverInfo.server}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div>
              <label className="flex items-center space-x-2 text-sm text-gray-400 mb-2">
                <span>Login</span>
                <Tooltip content="Your MT4/MT5 account login number">
                  <HelpCircle className="h-4 w-4" />
                </Tooltip>
              </label>
              <input
                type="text"
                value={login}
                onChange={(e) => setLogin(e.target.value)}
                placeholder="12345678"
                className={`w-full bg-dark-200/50 text-white rounded-lg px-4 py-2.5
                         border focus:outline-none focus:ring-1 transition-colors
                         ${
                           errors.login
                             ? "border-red-500 focus:ring-red-500/50"
                             : "border-dark-300/50 focus:ring-accent/50"
                         }`}
              />
              {errors.login && (
                <p className="text-red-400 text-sm mt-1">{errors.login}</p>
              )}
            </div>

            <div>
              <label className="flex items-center space-x-2 text-sm text-gray-400 mb-2">
                <span>Password</span>
                <Tooltip content="Your MT4/MT5 account password">
                  <HelpCircle className="h-4 w-4" />
                </Tooltip>
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className={`w-full bg-dark-200/50 text-white rounded-lg px-4 py-2.5
                         border focus:outline-none focus:ring-1 transition-colors
                         ${
                           errors.password
                             ? "border-red-500 focus:ring-red-500/50"
                             : "border-dark-300/50 focus:ring-accent/50"
                         }`}
              />
              {errors.password && (
                <p className="text-red-400 text-sm mt-1">{errors.password}</p>
              )}
            </div>
          </div>

          {/* General Error */}
          {errors.general && (
            <div className="bg-red-500/10 text-red-400 rounded-lg p-4 flex items-start space-x-3">
              <AlertTriangle className="h-5 w-5 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium">Connection Failed</p>
                <p className="text-sm mt-1">{errors.general}</p>
              </div>
            </div>
          )}

          {/* Warning */}
          <div className="bg-dark-200/30 rounded-lg p-4 flex items-start space-x-3">
            <AlertTriangle className="h-5 w-5 text-amber-400 flex-shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="text-sm text-gray-300">
                Make sure you're using an Investor Password if you only want to
                monitor the account.
              </p>
              <p className="text-sm text-gray-400">
                Using the Master Password will allow full trading access.
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <button
              onClick={handleSubmit}
              disabled={isConnecting || !isFormValid || connectionSuccess}
              className={`premium-button flex-1 py-2.5 disabled:opacity-50 disabled:cursor-not-allowed text-sm bg-blue-500 outline-1 outline-dashed outline-blue-500 outline-offset-2
                       ${
                         connectionSuccess
                           ? "bg-emerald-500 hover:bg-emerald-600"
                           : ""
                       }`}
            >
              {isConnecting ? (
                <div className="flex justify-center items-center">
                  <Loader className="h-5 w-5 mr-2 animate-spin" />
                  Connecting...
                </div>
              ) : connectionSuccess ? (
                <div className="flex justify-center items-center">
                  <Check className="h-5 w-5 mr-2" />
                  Connected!
                </div>
              ) : (
                "Connect"
              )}
            </button>
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2.5 border border-dark-300/50 text-gray-400 
                       rounded-lg hover:bg-dark-200/50 transition-all duration-300 text-sm bg-dark-200/30 outline-1 outline-dashed outline-dark-400/30 outline-offset-2"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
