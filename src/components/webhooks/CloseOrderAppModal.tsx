import { CloseOrderAppModalProps } from "@/types/webhook";
import { X, Check, AlertCircle } from "lucide-react";
import { useSelector } from "@/app/store";
import { ChevronUpDownIcon } from "@heroicons/react/16/solid";
import { CheckIcon } from "@heroicons/react/20/solid";
import { Loader } from "lucide-react";
import { useState, useEffect } from "react";
import { dispatch } from "@/app/store";
import { getAccounts } from "@/app/reducers/metaAccount";
import { connectCloseOrder } from "@/app/reducers/webhook";
import { useAtom } from "jotai";
import { userAtom } from "@/store/atoms";
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { toast } from "react-toastify";
export default function CloseOrderAppModal({
  isOpen,
  onClose,
  closeOrder,
}: CloseOrderAppModalProps) {
  const [user] = useAtom(userAtom);
  const metaAccounts = useSelector((state) => state.metaAccount.accounts);

  const [selected, setSelected] = useState(metaAccounts[0]?.accountName);
  const [accountId, setAccountId] = useState<string>("");
  const [loadingConnect, setLoadingConnect] = useState<boolean>(false);
  const [loadingDisconnect, setLoadingDisconnect] = useState<boolean>(false);
  useEffect(() => {
    dispatch(getAccounts(user?.email ?? ""));
  }, []);
  useEffect(() => {
    const findAccount = metaAccounts.find(
      (account) => account.accountName == selected
    );
    if (findAccount) {
      setAccountId(findAccount?.accountId);
    }
  }, [selected]);
  if (!isOpen) return null;
  const handleConnect = () => {
    setLoadingConnect(true);
    if (user) {
      dispatch(
        connectCloseOrder({
          email: user?.email,
          accountId,
          webhookName: closeOrder.webhookName,
          webhookMode: closeOrder.webhookMode,
          symbol: closeOrder.symbol,
        })
      ).then(() => {
        setLoadingConnect(false);
        toast.success("This CloseOrder is connected to account");
      });
    }
  };
  const handleDisconnect = () => {};
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="glass-panel rounded-2xl w-full max-w-2xl z-10 p-0 overflow-hidden h-[400px]">
        <div className="relative p-6 border-b border-dark-300/50">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 p-2 text-gray-400 hover:text-white 
                     hover:bg-dark-200/50 rounded-lg transition-all duration-300"
          >
            <X className="h-5 w-5" />
          </button>

          <h3 className="text-xl font-medium text-white tracking-tight">
            Connected Apps
          </h3>
          <p className="text-gray-400 mt-1">
            Manage integrations for {closeOrder.webhookName}
          </p>
        </div>
        <div
          className={` p-4 border-none flex flex-col justify-between z-50
          }`}
        >
          <div className="flex items-start space-x-4">
            <div className="p-2 bg-dark-200/50 rounded-lg">
              <img
                src="/mt5-logo.svg"
                alt="MetaTrader"
                className="h-8 w-8 filter invert opacity-60"
              />
            </div>
            <div className="flex-1">
              <div className="flex flex-col items-start justify-between gap-1">
                <h4 className="text-lg font-medium text-white">MetaTrader</h4>
                {closeOrder.connectionStatus === true ? (
                  <div className="flex items-center text-emerald-400 text-sm">
                    <Check className="h-4 w-4 mr-1" />
                    Connected
                  </div>
                ) : (
                  <div className="flex items-center text-gray-400 text-sm">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    Not connected
                  </div>
                )}
              </div>
              <div>
                <p className="text-gray-400 text-sm mt-1">
                  Execute trades directly on MT5 platform
                </p>
              </div>
              <Listbox value={selected} onChange={setSelected}>
                <div className="relative mt-2">
                  <ListboxButton className="grid w-[80%] cursor-default grid-cols-1 rounded-md bg-white py-1.5 pl-3 pr-2 text-left text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6">
                    <span className="col-start-1 row-start-1 truncate pr-6">
                      {selected}
                    </span>
                    <ChevronUpDownIcon
                      aria-hidden="true"
                      className="col-start-1 row-start-1 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                    />
                  </ListboxButton>

                  <ListboxOptions
                    transition
                    className="absolute z-20 mt-1 max-h-60 w-[80%] overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none data-[closed]:data-[leave]:opacity-0 data-[leave]:transition data-[leave]:duration-100 data-[leave]:ease-in sm:text-sm"
                  >
                    {metaAccounts.map((account) => (
                      <ListboxOption
                        key={account.accountId}
                        value={account.accountName}
                        className="group relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 data-[focus]:bg-blue-500 data-[focus]:text-white data-[focus]:outline-none"
                      >
                        <span className="block truncate font-normal group-data-[selected]:font-semibold">
                          {account.accountName}
                        </span>

                        <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-blue-500 group-[&:not([data-selected])]:hidden group-data-[focus]:text-white">
                          <CheckIcon aria-hidden="true" className="size-5" />
                        </span>
                      </ListboxOption>
                    ))}
                  </ListboxOptions>
                </div>
              </Listbox>
              <div className="mt-4 flex justify-start items-center w-full">
                {closeOrder.connectionStatus === true ? (
                  <button
                    className="premium-button-outline text-sm px-3 py-1.5 flex justify-center items-center"
                    onClick={() => handleDisconnect()}
                  >
                    {loadingDisconnect && (
                      <Loader className="h-5 w-5 mr-2 animate-spin" />
                    )}
                    Disconnect
                  </button>
                ) : (
                  <button
                    className="premium-button text-sm px-3 py-1.5 w-1/2 flex justify-center items-center"
                    onClick={() => handleConnect()}
                  >
                    {loadingConnect && (
                      <Loader className="h-5 w-5 mr-2 animate-spin" />
                    )}
                    Connect
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
