import { useEffect, useRef, useState } from "react";
import { Clock, Copy, MoreVertical, DollarSign } from "lucide-react";
import WebhookMenu from "./WebhookMenu";
// import WebhookColorPicker from "./WebhookColorPicker";
import { WebhookCardProps } from "@/types/webhook";
// import WebhookStatsModal from "./WebhookStatsModal";
import EditWebhookModal from "./EditWebhookModal";
import SetPriceModal from "./SetPriceModal";
import RiskManagementModal from "./RiskManagementModal";
import WebhookAppsModal from "./WebhookAppsModal";
import { useAtom } from "jotai";
import { userAtom } from "@/store/atoms";
import { dispatch } from "@/app/store";
import { deleteMarketOrder } from "@/app/reducers/webhook";
import { toast } from "react-toastify";

export default function WebhookCard({
  webhook,
  // onChangeColor,
  onToggleActive,
  onTogglePublic,
  onSetPrice,
}: WebhookCardProps) {
  const [user] = useAtom(userAtom);
  const [showMenu, setShowMenu] = useState(false);
  // const [showColorPicker, setShowColorPicker] = useState(false);
  // const [showStats, setShowStats] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showPriceModal, setShowPriceModal] = useState(false);
  const [showRiskModal, setShowRiskModal] = useState(false);
  const [showAppsModal, setShowAppsModal] = useState(false);
  const [copied, setCopied] = useState(false);
  const [timeDiff, setTimeDiff] = useState("");
  useEffect(() => {
    const updateTimeDiff = () => {
      const now = new Date();
      if (webhook.tradeExecutionTime) {
        const tradeExecutionTime = webhook.tradeExecutionTime
          ? new Date(webhook.tradeExecutionTime).getTime()
          : 0;
        const diffInMilliseconds = now.getTime() - tradeExecutionTime;

        const hours = Math.floor(diffInMilliseconds / (1000 * 60 * 60));
        const minutes = Math.floor(
          (diffInMilliseconds % (1000 * 60 * 60)) / (1000 * 60)
        );
        if (hours == 0) {
          setTimeDiff(`${minutes} minutes ago`);
        } else {
          setTimeDiff(`${hours} hours ${minutes} minutes ago`);
        }
      }
    };

    updateTimeDiff();
    const intervalId = setInterval(updateTimeDiff, 60000); // update every minute

    return () => clearInterval(intervalId); // cleanup on unmount
  }, []);

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
      `https://api.automatedtrader.com/webhook/${webhook.id}`
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
    // Implement risk settings save logic
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
            orderDirection: webhook.orderDirection,
            symbol: webhook.symbol,
          })
        ).then(() => {
          toast.success("The webhook has been successfully deleted.");
        });
      }
    }
  };
  //  ***************************************************************************//
  // const getBgGradient = () => {
  //   if (!webhook.color) return "from-dark-200/20 to-dark-200/5";
  //   return webhook.color;
  // };

  return (
    <>
      <div
        className={`relative rounded-xl overflow-hidden transition-all duration-300 
                      hover:translate-y-[-2px] hover:shadow-2xl hover:shadow-accent/5`}
      >
        {/* Background Gradient */}
        <div
          className={`absolute inset-0 bg-gradient-to-br from-dark-200/20 to-dark-200/5 opacity-10`}
        />

        {/* Content */}
        <div className="relative glass-panel rounded-xl p-6 border border-dark-300/30">
          {/* Header */}
          <div className="flex justify-between items-start mb-6">
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
                    {webhook.webhookName}
                  </span>
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

            <div className="flex items-center space-x-1">
              <button
                onClick={handleCopy}
                className="p-2 text-gray-400 hover:text-white hover:bg-dark-200/50 
                         rounded-lg transition-all"
                title="Copy webhook URL"
              >
                {copied ? (
                  <Copy className="h-5 w-5" />
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

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="glass-panel rounded-lg p-3 border border-dark-300/30">
              <div className="text-gray-400 text-sm mb-1">Last Signal</div>
              <div className="text-white font-medium">
                {timeDiff || "Never"}
              </div>
            </div>

            <div className="glass-panel rounded-lg p-3 border border-dark-300/30">
              <div className="text-gray-400 text-sm mb-1">Success Rate</div>
              <div className="text-emerald-400 font-medium">
                {webhook.successRate ? `${webhook.successRate}%` : "N/A"}
              </div>
            </div>
          </div>

          {/* Symbols */}
          <div className="flex flex-wrap gap-1.5 mb-6">
            <span
              className="px-2 py-1 text-xs rounded-lg bg-dark-200/50 text-gray-300
                         border border-dark-300/30 backdrop-blur-sm"
            >
              {webhook.symbol}
            </span>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
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

              {webhook.isPublic && (
                <div className="flex flex-col items-center space-y-1">
                  <span className="text-xs text-gray-400">Price</span>
                  <button
                    onClick={() => setShowPriceModal(true)}
                    className="flex items-center space-x-1 text-emerald-400 hover:text-emerald-300 transition-colors"
                  >
                    <DollarSign className="h-4 w-4" />
                    <span>{webhook.price || 0}/mo</span>
                  </button>
                </div>
              )}
            </div>

            {/* <button
              onClick={() => setShowStats(true)}
              className="px-3 py-1.5 text-sm bg-dark-200/50 text-gray-300 rounded-lg
                       border border-dark-300/30 hover:bg-dark-200/80 transition-colors
                       flex items-center space-x-1"
            >
              <Power className="h-4 w-4 mr-1" />
              <span>View Stats</span>
            </button> */}
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

        {/* {showColorPicker && (
          <div
            className="absolute right-2 top-12 bg-dark-200/95 rounded-xl border border-dark-300/50 
                        shadow-xl backdrop-blur-xl p-4 z-50"
          >
            <h4 className="text-sm font-medium text-white mb-3">
              Choose Color
            </h4>
            <WebhookColorPicker
              selectedColor={webhook.color || ""}
              onColorSelect={(color) => {
                onChangeColor(webhook.id);
                setShowColorPicker(false);
              }}
            />
          </div>
        )} */}
      </div>
{/* 
      <WebhookStatsModal
        isOpen={showStats}
        onClose={() => setShowStats(false)}
        webhook={webhook}
      /> */}

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
      />
    </>
  );
}
