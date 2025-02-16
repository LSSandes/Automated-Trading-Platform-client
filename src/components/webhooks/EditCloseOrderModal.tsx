import { EditCloseOrderModalProps } from "@/types/webhook";
import { useState } from "react";
import { X, Check, HelpCircle } from "lucide-react";
import Tooltip from "../ui/Tooltip";
import { tooltips } from "@/constant/webhook";
import { dispatch } from "@/app/store";
import { editCloseOrder } from "@/app/reducers/closeOrder";
import { userAtom } from "@/store/atoms";
import { useAtom } from "jotai";
export default function EditCloseOrderModal({
  isOpen,
  onClose,
  closeOrder,
}: EditCloseOrderModalProps) {
  const [user] = useAtom(userAtom);
  const [mode, setMode] = useState<string>(closeOrder.webhookMode);
  const [closeType, setCloseType] = useState("Market");
  const [partialClose, setPartialClose] = useState(false);
  const [closeAllTrades, setCloseAllTrades] = useState(false);
  const [webhookName, setWebhookName] = useState<string>(
    closeOrder.webhookName
  );
  const [symbol, setSymbol] = useState<string>(closeOrder.symbol);
  const handleSave = () => {
    if (user) {
      dispatch(
        editCloseOrder({
          email: user?.email,
          webhookName: closeOrder.webhookName,
          webhookMode: closeOrder.webhookMode,
          symbol: closeOrder.symbol,
          webhookName_new: webhookName,
          symbol_new: symbol,
        })
      ).then(() => {
        onClose();
      });
    }
  };
  if (!isOpen) return null;
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
            Edit webhook
          </h3>
        </div>
        <div className="p-6 space-y-6">
          {/* Mode Selector */}
          <div className="flex rounded-lg bg-dark-200/30 p-1">
            <button
              onClick={() => setMode("basic")}
              className={`flex-1 px-4 py-2 text-sm font-medium transition-all ${
                mode === "basic"
                  ? "border-b border-blue-500 text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Basic
            </button>
            <button
              onClick={() => setMode("advanced")}
              className={`flex-1 px-4 py-2 text-sm font-medium transition-all ${
                mode === "advanced"
                  ? "border-b border-blue-500 text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Advanced
            </button>
          </div>
          {mode === "basic" && (
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
              <div className="space-y-4">
                <div>
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
                    className="w-full bg-dark-200/50 text-white rounded-lg px-4 py-2.5
                                           border border-dark-300/50 focus:outline-none focus:ring-1 
                                           focus:ring-accent/50"
                  />
                </div>
                <div>
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
                    className="w-full bg-dark-200/50 text-white rounded-lg px-4 py-2.5
                                             border border-dark-300/50 focus:outline-none focus:ring-1 
                                             focus:ring-accent/50"
                  />
                </div>
                {partialClose && (
                  <div>
                    <label className="flex items-center space-x-2 text-sm text-gray-400 mb-2">
                      <span>Close percentage</span>
                      <Tooltip content="Percentage of the position to close">
                        <HelpCircle className="h-4 w-4" />
                      </Tooltip>
                    </label>
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
              </div>
            </>
          )}
          <button
            onClick={handleSave}
            className="w-full premium-button py-3 flex items-center justify-center space-x-2"
          >
            <span>Save Changes</span>
            <Check className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
