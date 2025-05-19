import { dispatch, useSelector } from "@/app/store";
import { getAccounts } from "@/app/reducers/tradelocker";
import { LuLogOut } from "react-icons/lu";
import { useEffect } from "react";
import { Wallet } from "lucide-react";
import { UserParams } from "@/types/tradeLocker";
import { TradeLockerAccountListProps } from "@/types/tradeLocker";
import { getAccountInfo } from "@/app/reducers/tradelockerInfo";

export default function TradeLockerAccountList({
  onLogout,
}: TradeLockerAccountListProps) {
  const accounts = useSelector((state) => state.tradelocker.accounts);
  const accountInfo = useSelector(
    (state) => state.tradelockerInfo?.accountInfo
  );
  const accessToken = localStorage.getItem("accessToken");
  const tradelockerUser: UserParams | null = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user") as string)
    : null;
  useEffect(() => {
    const fetchData = async () => {
      if (accessToken && tradelockerUser) {
        await dispatch(
          getAccounts({ accessToken, accountType: tradelockerUser.accountType })
        );
      } else {
        onLogout();
      }
    };
    fetchData();
  }, []);
  useEffect(() => {
    if (accessToken && tradelockerUser) {
      accounts.forEach((account) => {
        dispatch(
          getAccountInfo({
            accessToken,
            accountType: tradelockerUser.accountType,
            accountId: account.id,
            accNum: account.accNum,
          })
        );
      });
    }
  }, [accounts, tradelockerUser]);
  return (
    <div className="w-full flex flex-col justify-start items-start h-full gap-5">
      <div className="w-full flex justify-between items-center gap-4">
        <div>
          <h1 className="text-3xl font-medium text-white tracking-tight">
            TradeLocker
          </h1>
          <p className="text-gray-400 mt-1">
            Manage your tradelocker accounts and monitor performance
          </p>
        </div>
        <button
          className="bg-blue-500 py-1 px-3 rounded-lg outline-1 outline-dashed outline-blue-500 outline-offset-2 flex justify-center items-center gap-2"
          onClick={onLogout}
        >
          <LuLogOut />
          logout
        </button>
      </div>
      <div className="w-full grid 2xl:grid-cols-3 xl:grid-cols-2 grid-cols-1 gap-4">
        {accounts?.map((account, index) => {
          const info = accountInfo.find(
            (item) => String(item.accountId) === account.id
          );
          return (
            <div
              key={index}
              className="flex flex-col gap-2  outline-1 outline-dashed outline-dark-500 outline-offset-2 glass-panel p-4 rounded-lg"
            >
              <div className="flex justify-start items-center py-1 px-4 gap-3 border-b border-dark-300">
                <Wallet className="h-8 w-8 text-accent" />
                <div className="flex flex-col justify-start items-start">
                  <span>{account.name}</span>
                  <div className="flex justify-center items-center gap-2">
                    <div className="flex justify-center items-center gap-2 text-gray-400">
                      <span>ID: </span>
                      <span className="text-sm">
                        {account.id}-{account.accNum}
                      </span>
                    </div>
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    <span className="text-[12px] text-green-500">
                      {account.status}
                    </span>
                    <span className="text-[12px] text-rose-700">
                      {account.currency}
                    </span>
                  </div>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-2 grid-cols-1">
                <div className="glass-panel flex justify-between items-center rounded-lg p-3 gap-3">
                  <span className="text-gray-400 text-sm">Balance </span>
                  <span className="text-md">{account.accountBalance}</span>
                </div>
                <div className="glass-panel flex justify-between items-center rounded-lg p-3 gap-3">
                  <span className="text-gray-400 text-sm">
                    Projected Balance:{" "}
                  </span>
                  <span className="text-md">{info?.projectedBalance}</span>
                </div>
                <div className="glass-panel flex justify-between items-center rounded-lg p-3 gap-3">
                  <span className="text-gray-400 text-sm">
                    Available Funds:{" "}
                  </span>
                  <span className="text-md">{info?.availableFunds}</span>
                </div>
                <div className="glass-panel flex justify-between items-center rounded-lg p-3 gap-3">
                  <span className="text-gray-400 text-sm">Margin: </span>
                  <span className="text-md">{info?.initialMarginReq}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
