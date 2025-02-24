import { useState } from "react";
import { X, AlertTriangle, Plus, HelpCircle } from "lucide-react";
import Tooltip from "../ui/Tooltip";
import { NewWebhookModalProps } from "@/types/webhook";
import { useAtom } from "jotai";
import { userAtom } from "@/store/atoms";
import { dispatch } from "@/app/store";
import { createMarketOrder } from "@/app/reducers/webhook";
import { addCloseOrder } from "@/app/reducers/closeOrder";
import { MdOutlineWebhook } from "react-icons/md";

type WebhookMode = "basic" | "advanced";
type OrderType = "Market Order" | "Modify Order" | "Close Order";

const tooltips = {
  webhookName: "A unique name to identify your webhook",
  messageName: "Name of the message template that will be sent to TradingView",
  pair: "Trading pair symbol (e.g., BTCUSD, EURUSD)",
  orderType: "Type of order to execute",
  sizeType: "Choose between percentage of account balance or fixed lot size",
  stopLoss: "Price level where the trade will be closed to limit losses",
  takeProfit: "Price level where the trade will be closed to secure profits",
  partialClose: "Close only a portion of the open position",
  allTrades: "Close all open trades for this symbol",
  modifyPrice: "New price level for stop loss or take profit",
  closeType: "Method of closing the trade",
  fixedSize: "Trading volume in lots",
  percentageSize: "Position size as a percentage of account balance",
};

