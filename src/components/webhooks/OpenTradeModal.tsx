import { Dispatch, SetStateAction } from "react";
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { MdPlaylistAddCheckCircle } from "react-icons/md";
import { FaCircleCheck } from "react-icons/fa6";
import { WebhookConfig } from "@/types/webhook";
import { Loader } from "lucide-react";
import { useSetAtom, useAtom } from "jotai";
import {
  actionTypeAtom,
  allTradesAtom,
  trailingStopLossAtom,
  messageDataAtom,
} from "@/store/atoms";
interface OpenTradeModalProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  handleOk: () => void;
  webhook: WebhookConfig;
  loading: boolean;
}

const OpenTradeModal: React.FC<OpenTradeModalProps> = ({
  open,
  setOpen,
  handleOk,
  webhook,
  loading,
}) => {
  console.log();
  const [allTrades] = useAtom(allTradesAtom);
  const [trailingStopLoss] = useAtom(trailingStopLossAtom);
  const setActionTypeAtom = useSetAtom(actionTypeAtom);
  const setAllTradesAtom = useSetAtom(allTradesAtom);
  const setTrailingStopLossAtom = useSetAtom(trailingStopLossAtom);
  const [basicActionType, setBasicActionType] = useState<string>("create");
  const [advancedActionType, setAdvancedActionType] =
    useState<string>("create");
  const [advancedOrderDirection, setAdvancedOrderDirection] =
    useState<string>("buy");
  const [advancedOrderType, setAdvancedOrderType] = useState<string>("market");
  const [advancedModifyType, setAdvancedModifyType] =
    useState<string>("StopLoss");
  const [advancedPartialClose, setAdvancedPartialClose] =
    useState<boolean>(false);
  const [messageData, setMessageDataAtom] = useAtom(messageDataAtom);

  useEffect(() => {
    let newMessageData = "";
    if (advancedActionType == "create") {
      newMessageData = `ACTION_TYPE={${advancedActionType}} ORDER_DIRECTION={${advancedOrderDirection}} ORDER_TYPE={${advancedOrderType}} ${
        advancedOrderType != "market" ? "OPEN_PRICE={10}" : ""
      } ${
        advancedOrderType == "stopLimit" ? "STOP_LIMIT_PRICE={5}" : ""
      } STOP_LOSS={50} TAKE_PROFIT={50} ${
        advancedOrderType == "market" ? "TRAILING_STOP_LOSS={0}" : ""
      }`;
    } else if (advancedActionType == "modify") {
      newMessageData = `ACTION_TYPE={${advancedActionType}} ORDER_DIRECTION={${advancedOrderDirection}} MODIFY_TYPE={${advancedModifyType}} MOVE_PIPS={20}`;
    } else if (advancedActionType == "close") {
      newMessageData = `ACTION_TYPE={${advancedActionType}} ORDER_DIRECTION={${advancedOrderDirection}} ${
        !advancedPartialClose ? "PARTIAL_CLOSE={10}" : "PARTIAL_CLOSE={100}"
      }`;
    }

    setMessageDataAtom(newMessageData);
  }, [
    advancedActionType,
    advancedOrderDirection,
    advancedOrderType,
    advancedPartialClose,
    advancedModifyType,
    webhook.volume,
    setMessageDataAtom,
  ]);

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessageDataAtom(e.target.value);
  };
  return (
    <Dialog open={open} onClose={setOpen} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-900 bg-opacity-30 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className={`relative
             transform overflow-hidden rounded-lg bg-dark-50 px-4 pb-4 pt-4 text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-sm sm:p-6 data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95`}
          >
            <div>
              <div className="mt-3 text-start sm:mt-3 space-y-8">
                <div className="flex justify-center items-center gap-2">
                  <MdPlaylistAddCheckCircle className="w-6 h-6" />
                  <DialogTitle
                    as="h3"
                    className="text-base font-semibold text-white text-center underline underline-offset-4"
                  >
                    Open Trade
                  </DialogTitle>
                </div>
                {webhook.webhookMode == "basic" ? (
                  <>
                    <div className="flex justify-center items-center rounded-lg">
                      <button
                        className={`text-sm  p-2 w-1/3 outline outline-1 outline-blue-500 rounded-l-lg capitalize ${
                          basicActionType == "create" ? "bg-blue-500" : ""
                        }`}
                        onClick={() => {
                          setActionTypeAtom("create");
                          setBasicActionType("create");
                        }}
                      >
                        {webhook.orderType}
                      </button>
                      <button
                        className={`text-sm  p-2 w-1/3 outline outline-1 outline-blue-500 ${
                          basicActionType == "modify" ? "bg-blue-500" : ""
                        }`}
                        onClick={() => {
                          setActionTypeAtom("modify");
                          setBasicActionType("modify");
                        }}
                      >
                        Modify
                      </button>
                      <button
                        className={`text-sm  p-2 w-1/3 outline outline-1 outline-blue-500 rounded-r-lg ${
                          basicActionType == "close" ? "bg-blue-500" : ""
                        }`}
                        onClick={() => {
                          setActionTypeAtom("close");
                          setBasicActionType("close");
                        }}
                      >
                        Close
                      </button>
                    </div>
                    <div className="flex justify-center items-center">
                      <div className="w-full flex flex-col gap-2 px-6">
                        <div className="flex justify-between items-center">
                          <span className="text-white font-bold text-sm">
                            Name:
                          </span>

                          <span className="text-gray-300 text-sm">
                            {webhook.webhookName}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-white font-bold text-sm">
                            Mode:
                          </span>
                          <span className="text-gray-300 text-sm capitalize">
                            {webhook.webhookMode}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-white font-bold text-sm">
                            Order Direction:
                          </span>
                          <span className="text-gray-300 text-sm capitalize">
                            {webhook.orderDirection}
                          </span>
                        </div>
                        {basicActionType == "create" && (
                          <>
                            <div className="flex justify-between items-center">
                              <span className="text-white font-bold text-sm">
                                TP (pips):
                              </span>
                              <span className="text-gray-300 text-sm">
                                {webhook.takeProfit_pips}
                              </span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-white font-bold text-sm">
                                SL (pips):
                              </span>
                              <span className="text-gray-300 text-sm ">
                                {webhook.stopLoss_pips}
                              </span>
                            </div>
                            {webhook.orderType != "market" && (
                              <div className="flex justify-between items-center">
                                <span className="text-white font-bold text-sm">
                                  OpenPrice (pips)
                                </span>
                                <span className="text-gray-300 text-sm">
                                  {webhook.openPrice_pips}
                                </span>
                              </div>
                            )}
                            {webhook.orderType == "stopLimit" && (
                              <div className="flex justify-between items-center">
                                <span className="text-white font-bold text-sm">
                                  StopLimit (pips)
                                </span>
                                <span className="text-gray-300 text-sm">
                                  {webhook.stopLimit_pips}
                                </span>
                              </div>
                            )}
                            <div className="flex justify-between items-center">
                              <span className="text-white font-bold text-sm">
                                Volume:
                              </span>
                              <span className="text-gray-300 text-sm">
                                {webhook.volume}
                              </span>
                            </div>
                            {webhook.orderType == "market" && (
                              <div className="flex justify-between items-center">
                                <div className="flex items-center">
                                  <input
                                    id="angular-checkbox"
                                    type="checkbox"
                                    checked={trailingStopLoss}
                                    className="w-4 h-4 text-blue-500 bg-gray-300 rounded-md dark:bg-gray-600 focus:outline-none focus:ring-0 focus:border-transparent"
                                    onClick={() =>
                                      setTrailingStopLossAtom(!trailingStopLoss)
                                    }
                                  />
                                  <label className="w-full py-3 ms-2 text-sm text-white font-bold dark:text-gray-300">
                                    Trailing StopLoss (pips)
                                  </label>
                                </div>
                                <span className="text-gray-300 text-sm">
                                  {webhook.trailingStopLoss}
                                </span>
                              </div>
                            )}
                          </>
                        )}
                        {basicActionType == "modify" && (
                          <>
                            <div className="flex justify-between items-center">
                              <span className="text-white font-bold text-sm">
                                Modify Type:
                              </span>
                              <span className="text-gray-300 text-sm">
                                {webhook.modifyType}
                              </span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-white font-bold text-sm">
                                Move Price (pips):
                              </span>
                              <span className="text-gray-300 text-sm">
                                {webhook.modifyType == "StopLoss"
                                  ? webhook.moveStopLoss_pips
                                  : webhook.moveTakeProfit_pips}
                              </span>
                            </div>
                          </>
                        )}
                        {basicActionType == "close" && (
                          <>
                            <div className="flex justify-between items-center">
                              <span className="text-white font-bold text-sm">
                                Partial Close:
                              </span>
                              <span className="text-gray-300 text-sm">
                                {webhook.partialClose} %
                              </span>
                            </div>
                          </>
                        )}
                        {basicActionType != "create" && (
                          <div className="flex justify-between items-center w-full">
                            <label className="flex items-center space-x-2 text-sm text-white font-bold mb-2">
                              <span>All Trades</span>
                            </label>

                            <button
                              onClick={() => setAllTradesAtom(!allTrades)}
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
                        )}
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex justify-center items-center">
                      <div className="w-full flex flex-col gap-2 px-6">
                        <div className="flex justify-between items-center">
                          <span className="text-white font-bold text-sm">
                            Action Type:
                          </span>
                          <div className="flex justify-center items-center gap-2">
                            <span
                              className="text-white text-sm bg-green-500 px-2 rounded-full select-none cursor-pointer relative hover:bg-green-300"
                              onClick={() => setAdvancedActionType("create")}
                            >
                              {advancedActionType == "create" && (
                                <FaCircleCheck className="absolute -top-1 right-0 " />
                              )}
                              Create
                            </span>
                            <span
                              className="text-white text-sm bg-yellow-500 px-2 rounded-full select-none cursor-pointer relative hover:bg-yellow-300"
                              onClick={() => setAdvancedActionType("modify")}
                            >
                              {advancedActionType == "modify" && (
                                <FaCircleCheck className="absolute -top-1 right-0 " />
                              )}
                              Modify
                            </span>
                            <span
                              className="text-white text-sm bg-red-500 px-2 rounded-full select-none cursor-pointer relative hover:bg-red-300"
                              onClick={() => setAdvancedActionType("close")}
                            >
                              {advancedActionType == "close" && (
                                <FaCircleCheck className="absolute -top-1 right-0 " />
                              )}
                              Close
                            </span>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-white font-bold text-sm">
                            Order Direction:
                          </span>
                          <div className="flex justify-center items-center gap-2">
                            <span
                              onClick={() => setAdvancedOrderDirection("buy")}
                              className="text-white text-sm bg-green-500 px-2 rounded-full select-none cursor-pointer relative hover:bg-green-300"
                            >
                              {advancedOrderDirection == "buy" && (
                                <FaCircleCheck className="absolute -top-1 right-0 " />
                              )}
                              Buy
                            </span>
                            <span
                              onClick={() => setAdvancedOrderDirection("sell")}
                              className="text-white text-sm bg-red-500 px-2 rounded-full select-none cursor-pointer relative hover:bg-red-300"
                            >
                              {advancedOrderDirection == "sell" && (
                                <FaCircleCheck className="absolute -top-1 right-0 " />
                              )}
                              Sell
                            </span>
                          </div>
                        </div>
                        {advancedActionType == "create" && (
                          <div className="flex flex-col gap-2">
                            <span className="text-white font-bold text-sm">
                              Order Type:
                            </span>
                            <div className="flex justify-center items-center gap-2 w-full">
                              <span
                                onClick={() => setAdvancedOrderType("market")}
                                className="text-white text-sm bg-green-500 px-2 rounded-full select-none cursor-pointer hover:bg-green-300 relative"
                              >
                                {advancedOrderType == "market" && (
                                  <FaCircleCheck className="absolute -top-1 right-0 " />
                                )}
                                Market
                              </span>
                              <span
                                onClick={() => setAdvancedOrderType("stop")}
                                className="text-white text-sm bg-yellow-500 px-2 rounded-full select-none cursor-pointer hover:bg-yellow-300 relative"
                              >
                                {advancedOrderType == "stop" && (
                                  <FaCircleCheck className="absolute -top-1 right-0 " />
                                )}
                                Stop
                              </span>
                              <span
                                onClick={() => setAdvancedOrderType("limit")}
                                className="text-white text-sm bg-orange-500 px-2 rounded-full select-none cursor-pointer hover:bg-orange-300 relative"
                              >
                                {advancedOrderType == "limit" && (
                                  <FaCircleCheck className="absolute -top-1 right-0 " />
                                )}
                                Limit
                              </span>
                              <span
                                onClick={() =>
                                  setAdvancedOrderType("stopLimit")
                                }
                                className="text-white text-sm bg-red-500 px-2 rounded-full select-none cursor-pointer hover:bg-red-300 relative"
                              >
                                {advancedOrderType == "stopLimit" && (
                                  <FaCircleCheck className="absolute -top-1 right-0 " />
                                )}
                                StopLimit
                              </span>
                            </div>
                          </div>
                        )}
                        {advancedActionType == "modify" && (
                          <div className="flex justify-between items-center">
                            <span className="text-white text-sm font-bold">
                              Modify Type
                            </span>
                            <div className="flex justify-center items-center gap-2">
                              <span
                                onClick={() =>
                                  setAdvancedModifyType("StopLoss")
                                }
                                className="text-white rounded-full bg-red-500 px-2 text-sm cursor-pointer relative"
                              >
                                {advancedModifyType == "StopLoss" && (
                                  <FaCircleCheck className="absolute -top-1 right-0 " />
                                )}
                                StopLoss
                              </span>
                              <span
                                onClick={() =>
                                  setAdvancedModifyType("TakeProfit")
                                }
                                className="text-white rounded-full bg-green-500 px-2 text-sm cursor-pointer relative"
                              >
                                {advancedModifyType == "TakeProfit" && (
                                  <FaCircleCheck className="absolute -top-1 right-0 " />
                                )}
                                TakeProfit
                              </span>
                            </div>
                          </div>
                        )}
                        {advancedActionType == "close" && (
                          <div className="flex justify-between items-center">
                            <span className="text-white font-bold text-sm">
                              Partial Close
                            </span>
                            <button
                              onClick={() =>
                                setAdvancedPartialClose(!advancedPartialClose)
                              }
                              className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                                advancedPartialClose
                                  ? "bg-accent"
                                  : "bg-dark-300"
                              }`}
                            >
                              <span
                                className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                                  advancedPartialClose
                                    ? "translate-x-6"
                                    : "translate-x-1"
                                }`}
                              />
                            </button>
                          </div>
                        )}
                        <div className="flex justify-between items-center">
                          <span className="text-white font-bold text-sm">
                            All Trades
                          </span>
                          <button
                            onClick={() => setAllTradesAtom(!allTrades)}
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
                        <div className="flex flex-col gap-2">
                          <span className="text-white font-bold text-sm">
                            Message Data
                          </span>
                          <div className="flex justify-center items-center w-full">
                            <textarea
                              name="message_data"
                              id="message-data"
                              rows={7}
                              value={messageData}
                              onChange={handleMessageChange}
                              className="w-full outline-none bg-dark-300 rounded-lg text-sm"
                            ></textarea>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
            <div className="mt-5 sm:mt-6 gap-5 flex justify-center items-center">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="inline-flex w-1/2 justify-center rounded-xl bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  handleOk();
                }}
                className="inline-flex w-1/2 justify-center rounded-xl bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {loading && <Loader className="h-5 w-5 mr-2 animate-spin" />}
                Ok
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default OpenTradeModal;
