import { CloseOrderAppModalProps } from "@/types/webhook";
import { X, Check, AlertCircle, ExternalLink } from "lucide-react";
import { useSelector } from "@/app/store";
import { ChevronUpDownIcon } from "@heroicons/react/16/solid";
import { CheckIcon } from "@heroicons/react/20/solid";
import { Loader } from "lucide-react";
import { useState, useEffect } from "react";
import { dispatch } from "@/app/store";
import { getAccounts } from "@/app/reducers/metaAccount";
import { apps } from "@/constant/webhook";
import {
  connectCloseOrder,
  disconnectCloseOrder,
} from "@/app/reducers/closeOrder";
import { useAtom } from "jotai";
import { userAtom } from "@/store/atoms";
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
interface LoadingType {
  appName: string;
  loader: boolean;
}
export default function CloseOrderAppModal({
  isOpen,
  onClose,
  closeOrder,
}: CloseOrderAppModalProps) {
  const [user] = useAtom(userAtom);
  const metaAccounts = useSelector((state) => state.metaAccount.accounts);
  const findAccount = metaAccounts.find(
    (account) => account.accountId == closeOrder.accountId
  )?.accountName;
  const [selected, setSelected] = useState<string>(findAccount ?? "");
  const [accountId, setAccountId] = useState<string>("");
  const [loadingConnect, setLoadingConnect] = useState<LoadingType>({
    appName: "",
    loader: false,
  });
  const [loadingDisconnect, setLoadingDisconnect] = useState<LoadingType>({
    appName: "",
    loader: false,
  });
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
  const handleConnect = (appName: string) => {
    if (appName == "MetaTrader") {
      setLoadingConnect({ appName, loader: true });
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
          setLoadingConnect({ appName, loader: false });
          onClose();
        });
      }
    } else if (appName == "TradeLocker") {
    }
  };
  const handleDisconnect = (appName: string) => {
    if (appName == "MetaTrader") {
      setLoadingDisconnect({ appName, loader: true });
      dispatch(
        disconnectCloseOrder({
          accountId,
          webhookName: closeOrder.webhookName,
          webhookMode: closeOrder.webhookMode,
          symbol: closeOrder.symbol,
        })
      ).then(() => {
        setLoadingDisconnect({ appName, loader: false });
        onClose();
      });
    } else if (appName == "TradeLocker") {
    }
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="glass-panel rounded-2xl w-full max-w-xl z-10 p-0 overflow-hidden">
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
          <p className="text-gray-400 mt-1 text-sm">
            Manage integrations for {closeOrder.webhookName}
          </p>
        </div>
        <div
          className={` p-4 border-none flex flex-col justify-between z-50
          }`}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:max-h-[500px] max-h-[300px] overflow-y-auto">
            {apps.map((app, index) => (
              <div
                key={app.id}
                className={`glass-panel glass-panel-hover rounded-xl p-4 border border-dark-300/30 flex flex-col justify-between ${
                  index === 0 && "z-50"
                }`}
              >
                <div className="flex items-start space-x-4">
                  <div className="p-2 bg-dark-200/50 rounded-lg">
                    <img
                      src={app.icon}
                      alt={app.appName}
                      className="h-8 w-8  opacity-60"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-col items-start justify-between gap-1">
                      <h4 className="text-lg font-medium text-white">
                        {app.appName}
                      </h4>
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
                        {app.description}
                      </p>
                    </div>
                    {app.appName == "MetaTrader" && (
                      <Listbox value={selected} onChange={setSelected}>
                        <div className="relative mt-2">
                          <ListboxButton className="grid w-full cursor-default grid-cols-1 rounded-md bg-white py-1.5 pl-3 pr-2 text-left text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6">
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
                            className="absolute z-20 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none data-[closed]:data-[leave]:opacity-0 data-[leave]:transition data-[leave]:duration-100 data-[leave]:ease-in sm:text-sm"
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
                                  <CheckIcon
                                    aria-hidden="true"
                                    className="size-5"
                                  />
                                </span>
                              </ListboxOption>
                            ))}
                          </ListboxOptions>
                        </div>
                      </Listbox>
                    )}
                  </div>
                </div>
                <div className="mt-4 flex justify-center items-center">
                  {closeOrder.connectionStatus === true ? (
                    <button
                      className="premium-button-outline text-sm px-3 py-1.5 flex justify-center items-center"
                      onClick={() => handleDisconnect(app.appName)}
                    >
                      {loadingDisconnect.appName === app.appName &&
                        loadingDisconnect.loader && (
                          <Loader className="h-5 w-5 mr-2 animate-spin" />
                        )}
                      Disconnect
                    </button>
                  ) : (
                    <button
                      className="premium-button text-sm px-3 py-1.5 w-1/2 flex justify-center items-center"
                      onClick={() => handleConnect(app.appName)}
                    >
                      {loadingConnect.appName === app.appName &&
                        loadingConnect.loader && (
                          <Loader className="h-5 w-5 mr-2 animate-spin" />
                        )}
                      Connect
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 p-4 glass-panel rounded-xl border border-dark-300/30">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-white font-medium">Need help?</h4>
                <p className="text-gray-400 text-sm mt-1">
                  Learn how to set up and configure app integrations
                </p>
              </div>
              <a
                href="#"
                className="premium-button-outline text-sm px-3 py-1.5 flex items-center"
              >
                View Documentation
                <ExternalLink className="h-4 w-4 ml-2" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
