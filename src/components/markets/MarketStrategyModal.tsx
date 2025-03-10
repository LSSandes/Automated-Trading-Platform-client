import {
  useState,
  useEffect,
  JSXElementConstructor,
  Key,
  ReactElement,
  ReactNode,
  ReactPortal,
} from "react";
import { X /*Check*/ } from "lucide-react";
import { dispatch, useSelector } from "@/app/store";
import { getWebhooks /*openMarketOrder*/ } from "@/app/reducers/webhook";
import { userAtom } from "@/store/atoms";
import { useAtom } from "jotai";
import { MarketOrderStrategyProps } from "@/types/webhook";
// import { Loader } from "lucide-react";
// import { toast } from "react-toastify";
import { FaChartBar } from "react-icons/fa";
// import { UserParams } from "@/types/tradeLocker";

export default function MarketStrategyModal({
  isOpen,
  onClose,
}: MarketOrderStrategyProps) {
  const [user] = useAtom(userAtom);
  const [mode, setMode] = useState<string>("basic");
  const marketOrders = useSelector((state) => state.webhook.webhooks);
  const [webhook, setWebhook] = useState<string>("");
  const [orders, setOrders] = useState<any>(marketOrders);
  // const [openTradeLoading, setOpenTradeLoading] = useState<boolean>(false);
  // const [accountId, setAccountId] = useState<string>("");
  const [symbol, setSymbol] = useState<string>("NAN");
  // const [orderDirection, setOrderDirection] = useState<string>("");
  // const [webhookMode, setWebhookMode] = useState<string>("");
  const [takeProfit, setTakeProfit] = useState<number>(0);
  const [stopLoss, setStopLoss] = useState<number>(0);
  const [volume, setVolume] = useState<number>(0);
  // const [appName, setAppName] = useState<string>("");
  // const accessToken = localStorage.getItem("accessToken");
  // const tradelockerUser: UserParams | null = localStorage.getItem("user")
  // ? JSON.parse(localStorage.getItem("user") as string)
  // : null;
  useEffect(() => {
    dispatch(getWebhooks(user?.email));
  }, []);

  console.log("----------------marketOrders---------->", marketOrders);

  useEffect(() => {
    console.log("webhook", webhook);
    const findOrder = marketOrders.find((item) => item.webhookName === webhook);

    if (findOrder) {
      // setAccountId(findOrder?.accountId || "");
      setSymbol(findOrder?.symbol || "NAN");
      // setOrderDirection(findOrder?.orderDirection || "");
      // setWebhookMode(findOrder?.webhookMode || "");
      setTakeProfit(findOrder?.takeProfit_pips || 0);
      setStopLoss(findOrder?.stopLoss_pips || 0);
      setVolume(findOrder?.volume || 0);
      // setAppName(findOrder?.appName || "");
    }
  }, [webhook, marketOrders]);
  useEffect(() => {
    setOrders(marketOrders);
  }, [marketOrders]);

  // const handleOpenTrade = () => {
  //   setOpenTradeLoading(true);
  //   if (accountId == "") {
  //     toast.info("The Account has to be connected");
  //     setOpenTradeLoading(false);
  //     onClose();
  //   } else {
  //     user &&
  //       dispatch(
  //         openMarketOrder({
  //           email: user?.email,
  //           accountId,
  //           webhookName: webhook,
  //           symbol,
  //           orderDirection,
  //           webhookMode,
  //           accessToken: appName == "MetaTrader" ? "" : accessToken ?? "",
  //           accountType:
  //             appName == "MetaTrader" ? "" : tradelockerUser?.accountType ?? "",
  //         })
  //       ).then(() => {
  //         setOpenTradeLoading(false);
  //         onClose();
  //       });
  //   }
  // };
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center px-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="bg-dark-50 rounded-2xl w-full max-w-lg z-10 p-0 overflow-hidden">
        <div className="relative p-6 border-b border-dark-300/50">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 p-2 text-gray-400 hover:text-white 
                     hover:bg-dark-200/50 rounded-lg transition-all duration-300"
          >
            <X className="h-5 w-5" />
          </button>
          <div className="flex items-center gap-2">
            <FaChartBar className="h-5 w-5 mr-2" />
            <h3 className="text-xl font-medium text-white tracking-tight">
              Open Trade
            </h3>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Mode Selector */}
          <div className="flex rounded-lg bg-dark-200 p-1">
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
              <div className="space-y-4">
                <div>
                  <label className="flex items-center space-x-2 text-sm text-gray-400 mb-2">
                    <span>Webhook</span>
                  </label>
                  <select
                    value={webhook}
                    onChange={(e) => setWebhook(e.target.value)}
                    className="w-full bg-dark-200/50 text-white rounded-lg px-4 py-2.5
                         border border-dark-300/50 focus:outline-none focus:ring-1 
                         focus:ring-accent/50"
                  >
                    <option value="default">Default</option>
                    {orders.map(
                      (item: {
                        id: Key | null | undefined;
                        webhookName:
                          | string
                          | number
                          | boolean
                          | ReactElement<
                              any,
                              string | JSXElementConstructor<any>
                            >
                          | Iterable<ReactNode>
                          | ReactPortal
                          | null
                          | undefined;
                        accountId: string;
                      }) => (
                        <option
                          key={item.id}
                          style={{
                            color: item.accountId ? "#ef4444" : "#22c55e",
                            fontSize: "14px",
                          }}
                          value={String(item.webhookName)}
                        >
                          {item.webhookName} &nbsp;-&nbsp;
                          {item.accountId ? "Not Connected" : "Connected"}
                        </option>
                      )
                    )}
                  </select>
                </div>
              </div>
              {
                <div className="bg-dark-200 p-1 rounded-lg  gap-5 grid grid-cols-2">
                  <div className="flex justify-center items-center gap-5">
                    <label className="flex justify-center items-center space-x-2 text-sm text-gray-400 mb-2">
                      <span>Symbol:</span>
                    </label>
                    <div className="flex justify-center items-center space-x-2 text-sm text-gray-400 mb-2">
                      {symbol}
                    </div>
                  </div>
                  <div className="flex justify-center items-center gap-5">
                    <label className="flex justify-center items-center space-x-2 text-sm text-gray-400 mb-2">
                      <span>StopLoss:</span>
                    </label>
                    <div className="flex justify-center items-center space-x-2 text-sm text-gray-400 mb-2">
                      {stopLoss}
                    </div>
                  </div>
                  <div className="flex justify-center items-center gap-5">
                    <label className="flex justify-center items-center space-x-2 text-sm text-gray-400 mb-2">
                      <span>TakeProfit:</span>
                    </label>
                    <div className="flex justify-center items-center space-x-2 text-sm text-gray-400 mb-2">
                      {takeProfit}
                    </div>
                  </div>
                  <div className="flex justify-center items-center gap-5">
                    <label className="flex justify-center items-center space-x-2 text-sm text-gray-400 mb-2">
                      <span>Volume:</span>
                    </label>
                    <div className="flex justify-center items-center space-x-2 text-sm text-gray-400 mb-2">
                      {volume}
                    </div>
                  </div>
                </div>
              }
            </>
          )}
          {/* <button
            onClick={handleOpenTrade}
            className="w-full premium-button py-3 flex items-center justify-center space-x-2 outline-1 outline-dashed outline-offset-2 outline-blue-500"
          >
            {openTradeLoading && (
              <Loader className="h-5 w-5 mr-2 animate-spin" />
            )}
            <span>Open Trade</span>
            <Check className="h-4 w-4" />
          </button> */}
        </div>
      </div>
    </div>
  );
}
