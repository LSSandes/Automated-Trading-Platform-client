import { useState, useEffect } from "react";
import { X, ExternalLink, Check, AlertCircle } from "lucide-react";
import { WebhookAppsModalProps } from "@/types/webhook";
import { apps } from "@/constant/webhook";
import { Loader } from "lucide-react";
import { useAtom } from "jotai";
import { userAtom } from "@/store/atoms";
import { useSelector, dispatch } from "@/app/store";
import { getAccounts } from "@/app/reducers/metaAccount";
import { getAccounts as getTradeLockerAccounts } from "@/app/reducers/tradelocker";
import { UserParams } from "@/types/tradeLocker";
import { connectWebhook, disconnectWebhook } from "@/app/reducers/webhook";
import { toast } from "react-toastify";

interface LoadingType {
  appName: string;
  loader: boolean;
}
export default function WebhookAppsModal({
  isOpen,
  onClose,
  webhook,
  accountName,
}: WebhookAppsModalProps) {
  const user = useAtom(userAtom)[0];
  const metaAccounts = useSelector((state) => state.metaAccount.accounts);
  const tradelockerAccounts = useSelector(
    (state) => state.tradelocker.accounts
  );
  const [accountId, setAccountId] = useState<string>("default"); //MetaTrader....
  const [selectedMetaTrader, setSelectedMetaTrader] =
    useState<string>(accountName);
  const [selectedTradeLocker, setSelectedTradeLocker] = useState<string>(
    webhook.accountId_t
  );
  const [selectedActTrader, setSelectedActTrader] = useState<string>("default");
  const [selectedAccNum, setSelectedAccNum] = useState<string>(""); //TradeLocker....
  const [selectedAccountType, setSelectedAccountType] = useState<string>("");
  const [refreshToken, setRefreshToken] = useState<string>("");
  const [loadingConnect, setLoadingConnect] = useState<LoadingType>({
    appName: "",
    loader: false,
  });
  const [loadingDisconnect, setLoadingDisconnect] = useState<LoadingType>({
    appName: "",
    loader: false,
  });
  useEffect(() => {
    if (user?.email) dispatch(getAccounts(user.email));
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");
    const userTradeLocker: UserParams | null = JSON.parse(
      localStorage.getItem("user") || "null"
    );
    if (userTradeLocker) {
      setSelectedAccountType(userTradeLocker.accountType);
    }
    if (refreshToken) {
      setRefreshToken(refreshToken);
    }
    if (accessToken && userTradeLocker) {
      dispatch(
        getTradeLockerAccounts({
          accessToken,
          accountType: userTradeLocker.accountType,
        })
      );
    }
  }, [dispatch, user]);
  useEffect(() => {
    const selectedAccount = metaAccounts.find(
      (account) => account.accountName === selectedMetaTrader
    );
    if (selectedAccount) {
      setAccountId(selectedAccount.accountId);
    }
  }, [selectedMetaTrader, metaAccounts]);

  useEffect(() => {
    const selectedAccNum = tradelockerAccounts.find(
      (account) => account.id == selectedTradeLocker
    );
    if (selectedAccNum) {
      setSelectedAccNum(selectedAccNum.accNum);
    }
  }, [selectedTradeLocker, tradelockerAccounts]);
  const handleConnect = (appName: string) => {
    setLoadingConnect({ appName, loader: true });
    appName == "MetaTrader" &&
      selectedMetaTrader == "default" &&
      toast.info("Please select the account");
    appName == "TradeLocker" &&
      selectedTradeLocker == "default" &&
      toast.info("Please select the account");
    if (user) {
      dispatch(
        connectWebhook({
          email: user.email,
          accountId: appName == "MetaTrader" ? accountId : selectedTradeLocker,
          webhookName: webhook.webhookName,
          webhookMode: webhook.webhookMode,
          symbol: webhook.symbol,
          appName,
          accNum: appName == "MetaTrader" ? "" : selectedAccNum,
          accountType: appName == "MetaTrader" ? "" : selectedAccountType,
          refreshToken: appName == "MetaTrader" ? "" : refreshToken,
        })
      ).then(() => {
        setLoadingConnect({ appName, loader: false });
        onClose();
      });
    }
  };
  const handleDisconnect = (appName: string) => {
    if (!accountId) {
      toast.info(`Please select account: ${accountName}`);
      return;
    }
    if (user) {
      dispatch(
        disconnectWebhook({
          email: user?.email,
          webhookName: webhook.webhookName,
          webhookMode: webhook.webhookMode,
          symbol: webhook.symbol,
          orderDirection:
            webhook.webhookMode === "basic" ? webhook.orderDirection : "",
          appName,
        })
      ).then(() => {
        setLoadingDisconnect({ appName, loader: false });
        onClose();
      });
    }
  };
  const selectButton = (appName: string, webhook: any) => {
    if (appName == "MetaTrader") {
      return webhook.accountId_m;
    } else if (appName == "TradeLocker") {
      return webhook.accountId_t;
    }
  };
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="glass-panel rounded-2xl w-full max-w-2xl z-10 p-0 overflow-hidden">
        <div className="relative p-6 border-b border-dark-300/50">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 p-2 text-gray-400 hover:text-white 
                     hover:bg-dark-200/50 rounded-lg transition-all duration-300"
          >
            <X className="h-5 w-5" />
          </button>

          <h3 className="text-xl font-medium text-white tracking-tight">
            Connected Apps
          </h3>
          <p className="text-gray-400 mt-1">
            Manage integrations for {webhook.webhookName}
          </p>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:max-h-[500px] max-h-[300px] overflow-y-auto">
            {apps.map((app, index) => (
              <div
                key={app.id}
                className={`glass-panel glass-panel-hover rounded-xl p-4 border border-dark-300/30 flex flex-col justify-between ${
                  index === 0 && "z-50"
                }`}
              >
                <div className="flex items-start space-x-4">
                  <div className="p-2 bg-dark-200/50 rounded-lg border border-gray-500 border-dashed">
                    <img
                      src={app.icon}
                      alt={app.appName}
                      className={`h-8 w-8 ${
                        app.appName == "MetaTrader" && "invert"
                      } opacity-60`}
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-col items-start justify-between gap-1">
                      <h4 className="text-lg font-medium text-white">
                        {app.appName}
                      </h4>
                      {webhook.connectionStatus === true &&
                      webhook.appName === app.appName ? (
                        <div className="flex items-center text-emerald-400 text-sm">
                          <Check className="h-4 w-4 mr-1" />
                          Connected
                        </div>
                      ) : (
                        <div className="flex items-center text-gray-400 text-sm">
                          <AlertCircle className="h-4 w-4 mr-1" />
                          Not connected
                        </div>
                      )}
                    </div>
                    {app.appName == "MetaTrader" && (
                      <select
                        value={selectedMetaTrader}
                        onChange={(e) => setSelectedMetaTrader(e.target.value)}
                        className="w-full bg-dark-200/30 text-white rounded-lg px-3 py-2
                            border border-dashed border-gray-500 focus:border-blue-500 focus:ring-0
                              text-sm m-1"
                      >
                        <option value="default">default</option>
                        {metaAccounts.map((account, index) => (
                          <option key={index} value={account.accountName}>
                            {account.accountName}
                          </option>
                        ))}
                      </select>
                    )}
                    {app.appName == "TradeLocker" && (
                      <select
                        value={selectedTradeLocker}
                        onChange={(e) => setSelectedTradeLocker(e.target.value)}
                        className="w-full bg-dark-200/30 text-white rounded-lg px-3 py-2
                             border border-dashed border-gray-500 focus:border-blue-500 focus:ring-0
                              text-sm m-1"
                      >
                        <option value="default">default</option>
                        {tradelockerAccounts.map((account, index) => (
                          <option key={index} value={account.id}>
                            {account.accNum}-{account.id}
                          </option>
                        ))}
                      </select>
                    )}
                    {app.appName == "ActTrader" && (
                      <select
                        value={selectedActTrader}
                        onChange={(e) => setSelectedActTrader(e.target.value)}
                        className="w-full bg-dark-200/30 text-white rounded-lg px-3 py-2
                           border border-dashed border-gray-500 focus:border-blue-500 focus:ring-0
                            text-sm m-1"
                      >
                        <option value="default">default</option>
                      </select>
                    )}
                  </div>
                </div>
                <div className="mt-4 flex justify-center items-center">
                  {selectButton(app.appName, webhook) ? (
                    <button
                      className="premium-button-outline text-sm px-3 py-1.5 flex justify-center items-center"
                      onClick={() => handleDisconnect(app.appName)}
                    >
                      {loadingDisconnect.appName === app.appName &&
                        loadingDisconnect.loader && (
                          <Loader className="h-5 w-5 mr-2 animate-spin" />
                        )}
                      Disconnect
                    </button>
                  ) : (
                    <button
                      className="premium-button text-sm px-3 py-1.5 w-1/2 flex justify-center items-center"
                      onClick={() => handleConnect(app.appName)}
                    >
                      {loadingConnect.appName === app.appName &&
                        loadingConnect.loader && (
                          <Loader className="h-5 w-5 mr-2 animate-spin" />
                        )}
                      Connect
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Documentation Link */}
          <div className="mt-6 p-4 glass-panel rounded-xl border border-dark-300/30">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-white font-medium">Need help?</h4>
                <p className="text-gray-400 text-sm mt-1">
                  Learn how to set up and configure app integrations
                </p>
              </div>
              <a
                href="#"
                className="premium-button-outline text-sm px-3 py-1.5 flex items-center"
              >
                View Documentation
                <ExternalLink className="h-4 w-4 ml-2" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
