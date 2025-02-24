import { Dispatch, SetStateAction } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/24/outline";
import { WebhookConfig } from "@/types/webhook";
import { Loader } from "lucide-react";
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
  return (
    <Dialog open={open} onClose={setOpen} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-900 bg-opacity-30 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
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
              <div className="mt-3 text-center sm:mt-5">
                <DialogTitle
                  as="h3"
                  className="text-base font-semibold text-white"
                >
                  Position Info Confirmation
                </DialogTitle>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Do you really open this position now?
                  </p>
                </div>
                <div>
                  <div className="grid grid-cols-2 gap-4 place-items-start mt-5">
                    <h2 className="text-gray-300 text-sm">
                      Name: {webhook.webhookName}
                    </h2>
                    <h2 className="text-gray-300 text-sm">
                      Mode: {webhook.webhookMode}
                    </h2>
                    <h2 className="text-gray-300 text-sm">
                      {" "}
                      Order Direction: {webhook.orderDirection}
                    </h2>
                    <h2 className="text-gray-300 text-sm">
                      TP: {webhook.takeProfit_pips}
                    </h2>
                    <h2 className="text-gray-300 text-sm">
                      SL: {webhook.stopLoss_pips}
                    </h2>
                    <h2 className="text-gray-300 text-sm">
                      Volume: {webhook.volume}
                    </h2>
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
