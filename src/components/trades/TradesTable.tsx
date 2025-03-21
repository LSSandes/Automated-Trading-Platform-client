import { useSelector } from "@/app/store";
import { useEffect, useState } from "react";
import { dispatch } from "@/app/store";
import { getTradelockerOrdersHistory } from "@/app/reducers/trade";
import { getMetaStats } from "@/app/reducers/metaStats";
import { UserParams } from "@/types/tradeLocker";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { userAtom } from "@/store/atoms";
import { useAtom } from "jotai";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
export default function TradesTable({
  account,
  accountType,
}: {
  account: string;
  accountType: string;
}) {
  const [user] = useAtom(userAtom);
  const tradelockerAccounts = useSelector(
    (state) => state.tradelocker.accounts
  );
  const [accNum, setAccNum] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const accessToken = localStorage.getItem("accessToken");
  const tradelockerUser: UserParams | null = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user") as string)
    : null;
  const tradelockerOrdersHistory = useSelector(
    (state) => state.trade.tradelockerOrdersHistory
  );
  const metaStats = useSelector((state) => state.metaStats.stats);
  useEffect(() => {
    if (accountType == "TradeLocker") {
      const tradelockerAccount = tradelockerAccounts.find(
        (item) => item.id === account
      );
      tradelockerAccount && setAccNum(tradelockerAccount.accNum);
    }
  }, [accountType, account]);
  useEffect(() => {
    setLoading(true);
    if (accountType == "TradeLocker") {
      tradelockerUser &&
        accessToken &&
        dispatch(
          getTradelockerOrdersHistory({
            accessToken,
            accountId: account,
            accNum,
            accountType: tradelockerUser?.accountType,
          })
        ).then(() => {
          setTimeout(() => {
            setLoading(false);
          }, 1000);
        });
    } else {
      user &&
        account &&
        dispatch(getMetaStats(account, user?.email)).then(() =>
          setLoading(false)
        );
    }
  }, [accountType, account, accNum]);
  const formatDate = (timestamp: number): string => {
    const date = new Date(timestamp);
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      // timeZoneName: "short",
    };
    return new Intl.DateTimeFormat("en-US", options).format(date);
  };

  return (
    <div className="w-full glass-panel rounded-xl p-6 flex flex-col justify-center items-center gap-5">
      <div className="flex justify-between items-center w-full border-b border-dark-300 py-2">
        <h3 className="text-lg font-medium text-white mb-4">
          {accountType} Trades History
        </h3>
      </div>
      <div className=" overflow-auto max-h-[500px] w-full flex">
        {accountType == "TradeLocker" ? (
          <div className="w-full">
            <table className="w-full">
              <thead>
                <tr className="text-center">
                  <th className="pb-4 text-sm font-medium text-gray-400">
                    Symbol
                  </th>
                  <th className="pb-4 text-sm font-medium text-gray-400">
                    Type
                  </th>
                  <th className="pb-4 text-sm font-medium text-gray-400">
                    Position ID
                  </th>
                  <th className="pb-4 text-sm font-medium text-gray-400">
                    Side
                  </th>
                  <th className="pb-4 text-sm font-medium text-gray-400">
                    Price
                  </th>
                  <th className="pb-4 text-sm font-medium text-gray-400">
                    Lots
                  </th>
                  <th className="pb-4 text-sm font-medium text-gray-400">
                    Status
                  </th>
                  <th className="pb-4 text-sm font-medium text-gray-400">
                    StopLoss
                  </th>
                  <th className="pb-4 text-sm font-medium text-gray-400">
                    TakeProfit
                  </th>
                  <th className="pb-4 text-sm font-medium text-gray-400">
                    Validity
                  </th>
                  <th className="pb-4 text-sm font-medium text-gray-400">
                    Created Date
                  </th>
                  <th className="pb-4 text-sm font-medium text-gray-400">
                    Last Updated
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-dark-300/30">
                {!loading &&
                  tradelockerOrdersHistory?.map((order, index) => (
                    <tr key={index} className="text-sm text-center">
                      <td className="py-4 text-white font-medium">
                        {order.symbol}
                      </td>
                      <td className={`py-4`}>
                        <span
                          className={` ${
                            order.type == "market"
                              ? "text-green-500"
                              : order.type == "stop"
                              ? "text-red-400"
                              : "text-yellow-500"
                          }`}
                        >
                          {order.type.toUpperCase()}
                        </span>
                      </td>
                      <td className="py-4 text-gray-300">{order.positionId}</td>
                      <td className="py-4">
                        <div
                          className={`flex items-center ${
                            order.side === "buy"
                              ? "text-emerald-400"
                              : "text-red-400"
                          }`}
                        >
                          {order.side === "buy" ? (
                            <ArrowUpRight className="h-4 w-4 mr-1" />
                          ) : (
                            <ArrowDownRight className="h-4 w-4 mr-1" />
                          )}
                          {order.side == "buy" ? "BUY" : "SELL"}
                        </div>
                      </td>
                      <td className="py-4 text-gray-300">{order.price}</td>
                      <td className="py-4 text-gray-300">{order.qty}</td>
                      <td className={`py-4 text-gray-300 text-center`}>
                        <span
                          className={`${
                            order.status == "Filled"
                              ? "text-green-500"
                              : "text-red-400"
                          }`}
                        >
                          {order.status.toUpperCase()}
                        </span>
                      </td>
                      <td className="py-4 text-gray-300">{order.stopLoss}</td>
                      <td className="py-4 text-gray-300">{order.takeProfit}</td>
                      <td className="py-4 text-gray-300">{order.validity}</td>
                      <td className="py-4 text-gray-300">
                        {formatDate(Number(order.createdDate))}
                      </td>
                      <td className="py-4 text-gray-300">
                        {formatDate(Number(order.lastModified))}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
            {loading && (
              <Skeleton
                count={6}
                style={{ width: "100%", lineHeight: 1, rowGap: 20 }}
                baseColor="#202020"
                highlightColor="#444"
              />
            )}
          </div>
        ) : (
          <div className="w-full">
            <table className="w-full">
              <thead>
                <tr className="text-center">
                  <th className="pb-4 text-sm font-medium text-gray-400">
                    Symbol
                  </th>
                  <th className="pb-4 text-sm font-medium text-gray-400">
                    Type
                  </th>
                  <th className="pb-4 text-sm font-medium text-gray-400">
                    Lots
                  </th>
                  <th className="pb-4 text-sm font-medium text-gray-400">
                    Open Price
                  </th>
                  <th className="pb-4 text-sm font-medium text-gray-400">
                    Close Price
                  </th>
                  <th className="pb-4 text-sm font-medium text-gray-400">
                    Profit
                  </th>
                  <th className="pb-4 text-sm font-medium text-gray-400">
                    Open Time
                  </th>
                  <th className="pb-4 text-sm font-medium text-gray-400">
                    Close Time
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-dark-300/30">
                {metaStats?.map((stats, index) => (
                  <tr key={index} className="text-center">
                    <td className="py-4 text-white font-medium">
                      {stats.symbol}
                    </td>
                    <td className="py-4">
                      <div
                        className={`flex items-center justify-center ${
                          stats.type === "DEAL_TYPE_BUY"
                            ? "text-emerald-400"
                            : "text-red-400"
                        }`}
                      >
                        {stats.type === "DEAL_TYPE_BUY" ? (
                          <ArrowUpRight className="h-4 w-4 mr-1" />
                        ) : (
                          <ArrowDownRight className="h-4 w-4 mr-1" />
                        )}
                        {stats.type == "DEAL_TYPE_BUY" ? "BUY" : "SELL"}
                      </div>
                    </td>
                    <td className="py-4 text-gray-300">{stats.volume}</td>
                    <td className="py-4 text-gray-300">{stats.openPrice}</td>
                    <td className="py-4 text-gray-300">{stats.closePrice}</td>
                    <td
                      className={`py-4 font-medium ${
                        stats.profit >= 0 ? "text-emerald-400" : "text-red-400"
                      }`}
                    >
                      {stats.profit >= 0 ? "+" : ""}
                      {stats.profit.toFixed(2)} USD
                    </td>
                    <td className="py-4 text-gray-300">{stats.openTime}</td>
                    <td className="py-4 text-gray-300">{stats.closeTime}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {loading && (
              <Skeleton
                count={6}
                style={{ width: "100%", lineHeight: 1, rowGap: 20 }}
                baseColor="#202020"
                highlightColor="#444"
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
