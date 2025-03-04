import AccountCard from "./AccountCard";
import { useEffect, useState } from "react";
// import LoadingSpinner from "../common/LoadingSpinner";
import { Bot, ArrowRight, Shield, DollarSign, Zap } from "lucide-react";
import { useAtom, useSetAtom } from "jotai";
import { accountNameAtom } from "../../store/atoms";
import { dispatch, useSelector } from "@/app/store";
import {
  deleteAccount,
  updateAccount,
} from "@/app/reducers/metaAccount";
import {
  getAccountsInfo,
  updateAccountInfo,
} from "@/app/reducers/metaAccountInfo";
import DeleteModal from "../modal/DeleteModal";
import UpdateModal from "../modal/UpdateModal";
import AccountStatsModal from "./AccountStatsModal";

export default function AccountList() {
  const [accountName] = useAtom(accountNameAtom);
  const setAccountNameAtom = useSetAtom(accountNameAtom);
  const webhooks = useSelector((state) => state.webhook.webhooks);
  const accountsState = useSelector((state) => state.metaAccount.accounts);
  const accountsInfoState = useSelector(
    (state) => state.metaAccountInfo.accountsInfo
  );
  console.log("------webhooks   ok----->", webhooks);
  // const [isLoading, setIsLoading] = useState<Boolean>(false);
  const [deleteModalLoading, setDeleteModalLoading] = useState<boolean>(false);
  const [updateModalLoading, setUpdateModalLoading] = useState<boolean>(false);
  // const [connectionStatus, setConnectionStatus] = useState<boolean>(true);
  const [accountId, setAccountId] = useState<string>("");
  const [accountPassword, setAccountPassword] = useState<string>("");
  const [accountServer, setAccountServer] = useState<string>("");
  const [refreshLoadingMap, setRefreshLoadingMap] = useState<{
    [key: string]: boolean;
  }>({});
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const [updateModalOpen, setUpdateModalOpen] = useState<boolean>(false);
  const [showStats, setShowStats] = useState<boolean>(false);
  useEffect(() => {
    accountsState.forEach((account) => {
      dispatch(getAccountsInfo(account.accountId));
    });
  }, [accountsState]);
  const handleRefresh = (accountId: string) => {
    setRefreshLoadingMap((prev) => ({ ...prev, [accountId]: true }));
    dispatch(updateAccountInfo(accountId)).then(() => {
      setRefreshLoadingMap((prev) => ({ ...prev, [accountId]: false }));
    });
  };
  const handleDelete = (accountId: string) => {
    setDeleteModalLoading(true);
    dispatch(deleteAccount(accountId)).then(() => {
      setDeleteModalOpen(false);
      setDeleteModalLoading(false);
    });
  };
  const handleUpdate = (
    accountName: string,
    accountId: string,
    accountPassword: string,
    accountServer: string
  ) => {
    setUpdateModalLoading(true);
    dispatch(
      updateAccount({
        name: accountName,
        accountId,
        password: accountPassword,
        server: accountServer,
      })
    ).then(() => {
      setUpdateModalLoading(false);
      setUpdateModalOpen(false);
    });
  };
  // if (isLoading) {
  //   return (
  //     <div className="flex justify-center items-center h-64">
  //       <LoadingSpinner />
  //     </div>
  //   );
  // }

  // if (!user) {
  //   return (
  //     <div className="glass-panel rounded-xl p-8 text-center">
  //       <div className="w-16 h-16 mx-auto mb-6 bg-accent/10 rounded-xl flex items-center justify-center">
  //         <Shield className="h-8 w-8 text-accent" />
  //       </div>
  //       <h2 className="text-2xl font-medium text-white mb-3">Login Required</h2>
  //       <p className="text-gray-400 max-w-lg mx-auto mb-6">
  //         Please log in to view and manage your MetaTrader accounts.
  //       </p>
  //     </div>
  //   );
  // }

  if (!accountsState?.length) {
    return (
      <div className="space-y-8">
        {/* Welcome Card */}
        <div className="glass-panel rounded-xl p-8 text-center">
          <div className="w-16 h-16 mx-auto mb-6 bg-accent/10 rounded-xl flex items-center justify-center">
            <Bot className="h-8 w-8 text-accent" />
          </div>
          <h2 className="text-2xl font-medium text-white mb-3">
            Connect Your First Account
          </h2>
          <p className="text-gray-400 max-w-lg mx-auto mb-6">
            Link your MetaTrader account to start automated trading. We support
            both MT4 and MT5 platforms.
          </p>
          <button
            onClick={() =>
              document.getElementById("add-account-button")?.click()
            }
            className="premium-button px-6 py-3 flex items-center justify-center mx-auto"
          >
            Add Trading Account
            <ArrowRight className="ml-2 h-5 w-5" />
          </button>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-panel rounded-xl p-6">
            <div className="p-3 bg-accent/10 rounded-lg w-fit mb-4">
              <Shield className="h-6 w-6 text-accent" />
            </div>
            <h3 className="text-lg font-medium text-white mb-2">
              Secure Connection
            </h3>
            <p className="text-gray-400 text-sm">
              Your account credentials are encrypted and never stored on our
              servers. We use read-only access for maximum security.
            </p>
          </div>

          <div className="glass-panel rounded-xl p-6">
            <div className="p-3 bg-accent/10 rounded-lg w-fit mb-4">
              <DollarSign className="h-6 w-6 text-accent" />
            </div>
            <h3 className="text-lg font-medium text-white mb-2">
              Real-Time Monitoring
            </h3>
            <p className="text-gray-400 text-sm">
              Track your account balance, equity, and open positions in
              real-time. Get instant notifications for trades and account
              events.
            </p>
          </div>

          <div className="glass-panel rounded-xl p-6">
            <div className="p-3 bg-accent/10 rounded-lg w-fit mb-4">
              <Zap className="h-6 w-6 text-accent" />
            </div>
            <h3 className="text-lg font-medium text-white mb-2">
              Instant Execution
            </h3>
            <p className="text-gray-400 text-sm">
              Execute trades automatically with ultra-low latency. Our system
              ensures reliable and precise order execution.
            </p>
          </div>
        </div>

        {/* Quick Guide */}
        <div className="glass-panel rounded-xl p-6">
          <h3 className="text-lg font-medium text-white mb-4">
            Quick Start Guide
          </h3>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 rounded-full bg-accent/10 text-accent flex items-center justify-center flex-shrink-0">
                1
              </div>
              <div>
                <h4 className="text-white font-medium mb-1">
                  Get Your Account Details
                </h4>
                <p className="text-gray-400 text-sm">
                  Open MetaTrader and go to Tools → Options → Server to find
                  your server name. Your login is your account number.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 rounded-full bg-accent/10 text-accent flex items-center justify-center flex-shrink-0">
                2
              </div>
              <div>
                <h4 className="text-white font-medium mb-1">
                  Create an Investor Password
                </h4>
                <p className="text-gray-400 text-sm"></p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 rounded-full bg-accent/10 text-accent flex items-center justify-center flex-shrink-0">
                3
              </div>
              <div>
                <h4 className="text-white font-medium mb-1">
                  Connect Your Account
                </h4>
                <p className="text-gray-400 text-sm">
                  Click "Add Trading Account" and enter your details. We'll
                  verify the connection and sync your account data.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
      {accountsState?.map((account) => {
        const accountInfo = accountsInfoState.find(
          (item) => String(item.login) === account.login
        );
        return (
          <AccountCard
            key={account.accountId}
            account={account}
            accountInfo={accountInfo}
            connectionStatus={true}
            isLoading={refreshLoadingMap[account.accountId] || false}
            onDelete={() => {
              setDeleteModalOpen(true);
              setAccountId(account.accountId);
            }}
            onRefresh={() => handleRefresh(account.accountId)}
            onSettings={() => {
              setUpdateModalOpen(true);
              setAccountId(account.accountId);
              setAccountPassword(account.password);
              setAccountNameAtom(account.accountName);
              setAccountServer(account.server);
            }}
            onShowStats={() => {
              setShowStats(true);
              setAccountId(account.accountId);
              setAccountNameAtom(account.accountName);
            }}
          />
        );
      })}
      <DeleteModal
        open={deleteModalOpen}
        setOpen={setDeleteModalOpen}
        deleteModalLoading={deleteModalLoading}
        handleDelete={() => handleDelete(accountId)}
      />
      <UpdateModal
        open={updateModalOpen}
        setOpen={setUpdateModalOpen}
        updateModalLoading={updateModalLoading}
        handleUpdate={() =>
          handleUpdate(accountName, accountId, accountPassword, accountServer)
        }
      />
      <AccountStatsModal
        isOpen={showStats}
        onClose={() => setShowStats(false)}
        accountId={accountId}
        accountName={accountName}
      />
    </div>
  );
}
