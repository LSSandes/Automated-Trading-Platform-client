import { Dispatch, SetStateAction } from "react";
import { useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/24/outline";
import { WebhookConfig } from "@/types/webhook";
import { Loader } from "lucide-react";
import { useSetAtom, useAtom } from "jotai";
import {
  actionTypeAtom,
  allTradesAtom,
  trailingStopLossAtom,
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
  const [actionType, setActionType] = useState<string>("market");
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
             transform overflow-hidden rounded-lg bg-dark-50 px-4 pb-4 pt-5 text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-sm sm:p-6 data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95`}
          >
            <div>
              <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-green-100">
                <CheckIcon
                  aria-hidden="true"
                  className="size-6 text-green-600"
                />
              </div>
              <div className="mt-3 text-center sm:mt-5 space-y-4">
                <DialogTitle
                  as="h3"
                  className="text-base font-semibold text-white"
                >
                  Open Trade Confirmation
                </DialogTitle>
                <div className="flex justify-center items-center rounded-lg">
                  <button
                    className={`text-sm  p-2 w-1/3 outline outline-1 outline-blue-500 rounded-l-lg ${
                      actionType == "market" ? "bg-blue-500" : ""
                    }`}
                    onClick={() => {
                      setActionTypeAtom("market");
                      setActionType("market");
                    }}
                  >
                    Market Order
                  </button>
                  <button
                    className={`text-sm  p-2 w-1/3 outline outline-1 outline-blue-500 ${
                      actionType == "modify" ? "bg-blue-500" : ""
                    }`}
                    onClick={() => {
                      setActionTypeAtom("modify");
                      setActionType("modify");
                    }}
                  >
                    Modify Order
                  </button>
                  <button
                    className={`text-sm  p-2 w-1/3 outline outline-1 outline-blue-500 rounded-r-lg ${
                      actionType == "close" ? "bg-blue-500" : ""
                    }`}
                    onClick={() => {
                      setActionTypeAtom("close");
                      setActionType("close");
                    }}
                  >
                    Close Order
                  </button>
                </div>
                <div className="flex justify-center items-center">
                  <div className="w-full flex flex-col gap-2 px-6">
                    <div className="w-full flex justify-between items-center">
                      <span className="text-gray-300 text-sm">Name:</span>

                      <span className="text-gray-300 text-sm">
                        {webhook.webhookName}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300 text-sm">Mode:</span>
                      <span className="text-gray-300 text-sm capitalize">
                        {webhook.webhookMode}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300 text-sm">
                        Order Direction:
                      </span>
                      <span className="text-gray-300 text-sm capitalize">
                        {webhook.orderDirection}
                      </span>
                    </div>
                    {actionType == "market" && (
                      <>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-300 text-sm">
                            TP (pips):
                          </span>
                          <span className="text-gray-300 text-sm">
                            {webhook.takeProfit_pips}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-300 text-sm">
                            SL (pips):
                          </span>
                          <span className="text-gray-300 text-sm ">
                            {webhook.stopLoss_pips}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-300 text-sm">
                            {" "}
                            Volume:{" "}
                          </span>
                          <span className="text-gray-300 text-sm">
                            {webhook.volume}
                          </span>
                        </div>
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
                            <label className="w-full py-3 ms-2 text-sm text-gray-300 dark:text-gray-300">
                              Trailing StopLoss (pips)
                            </label>
                          </div>
                          <span className="text-gray-300 text-sm">
                            {webhook.trailingStopLoss}
                          </span>
                        </div>
                      </>
                    )}
                    {actionType == "modify" && (
                      <>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-300 text-sm">
                            Modify Type:
                          </span>
                          <span className="text-gray-300 text-sm">
                            {webhook.modifyType}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-300 text-sm">
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
                    {actionType == "close" && (
                      <>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-300 text-sm">
                            Partial Close:
                          </span>
                          <span className="text-gray-300 text-sm">
                            {webhook.partialClose} %
                          </span>
                        </div>
                      </>
                    )}
                    {actionType != "market" && (
                      <div className="flex justify-between items-center w-full">
                        <label className="flex items-center space-x-2 text-sm text-gray-300 mb-2">
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
