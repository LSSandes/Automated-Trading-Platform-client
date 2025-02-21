import {
  X,
  TrendingUp,
  Clock,
  BarChart2,
  ArrowUpRight,
  ArrowDownRight,
  DollarSign,
  Table,
} from "lucide-react";
import { LuTrendingUpDown } from "react-icons/lu";
import { BsCalendar4Week } from "react-icons/bs";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ReferenceLine,
  AreaChart,
  Area,
  ComposedChart,
  Line,
  // CartesianGrid,
} from "recharts";
import { useEffect, useState } from "react";
import { dispatch, useSelector } from "@/app/store";
import { getMetaStats, getVisualStats } from "@/app/reducers/metaStats";
import { getMetaTotalStats } from "@/app/reducers/metaTotalStats";
import { userAtom } from "@/store/atoms";
import { useAtom } from "jotai";
import BarLoader from "react-spinners/BarLoader";
import { getMetaVisualTrades } from "@/app/reducers/metaVisualTrades";

interface AccountStatsModalProps {
  isOpen: boolean;
  onClose: () => void;
  accountId: string;
  accountName: string;
}
const COLORS = ["#0088FE", "#FF0022"];

export default function AccountStatsModal({
  isOpen,
  onClose,
  accountId,
  accountName,
}: AccountStatsModalProps) {
  if (!isOpen) return null;
  const [user] = useAtom(userAtom);
  const [tradeTab, setTradeTab] = useState<string>("analysis");
  const [loadingTotal, setLoadingTotal] = useState<boolean>(true);
  const [loadingTrades, setLoadingTrades] = useState<boolean>(true);
  const [index, setIndex] = useState<string>("month");
  const metaStats = useSelector((state) => state.metaStats.stats);
  const wonlostStats = useSelector((state) => state.metaStats.won_lost);
  const byweekdayStats = useSelector((state) => state.metaStats.trades_by_week);
  const tradesbyhourstats = useSelector(
    (state) => state.metaStats.trades_by_hour
  );
  const visualTradesState = useSelector(
    (state) => state.metaViualTrades.visualTrades
  );

  console.log("------2----visual---->", metaStats);
  const metaTotalStats = useSelector(
    (state) => state.metaTotalStats.totalStats
  );
  useEffect(() => {
    if (accountId && user) {
      dispatch(getMetaStats(accountId, user?.email)).then(() => {
        setLoadingTrades(false);
      });
      dispatch(getMetaTotalStats(accountId)).then(() => {
        setLoadingTotal(false);
      });
      dispatch(getVisualStats(accountId));
    }
  }, [accountId]);

  useEffect(() => {
    if (accountId && user) {
      dispatch(getMetaVisualTrades(user?.email, index, accountId));
    }
  }, [accountId, index]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="glass-panel rounded-2xl lg:w-[90%] w-full  z-10 p-0 ">
        {/* Header */}
        <div className="relative px-6 pt-6 border-b border-dark-300/50">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 p-2 text-gray-400 hover:text-white 
                     hover:bg-dark-200/50 rounded-lg transition-all duration-300"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="flex items-center space-x-4">
            <div className="p-2 bg-dark-200/50 rounded-lg">
              <BarChart2 className="h-6 w-6 text-accent" />
            </div>
            <div>
              <h3 className="text-xl font-medium text-white">{accountName}</h3>
              <div className="flex items-center space-x-3 mt-1">
                <span className="text-gray-400">#{0}</span>
                <div className="flex items-center text-emerald-400">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  <span>+{0}%</span>
                </div>
              </div>
            </div>
          </div>

          <span className="isolate inline-flex rounded-md shadow-sm">
            <button
              type="button"
              className={`relative inline-flex gap-2 items-center ${
                tradeTab == "analysis" ? "border-b-2 border-white" : ""
              } rounded-tl-md bg-transparent px-3 py-2 text-sm font-semibold text-white  hover:bg-slate-900 focus:z-10`}
              onClick={() => setTradeTab("analysis")}
            >
              <Table className="h-5 w-5" />
              Trade Analysis
            </button>
            <button
              type="button"
              className={`relative -ml-px gap-2 inline-flex items-center ${
                tradeTab == "visualization" ? "border-b-2 border-white" : ""
              } rounded-tr-md bg-transparent px-3 py-2 text-sm font-semibold text-white hover:bg-slate-900 focus:z-10`}
              onClick={() => setTradeTab("visualization")}
            >
              <BarChart2 className="h5 w-5" />
              Trade Visualization
            </button>
          </span>
        </div>

        {/* trades analysis */}
        {tradeTab == "analysis" && (
          <div className="p-6 space-y-6 lg:h-[95%] lg:max-h-full max-h-[500px] overflow-y-auto">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="glass-panel rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2 text-gray-400">
                    <DollarSign className="h-4 w-4" />
                    <span>Balance</span>
                  </div>
                  <span className="text-white font-medium">
                    ${loadingTotal ? 0 : metaTotalStats.balance}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-gray-400">
                    <DollarSign className="h-4 w-4" />
                    <span>Equity</span>
                  </div>
                  <span className="text-white font-medium">
                    ${loadingTotal ? 0 : metaTotalStats.equity}
                  </span>
                </div>
              </div>

              <div className="glass-panel rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2 text-gray-400">
                    <TrendingUp className="h-4 w-4" />
                    <span>Profit</span>
                  </div>
                  <span
                    className={`font-medium ${
                      metaTotalStats.profit >= 0
                        ? "text-emerald-400"
                        : "text-red-400"
                    }`}
                  >
                    {metaTotalStats.profit >= 0 ? "+" : ""}
                    {loadingTotal ? 0 : metaTotalStats.profit.toFixed(2)} USD
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-gray-400">
                    <Clock className="h-4 w-4" />
                    <span>Today</span>
                  </div>
                  <span
                    className={`font-medium ${
                      metaTotalStats.todayWinRate >= 0
                        ? "text-emerald-400"
                        : "text-red-400"
                    }`}
                  >
                    {metaTotalStats.todayWinRate >= 0 ? "+" : ""}
                    {loadingTotal
                      ? 0
                      : metaTotalStats.todayWinRate.toFixed(2)}{" "}
                    %
                  </span>
                </div>
              </div>

              <div className="glass-panel rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2 text-gray-400">
                    <BarChart2 className="h-4 w-4" />
                    <span>Total Trades</span>
                  </div>
                  <span className="text-white font-medium">
                    {loadingTotal ? 0 : metaTotalStats.totalTrades}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-gray-400">
                    <TrendingUp className="h-4 w-4" />
                    <span>Win Trades</span>
                  </div>
                  <span className="text-emerald-400 font-medium">
                    {loadingTotal ? 0 : metaTotalStats.winTrades}
                  </span>
                </div>
              </div>

              <div className="glass-panel rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2 text-gray-400">
                    <Clock className="h-4 w-4" />
                    <span>Avg. Hold Time</span>
                  </div>
                  <span className="text-white font-medium">
                    {convertMillisecondsToTime(
                      loadingTotal ? 0 : metaTotalStats.avgHoldTime
                    )}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-gray-400">
                    <TrendingUp className="h-4 w-4" />
                    <span>Success Rate</span>
                  </div>
                  <span className="text-emerald-400 font-medium">
                    {loadingTotal ? 0 : metaTotalStats.successRate.toFixed(3)}%
                  </span>
                </div>
              </div>
            </div>

            {/* Recent Trades */}
            <div className="glass-panel rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-medium text-white">
                  Recent Trades
                </h3>
                <button className="text-accent hover:text-accent-dark transition-colors">
                  View All Trades
                </button>
              </div>

              <div className=" overflow-auto max-h-[500px] w-full">
                <table className="w-full">
                  <thead>
                    <tr className="text-left">
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
                    {!loadingTrades &&
                      metaStats?.map((stats) => (
                        <tr key={stats._id} className="text-sm">
                          <td className="py-4 text-white font-medium">
                            {stats.symbol}
                          </td>
                          <td className="py-4">
                            <div
                              className={`flex items-center ${
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
                          <td className="py-4 text-gray-300">
                            {stats.openPrice}
                          </td>
                          <td className="py-4 text-gray-300">
                            {stats.closePrice}
                          </td>
                          <td
                            className={`py-4 font-medium ${
                              stats.profit >= 0
                                ? "text-emerald-400"
                                : "text-red-400"
                            }`}
                          >
                            {stats.profit >= 0 ? "+" : ""}
                            {stats.profit.toFixed(2)} USD
                          </td>
                          <td className="py-4 text-gray-300">
                            {stats.openTime}
                          </td>
                          <td className="py-4 text-gray-300">
                            {stats.closeTime}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
                {loadingTrades && (
                  <div className="flex justify-center items-center w-full">
                    <BarLoader
                      color="rgb(0, 170, 255)"
                      loading={loadingTrades}
                      width="100%"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
        {/* trades visualization */}
        {tradeTab == "visualization" && (
          <div className="flex flex-col justify-between items-center gap-2 overflow-y-auto max-h-[700px] m-10">
            <div className="xl:grid-cols-2 grid place-items-center gap-20 my-5 grid-cols-1">
              <div className="flex flex-col items-center justify-between gap-5">
                <div className="text-white text-xl font-sans font-bold flex justify-start items-center w-[80%] gap-5">
                  <TrendingUp className="h-6 w-6" />
                  Profitability
                </div>
                <PieChart width={700} height={300}>
                  <Pie
                    data={wonlostStats}
                    cx={350}
                    cy={300}
                    startAngle={180}
                    endAngle={0}
                    innerRadius={100}
                    outerRadius={250}
                    fill="#8884d8"
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {wonlostStats?.map((_, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                </PieChart>
                <div className="text-green-500 font-bold flex flex-col justify-center items-center">
                  <span className="text-white">Win Rate</span>{" "}
                  <span className="text-[#0088FE]">
                    ${wonlostStats[0]?.value.toFixed(2)}%
                  </span>
                </div>
              </div>
              <div className="flex flex-col justify-center items-center gap-5">
                <div className=" text-white font-bold font-sans text-xl w-[80%] flex justify-start items-center gap-5">
                  <Clock className="h-6 w-6" />
                  Profit and Loss Hourly Analysis
                </div>
                <AreaChart
                  width={700}
                  height={500}
                  data={tradesbyhourstats}
                  margin={{
                    top: 10,
                    right: 30,
                    left: 0,
                    bottom: 0,
                  }}
                >
                  <XAxis dataKey="hour" />
                  <YAxis />
                  <Legend />
                  <Tooltip
                    labelStyle={{ color: "white" }}
                    contentStyle={{
                      backgroundColor: "rgba(0, 0, 0, 0.7)",
                      borderRadius: "5px",
                      border: "1px solid rgba(255, 255, 255, 0.2)",
                      padding: "10px",
                      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.3)",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="wonProfit"
                    stroke="#00ff46"
                    fill="#00ff46"
                  />
                  <Area
                    type="monotone"
                    dataKey="lostProfit"
                    stroke="#ff0022"
                    fill="#ff0022"
                  />
                </AreaChart>
              </div>
              <div className="flex flex-col justify-center items-center gap-5">
                <div className=" text-white font-bold font-sans text-xl flex gap-5 justify-start items-center w-[80%]">
                <BsCalendar4Week className="h-6 w-6"/>
                  Profit and Loss Weekly Analysis
                </div>
                <BarChart
                  width={700}
                  height={500}
                  data={byweekdayStats}
                  stackOffset="sign"
                  margin={{
                    top: 5,
                    right: 0,
                    left: 0,
                    bottom: 5,
                  }}
                >
                  <XAxis dataKey="name" fontStyle={"sans"} />
                  <YAxis />
                  <Tooltip
                    labelStyle={{ color: "white" }}
                    contentStyle={{
                      backgroundColor: "rgba(0, 0, 0, 0.7)",
                      borderRadius: "5px",
                      border: "1px solid rgba(255, 255, 255, 0.2)",
                      padding: "10px",
                      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.3)",
                    }}
                  />
                  <Legend />
                  <ReferenceLine y={0} stroke="white" />
                  <Bar
                    dataKey="wonProfit"
                    fill="#50FA7B"
                    stackId="stack"
                    radius={[7, 7, 0, 0]}
                  />
                  <Bar
                    dataKey="lostProfit"
                    fill="#F25069"
                    stackId="stack"
                    radius={[7, 7, 0, 0]}
                  />
                </BarChart>
              </div>
              <div className="relative flex flex-col justify-center items-center gap-5">
                <div className="absolute right-5 top-3 flex gap-3 justify-center items-center m-5">
                  <p
                    className={`${
                      index == "month" && "border-b border-white"
                    } cursor-pointer`}
                    onClick={() => setIndex("month")}
                  >
                    Month
                  </p>
                  <p
                    className={`${
                      index == "week" && "border-b border-white"
                    } cursor-pointer`}
                    onClick={() => setIndex("week")}
                  >
                    Week
                  </p>
                  <p
                    className={`${
                      index == "year" && "border-b border-white"
                    } cursor-pointer`}
                    onClick={() => setIndex("year")}
                  >
                    Year
                  </p>
                </div>
                <div className=" text-white font-bold font-sans text-xl flex justify-start items-center w-[80%] gap-5">
                <LuTrendingUpDown className="h-6 w-6"/>
                  Total Trades Analysis
                </div>
                <ComposedChart
                  width={700}
                  height={500}
                  data={visualTradesState}
                  margin={{
                    top: 20,
                    right: 20,
                    bottom: 20,
                    left: 20,
                  }}
                >
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(0, 0, 0, 0.7)",
                      borderRadius: "5px",
                      border: "1px solid rgba(255, 255, 255, 0.2)",
                      padding: "10px",
                      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.3)",
                    }}
                  />
                  <ReferenceLine y={0} stroke="white" />
                  <Legend />
                  <Bar
                    dataKey="loss"
                    barSize={30}
                    fill="#FF0022"
                    radius={[5, 5, 0, 0]}
                  />
                  <Line
                    type="monotone"
                    dataKey="profit"
                    stroke="#0088FE"
                    strokeWidth={4}
                    dot={false}
                    activeDot={{
                      r: 3,
                      stroke: "#0088FE",
                      strokeWidth: 1,
                      fill: "white",
                    }}
                    isAnimationActive={false}
                    style={{
                      filter: "drop-shadow(3px 3px 5px rgba(0, 0, 0, 0.4))",
                    }}
                  />
                </ComposedChart>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function convertMillisecondsToTime(ms: number) {
  const hours = Math.floor(ms / (1000 * 60 * 60));
  const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
  if (hours == 0) {
    return `${minutes}m`;
  } else {
    return `${hours}h : ${minutes}m`;
  }
}
