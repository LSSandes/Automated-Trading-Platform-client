import { useEffect, useState } from "react";
import Tooltip from "../ui/Tooltip";
import { NewWebhookModalProps } from "@/types/webhook";
import { useAtom } from "jotai";
import { userAtom } from "@/store/atoms";
import { dispatch } from "@/app/store";
import {
  createBasicWebhook,
  createPremiumWebhook,
  createAdvancedWebhook,
} from "@/app/reducers/webhook";
import { tooltips } from "@/constant/webhook";
import { FiMinus, FiPlus } from "react-icons/fi";
import { X, Plus, HelpCircle } from "lucide-react";
import { AiOutlineSafety } from "react-icons/ai";
import { MdOutlineWorkspacePremium } from "react-icons/md";
import { IoRocketOutline } from "react-icons/io5";
import { Loader } from "lucide-react";

type WebhookMode = "basic" | "premium" | "advanced";
type OrderType = "Create Order" | "Modify Order" | "Close Order";

export default function NewWebhookModal({
  isOpen,
  onClose,
}: NewWebhookModalProps) {
  const [user] = useAtom(userAtom);
  const [isLoading, setIsLoading] = useState(false);
  const [mode, setMode] = useState<WebhookMode>("basic");
  const [orderClass, setOrderClass] = useState<OrderType>("Create Order");

  //----------Common Params---------------//
  const [webhookName, setWebhookName] = useState("");
  const [pair, setPair] = useState("");
  const [orderDirection, setOrderDirection] = useState<string>("buy");
  const [orderType, setOrderType] = useState<string>("market");
  const [usePercentageSize, setUsePercentageSize] = useState<boolean>(true);
  const [percentageSize, setPercentageSize] = useState<number>(1);
  const [fixedSize, setFixedSize] = useState<number>(0);
  //**Basic webhook**//
  //-----------Create Order Params------------//
  const [stopLoss_pips, setStopLoss] = useState<number>(
    orderType == "market" ? 200 : 10
  );
  const [takeProfit_pips, setTakeProfit] = useState<number>(
    orderType == "market" ? 200 : 10
  );
  const [trailingStopLoss, setTrailingStopLoss] = useState<number>(100); //market order
  const [openPrice_pips, setOpenPrice] = useState<number>(10); //stop, limit order
  const [stopLimit_pips, setStopLimit] = useState<number>(10); // stoplimit order
  //-----------Modify Order Params------------//
  const [modifyType, setModifyType] = useState<string>("StopLoss");
  const [moveStopLoss_pips, setMoveStopLoss] = useState<number>(200);
  const [moveTakeProfit_pips, setMoveTakeProfit] = useState<number>(200);
  //-----------Close Order Params-------------//
  const [partialClose, setPartialClose] = useState<number>(40);
  const [allTrades, setAllTrades] = useState<boolean>(false);
  //------------------------------------------//
  //**Premium webhook**//
  const [multiTakeProfit_pips, setMultiTakeProfit] = useState<number[]>([100]);
  const [timeBasedExitMinute, setTimeBasedExitMinute] = useState<number>(60);
  const [breakenEvenSetting_pips, setBreakenEvenSetting] = useState<number>(10);
  const [takeProfitSettingToogle, setTakeProfitSettingToogle] =
    useState<boolean>(false);
  const [stopLossSettingToogle, setStopLossSettingToogle] =
    useState<boolean>(false);
  const [trailingStopLossSettingToogle, setTrailingStopLossSettingToogle] =
    useState<boolean>(false);
  const [trailingDistance_pips, setTrailingDistance] = useState<number>(10);
  const [activationTrigger_pips, setActivationTrigger] = useState<number>(10);
  const [timeBasedExitToogle, setTImeBasedExitToogle] =
    useState<boolean>(false);
  const [breakEvenSettingToogle, setBreakEvenSettingToogle] =
    useState<boolean>(false);
  const [multiTakeProfitCount, setMultiTakeProfitCount] = useState<number>(1);
  const maxCounts = 3;
  const handleIncrease = () => {
    if (multiTakeProfitCount < maxCounts) {
      const newValue =
        multiTakeProfit_pips[multiTakeProfitCount - 1] +
        multiTakeProfit_pips[0];
      setMultiTakeProfitCount(multiTakeProfitCount + 1);
      setMultiTakeProfit([...multiTakeProfit_pips, newValue]);
    }
  };
  const handleDecrease = () => {
    if (multiTakeProfitCount > 1) {
      setMultiTakeProfitCount(multiTakeProfitCount - 1);
      setMultiTakeProfit(multiTakeProfit_pips.slice(0, -1));
    }
  };
  const multiTakeProfitPercentage = (100 / multiTakeProfitCount).toFixed(0);
  const hanleMultiTakeProfitChange = (index: number, value: number): void => {
    const newPips = [...multiTakeProfit_pips];
    newPips[index] = value;
    for (let i = index + 1; i < multiTakeProfitCount; i++) {
      newPips[i] = newPips[i - 1] * 2;
    }
    setMultiTakeProfit(newPips);
  };
  const handleCreateWebhook = async () => {
    setIsLoading(true);
    if (!user?.email) return;
    const whopToken = localStorage.getItem("whopToken");
    if (!whopToken) return;
    const commonData = {
      email: user.email,
      webhookName,
      webhookMode: mode,
      symbol: pair.toUpperCase(),
    };
    if (mode == "basic") {
      const orderData = {
        ...commonData,
        orderDirection,
        orderType,
        volume: usePercentageSize
          ? (percentageSize / 100).toFixed(4).toString()
          : fixedSize.toString(),
        stopLoss_pips: String(stopLoss_pips),
        takeProfit_pips: String(takeProfit_pips),
        openPrice_pips: String(openPrice_pips),
        stopLimit_pips: String(stopLimit_pips),
        trailingStopLoss: String(trailingStopLoss),
        modifyType,
        moveStopLoss_pips: String(moveStopLoss_pips),
        moveTakeProfit_pips: String(moveTakeProfit_pips),
        partialClose: String(partialClose),
        allTrades,
        whopToken,
      };
      dispatch(createBasicWebhook(orderData)).then(() => {
        setIsLoading(false);
        onClose();
      });
    } else if (mode == "premium") {
      const orderData = {
        ...commonData,
        orderDirection,
        orderType,
        volume: usePercentageSize
          ? (percentageSize / 100).toFixed(4).toString()
          : fixedSize.toString(),
        multiTakeProfit_pips: multiTakeProfit_pips
          .map((pips) => String(pips))
          .join(","),
        stopLoss_pips: stopLossSettingToogle ? String(stopLoss_pips) : "0",
        trailingDistance_pips: trailingStopLossSettingToogle
          ? String(trailingDistance_pips)
          : "0",
        activationTrigger_pips: trailingStopLossSettingToogle
          ? String(activationTrigger_pips)
          : "0",
        timeBasedExitMinute: timeBasedExitToogle
          ? String(timeBasedExitMinute)
          : "0",
        breakenEvenSetting_pips: breakEvenSettingToogle
          ? String(breakenEvenSetting_pips)
          : "0",
        whopToken,
      };
      dispatch(createPremiumWebhook(orderData)).then(() => {
        setIsLoading(false);
        onClose();
      });
    } else if (mode == "advanced") {
      const orderData = {
        ...commonData,
        volume: fixedSize.toString(),
        whopToken,
      };
      dispatch(createAdvancedWebhook(orderData)).then(() => {
        setIsLoading(false);
        onClose();
      });
    }
  };
  useEffect(() => {
    orderType != "market"
      ? setBreakEvenSettingToogle(true)
      : setBreakEvenSettingToogle(false);
  }, [orderType]);

  if (!isOpen) return null;
  console.log("-------orderType-------->", orderType);
  return (
    <div className="fixed inset-0 z-50 flex lg:items-center items-start justify-center px-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="bg-dark-50 rounded-2xl w-full max-w-2xl z-10 p-0 overflow-hidden space-y-2">
        {/* Header */}
        <div className="relative px-8 py-5 border-b border-dark-300/50">
          <button
            onClick={onClose}
            className="absolute right-6 top-6 p-2 text-gray-400 hover:text-white 
                     hover:bg-dark-200/50 rounded-lg transition-all duration-300"
          >
            <X className="h-5 w-5" />
          </button>
          <div className="flex items-center gap-2">
            {GenerateIconByMode(mode)}
            <h3 className="text-xl font-medium text-white tracking-tight capitalize">
              {mode} Webhook
            </h3>
          </div>
          <p className="text-gray-400 mt-2 text-sm">
            Set up automated trading with TradingView signals
          </p>
        </div>

        <div className="lg:p-3 p-3 space-y-4 max-h-[calc(100vh-200px)] overflow-y-auto">
          {/* *******************Web Hook Mode******************* */}
          <div className="flex rounded-xl  p-1.5 justify-center items-center">
            <div className="flex justify-center items-center gap-3 lg:w-[70%] w-full bg-dark-200/30 rounded-lg">
              <button
                onClick={() => setMode("basic")}
                className={`flex-1 px-6 py-2 rounded-lg text-sm font-medium transition-all flex justify-center items-center gap-2 ${
                  mode === "basic"
                    ? " text-white bg-blue-500 outline-1 outline-dashed outline-blue-500 outline-offset-2"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                <AiOutlineSafety className="w-5 h-5" />
                Basic
              </button>
              <button
                onClick={() => setMode("premium")}
                className={`flex-1 px-6 py-2 rounded-lg text-sm font-medium transition-all flex justify-center gap-2 items-center ${
                  mode === "premium"
                    ? " text-white bg-purple-500 outline-1 outline-dashed outline-purple-500 outline-offset-2"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                <MdOutlineWorkspacePremium className="w-5 h-5" />
                Premium
              </button>
              <button
                onClick={() => setMode("advanced")}
                className={`flex-1 px-6 py-2 rounded-lg text-sm font-medium transition-all flex justify-center items-center ${
                  mode === "advanced"
                    ? " text-white bg-orange-500 outline-1 outline-dashed outline-orange-500 outline-offset-2"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                <IoRocketOutline className="w-5 h-5" />
                Advanced
              </button>
            </div>
          </div>
          {/* Mode Description */}
          <div className=" rounded-xl  flex justify-center items-center">
            <div
              className={`flex items-start space-x-3 lg:w-[80%] w-full bg-opacity-10 ${
                mode == "basic"
                  ? "border-blue-500 bg-blue-500"
                  : mode == "premium"
                  ? "border-[#4D3168] bg-[#4D3168]"
                  : "border-[#683B1C] bg-[#683B1C]"
              } border p-6 rounded-lg`}
            >
              {GenerateIconByMode(mode)}

              <div className="space-y-0">
                {mode === "basic" && (
                  <>
                    <p className="text-accent text-sm">
                      Basic webhook supports three message types:
                    </p>
                    <ul className="list-disc text-gray-400 ml-4 space-y-1 text-sm">
                      <li className="text-sm">
                        Market Order: Places a market order based on specified
                        inputs
                      </li>
                      <li className="text-sm">
                        Update SL/TP: Updates the stop-loss or take-profit price
                      </li>
                      <li className="text-sm">
                        Close Trade: Closes open trades with optional partial
                        closing
                      </li>
                    </ul>
                  </>
                )}
                {mode == "premium" && (
                  <>
                    <p className="text-[#D8B2F7]">
                      Premium webhook includes advanced features:
                    </p>
                    <ul className="list-disc text-gray-400 ml-4 space-y-1 text-sm">
                      <li className="text-sm">
                        Multiple Take-Profit Levels with Smart Distribution
                      </li>
                      <li className="text-sm">
                        Advanced Position Sizing with Risk Management
                      </li>
                      <li className="text-sm">
                        Dynamic Trailing Stop-Loss System
                      </li>
                      <li className="text-sm">Time-Based Exit Strategies</li>
                      <li className="text-sm">Break-Even Automation</li>
                    </ul>
                  </>
                )}
                {mode == "advanced" && (
                  <>
                    <p className="text-orange-400 text-sm">
                      Advanced webhook support by algo companies
                    </p>
                    <div className="list-disc text-gray-400 space-y-1 text-sm">
                      Advanced webhook support by algo companies integrates our
                      alerts directly with their indicators, making it easier
                      for you to automate your trades. One or our partners in
                      the endeavor or{" "}
                      <a href="trustedsignals.com">trustedsignals.com</a>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {mode === "basic" && (
            <div className="space-y-4">
              <div className="flex justify-center items-center">
                <div className="flex rounded-xl bg-dark-200/30 p-1.5 lg:w-[80%] w-full">
                  {(
                    [
                      "Create Order",
                      "Modify Order",
                      "Close Order",
                    ] as OrderType[]
                  ).map((type) => (
                    <button
                      key={type}
                      onClick={() => setOrderClass(type)}
                      className={`flex-1 px-6 py-2 rounded-lg text-sm font-medium transition-all ${
                        orderClass === type
                          ? "bg-blue-500 outline-1 outline-dashed outline-blue-500 outline-offset-2 text-white"
                          : "text-gray-400 hover:text-white"
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>
              {/* Common Fields */}
              <div className="w-full flex justify-center items-center">
                <div className="flex flex-col justify-center items-center lg:w-[70%] w-[90%] gap-4">
                  <div className="flex justify-between items-center w-full">
                    <label className="flex items-center space-x-2 text-sm text-gray-400 mb-2">
                      <span>Webhook Name</span>
                      <Tooltip content={tooltips.webhookName}>
                        <HelpCircle className="h-4 w-4" />
                      </Tooltip>
                    </label>
                    <input
                      type="text"
                      value={webhookName}
                      onChange={(e) => setWebhookName(e.target.value)}
                      placeholder="My First Webhook"
                      className="w-1/2 bg-dark-50 text-white rounded-lg px-4 py-3
                             border border-dashed border-gray-500 focus:border-blue-500 focus:ring-0 text-sm"
                    />
                  </div>
                  <div className="flex justify-between items-center w-full">
                    <label className="flex items-center space-x-2 text-sm text-gray-400 mb-2">
                      <span>Trading Pair</span>
                      <Tooltip content={tooltips.pair}>
                        <HelpCircle className="h-4 w-4" />
                      </Tooltip>
                    </label>
                    <input
                      type="text"
                      value={pair}
                      onChange={(e) => setPair(e.target.value)}
                      placeholder="BTCUSD"
                      className="w-1/2 bg-dark-200/30 text-white rounded-lg px-4 py-3
                             border border-dashed border-gray-500 focus:border-blue-500 focus:ring-0 text-sm"
                    />
                  </div>
                  <div className="flex justify-between items-center w-full">
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
                                 border border-dashed border-gray-500 focus:border-blue-500 focus:ring-0
                                  text-sm"
                    >
                      <option value={"buy"}>Buy</option>
                      <option value={"sell"}>Sell</option>
                    </select>
                  </div>
                </div>
              </div>
              {/* Order Type Specific Fields */}
              <div className="flex w-full justify-center items-center">
                <div className="space-y-4 flex lg:w-[70%] w-[90%] justify-center items-center flex-col">
                  {orderClass === "Create Order" && (
                    <>
                      <div className="flex  justify-between items-center w-full gap-2">
                        <label className="flex items-center space-x-2 text-sm text-gray-400">
                          <span>Order Type</span>
                          <Tooltip content={tooltips.orderType}>
                            <HelpCircle className="h-4 w-4" />
                          </Tooltip>
                        </label>
                        <select
                          value={orderType}
                          onChange={(e) => setOrderType(e.target.value)}
                          className="w-1/2 bg-dark-200/30 text-white rounded-lg px-4 py-3
                                 border border-dashed border-gray-500 focus:border-blue-500 focus:ring-0
                                  text-sm"
                        >
                          <option value={"market"}>Market</option>
                          <option value={"stop"}>Stop</option>
                          <option value={"limit"}>Limit</option>
                          <option value={"stopLimit"}>StopLimit</option>
                        </select>
                      </div>
                      <div className="flex flex-col justify-center items-center w-full gap-2">
                        <div className="flex items-center justify-between mb-2 w-full">
                          <label className="flex items-center space-x-2 text-sm text-gray-400">
                            <span>Position Size</span>
                            <Tooltip content={tooltips.sizeType}>
                              <HelpCircle className="h-4 w-4" />
                            </Tooltip>
                          </label>
                          <button
                            onClick={() =>
                              setUsePercentageSize(!usePercentageSize)
                            }
                            className="text-sm text-accent hover:text-accent-dark"
                          >
                            Switch to{" "}
                            {usePercentageSize ? "fixed" : "percentage"}
                          </button>
                        </div>
                        {usePercentageSize ? (
                          <div className="space-y-2 w-full">
                            <input
                              type="range"
                              min="1"
                              max="40"
                              step={1}
                              value={percentageSize}
                              onChange={(e) =>
                                setPercentageSize(Number(e.target.value))
                              }
                              className="w-full accent-accent"
                            />
                            <div className="flex justify-between text-sm text-gray-400">
                              <span>1%</span>
                              <span>{percentageSize.toFixed(1)}%</span>
                              <span>40%</span>
                            </div>
                          </div>
                        ) : (
                          <input
                            type="number"
                            value={fixedSize}
                            step={0.01}
                            onChange={(e) =>
                              setFixedSize(Number(e.target.value))
                            }
                            className="w-full bg-dark-200/30 text-white rounded-lg px-4 py-3
                                   border border-dashed border-gray-500 focus:border-blue-500 focus:ring-0 text-sm"
                          />
                        )}
                      </div>

                      <div className="flex flex-col justify-center items-center w-full gap-4">
                        {orderType !== "market" && (
                          <div className="flex justify-between items-center w-full">
                            <label className="flex items-center space-x-2 text-sm text-gray-400 mb-2">
                              <span>Open Price (pips)</span>
                              <Tooltip content={tooltips.openPrice}>
                                <HelpCircle className="h-4 w-4" />
                              </Tooltip>
                            </label>
                            <input
                              type="number"
                              value={openPrice_pips}
                              placeholder="0"
                              step={1}
                              onChange={(e) =>
                                setOpenPrice(Number(e.target.value))
                              }
                              className="w-1/2 bg-dark-200/30 text-white rounded-lg px-4 py-3
                                   border border-dashed border-gray-500 focus:border-blue-500 focus:ring-0 text-sm"
                            />
                          </div>
                        )}
                        <div className="flex justify-between items-center w-full">
                          <label className="flex items-center space-x-2 text-sm text-gray-400 mb-2">
                            <span>Stop Loss (pips)</span>
                            <Tooltip content={tooltips.stopLoss}>
                              <HelpCircle className="h-4 w-4" />
                            </Tooltip>
                          </label>
                          <input
                            type="number"
                            value={stopLoss_pips}
                            placeholder="0"
                            step={1}
                            onChange={(e) =>
                              setStopLoss(Number(e.target.value))
                            }
                            className="w-1/2 bg-dark-200/30 text-white rounded-lg px-4 py-3
                                   border border-dashed border-gray-500 focus:border-blue-500 focus:ring-0 text-sm"
                          />
                        </div>
                        <div className="flex justify-between items-center w-full">
                          <label className="flex items-center space-x-2 text-sm text-gray-400 mb-2">
                            <span>Take Profit (pips)</span>
                            <Tooltip content={tooltips.takeProfit}>
                              <HelpCircle className="h-4 w-4" />
                            </Tooltip>
                          </label>
                          <input
                            type="number"
                            value={takeProfit_pips}
                            placeholder="0"
                            step={1}
                            onChange={(e) =>
                              setTakeProfit(Number(e.target.value))
                            }
                            className="w-1/2 bg-dark-200/30 text-white rounded-lg px-4 py-3
                                   border border-dashed border-gray-500 focus:border-blue-500 focus:ring-0 text-sm"
                          />
                        </div>
                        {orderType == "market" && (
                          <div className="flex justify-between items-center w-full">
                            <label className="flex items-center space-x-2 text-sm text-gray-400 mb-2">
                              <span>Trailing StopLoss (pips)</span>
                              <Tooltip content={tooltips.trailingStoploss}>
                                <HelpCircle className="h-4 w-4" />
                              </Tooltip>
                            </label>
                            <input
                              type="number"
                              value={trailingStopLoss}
                              placeholder="0"
                              step={1}
                              onChange={(e) =>
                                setTrailingStopLoss(Number(e.target.value))
                              }
                              className="w-1/2 bg-dark-200/30 text-white rounded-lg px-4 py-3
                                   border border-dashed border-gray-500 focus:border-blue-500 focus:ring-0 text-sm"
                            />
                          </div>
                        )}

                        {orderType == "stopLimit" && (
                          <div className="flex justify-between items-center w-full">
                            <label className="flex items-center space-x-2 text-sm text-gray-400 mb-2">
                              <span>StopLimit Price (pips)</span>
                              <Tooltip content={tooltips.stopLimitPrice}>
                                <HelpCircle className="h-4 w-4" />
                              </Tooltip>
                            </label>
                            <input
                              type="number"
                              value={stopLimit_pips}
                              placeholder="0"
                              step={1}
                              onChange={(e) =>
                                setStopLimit(Number(e.target.value))
                              }
                              className="w-1/2 bg-dark-200/30 text-white rounded-lg px-4 py-3
                                   border border-dashed border-gray-500 focus:border-blue-500 focus:ring-0 text-sm"
                            />
                          </div>
                        )}
                      </div>
                    </>
                  )}
                  {orderClass === "Modify Order" && (
                    <>
                      <div className="flex justify-between items-center w-full">
                        <label className="flex items-center space-x-2 text-sm text-gray-400 mb-2">
                          <span>Modify Type</span>
                          <Tooltip content={tooltips.modifyType}>
                            <HelpCircle className="h-4 w-4" />
                          </Tooltip>
                        </label>
                        <select
                          value={modifyType}
                          onChange={(e) => setModifyType(e.target.value)}
                          className="w-1/2 bg-dark-200/30 text-white rounded-lg px-4 py-3
                                 border border-dashed border-gray-500 focus:border-blue-500 focus:ring-0 
                                  text-sm"
                        >
                          <option value={"StopLoss"}>StopLoss</option>
                          <option value={"TakeProfit"}>TakeProfit</option>
                        </select>
                      </div>
                      <div className="flex justify-between items-center w-full">
                        <label className="flex items-center space-x-2 text-sm text-gray-400 mb-2">
                          <span>Modify Price (pips)</span>
                          <Tooltip content={tooltips.takeProfit}>
                            <HelpCircle className="h-4 w-4" />
                          </Tooltip>
                        </label>
                        <input
                          type="number"
                          value={
                            modifyType == "StopLoss"
                              ? moveStopLoss_pips
                              : moveTakeProfit_pips
                          }
                          placeholder="0"
                          step={1}
                          onChange={(e) => {
                            if (modifyType == "StopLoss") {
                              setMoveStopLoss(Number(e.target.value));
                            } else {
                              setMoveTakeProfit(Number(e.target.value));
                            }
                          }}
                          className="w-1/2 bg-dark-200/30 text-white rounded-lg px-4 py-3
                                   border border-dashed border-gray-500 focus:border-blue-500 focus:ring-0 text-sm"
                        />
                      </div>
                    </>
                  )}
                  {orderClass == "Close Order" && (
                    <>
                      <div className="flex justify-between items-center w-full">
                        <label className="flex items-center space-x-2 text-sm text-gray-400 mb-2">
                          <span>All Trades</span>
                          <Tooltip content={tooltips.allTrades}>
                            <HelpCircle className="h-4 w-4" />
                          </Tooltip>
                        </label>

                        <button
                          onClick={() => setAllTrades(!allTrades)}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                            allTrades ? "bg-accent" : "bg-dark-300"
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                              allTrades ? "translate-x-6" : "translate-x-1"
                            }`}
                          />
                        </button>
                      </div>
                      <div className="flex justify-between items-center w-full">
                        <label className="flex items-center space-x-2 text-sm text-gray-400 mb-2">
                          <span>Partial Close</span>
                          <Tooltip content={tooltips.partialClose}>
                            <HelpCircle className="h-4 w-4" />
                          </Tooltip>
                        </label>
                        <input
                          type="number"
                          value={partialClose}
                          step={1}
                          onChange={(e) =>
                            setPartialClose(Number(e.target.value))
                          }
                          className="w-1/2 bg-dark-200/30 text-white rounded-lg px-4 py-3
                             border border-dashed border-gray-500 focus:border-blue-500 focus:ring-0 text-sm"
                        />
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}

          {mode === "premium" && (
            <div className="space-y-4">
              <div className="w-full flex justify-center items-center">
                <div className="flex flex-col justify-center items-center lg:w-[70%] w-[90%] gap-4">
                  <div className="flex justify-between items-center w-full">
                    <label className="flex items-center space-x-2 text-sm text-gray-400 mb-2">
                      <span>Webhook Name</span>
                      <Tooltip content={tooltips.webhookName}>
                        <HelpCircle className="h-4 w-4" />
                      </Tooltip>
                    </label>
                    <input
                      type="text"
                      value={webhookName}
                      onChange={(e) => setWebhookName(e.target.value)}
                      placeholder="My First Webhook"
                      className="w-1/2 bg-dark-50 text-white rounded-lg px-4 py-3
                             border border-dashed border-gray-500 focus:border-purple-500 focus:ring-0 text-sm"
                    />
                  </div>
                  <div className="flex justify-between items-center w-full">
                    <label className="flex items-center space-x-2 text-sm text-gray-400 mb-2">
                      <span>Trading Pair</span>
                      <Tooltip content={tooltips.pair}>
                        <HelpCircle className="h-4 w-4" />
                      </Tooltip>
                    </label>
                    <input
                      type="text"
                      value={pair}
                      onChange={(e) => setPair(e.target.value)}
                      placeholder="BTCUSD"
                      className="w-1/2 bg-dark-200/30 text-white rounded-lg px-4 py-3
                             border border-dashed border-gray-500 focus:border-purple-500 focus:ring-0 text-sm"
                    />
                  </div>
                  <div className="flex justify-between items-center w-full">
                    <label className="flex items-center space-x-2 text-sm text-gray-400">
                      <span>Order Type</span>
                      <Tooltip content={tooltips.orderType}>
                        <HelpCircle className="h-4 w-4" />
                      </Tooltip>
                    </label>
                    <select
                      value={orderType}
                      onChange={(e) => setOrderType(e.target.value)}
                      className="w-1/2 bg-dark-200/30 text-white rounded-lg px-4 py-3
                                 border border-dashed border-gray-500 focus:border-purple-500 focus:ring-0
                                  text-sm"
                    >
                      <option value={"market"}>Market</option>
                      <option value={"limit"}>Limit</option>
                      <option value={"stop"}>Stop</option>
                    </select>
                  </div>
                  <div className="flex justify-between items-center w-full">
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
                  <div className="flex flex-col justify-center items-center w-full gap-2">
                    <div className="flex items-center justify-between mb-2 w-full">
                      <label className="flex items-center space-x-2 text-sm text-gray-400">
                        <span>Position Size</span>
                        <Tooltip content={tooltips.sizeType}>
                          <HelpCircle className="h-4 w-4" />
                        </Tooltip>
                      </label>
                      <button
                        onClick={() => setUsePercentageSize(!usePercentageSize)}
                        className="text-sm text-purple-500 hover:text-accent-dark"
                      >
                        Switch to {usePercentageSize ? "fixed" : "percentage"}
                      </button>
                    </div>
                    {usePercentageSize ? (
                      <div className="space-y-2 w-full">
                        <input
                          type="range"
                          min="1"
                          max="40"
                          step={1}
                          value={percentageSize}
                          onChange={(e) =>
                            setPercentageSize(Number(e.target.value))
                          }
                          className="w-full accent-purple-500"
                        />
                        <div className="flex justify-between text-sm text-gray-400">
                          <span>1%</span>
                          <span>{percentageSize.toFixed(1)}%</span>
                          <span>40%</span>
                        </div>
                      </div>
                    ) : (
                      <input
                        type="number"
                        value={fixedSize}
                        step={0.01}
                        onChange={(e) => setFixedSize(Number(e.target.value))}
                        className="w-full bg-dark-200/30 text-white rounded-lg px-4 py-3
                                   border border-dashed border-gray-500 focus:border-purple-500 focus:ring-0 text-sm"
                      />
                    )}
                  </div>
                  <div className="flex flex-col justify-center items-center w-full gap-2">
                    <div className="flex justify-between items-center w-full">
                      <span className="text-sm text-gray-400">
                        Take Profit Settings
                      </span>
                      <div className="flex justify-center items-center gap-2">
                        <span className="text-gray-400 text-sm">
                          Multiple TPs
                        </span>
                        <button
                          onClick={() =>
                            setTakeProfitSettingToogle(!takeProfitSettingToogle)
                          }
                          className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                            takeProfitSettingToogle
                              ? "bg-purple-500"
                              : "bg-dark-300"
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                              takeProfitSettingToogle
                                ? "translate-x-6"
                                : "translate-x-1"
                            }`}
                          />
                        </button>
                      </div>
                    </div>
                    {Array.from({ length: multiTakeProfitCount }).map(
                      (_, index) => (
                        <div
                          key={index}
                          className="flex justify-between gap-2 items-center w-full"
                        >
                          <div
                            className={`flex justify-center ${
                              takeProfitSettingToogle ? "w-[80%]" : "w-full"
                            } relative`}
                          >
                            <input
                              type="text"
                              value={multiTakeProfit_pips[index] || 0}
                              onChange={(e) =>
                                hanleMultiTakeProfitChange(
                                  index,
                                  Number(e.target.value)
                                )
                              }
                              className="w-full bg-dark-50 text-white rounded-lg px-4 py-3 border border-dashed border-gray-500 focus:border-purple-500 focus:ring-0 text-sm"
                            />
                            <span className="text-gray-400 text-sm absolute right-[15px] top-[15px]">
                              Pips
                            </span>
                          </div>
                          {takeProfitSettingToogle && (
                            <div className="flex justify-center items-center flex-1 outline-dashed outline-gray-500 outline-1 py-3 text-sm rounded-lg">
                              {multiTakeProfitPercentage} %
                            </div>
                          )}
                        </div>
                      )
                    )}
                    {takeProfitSettingToogle && (
                      <div className="flex justify-end items-center w-full">
                        <div className="flex justify-end items-center gap-2">
                          <button
                            className="bg-dark-300 p-1 rounded-md"
                            onClick={handleDecrease}
                          >
                            <FiMinus className="w-6 h-6" />
                          </button>
                          <button
                            className="bg-dark-300 p-1 rounded-md"
                            onClick={handleIncrease}
                          >
                            <FiPlus className="w-6 h-6" />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col justify-center items-center w-full gap-2">
                    <div className="flex justify-between items-center w-full">
                      <span className="text-sm text-gray-400">
                        Stop Loss Settings
                      </span>
                      <div className="flex justify-center items-center gap-2">
                        <span className="text-gray-400 text-sm">Stop Loss</span>
                        <button
                          onClick={() =>
                            setStopLossSettingToogle(!stopLossSettingToogle)
                          }
                          className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                            stopLossSettingToogle
                              ? "bg-purple-500"
                              : "bg-dark-300"
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                              stopLossSettingToogle
                                ? "translate-x-6"
                                : "translate-x-1"
                            }`}
                          />
                        </button>
                      </div>
                    </div>
                    {stopLossSettingToogle && (
                      <div className="flex justify-center w-full relative">
                        <input
                          type="text"
                          value={stopLoss_pips}
                          onChange={(e) => setStopLoss(Number(e.target.value))}
                          placeholder="My First Webhook"
                          className="w-full bg-dark-50 text-white rounded-lg px-4 py-3
                             border border-dashed border-gray-500 focus:border-purple-500 focus:ring-0 text-sm"
                        />
                        <span className="text-gray-400 text-sm absolute right-[15px] top-[15px]">
                          Pips
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col justify-center items-center gap-2 w-full">
                    <div className="flex justify-between w-full items-center">
                      <span className="text-sm text-gray-400">OpenPrice</span>
                      <div className="flex justify-center items-center gap-2">
                        <span className="text-gray-400 text-sm">Enable</span>
                        <button
                          onClick={() =>
                            setBreakEvenSettingToogle(!breakEvenSettingToogle)
                          }
                          className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                            breakEvenSettingToogle
                              ? "bg-purple-500"
                              : "bg-dark-300"
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                              breakEvenSettingToogle
                                ? "translate-x-6"
                                : "translate-x-1"
                            }`}
                          />
                        </button>
                      </div>
                    </div>
                    {breakEvenSettingToogle && (
                      <div className="flex justify-center w-full relative">
                        <input
                          type="text"
                          value={breakenEvenSetting_pips}
                          onChange={(e) =>
                            setBreakenEvenSetting(Number(e.target.value))
                          }
                          placeholder="Trailing Stop Loss"
                          className="w-full bg-dark-50 text-white rounded-lg px-4 py-3
                             border border-dashed border-gray-500 focus:border-purple-500 focus:ring-0 text-sm"
                        />
                        <span className="text-gray-400 text-sm absolute right-[15px] top-[15px]">
                          Pips
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col justify-center items-center w-full gap-2">
                    <div className="flex justify-between items-center w-full">
                      <span className="text-sm text-gray-400">
                        Trailing Stop Loss Setting
                      </span>
                      <div className="flex justify-center items-center gap-2">
                        <span className="text-gray-400 text-sm">
                          Trailing Stop
                        </span>
                        <button
                          onClick={() =>
                            setTrailingStopLossSettingToogle(
                              !trailingStopLossSettingToogle
                            )
                          }
                          className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                            trailingStopLossSettingToogle
                              ? "bg-purple-500"
                              : "bg-dark-300"
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                              trailingStopLossSettingToogle
                                ? "translate-x-6"
                                : "translate-x-1"
                            }`}
                          />
                        </button>
                      </div>
                    </div>
                    {trailingStopLossSettingToogle && (
                      <div className="flex flex-col justify-center items-start w-full gap-2">
                        <div className="flex justify-start items-center text-[12px] text-gray-400">
                          Trailing Distance (pips)
                        </div>
                        <div className="flex justify-center w-full relative">
                          <input
                            type="text"
                            value={trailingDistance_pips}
                            onChange={(e) =>
                              setTrailingDistance(Number(e.target.value))
                            }
                            placeholder="Trailing Stop Loss"
                            className="w-full bg-dark-50 text-white rounded-lg px-4 py-3
                             border border-dashed border-gray-500 focus:border-purple-500 focus:ring-0 text-sm"
                          />
                          <span className="text-gray-400 text-sm absolute right-[15px] top-[15px]">
                            Pips
                          </span>
                        </div>
                        <div className="flex justify-start items-center text-[12px] text-gray-400">
                          Activation Trigger (pips)
                        </div>
                        <div className="flex justify-center w-full relative">
                          <input
                            type="text"
                            value={activationTrigger_pips}
                            onChange={(e) =>
                              setActivationTrigger(Number(e.target.value))
                            }
                            placeholder="Activation Trigger"
                            className="w-full bg-dark-50 text-white rounded-lg px-4 py-3
                             border border-dashed border-gray-500 focus:border-purple-500 focus:ring-0 text-sm"
                          />
                          <span className="text-gray-400 text-sm absolute right-[15px] top-[15px]">
                            Pips
                          </span>
                        </div>
                      </div>
                    )}
                    <div className="flex flex-col justify-center items-center gap-2 w-full">
                      <div className="flex justify-between items-center w-full">
                        <span className="text-sm text-gray-400">
                          Time Based Exit
                        </span>
                        <div className="flex justify-center items-center gap-2">
                          <span className="text-gray-400 text-sm">Enable</span>
                          <button
                            onClick={() =>
                              setTImeBasedExitToogle(!timeBasedExitToogle)
                            }
                            className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                              timeBasedExitToogle
                                ? "bg-purple-500"
                                : "bg-dark-300"
                            }`}
                          >
                            <span
                              className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                                timeBasedExitToogle
                                  ? "translate-x-6"
                                  : "translate-x-1"
                              }`}
                            />
                          </button>
                        </div>
                      </div>
                      {timeBasedExitToogle && (
                        <div className="flex justify-center w-full relative">
                          <input
                            type="text"
                            value={timeBasedExitMinute}
                            onChange={(e) =>
                              setTimeBasedExitMinute(Number(e.target.value))
                            }
                            placeholder="Trailing Stop Loss"
                            className="w-full bg-dark-50 text-white rounded-lg px-4 py-3
                             border border-dashed border-gray-500 focus:border-purple-500 focus:ring-0 text-sm"
                          />
                          <span className="text-gray-400 text-sm absolute right-[15px] top-[15px]">
                            Minute
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {mode === "advanced" && (
            <div className="flex w-full justify-center items-center flex-col gap-2">
              <div className="space-y-8 w-[70%]">
                <div className="flex justify-between items-center">
                  <label className="flex items-center space-x-2 text-sm text-gray-400 mb-2">
                    <span>Webhook Name</span>
                    <Tooltip content={tooltips.webhookName}>
                      <HelpCircle className="h-4 w-4" />
                    </Tooltip>
                  </label>
                  <input
                    type="text"
                    value={webhookName}
                    onChange={(e) => setWebhookName(e.target.value)}
                    placeholder="My Advanced Webhook"
                    className="w-1/2 bg-dark-200/30 text-white rounded-lg px-4 py-3
                            border border-dashed border-gray-500 focus:border-orange-500 focus:ring-0 text-sm"
                  />
                </div>
                <div className="flex justify-between items-center">
                  <label className="flex items-center space-x-2 text-sm text-gray-400 mb-2">
                    <span>Trading Pairs</span>
                    <Tooltip content="Comma-separated list of trading pairs">
                      <HelpCircle className="h-4 w-4" />
                    </Tooltip>
                  </label>
                  <input
                    type="text"
                    value={pair}
                    onChange={(e) => setPair(e.target.value)}
                    placeholder="BTCUSD"
                    className="w-1/2 bg-dark-200/30 text-white rounded-lg px-4 py-3
                           border border-dashed border-gray-500 focus:border-orange-500 focus:ring-0 text-sm"
                  />
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center justify-between mb-2">
                    <label className="flex items-center space-x-2 text-sm text-gray-400">
                      <span>Fixed Position Size</span>
                      <Tooltip content={tooltips.fixedSize}>
                        <HelpCircle className="h-4 w-4" />
                      </Tooltip>
                    </label>
                  </div>
                  <input
                    type="number"
                    value={fixedSize}
                    step={0.01}
                    onChange={(e) => setFixedSize(Number(e.target.value))}
                    onWheel={(e) => e.currentTarget.blur()}
                    className="w-1/2 bg-dark-200/30 text-white rounded-lg px-4 py-3
                                    border border-dashed border-gray-500 focus:border-orange-500 focus:ring-0 text-sm"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="py-4 px-8 border-t border-dark-300/50">
          <div className="flex items-center justify-between">
            <button
              onClick={onClose}
              className="lg:px-6 px-4 py-2 text-gray-400 hover:text-gray-300 
                       transition-colors duration-300 bg-dark-100 outline-1 outline-dashed outline-dark-300 outline-offset-2 rounded-xl text-sm"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                handleCreateWebhook();
              }}
              disabled={!webhookName || !pair}
              className="premium-button lg:px-6 px-4 py-2 flex items-center space-x-2
                       disabled:opacity-50 disabled:cursor-not-allowed text-sm bg-blue-500 outline-1 outline-dashed outline-blue-500 outline-offset-2"
            >
              {isLoading && <Loader className="h-5 w-5 mr-2 animate-spin" />}
              <span>Create Webhook</span>
              <Plus className="h-5 w-5" />
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
