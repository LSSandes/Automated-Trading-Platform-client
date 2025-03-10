import {
  Wallet,
  TrendingUp,
  TrendingDown,
  Loader,
  Settings,
  Trash2,
  RefreshCw,
  Activity,
} from "lucide-react";
import { AccountCardProps } from "@/types/metaAccount";
import { RotatingLines } from "react-loader-spinner";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
const AccountCard = ({
  account,
  accountInfo,
  isLoading,
  connectionStatus,
  onDelete,
  onRefresh,
  onSettings,
  onShowStats,
}: AccountCardProps) => {
  const profit = accountInfo ? accountInfo.equity - accountInfo.balance : 0;
  const profitPercentage = accountInfo
    ? (profit / accountInfo.balance) * 100
    : 0;

  return (
    <div className="glass-panel rounded-xl p-4 border border-dark-300/30 w-full xl:w-[80%] outline-dashed outline-1 outline-offset-2 outline-dark-500">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 border-b border-dark-300 pb-2">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-accent/10 rounded-lg">
            <Wallet className="h-5 w-5 text-accent" />
          </div>
          <div>
            <h3 className="text-lg font-medium text-white">
              {account.accountName}
            </h3>
            <div className="flex items-center space-x-2 mt-1">
              <span
                className={`text-xs px-2 py-0.5 rounded-full ${
                  account?.server.includes("Demo")
                    ? "bg-yellow-500/20 text-yellow-400" // Demo Account (Yellow)
                    : "bg-emerald-500/20 text-emerald-400" // Live Account (Green)
                }`}
              >
                {account?.server.includes("Demo") ? "DEMO" : "LIVE"}
              </span>
              <span className="text-gray-400">•</span>
              <span
                className={`text-sm ${
                  connectionStatus == true ? "text-emerald-400" : "text-red-400"
                }`}
              >
                {connectionStatus == true ? "Connected" : "Disconnected"}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <RotatingLines
            key={account.accountId}
            visible={isLoading}
            width={"36"}
            strokeWidth="5"
            animationDuration="0.75"
            ariaLabel="rotating-lines-loading"
          />

          <button
            onClick={() => onRefresh(account.accountId)}
            className="p-2 text-gray-400 hover:text-white hover:bg-dark-200/50 rounded-lg transition-all"
          >
            <RefreshCw className="h-4 w-4" />
          </button>
          <button
            onClick={() => onSettings(account.accountId)}
            className="p-2 text-gray-400 hover:text-white hover:bg-dark-200/50 rounded-lg transition-all"
          >
            <Settings className="h-4 w-4" />
          </button>
          <button
            onClick={() => onDelete(account.accountId)}
            className="p-2 text-red-400 hover:text-red-300 hover:bg-dark-200/50 rounded-lg transition-all"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
      {/* Stats Grid */}
      <div className="grid 2xl:grid-cols-2 grid-cols-1 gap-4">
        <div className="glass-panel rounded-lg p-4 flex justify-start items-center gap-5">
          <div className="text-sm text-gray-400 mb-1">Balance</div>
          <div className="text-sm font-medium text-white flex justify-center items-center gap-3">
            {accountInfo ? (
              "$" + accountInfo.balance.toLocaleString()
            ) : (
              <Skeleton
                count={1}
                style={{ width: 80, lineHeight: 1 }}
                baseColor="#202020"
                highlightColor="#444"
              />
            )}
          </div>
        </div>

        <div className="glass-panel rounded-lg p-4 flex justify-start items-center gap-5">
          <div className="text-sm text-gray-400 mb-1">Equity</div>
          <div className="text-sm font-medium text-white flex justify-center items-center gap-3">
            {accountInfo ? (
              "$" + accountInfo.equity.toLocaleString()
            ) : (
              <Skeleton
                count={1}
                style={{ width: 80, lineHeight: 1 }}
                baseColor="#202020"
                highlightColor="#444"
              />
            )}
          </div>
        </div>

        <div className="glass-panel rounded-lg p-4 flex justify-start items-center gap-5">
          <div className="text-sm text-gray-400 mb-1">Free Margin</div>
          <div className="text-sm font-medium text-white flex justify-center items-center gap-3">
            {accountInfo ? (
              "$" + accountInfo.freeMargin.toLocaleString()
            ) : (
              <Skeleton
                count={1}
                style={{ width: 80, lineHeight: 1 }}
                baseColor="#202020"
                highlightColor="#444"
              />
            )}
          </div>
        </div>

        <div className="glass-panel rounded-lg p-4 flex justify-start items-center gap-5">
          <div className="text-sm text-gray-400 mb-1">Profit/Loss</div>
          <div
            className={`flex items-center text-lg font-medium ${
              profit >= 0 ? "text-emerald-400" : "text-red-400"
            }`}
          >
            {profit >= 0 ? (
              <TrendingUp className="h-4 w-4 mr-1" />
            ) : (
              <TrendingDown className="h-4 w-4 mr-1" />
            )}
            <span className="text-sm">
              {profit >= 0 ? "+" : ""}
              {profit.toFixed(2)} ({profitPercentage.toFixed(2)}%)
            </span>
          </div>
        </div>
      </div>

      {/* Additional Info */}
      <div className="flex justify-between mt-4 pt-2 border-t border-dark-300/30 items-center lg:flex-row flex-col gap-4">
        <div className="lg:w-[60%] w-full">
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Server</span>

            <span className="text-white">
              {accountInfo ? (
                accountInfo.server
              ) : (
                <Loader className="h-5 w-5 mr-2 animate-spin" />
              )}
            </span>
          </div>
          <div className="flex justify-between text-sm mt-2">
            <span className="text-gray-400">Leverage</span>
            <span className="text-white flex justify-center items-center">
              1:
              {accountInfo ? (
                accountInfo.leverage
              ) : (
                <Loader className="h-5 w-5 mr-2 animate-spin" />
              )}
            </span>
          </div>
        </div>
        <div className="flex lg:justify-end justify-center items-center w-full">
          <button
            onClick={onShowStats}
            className="px-3 py-1.5 text-[16px] bg-dark-200/50 text-gray-300 rounded-lg
                       border border-dark-300 hover:bg-dark-200/80 transition-colors
                       flex items-center space-x-1 lg:w-[40%] w-full justify-center"
          >
            <Activity className="h-6 w-6 mr-1" />
            <span>View Stats</span>
          </button>
        </div>
      </div>
    </div>
  );
};
export default AccountCard;
