import { useState, useEffect } from "react";
import { X, Check, HelpCircle } from "lucide-react";
import { CiEdit } from "react-icons/ci";
import Tooltip from "../ui/Tooltip";
import { EditWebhookModalProps } from "@/types/webhook";
import { useAtom } from "jotai";
import { userAtom } from "@/store/atoms";
import { dispatch } from "@/app/store";
import { editMarketOrder } from "@/app/reducers/webhook";
import { toast } from "react-toastify";
import { tooltips } from "@/constant/webhook";
type OrderType = "Market Order" | "Modify Order" | "Close Order";

export default function EditWebhookModal({
  isOpen,
  onClose,
  webhook,
}: EditWebhookModalProps) {
  const [user] = useAtom(userAtom);
  const [mode, setMode] = useState<string>(webhook.webhookMode);
  const [orderType, setOrderType] = useState<OrderType>("Market Order");
  // Basic Mode Fields
  const [webhookName, setWebhookName] = useState(webhook.webhookName);
  const [symbol, setSymbol] = useState(webhook.symbol || "");
  const [orderDirection, setOrderDirection] = useState(webhook.orderDirection);
  const [usePercentageSize, setUsePercentageSize] = useState(
    webhook.webhookMode == "basic" ? true : false
  );
  const [percentageSize, setPercentageSize] = useState(webhook.volume * 100);
  const [fixedSize, setFixedSize] = useState(webhook.volume);
  const [stopLoss, setStopLoss] = useState(webhook.stopLoss_pips);
  const [takeProfit, setTakeProfit] = useState(webhook.takeProfit_pips);

  // Close Order Fields
  const [partialClose, setPartialClose] = useState(false);
  const [closeAllTrades, setCloseAllTrades] = useState(false);
  const [closeType, setCloseType] = useState("Market");

  // Modify Order Fields
  const [modifyPrice, setModifyPrice] = useState("");
  const [modifyType, setModifyType] = useState("Stop Loss");

  useEffect(() => {
    if (webhook) {
      setMode(webhook.webhookMode);
      setWebhookName(webhook.webhookName);
      setSymbol(webhook.symbol || "");
    }
  }, [webhook]);

  if (!isOpen) return null;

  const handleSave = () => {
    if (webhook.connectionStatus) {
      toast.info("Please diconnect from account");
    } else {
      if (user?.email) {
        dispatch(
          editMarketOrder({
            email: user?.email,
            webhookName: webhook.webhookName,
            webhookMode: webhook.webhookMode,
            symbol: webhook.symbol,
            orderDirection: webhook.orderDirection,
            webhookName_new: webhookName,
            symbol_new: symbol,
            orderDirection_new: orderDirection || "",
            volume_new: usePercentageSize
              ? (percentageSize / 100).toFixed(4).toString()
              : fixedSize.toString(),
            stopLoss_new: (stopLoss ?? 0).toFixed(6).toString(),
            takeProfit_new: (takeProfit ?? 0).toFixed(6).toString(),
          })
        ).then(() => {
          onClose();
        });
      }
    }
  };

  const renderOrderTypeFields = () => {
    switch (orderType) {
      case "Market Order":
        return (
          <div className="w-[90%] flex flex-col justify-center items-center gap-4">
            <div className="w-full flex justify-between items-center">
              <label className="flex items-center space-x-2 text-sm text-gray-400 mb-2">
                <span>Order type</span>
                <Tooltip content={tooltips.orderType}>
                  <HelpCircle className="h-4 w-4" />
                </Tooltip>
              </label>
              <select
                value={orderDirection}
                onChange={(e) => setOrderDirection(e.target.value)}
                className="w-1/2 bg-dark-200/50 text-white rounded-lg px-4 py-2.5
                         outline-1 outline-dashed outline-blue-500"
              >
                <option value={"buy"}>Buy</option>
                <option value={"sell"}>Sell</option>
              </select>
            </div>

            <div className="flex flex-col justify-center items-center w-full gap-4">
              <div className="flex items-center justify-between mb-2 w-full">
                <label className="flex items-center space-x-2 text-sm text-gray-400">
                  <span>Size type</span>
                  <Tooltip content={tooltips.sizeType}>
                    <HelpCircle className="h-4 w-4" />
                  </Tooltip>
                </label>
                <button
                  onClick={() => setUsePercentageSize(!usePercentageSize)}
                  className="text-sm text-accent hover:text-accent-dark"
                >
                  {usePercentageSize
                    ? "Switch to fixed"
                    : "Switch to percentage"}
                </button>
              </div>
              {usePercentageSize ? (
                <div className="space-y-2 w-full">
                  <input
                    type="range"
                    min="0"
                    max="40"
                    step={0.01}
                    value={percentageSize}
                    onChange={(e) => setPercentageSize(Number(e.target.value))}
                    className="w-full accent-accent"
                  />
                  <div className="text-right text-sm text-gray-400">
                    {percentageSize}%
                  </div>
                </div>
              ) : (
                <input
                  type="number"
                  value={fixedSize}
                  onChange={(e) => setFixedSize(Number(e.target.value))}
                  className="w-full bg-dark-200/50 text-white rounded-lg px-4 py-2.5
                           outline-1 outline-dashed outline-blue-500"
                />
              )}
            </div>

            <div className="w-full flex justify-between items-center">
              <label className="flex items-center space-x-2 text-sm text-gray-400 mb-2">
                <span>Stop loss</span>
                <Tooltip content={tooltips.stopLoss}>
                  <HelpCircle className="h-4 w-4" />
                </Tooltip>
              </label>
              <input
                type="number"
                value={stopLoss}
                onChange={(e) => setStopLoss(Number(e.target.value))}
                className="w-1/2 bg-dark-200/50 text-white rounded-lg px-4 py-2.5
                         outline-1 outline-dashed outline-blue-500"
              />
            </div>

            <div className="w-full flex justify-between items-center">
              <label className="flex items-center space-x-2 text-sm text-gray-400 mb-2">
                <span>Take profit</span>
                <Tooltip content={tooltips.takeProfit}>
                  <HelpCircle className="h-4 w-4" />
                </Tooltip>
              </label>
              <input
                type="number"
                value={takeProfit}
                onChange={(e) => setTakeProfit(Number(e.target.value))}
                className="w-1/2 bg-dark-200/50 text-white rounded-lg px-4 py-2.5
                         outline-1 outline-dashed outline-blue-500"
              />
            </div>
          </div>
        );

      case "Modify Order":
        return (
          <>
            <div className="w-[90%] flex justify-between items-center">
              <label className="flex items-center space-x-2 text-sm text-gray-400 mb-2">
                <span>Modify type</span>
                <Tooltip content="Choose whether to modify Stop Loss or Take Profit">
                  <HelpCircle className="h-4 w-4" />
                </Tooltip>
              </label>
              <select
                value={modifyType}
                onChange={(e) => setModifyType(e.target.value)}
                className="w-1/2 bg-dark-200/50 text-white rounded-lg px-4 py-2.5
                         border border-dark-300/50 focus:outline-none focus:ring-1 
                         focus:ring-accent/50"
              >
                <option>Stop Loss</option>
                <option>Take Profit</option>
              </select>
            </div>

            <div className="w-[90%] flex justify-between items-center ">
              <label className="flex items-center space-x-2 text-sm text-gray-400 mb-2">
                <span>New price</span>
                <Tooltip content={tooltips.modifyPrice}>
                  <HelpCircle className="h-4 w-4" />
                </Tooltip>
              </label>
              <input
                type="number"
                value={modifyPrice}
                onChange={(e) => setModifyPrice(e.target.value)}
                className="w-1/2 bg-dark-200/50 text-white rounded-lg px-4 py-2.5
                         border border-dark-300/50 focus:outline-none focus:ring-1 
                         focus:ring-accent/50"
              />
            </div>
          </>
        );

      case "Close Order":
        return (
          <>
            <div>
              <label className="flex items-center space-x-2 text-sm text-gray-400 mb-2">
                <span>Close type</span>
                <Tooltip content={tooltips.closeType}>
                  <HelpCircle className="h-4 w-4" />
                </Tooltip>
              </label>
              <select
                value={closeType}
                onChange={(e) => setCloseType(e.target.value)}
                className="w-full bg-dark-200/50 text-white rounded-lg px-4 py-2.5
                         border border-dark-300/50 focus:outline-none focus:ring-1 
                         focus:ring-accent/50"
              >
                <option>Market</option>
                <option>Limit</option>
              </select>
            </div>

            <div className="flex items-center justify-between py-2">
              <div className="flex items-center space-x-2">
                <span className="text-gray-400">Partial close</span>
                <Tooltip content={tooltips.partialClose}>
                  <HelpCircle className="h-4 w-4 text-gray-400" />
                </Tooltip>
              </div>
              <button
                onClick={() => setPartialClose(!partialClose)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                  partialClose ? "bg-accent" : "bg-dark-300"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                    partialClose ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>

            {partialClose && (
              <div>
                <label className="flex items-center space-x-2 text-sm text-gray-400 mb-2">
                  <span>Close percentage</span>
                  <Tooltip content="Percentage of the position to close">
                    <HelpCircle className="h-4 w-4" />
                  </Tooltip>
                </label>
                <input
                  type="number"
                  min="1"
                  max="100"
                  value={percentageSize}
                  onChange={(e) => setPercentageSize(Number(e.target.value))}
                  className="w-full bg-dark-200/50 text-white rounded-lg px-4 py-2.5
                           border border-dark-300/50 focus:outline-none focus:ring-1 
                           focus:ring-accent/50"
                />
              </div>
            )}

            <div className="flex items-center justify-between py-2">
              <div className="flex items-center space-x-2">
                <span className="text-gray-400">All trades</span>
                <Tooltip content={tooltips.allTrades}>
                  <HelpCircle className="h-4 w-4 text-gray-400" />
                </Tooltip>
              </div>
              <button
                onClick={() => setCloseAllTrades(!closeAllTrades)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                  closeAllTrades ? "bg-accent" : "bg-dark-300"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                    closeAllTrades ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          </>
        );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="glass-panel rounded-2xl lg:max-w-xl w-full z-10 p-0 overflow-hidden">
        <div className="relative p-6 border-b border-dark-300/50 flex justify-start items-center gap-2">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 p-2 text-gray-400 hover:text-white 
                     hover:bg-dark-200/50 rounded-lg transition-all duration-300"
          >
            <X className="h-5 w-5" />
          </button>
          <CiEdit className="w-5 h-5" />
          Edit{" "}
          {webhook.webhookMode.charAt(0).toUpperCase() +
            webhook.webhookMode.slice(1).toLowerCase()}{" "}
          Webhook
        </div>

        <div className="p-6 space-y-6 lg:max-h-full max-h-[500px] overflow-y-auto flex flex-col justify-center items-center">
          {mode === "basic" && (
            <div className="flex flex-col gap-5 justify-center items-center w-full">
              {/* Order Type Selector */}
              <div className="flex rounded-lg bg-dark-200/30 p-1 w-full">
                {(["Market Order", "Modify Order"] as OrderType[]).map(
                  (type) => (
                    <button
                      key={type}
                      onClick={() => setOrderType(type)}
                      className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                        orderType === type
                          ? "bg-accent outline-1 outline-dashed outline-blue-500 outline-offset-2 text-white"
                          : "text-gray-400 hover:text-white"
                      }`}
                    >
                      {type}
                    </button>
                  )
                )}
              </div>

              {/* Common Fields */}
              <div className="w-full flex justify-center items-center">
                <div className="space-y-4 flex flex-col gap-5 justify-center items-center w-full">
                  <div className="flex justify-between items-center w-[90%]">
                    <label className="flex items-center space-x-2 text-sm text-gray-400 mb-2">
                      <span>Webhook name</span>
                      <Tooltip content={tooltips.webhookName}>
                        <HelpCircle className="h-4 w-4" />
                      </Tooltip>
                    </label>
                    <input
                      type="text"
                      value={webhookName}
                      onChange={(e) => setWebhookName(e.target.value)}
                      placeholder="First webhook"
                      className="w-1/2 bg-dark-200/50 text-white rounded-lg px-4 py-2.5
                             outline-1 outline-blue-500 outline-dashed"
                    />
                  </div>
                  <div className="flex justify-between items-center w-[90%]">
                    <label className="flex items-center space-x-2 text-sm text-gray-400 mb-2">
                      <span>Pair</span>
                      <Tooltip content={tooltips.pair}>
                        <HelpCircle className="h-4 w-4" />
                      </Tooltip>
                    </label>
                    <input
                      type="text"
                      value={symbol}
                      onChange={(e) => setSymbol(e.target.value)}
                      placeholder="BTCUSD"
                      className="w-1/2 bg-dark-200/50 text-white rounded-lg px-4 py-2.5
                             outline-1 outline-blue-500 outline-dashed"
                    />
                  </div>

                  {/* Order Type Specific Fields */}
                  {renderOrderTypeFields()}
                </div>
              </div>
            </div>
          )}

          {mode === "advanced" && (
            <div className="space-y-4 w-full flex flex-col justify-center items-center">
              <div className="w-[90%] flex justify-between items-center">
                <label className="flex items-center space-x-2 text-sm text-gray-400 mb-2">
                  <span>Name</span>
                  <Tooltip content={tooltips.webhookName}>
                    <HelpCircle className="h-4 w-4" />
                  </Tooltip>
                </label>
                <input
                  type="text"
                  value={webhookName}
                  onChange={(e) => setWebhookName(e.target.value)}
                  placeholder="First webhook"
                  className="w-1/2 bg-dark-200/50 text-white rounded-lg px-4 py-2.5
                          outline-1 outline-dashed outline-blue-500"
                />
              </div>

              <div className="w-[90%] flex justify-between items-center">
                <label className="flex items-center space-x-2 text-sm text-gray-400 mb-2">
                  <span>Pair</span>
                  <Tooltip content={tooltips.pair}>
                    <HelpCircle className="h-4 w-4" />
                  </Tooltip>
                </label>
                <input
                  type="text"
                  value={symbol}
                  onChange={(e) => setSymbol(e.target.value)}
                  placeholder="BTCUSD"
                  className="w-1/2 bg-dark-200/50 text-white rounded-lg px-4 py-2.5
                          outline-1 outline-dashed outline-blue-500 "
                />
              </div>

              <div className="w-[90%] flex justify-between items-center">
                <label className="flex items-center space-x-2 text-sm text-gray-400 mb-2">
                  <span>Fixed size</span>
                  <Tooltip content={tooltips.fixedSize}>
                    <HelpCircle className="h-4 w-4" />
                  </Tooltip>
                </label>
                <input
                  type="number"
                  value={fixedSize}
                  onChange={(e) => setFixedSize(Number(e.target.value))}
                  className="w-1/2 bg-dark-200/50 text-white rounded-lg px-4 py-2.5
                           outline-1 outline-dashed outline-blue-500"
                />
              </div>
            </div>
          )}
          <button
            onClick={handleSave}
            className="w-1/2 premium-button py-3 flex items-center justify-center space-x-2 outline-1 outline-blue-500 outline-dashed outline-offset-2"
          >
            <span>Save Changes</span>
            <Check className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
