import { useEffect, useRef, useState } from "react";
import { Clock, Copy, MoreVertical, CopyCheck } from "lucide-react";
import WebhookMenu from "./WebhookMenu";
import { WebhookCardProps } from "@/types/webhook";
import EditWebhookModal from "./EditWebhookModal";
import SetPriceModal from "./SetPriceModal";
import RiskManagementModal from "./RiskManagementModal";
import WebhookAppsModal from "./WebhookAppsModal";
import { useAtom } from "jotai";
import {
  userAtom,
  actionTypeAtom,
  allTradesAtom,
  trailingStopLossAtom,
} from "@/store/atoms";
import { dispatch, useSelector } from "@/app/store";
import { deleteMarketOrder, openMarketOrder } from "@/app/reducers/webhook";
import { FaChartBar } from "react-icons/fa";
import { toast } from "react-toastify";
import OpenTradeModal from "./OpenTradeModal";
import { UserParams } from "@/types/tradeLocker";

export default function WebhookCard({
  webhook,
  // onChangeColor,
  onToggleActive,
  onTogglePublic,
  onSetPrice,
}: WebhookCardProps) {
  const [user] = useAtom(userAtom);
  const [trailingStopLoss] = useAtom(trailingStopLossAtom);
  const [actionType] = useAtom(actionTypeAtom);
  const [allTrades] = useAtom(allTradesAtom);
  const accounts = useSelector((state) => state.metaAccount.accounts);
  const [showMenu, setShowMenu] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showPriceModal, setShowPriceModal] = useState(false);
  const [showRiskModal, setShowRiskModal] = useState(false);
  const [showAppsModal, setShowAppsModal] = useState(false);
  const findAccount = accounts.find(
    (account) => account.accountId == webhook.accountId
  )?.accountName;
  const [accountName, setAccountName] = useState<string>(findAccount ?? "");
  const [openTradeModal, setOpenTradeModal] = useState<boolean>(false);
  const [openTradeLoading, setOpenTradeLoading] = useState<boolean>(false);
  const [copied, setCopied] = useState(false);
  const [timeDiff, setTimeDiff] = useState("");
  useEffect(() => {
    const findAccount = accounts.find(
      (account) => account.accountId == webhook.accountId
    );
    if (findAccount) {
      setAccountName(findAccount.accountName);
    }
  }, [accounts, webhook.accountId]);

  useEffect(() => {
    const updateTimeDiff = () => {
      const now = Date.now();
      if (webhook.tradeExecutionTime) {
        const tradeExecutionTime = webhook.tradeExecutionTime
          ? new Date(webhook.tradeExecutionTime).getTime()
          : 0;
        const diffInMilliseconds = now - tradeExecutionTime;
        const hours = Math.floor(diffInMilliseconds / (1000 * 60 * 60));
        const minutes = Math.floor(
          (diffInMilliseconds % (1000 * 60 * 60)) / (1000 * 60)
        );
        if (hours === 0) {
          setTimeDiff(`${minutes} m ago`);
        } else {
          setTimeDiff(`${hours} h ${minutes} m ago`);
        }
      }
    };
    updateTimeDiff();
    const intervalId = setInterval(updateTimeDiff, 60000);
    return () => clearInterval(intervalId);
  }, [webhook]);
  //  ***************************Card menu disable and enable**********************************//
  const menuRef = useRef<HTMLDivElement>(null);
  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setShowMenu(false);
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  //  ***************************Handle the URL**********************************//
  const handleCopy = () => {
    navigator.clipboard.writeText(
      `https://bullfrog-engaged-factually.ngrok-free.app/api/webhook/${webhook.hashedWebhook}`
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  //  ***************************Functions of menu**********************************//

  const handleSetPrice = (price: number, interval: string) => {
    if (onSetPrice) {
      onSetPrice(webhook.id, price, interval);
    }
    setShowPriceModal(false);
  };

  const handleSaveRiskSettings = (settings: any) => {
    console.log("Saving risk settings:", settings);
    setShowRiskModal(false);
  };

  const handleDelete = () => {
    if (user?.email) {
      if (webhook.connectionStatus) {
        toast.warn("Please disconnect your account.");
        return;
      } else {
        dispatch(
          deleteMarketOrder({
            email: user.email,
            webhookName: webhook.webhookName,
            webhookMode: webhook.webhookMode,
            orderDirection:
              webhook.webhookMode === "basic" ? webhook.orderDirection : "",
            symbol: webhook.symbol,
          })
        );
      }
    }
  };
  console.log("actionType---ok--->", actionType);
  const handleOpenTrade = () => {
    if (webhook.connectionStatus == true) {
      setOpenTradeLoading(true);
      const accessToken = localStorage.getItem("accessToken");
      const tradelockerUser: UserParams | null = localStorage.getItem("user")
        ? JSON.parse(localStorage.getItem("user") as string)
        : null;
      if (webhook.webhookMode == "basic") {
        user &&
          dispatch(
            openMarketOrder({
              email: user?.email,
              accountId: webhook.accountId,
              webhookName: webhook.webhookName,
              symbol: webhook.symbol,
              orderDirection: webhook.orderDirection,
              webhookMode: webhook.webhookMode,
              accessToken:
                webhook.appName == "MetaTrader" ? "" : accessToken ?? "",
              accountType:
                webhook.appName == "MetaTrader"
                  ? ""
                  : tradelockerUser?.accountType ?? "",
              actionType,
              allTrades,
              trailingStopLoss,
            })
          ).then(() => {
            setOpenTradeLoading(false);
            setOpenTradeModal(false);
          });
      }
    } else {
      toast.info("The account needs to be connected.");
    }
  };
  console.log("trailingStopLoss Option---->", trailingStopLoss);
  return (
    <>
      <div
        className={`relative rounded-xl overflow-hidden transition-all duration-300 
                      hover:translate-y-[-2px] hover:shadow-2xl min-w-[400px] hover:shadow-accent/5 outline-1 outline-dashed p-1 outline-offset-1 outline-dark-500`}
      >
        <div
          className={`absolute inset-0 bg-gradient-to-br from-dark-200/20 to-dark-200/5 opacity-10`}
        />
        <div className="relative glass-panel rounded-xl py-3 px-4 border border-dark-300/30 ">
          <div className="flex justify-between items-start mb-6 border-b border-dark-300 p-1">
            <div className="flex items-center space-x-3">
              <div
                className={`p-2 rounded-lg ${
                  webhook.webhookMode === "advanced"
                    ? "bg-accent/10"
                    : "bg-purple-500/10"
                }`}
              >
                <Clock className="h-5 w-5 text-accent" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-white">
                  {webhook.webhookName}
                </h3>
                <div className="flex items-center space-x-2 mt-1">
                  <span
                    className={`text-sm ${
                      webhook.webhookMode === "advanced"
                        ? "text-accent"
                        : "text-purple-400"
                    }`}
                  >
                    {webhook.appName == "MetaTrader"
                      ? accountName
                      : webhook.accountId}
                  </span>
                  <span className="text-sm">{webhook.appName}</span>
                  <span className="text-gray-400">•</span>
                  <div className="flex items-center text-sm">
                    {webhook.connectionStatus === true ? (
                      <span className="text-emerald-400">connected</span>
                    ) : (
                      <span className="text-gray-400">not connected</span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-1 relative">
              {copied && (
                <div
                  className={`absolute -top-2 -left-8 rounded-lg transition-all -rotate-45 ${
                    copied ? "animate-pulse" : ""
                  }`}
                >
                  Copied!
                </div>
              )}
              <button
                onClick={handleCopy}
                className="p-2 text-gray-400 hover:text-white hover:bg-dark-200/50 
                         rounded-lg transition-all"
                title="Copy webhook URL"
              >
                {copied ? (
                  <CopyCheck className="h-5 w-5" />
                ) : (
                  <Copy className="h-5 w-5" />
                )}
              </button>
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="p-2 text-gray-400 hover:text-white hover:bg-dark-200/50 
                         rounded-lg transition-all"
              >
                <MoreVertical className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="flex xl:flex-row flex-col gap-4 mb-6">
            <div className="glass-panel rounded-lg p-3 border border-dark-300/30 xl:w-1/2 w-full">
              <div className="text-gray-400 text-sm mb-1">Last Signal</div>
              <div className="text-white font-medium">
                {timeDiff || "Never"}
              </div>
            </div>
            {webhook.webhookMode == "basic" && (
              <div className="glass-panel rounded-lg p-3 border border-dark-300/30 xl:w-1/2 w-full">
                <div className="grid grid-cols-2 gap-2">
                  <div className="text-gray-400 text-sm mb-1 flex justify-start items-center">
                    Lots: {webhook.volume}
                  </div>
                  <div className="text-gray-400 text-sm mb-1 flex justify-start items-center">
                    SL: {webhook.stopLoss_pips}
                  </div>
                  <div className="text-gray-400 text-sm mb-1 flex justify-start items-center">
                    TP: {webhook.takeProfit_pips}
                  </div>
                  <div className="text-gray-400 text-sm mb-1 flex justify-start items-center">
                    {webhook.orderDirection.toUpperCase()} order
                  </div>
                </div>
              </div>
            )}
            {webhook.webhookMode == "advanced" && (
              <div className="glass-panel rounded-lg p-3 border border-dark-300/30 lg:w-1/2 w-full flex  justify-center items-center">
                <div className="text-gray-400 text-lg mb-1 flex justify-around items-center w-full">
                  <span>Lots:</span>
                  <span>{webhook.volume}</span>
                </div>
              </div>
            )}
          </div>
          <div className="flex flex-wrap gap-1.5 mb-6">
            <span
              className="px-2 py-1 text-md rounded-lg bg-dark-200/50 text-gray-300
                         border border-dark-300/30 backdrop-blur-sm"
            >
              {webhook.symbol}
            </span>
          </div>
          <div className="flex 2xl:flex-row flex-col items-center justify-between gap-4">
            <div className="flex items-center lg:justify-start justify-between space-x-6 lg:w-1/2 w-full">
              <div className="flex justify-center items-center gap-4">
                <div className="flex flex-col items-center space-y-1">
                  <span className="text-xs text-gray-400">Active</span>
                  <button
                    onClick={() => onToggleActive(webhook.id)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                      webhook.isActive ? "bg-accent" : "bg-dark-300"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                        webhook.isActive ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>

                <div className="flex flex-col items-center space-y-1">
                  <span className="text-xs text-gray-400">Public</span>
                  <button
                    onClick={() => onTogglePublic(webhook.id)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                      webhook.isPublic ? "bg-accent" : "bg-dark-300"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                        webhook.isPublic ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>
              </div>
              {/* 
              {price != 0 && (
                <div className="flex flex-col items-start space-y-1">
                  <span className="text-xs text-gray-400">Price</span>
                  <button
                    onClick={() => setShowPriceModal(true)}
                    className="flex items-center space-x-1 text-emerald-400 hover:text-emerald-300 transition-colors"
                  >
                    <DollarSign className="h-4 w-4" />
                    <span>{price?.toFixed(6) || 0}</span>
                  </button>
                </div>
              )} */}
            </div>

            {webhook.webhookMode == "basic" && (
              <button
                onClick={() => setOpenTradeModal(true)}
                className="px-3 py-1.5 text-[16px] bg-dark-200/50 text-gray-300 rounded-lg
                       border border-dark-300/30 hover:bg-dark-200/80 transition-colors
                       flex items-center space-x-1 2xl:w-1/3 w-full justify-center"
              >
                <FaChartBar className="h-4 w-4" />
                <span>Open Trade</span>
              </button>
            )}
          </div>
        </div>
        {showMenu && (
          <div ref={menuRef}>
            <WebhookMenu
              onEdit={() => setShowEditModal(true)}
              // onChangeColor={() => setShowColorPicker(true)}
              onDelete={handleDelete}
              onSetPrice={() => setShowPriceModal(true)}
              onManageRisk={() => setShowRiskModal(true)}
              onManageApps={() => setShowAppsModal(true)}
              isPublic={webhook.isPublic}
            />
          </div>
        )}
      </div>
      <EditWebhookModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        webhook={webhook}
      />

      <SetPriceModal
        isOpen={showPriceModal}
        onClose={() => setShowPriceModal(false)}
        webhook={webhook}
        onSavePrice={handleSetPrice}
      />

      <RiskManagementModal
        isOpen={showRiskModal}
        onClose={() => setShowRiskModal(false)}
        webhook={webhook}
        onSave={handleSaveRiskSettings}
      />

      <WebhookAppsModal
        isOpen={showAppsModal}
        onClose={() => setShowAppsModal(false)}
        webhook={webhook}
        accountName={accountName}
      />
      <OpenTradeModal
        open={openTradeModal}
        setOpen={setOpenTradeModal}
        handleOk={handleOpenTrade}
        webhook={webhook}
        loading={openTradeLoading}
      />
    </>
  );
}
