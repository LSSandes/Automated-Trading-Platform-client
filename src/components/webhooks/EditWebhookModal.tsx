import { useState, useEffect } from "react";
import { X, Check, HelpCircle } from "lucide-react";
import Tooltip from "../ui/Tooltip";
import { EditWebhookModalProps } from "@/types/webhook";
import { useAtom } from "jotai";
import { userAtom } from "@/store/atoms";
import { dispatch } from "@/app/store";
import {
  updateAdvancedWebhook,
  updateBasicWebhook,
  updatePremiumWebhook,
} from "@/app/reducers/webhook";
import { toast } from "react-toastify";
import { tooltips } from "@/constant/webhook";
import { AiOutlineSafety } from "react-icons/ai";
import { MdOutlineWorkspacePremium } from "react-icons/md";
import { IoRocketOutline } from "react-icons/io5";
type OrderClass = "Create Order" | "Modify Order" | "Close Order";

export default function EditWebhookModal({
  isOpen,
  onClose,
  webhook,
}: EditWebhookModalProps) {
  const [user] = useAtom(userAtom);
  const [mode, setMode] = useState<string>(webhook.webhookMode);
  const [orderClass, setOrderClass] = useState<OrderClass>("Create Order");
  //-------------- Basic Mode Fields----------------------//
  const [webhookName, setWebhookName] = useState(webhook.webhookName);
  const [symbol, setSymbol] = useState(webhook.symbol || "");
  const [orderDirection, setOrderDirection] = useState(webhook.orderDirection);
  const [orderType, setOrderType] = useState(webhook.orderType);
  const [usePercentageSize, setUsePercentageSize] = useState(
    webhook.webhookMode == "basic" ? true : false
  );
  const [percentageSize, setPercentageSize] = useState(webhook.volume * 100);
  const [fixedSize, setFixedSize] = useState(webhook.volume);
  //Create Order Fields
  const [stopLoss_pips, setStopLoss] = useState(webhook.stopLoss_pips);
  const [takeProfit_pips, setTakeProfit] = useState(webhook.takeProfit_pips);
  const [openPrice_pips, setOpenPrice] = useState(webhook.openPrice_pips);
  const [stopLimit_pips, setStopLimit] = useState(webhook.stopLimit_pips);
  const [trailingStopLoss, setTrailingStopLoss] = useState(
    webhook.trailingStopLoss
  );

  // Close Order Fields
  const [partialClose, setPartialClose] = useState(webhook.partialClose);
  const [closeAllTrades, setCloseAllTrades] = useState(webhook.allTrades);

  // Modify Order Fields
  const [movePrice, setMovePrice] = useState(
    webhook.modifyType === "StopLoss"
      ? webhook.moveStopLoss_pips
      : webhook.moveTakeProfit_pips
  );
  const [modifyType, setModifyType] = useState(webhook.modifyType);

  //-------------- Premium Mode Fields----------------------//
  const [multiTakeProfit_pips, setMultiTakeProfit] = useState(
    String(webhook.multiTakeProfits_pips)
  );
  const [trailingDistance_pips, setTrailingDistance] = useState(
    webhook.trailingDistance_pips
  );
  const [activationTrigger_pips, setActivationTrigger] = useState(
    webhook.activationTrigger_pips
  );
  const [timeBasedExitMinute, setTimeBasedExitMinute] = useState(
    webhook.timeBasedExitMinute
  );
  const [breakenEvenSetting_pips, setBreakenEvenSetting] = useState(
    webhook.breakenEvenSetting_pips
  );

  useEffect(() => {
    if (webhook) {
      setMode(webhook.webhookMode);
      setWebhookName(webhook.webhookName);
      setSymbol(webhook.symbol || "");
      setFixedSize(webhook.volume);
    }
  }, [webhook, isOpen]);
  useEffect(() => {
    if (webhook.modifyType === "StopLoss") {
      setMovePrice(webhook.moveStopLoss_pips);
    } else {
      setMovePrice(webhook.moveTakeProfit_pips);
    }
    setModifyType(webhook.modifyType);
  }, [isOpen]);
  if (!isOpen) return null;
  const handleSave = () => {
    if (webhook.connectionStatus) {
      toast.info("Please diconnect from account");
    } else {
      if (user?.email) {
        if (webhook.webhookMode == "basic") {
          const updatedData = {
            webhookName_new: webhookName || "",
            symbol_new: symbol || "",
            orderDirection_new: orderDirection || "",
            orderType_new: orderType || "",
            volume_new: usePercentageSize
              ? (percentageSize / 100).toFixed(4).toString()
              : fixedSize.toString(),
            stopLoss_pips_new: (stopLoss_pips ?? 0).toFixed(2).toString(),
            takeProfit_pips_new: (takeProfit_pips ?? 0).toFixed(2).toString(),
            openPrice_new: (openPrice_pips ?? 0).toFixed(2).toString(),
            stopLimit_new: (stopLimit_pips ?? 0).toFixed(2).toString(),
            trailingStopLoss_new: (trailingStopLoss ?? 0).toFixed(2).toString(),
            modifyType_new: modifyType || "",
            moveStopLoss_pips_new: (movePrice ?? 0).toFixed(2).toString(),
            moveTakeProfit_pips_new: (movePrice ?? 0).toFixed(2).toString(),
            partialClose_new: (partialClose ?? 0).toFixed(2).toString(),
            allTrades_new: closeAllTrades || false,
          };
          console.log("basic webhook update----->", updatedData);
          dispatch(
            updateBasicWebhook({
              email: user?.email,
              webhookName: webhook.webhookName,
              webhookMode: webhook.webhookMode,
              symbol: webhook.symbol,
              ...updatedData,
            })
          ).then(() => {
            onClose();
          });
        } else if (webhook.webhookMode == "premium") {
          const updatedData = {
            webhookName_new: webhookName || "",
            symbol_new: symbol || "",
            volume_new: fixedSize.toString(),
            multiTakeProfit_pips_new: multiTakeProfit_pips || "",
            stopLoss_pips_new: (stopLoss_pips ?? 0).toFixed(2).toString(),
            trailingDistance_pips_new: (trailingDistance_pips ?? 0)
              .toFixed(2)
              .toString(),
            activationTrigger_pips_new: (activationTrigger_pips ?? 0)
              .toFixed(2)
              .toString(),
            timeBasedExitMinute_new: (timeBasedExitMinute ?? 0).toString(),
            breakenEvenSetting_pips_new: (
              breakenEvenSetting_pips ?? 0
            ).toString(),
          };
          console.log("updatedData", updatedData);
          dispatch(
            updatePremiumWebhook({
              email: user?.email,
              webhookName: webhook.webhookName,
              webhookMode: webhook.webhookMode,
              symbol: webhook.symbol,
              ...updatedData,
            })
          ).then(() => {
            onClose();
          });
        } else if (webhook.webhookMode == "advanced") {
          const updatedData = {
            webhookName_new: webhookName || "",
            symbol_new: symbol || "",
            volume_new: fixedSize.toString(),
          };
          dispatch(
            updateAdvancedWebhook({
              email: user?.email,
              webhookName: webhook.webhookName,
              webhookMode: webhook.webhookMode,
              symbol: webhook.symbol,
              ...updatedData,
            })
          ).then(() => {
            onClose();
          });
        }
      }
    }
  };

  const renderOrderTypeFields = () => {
    switch (orderClass) {
      case "Create Order":
        return (
          <div className="w-[90%] flex flex-col justify-center items-center gap-4">
            <div className="w-full flex justify-between items-center">
              <label className="flex items-center space-x-2 text-sm text-gray-400 mb-2">
                <span>Order Direction</span>
                <Tooltip content={tooltips.orderDirection}>
                  <HelpCircle className="h-4 w-4" />
                </Tooltip>
              </label>
              <select
                value={orderDirection}
                onChange={(e) => setOrderDirection(e.target.value)}
                className="w-1/2 bg-dark-200/50 text-white rounded-lg px-4 py-2.5
                         border border-dashed border-gray-500 focus:border-blue-500 focus:ring-0 text-sm"
              >
                <option value={"buy"}>Buy</option>
                <option value={"sell"}>Sell</option>
              </select>
            </div>
            <div className="w-full flex justify-between items-center">
              <label className="flex items-center space-x-2 text-sm text-gray-400 mb-2">
                <span>Order Type</span>
                <Tooltip content={tooltips.orderType}>
                  <HelpCircle className="h-4 w-4" />
                </Tooltip>
              </label>
              <select
                value={orderType}
                onChange={(e) => setOrderType(e.target.value)}
                className="w-1/2 bg-dark-200/50 text-white rounded-lg px-4 py-2.5
                         border border-dashed border-gray-500 focus:border-blue-500 focus:ring-0 text-sm"
              >
                <option value={"market"}>Market</option>
                <option value={"stop"}>Stop</option>
                <option value={"limit"}>Limit</option>
                <option value={"stopLimit"}>StopLimit</option>
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
                    step={0.1}
                    value={percentageSize}
                    onChange={(e) => setPercentageSize(Number(e.target.value))}
                    className="w-full accent-accent"
                  />
                  <div className="text-right text-sm text-gray-400">
                    {percentageSize.toFixed(1)}%
                  </div>
                </div>
              ) : (
                <input
                  type="number"
                  value={fixedSize}
                  onChange={(e) => setFixedSize(Number(e.target.value))}
                  className="w-full bg-dark-200/50 text-white rounded-lg px-4 py-2.5
                           border border-dashed border-gray-500 focus:border-blue-500 focus:ring-0 text-sm"
                />
              )}
            </div>

            <div className="w-full flex justify-between items-center">
              <label className="flex items-center space-x-2 text-sm text-gray-400 mb-2">
                <span>Stop loss (pips)</span>
                <Tooltip content={tooltips.stopLoss}>
                  <HelpCircle className="h-4 w-4" />
                </Tooltip>
              </label>
              <input
                type="number"
                value={stopLoss_pips}
                onChange={(e) => setStopLoss(Number(e.target.value))}
                className="w-1/2 bg-dark-200/50 text-white rounded-lg px-4 py-2.5
                         border border-dashed border-gray-500 focus:border-blue-500 focus:ring-0 text-sm"
              />
            </div>

            <div className="w-full flex justify-between items-center">
              <label className="flex items-center space-x-2 text-sm text-gray-400 mb-2">
                <span>Take profit (pips)</span>
                <Tooltip content={tooltips.takeProfit}>
                  <HelpCircle className="h-4 w-4" />
                </Tooltip>
              </label>
              <input
                type="number"
                value={takeProfit_pips}
                onChange={(e) => setTakeProfit(Number(e.target.value))}
                className="w-1/2 bg-dark-200/50 text-white rounded-lg px-4 py-2.5
                         border border-dashed border-gray-500 focus:border-blue-500 focus:ring-0 text-sm "
              />
            </div>
            {orderType != "market" && (
              <div className="w-full flex justify-between items-center">
                <label className="flex items-center space-x-2 text-sm text-gray-400 mb-2">
                  <span>Open Price(pips)</span>
                  <Tooltip content={tooltips.openPrice}>
                    <HelpCircle className="h-4 w-4" />
                  </Tooltip>
                </label>
                <input
                  type="number"
                  value={openPrice_pips}
                  onChange={(e) => setOpenPrice(Number(e.target.value))}
                  className="w-1/2 bg-dark-200/50 text-white rounded-lg px-4 py-2.5
                         border border-dashed border-gray-500 focus:border-blue-500 focus:ring-0 text-sm"
                />
              </div>
            )}
            {orderType == "stopLimit" && (
              <div className="w-full flex justify-between items-center">
                <label className="flex items-center space-x-2 text-sm text-gray-400 mb-2">
                  <span>Stoplimit Price(pips)</span>
                  <Tooltip content={tooltips.stopLimitPrice}>
                    <HelpCircle className="h-4 w-4" />
                  </Tooltip>
                </label>
                <input
                  type="number"
                  value={stopLimit_pips}
                  onChange={(e) => setStopLimit(Number(e.target.value))}
                  className="w-1/2 bg-dark-200/50 text-white rounded-lg px-4 py-2.5
                         border border-dashed border-gray-500 focus:border-blue-500 focus:ring-0 text-sm"
                />
              </div>
            )}
            <div className="w-full flex justify-between items-center">
              <label className="flex items-center space-x-2 text-sm text-gray-400 mb-2">
                <span>Trailing StopLoss (pips)</span>
                <Tooltip content={tooltips.trailingStoploss}>
                  <HelpCircle className="h-4 w-4" />
                </Tooltip>
              </label>
              <input
                type="number"
                value={trailingStopLoss}
                onChange={(e) => setTrailingStopLoss(Number(e.target.value))}
                className="w-1/2 bg-dark-200/50 text-white rounded-lg px-4 py-2.5
                         border border-dashed border-gray-500 focus:border-blue-500 focus:ring-0 text-sm"
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
                         border border-dashed border-gray-500 focus:border-blue-500 focus:ring-0 text-sm"
              >
                <option value="StopLoss">StopLoss</option>
                <option value="TakeProfit">TakeProfit</option>
              </select>
            </div>

            <div className="w-[90%] flex justify-between items-center ">
              <label className="flex items-center space-x-2 text-sm text-gray-400 mb-2">
                <span>Move price</span>
                <Tooltip content={tooltips.modifyPrice}>
                  <HelpCircle className="h-4 w-4" />
                </Tooltip>
              </label>
              <input
                type="number"
                value={movePrice}
                onChange={(e) => setMovePrice(Number(e.target.value))}
                className="w-1/2 bg-dark-200/50 text-white rounded-lg px-4 py-2.5
                        border border-dashed border-gray-500 focus:border-blue-500 focus:ring-0 text-sm"
              />
            </div>
          </>
        );

      case "Close Order":
        return (
          <>
            <div className="w-[90%] flex justify-between items-center ">
              <div className="flex items-center space-x-2">
                <span className="text-gray-400">Partial close</span>
                <Tooltip content={tooltips.partialClose}>
                  <HelpCircle className="h-4 w-4 text-gray-400" />
                </Tooltip>
              </div>
              <input
                type="number"
                min="1"
                max="60"
                value={partialClose}
                onChange={(e) => setPartialClose(Number(e.target.value))}
                className="w-1/2 bg-dark-200/50 text-white rounded-lg px-4 py-2.5
                            border border-dashed border-gray-500 focus:border-blue-500 focus:ring-0 text-sm"
              />
            </div>
            <div className="w-[90%] flex justify-between items-center ">
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
        <div className="relative p-6 border-b border-dark-300/50 flex flex-col justify-start items-start gap-2">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 p-2 text-gray-400 hover:text-white 
                     hover:bg-dark-200/50 rounded-lg transition-all duration-300"
          >
            <X className="h-5 w-5" />
          </button>
          <div
            className={`flex justify-center items-center text-xl font-bold gap-3 ${
              webhook.webhookMode == "basic"
                ? "text-blue-500"
                : webhook.webhookMode == "premium"
                ? "text-purple-500"
                : "text-orange-500"
            }`}
          >
            {GenerateIconByMode(webhook.webhookMode)}
            Edit{" "}
            {webhook.webhookMode.charAt(0).toUpperCase() +
              webhook.webhookMode.slice(1).toLowerCase()}{" "}
            Webhook
          </div>
          <p className="text-gray-400 text-sm">
            Update automated trading with TradingView signals
          </p>
        </div>

        <div className="p-6 space-y-6 lg:max-h-full max-h-[500px] overflow-y-auto flex flex-col justify-center items-center">
          {mode === "basic" && (
            <div className="flex flex-col gap-5 justify-center items-center w-full">
              {/* Order Type Selector */}
              <div className="flex rounded-lg bg-dark-200/30 p-1 w-full">
                {(
                  [
                    "Create Order",
                    "Modify Order",
                    "Close Order",
                  ] as OrderClass[]
                ).map((type) => (
                  <button
                    key={type}
                    onClick={() => setOrderClass(type)}
                    className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                      orderClass === type
                        ? "bg-blue-500 outline-1 outline-dashed outline-blue-500 outline-offset-2 text-white"
                        : "text-gray-400 hover:text-white"
                    }`}
                  >
                    {type}
                  </button>
                ))}
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
                             border border-dashed border-gray-500 focus:border-blue-500 focus:ring-0 text-sm"
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
                             border border-dashed border-gray-500 focus:border-blue-500 focus:ring-0 text-sm"
                    />
                  </div>

                  {/* Order Type Specific Fields */}
                  {renderOrderTypeFields()}
                </div>
              </div>
            </div>
          )}

          {mode === "premium" && (
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
                  className="w-1/2 bg-dark-200/50 text-white rounded-lg px-4 py-2.5 text-sm
                          border border-dashed border-gray-500 focus:border-purple-500 focus:ring-0"
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
                  className="w-1/2 bg-dark-200/50 text-white rounded-lg px-4 py-2.5 text-sm
                          border border-dashed border-gray-500 focus:border-purple-500 focus:ring-0"
                />
              </div>

              <div className="w-[90%] flex justify-between items-center relative">
                <label className="flex items-center space-x-2 text-sm text-gray-400 mb-2">
                  <span>Fixed size</span>
                  <Tooltip content={tooltips.fixedSize}>
                    <HelpCircle className="h-4 w-4" />
                  </Tooltip>
                </label>
                <input
                  type="text"
                  value={fixedSize}
                  onChange={(e) => setFixedSize(Number(e.target.value))}
                  className="w-1/2 bg-dark-200/50 text-white rounded-lg px-4 py-2.5 text-sm
                           border border-dashed border-gray-500 focus:border-purple-500 focus:ring-0"
                />
                <span className="text-gray-400 text-sm absolute right-[15px] top-[10px]">
                  Lot
                </span>
              </div>

              <div className="w-[90%] flex justify-between items-center">
                <label className="flex items-center space-x-2 text-sm text-gray-400 mb-2">
                  <span>Order Direction</span>
                  <Tooltip content={tooltips.orderDirection}>
                    <HelpCircle className="h-4 w-4" />
                  </Tooltip>
                </label>
                <select
                  value={orderDirection}
                  onChange={(e) => setOrderDirection(e.target.value)}
                  className="w-1/2 bg-dark-200/30 text-white rounded-lg px-4 py-3
                                               border border-dashed border-gray-500 focus:border-purple-500 focus:ring-0
                                                text-sm"
                >
                  <option value={"buy"}>Buy</option>
                  <option value={"sell"}>Sell</option>
                </select>
              </div>

              <div className="w-[90%] flex justify-between items-center relative">
                <label className="flex items-center space-x-2 text-sm text-gray-400 mb-2">
                  Multi TakeProfits(pips)
                </label>
                <input
                  type="text"
                  value={multiTakeProfit_pips}
                  onChange={(e) => setMultiTakeProfit(e.target.value)}
                  placeholder="BTCUSD"
                  className="w-1/2 bg-dark-200/50 text-white rounded-lg px-4 py-2.5 text-sm
                          border border-dashed border-gray-500 focus:border-purple-500 focus:ring-0"
                />
                <span className="text-gray-400 text-sm absolute right-[15px] top-[10px]">
                  Pips
                </span>
              </div>

              <div className="w-[90%] flex justify-between items-center relative">
                <label className="flex items-center space-x-2 text-sm text-gray-400 mb-2">
                  Stop Loss (pips)
                </label>
                <input
                  type="text"
                  value={stopLoss_pips}
                  onChange={(e) => setStopLoss(Number(e.target.value))}
                  placeholder="BTCUSD"
                  className="w-1/2 bg-dark-200/50 text-white rounded-lg px-4 py-2.5 text-sm
                          border border-dashed border-gray-500 focus:border-purple-500 focus:ring-0"
                />
                <span className="text-gray-400 text-sm absolute right-[15px] top-[10px]">
                  Pips
                </span>
              </div>

              <div className="w-[90%] flex justify-between items-center relative">
                <label className="flex items-center space-x-2 text-sm text-gray-400 mb-2">
                  Trailing Distance (pips)
                </label>
                <input
                  type="text"
                  value={trailingDistance_pips}
                  onChange={(e) => setTrailingDistance(Number(e.target.value))}
                  placeholder="BTCUSD"
                  className="w-1/2 bg-dark-200/50 text-white rounded-lg px-4 py-2.5 text-sm
                          border border-dashed border-gray-500 focus:border-purple-500 focus:ring-0"
                />
                <span className="text-gray-400 text-sm absolute right-[15px] top-[10px]">
                  Pips
                </span>
              </div>

              <div className="w-[90%] flex justify-between items-center relative">
                <label className="flex items-center space-x-2 text-sm text-gray-400 mb-2">
                  Activation Trigger (pips)
                </label>
                <input
                  type="text"
                  value={activationTrigger_pips}
                  onChange={(e) => setActivationTrigger(Number(e.target.value))}
                  placeholder="BTCUSD"
                  className="w-1/2 bg-dark-200/50 text-white rounded-lg px-4 py-2.5 text-sm
                          border border-dashed border-gray-500 focus:border-purple-500 focus:ring-0"
                />
                <span className="text-gray-400 text-sm absolute right-[15px] top-[10px]">
                  Pips
                </span>
              </div>

              <div className="w-[90%] flex justify-between items-center relative">
                <label className="flex items-center space-x-2 text-sm text-gray-400 mb-2">
                  <span>Time Based Exit (minutes)</span>
                </label>
                <input
                  type="text"
                  value={timeBasedExitMinute}
                  onChange={(e) =>
                    setTimeBasedExitMinute(Number(e.target.value))
                  }
                  placeholder="BTCUSD"
                  className="w-1/2 bg-dark-200/50 text-white rounded-lg px-4 py-2.5 text-sm
                          border border-dashed border-gray-500 focus:border-purple-500 focus:ring-0"
                />
                <span className="text-gray-400 text-sm absolute right-[15px] top-[10px]">
                  Minutes
                </span>
              </div>

              <div className="w-[90%] flex justify-between items-center relative">
                <label className="flex items-center space-x-2 text-sm text-gray-400 mb-2">
                  <span>Break Even Setting (pips)</span>
                </label>
                <input
                  type="text"
                  value={breakenEvenSetting_pips}
                  onChange={(e) =>
                    setBreakenEvenSetting(Number(e.target.value))
                  }
                  placeholder="BTCUSD"
                  className="w-1/2 bg-dark-200/50 text-white rounded-lg px-4 py-2.5 text-sm
                          border border-dashed border-gray-500 focus:border-purple-500 focus:ring-0"
                />
                <span className="text-gray-400 text-sm absolute right-[15px] top-[10px]">
                  Pips
                </span>
              </div>
            </div>
          )}

          {mode == "advanced" && (
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
                  className="w-1/2 bg-dark-200/50 text-white rounded-lg px-4 py-2.5 text-sm
                          border border-dashed border-gray-500 focus:border-orange-500 focus:ring-0"
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
                  className="w-1/2 bg-dark-200/50 text-white rounded-lg px-4 py-2.5 text-sm
                          border border-dashed border-gray-500 focus:border-orange-500 focus:ring-0"
                />
              </div>

              <div className="w-[90%] flex justify-between items-center relative">
                <label className="flex items-center space-x-2 text-sm text-gray-400 mb-2">
                  <span>Fixed size</span>
                  <Tooltip content={tooltips.fixedSize}>
                    <HelpCircle className="h-4 w-4" />
                  </Tooltip>
                </label>
                <input
                  type="number"
                  value={fixedSize}
                  step={0.01}
                  onChange={(e) => setFixedSize(Number(e.target.value))}
                  className="w-1/2 bg-dark-200/50 text-white rounded-lg px-4 py-2.5 text-sm
                           border border-dashed border-gray-500 focus:border-orange-500 focus:ring-0"
                />
                <span className="text-gray-400 text-sm absolute right-[15px] top-[10px]">
                  Lot
                </span>
              </div>
            </div>
          )}
          <div className="flex justify-between items-center w-full">
            <button
              onClick={() => onClose()}
              className="lg:px-6 px-4 bg-dark-100 rounded-lg py-2 flex items-center justify-center space-x-2 outline-1 outline-dark-300 outline-dashed outline-offset-2 text-center text-dark-700 hover:text-gray-400"
            >
              <span>Cancel</span>
            </button>
            <button
              onClick={handleSave}
              className="lg:px-6 px-4 bg-blue-500 rounded-lg py-2 flex items-center justify-center space-x-2 outline-1 outline-blue-500 outline-dashed outline-offset-2 text-center"
            >
              <span>Save</span>
              <Check className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function GenerateIconByMode(mode: string) {
  return (
    <>
      {mode == "basic" && (
        <AiOutlineSafety className="h-6 w-6 text-accent flex-shrink-0 mt-0.5" />
      )}
      {mode == "premium" && (
        <MdOutlineWorkspacePremium className="h-6 w-6 text-purple-500 flex-shrink-0 mt-0.5" />
      )}
      {mode == "advanced" && (
        <IoRocketOutline className="h-6 w-6 text-orange-500 flex-shrink-0 mt-0.5" />
      )}
    </>
  );
}