export default function NewWebhookModal({
  isOpen,
  onClose,
}: NewWebhookModalProps) {
  const [user] = useAtom(userAtom);
  const [mode, setMode] = useState<WebhookMode>("basic");
  const [orderType, setOrderType] = useState<OrderType>("Market Order");
  const [webhookName, setWebhookName] = useState("");
  const [pair, setPair] = useState("");
  const [orderDirection, setOrderDirection] = useState("buy");
  const [usePercentageSize, setUsePercentageSize] = useState(true);
  const [percentageSize, setPercentageSize] = useState(1);
  const [fixedSize, setFixedSize] = useState(0);
  const [stopLoss_pips, setStopLoss] = useState("200");
  const [takeProfit_pips, setTakeProfit] = useState("200");
  const handleCreateWebhook = async () => {
    if (!user?.email) return;
    const commonData = {
      email: user.email,
      webhookName,
      webhookMode: mode,
      symbol: pair,
    };
    if (orderType === "Market Order") {
      const orderData =
        mode === "basic"
          ? {
              ...commonData,
              orderDirection,
              volume: usePercentageSize
                ? (percentageSize / 100).toFixed(4).toString()
                : fixedSize.toString(),
              stopLoss_pips: String(Number(stopLoss_pips)),
              takeProfit_pips: String(Number(takeProfit_pips)),
            }
          : {
              ...commonData,
              orderDirection: "",
              volume: fixedSize.toString(),
              stopLoss_pips: "0",
              takeProfit_pips: "0",
            };
  
      dispatch(createMarketOrder(orderData));
    } else if (orderType === "Close Order") {
      dispatch(addCloseOrder(commonData));
    }
  };

  /* ********************  Close Order Fields ******************************/

  // const [partialClose, setPartialClose] = useState(false);
  // const [closeAllTrades, setCloseAllTrades] = useState(false);
  // const [closeType, setCloseType] = useState('Market');

  /********************  Modify Order Fields******************************/

  // const [modifyPrice, setModifyPrice] = useState('');
  // const [modifyType, setModifyType] = useState('Stop Loss');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex lg:items-center items-start justify-center px-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="bg-dark-50 rounded-2xl w-full max-w-2xl z-10 p-0 overflow-hidden">
        {/* Header */}
        <div className="relative px-8 py-6 border-b border-dark-300/50">
          <button
            onClick={onClose}
            className="absolute right-6 top-6 p-2 text-gray-400 hover:text-white 
                     hover:bg-dark-200/50 rounded-lg transition-all duration-300"
          >
            <X className="h-5 w-5" />
          </button>
          <div className="flex items-center gap-2">
            <MdOutlineWebhook className="h-5 w-5 mr-2" />
            <h3 className="text-xl font-medium text-white tracking-tight">
              Create New Webhook
            </h3>
          </div>
          <p className="text-gray-400 mt-2 text-sm">
            Set up automated trading with TradingView signals
          </p>
        </div>

        <div className="lg:p-8 p-3 space-y-5 max-h-[calc(100vh-200px)] overflow-y-auto">
          {/* *******************Web Hook Mode******************* */}
          <div className="flex rounded-xl bg-dark-200/30 p-1.5">
            <button
              onClick={() => setMode("basic")}
              className={`flex-1 px-6 py-2 rounded-lg text-sm font-medium transition-all ${
                mode === "basic"
                  ? " text-white bg-blue-500 outline-1 outline-dashed outline-blue-500 outline-offset-2"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Basic Mode
            </button>
            <button
              onClick={() => setMode("advanced")}
              className={`flex-1 px-6 py-2 rounded-lg text-sm font-medium transition-all ${
                mode === "advanced"
                  ? " text-white bg-blue-500 outline-1 outline-dashed outline-blue-500 outline-offset-2"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Advanced Mode
            </button>
          </div>

          {/* Mode Description */}
          <div className="bg-dark-200/30 rounded-xl p-6">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="h-4 w-4 text-accent flex-shrink-0 mt-0.5" />
              <div className="space-y-0">
                {mode === "basic" ? (
                  <>
                    <p className="text-white text-sm">
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
                ) : (
                  <p className="text-white">
                    Advanced mode enables direct integration with TradingView
                    indicators and custom strategies. Perfect for complex
                    automation needs.
                  </p>
                )}
              </div>
            </div>
          </div>

          {mode === "basic" && (
            <div className="space-y-6">
              <div className="flex rounded-xl bg-dark-200/30 p-1.5">
                {(
                  ["Market Order", "Modify Order", "Close Order"] as OrderType[]
                ).map((type) => (
                  <button
                    key={type}
                    onClick={() => setOrderType(type)}
                    className={`flex-1 px-6 py-2 rounded-lg text-sm font-medium transition-all ${
                      orderType === type
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
                <div className="flex flex-col justify-center items-center w-[80%] gap-4">
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
                      className="w-1/3 bg-dark-50 text-white rounded-lg px-4 py-3
                             border border-dashed border-blue-500 focus:outline-none text-sm"
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
                      className="w-1/3 bg-dark-200/30 text-white rounded-lg px-4 py-3
                             border border-dashed border-blue-500 focus:outline-none text-sm"
                    />
                  </div>
                </div>
              </div>

              {/* Order Type Specific Fields */}
              <div className="flex w-full justify-center items-center">
                <div className="space-y-8 flex w-[80%] justify-center items-center flex-col">
                  {orderType === "Market Order" && (
                    <>
                      <div className="flex justify-between items-center w-full">
                        <label className="flex items-center space-x-2 text-sm text-gray-400 mb-2">
                          <span>Order Direction</span>
                          <Tooltip content={tooltips.orderType}>
                            <HelpCircle className="h-4 w-4" />
                          </Tooltip>
                        </label>
                        <select
                          value={orderDirection}
                          onChange={(e) => setOrderDirection(e.target.value)}
                          className="w-1/3 bg-dark-200/30 text-white rounded-lg px-4 py-3
                                 border border-dashed border-blue-500 focus:outline-none 
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
                              step={0.1}
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
                            onChange={(e) =>
                              setFixedSize(Number(e.target.value))
                            }
                            className="w-full bg-dark-200/30 text-white rounded-lg px-4 py-3
                                   border border-dashed border-blue-500 focus:outline-none text-sm"
                          />
                        )}
                      </div>

                      <div className="flex flex-col justify-center items-center w-full gap-4">
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
                            onChange={(e) => setStopLoss(e.target.value)}
                            className="w-1/3 bg-dark-200/30 text-white rounded-lg px-4 py-3
                                   border border-dashed border-blue-500 focus:outline-none text-sm"
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
                            onChange={(e) => setTakeProfit(e.target.value)}
                            className="w-1/3 bg-dark-200/30 text-white rounded-lg px-4 py-3
                                   border border-dashed border-blue-500 focus:outline-none text-sm"
                          />
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}

          {mode === "advanced" && (
            <div className="flex w-full justify-center items-center">
              <div className="space-y-8 w-[80%]">
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
                    className="w-1/3 bg-dark-200/30 text-white rounded-lg px-4 py-3
                           border border-dashed border-blue-500 focus:outline-none text-sm"
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
                    className="w-1/3 bg-dark-200/30 text-white rounded-lg px-4 py-3
                           border border-dashed border-blue-500 focus:outline-none text-sm"
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
                    step={0.0001}
                    onChange={(e) => setFixedSize(Number(e.target.value))}
                    onWheel={(e) => e.currentTarget.blur()}
                    className="w-1/3 bg-dark-200/30 text-white rounded-lg px-4 py-3
                                   border border-dashed border-blue-500 focus:outline-none text-sm"
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
                onClose();
              }}
              disabled={!webhookName || !pair}
              className="premium-button lg:px-6 px-4 py-2 flex items-center space-x-2
                       disabled:opacity-50 disabled:cursor-not-allowed text-sm bg-blue-500 outline-1 outline-dashed outline-blue-500 outline-offset-2"
            >
              <span>Create Webhook</span>
              <Plus className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
