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
import { BsCalendarWeek } from "react-icons/bs";
import { BsCalendarMonth } from "react-icons/bs";

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

  const [chartWidth, setChartWidth] = useState(700);

  useEffect(() => {
    const handleResize = () => {
      setChartWidth(window.innerWidth < 768 ? window.innerWidth - 40 : 700);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
            <div className="grid grid-cols-1 xl:grid-cols-2 place-items-center gap-10 my-5">
              <div className="h-[500px] flex flex-col justify-between items-center">
                <div className="text-white text-xl font-bold flex items-center w-[80%] gap-5">
                  <TrendingUp className="h-6 w-6" /> Profitability
                </div>
                <div className="flex items-center gap-5">
                  <PieChart width={chartWidth} height={150}>
                    <Pie
                      data={wonlostStats}
                      cx="50%"
                      cy={150}
                      startAngle={180}
                      endAngle={0}
                      innerRadius={60}
                      outerRadius={150}
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
                </div>
                <div className="text-green-500 font-bold flex items-center gap-5">
                  <span className="text-white text-xl">Win Rate</span>
                  <span className="text-[#0088FE] text-xl">
                    {wonlostStats[0]?.value.toFixed(2)}%
                  </span>
                </div>
              </div>

              <div className="flex flex-col items-center gap-5">
                <div className="text-white font-bold text-xl flex items-center w-[80%] gap-5">
                  <Clock className="h-6 w-6" /> Profit and Loss Hourly Analysis
                </div>
                <AreaChart
                  width={chartWidth}
                  height={500}
                  data={tradesbyhourstats}
                >
                  <XAxis dataKey="hour" />
                  <YAxis />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(0, 0, 0, 0.7)",
                      borderRadius: "5px",
                    }}
                  />
                  <Legend />
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

              <div className="flex flex-col items-center gap-5">
                <div className="text-white font-bold text-xl flex gap-5 items-center w-[80%]">
                  <BsCalendar4Week className="h-6 w-6" /> Profit and Loss Weekly
                  Analysis
                </div>
                <BarChart width={chartWidth} height={500} data={byweekdayStats}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(0, 0, 0, 0.7)",
                      borderRadius: "5px",
                    }}
                  />
                  <Legend />
                  <ReferenceLine y={0} stroke="white" />
                  <Bar
                    dataKey="wonProfit"
                    fill="#50FA7B"
                    radius={[5, 5, 0, 0]}
                  />
                  <Bar
                    dataKey="lostProfit"
                    fill="#F25069"
                    radius={[5, 5, 0, 0]}
                  />
                </BarChart>
              </div>

              <div className="relative flex flex-col items-center gap-5">
                <div className="absolute right-5 top-3 flex gap-3 justify-center items-center m-5">
                  <p
                    className={`${
                      index == "month" &&
                      "border border-blue-500 border-dashed p-1 rounded-lg text-blue-500"
                    } cursor-pointer flex justify-center items-center gap-2 select-none`}
                    onClick={() => setIndex("month")}
                  >
                    <BsCalendarMonth className="w-4 h-4" />
                    Month
                  </p>
                  <p
                    className={`${
                      index == "week" &&
                      "border border-blue-500 border-dashed p-1 rounded-lg text-blue-500"
                    } cursor-pointer flex justify-center items-center gap-2 select-none`}
                    onClick={() => setIndex("week")}
                  >
                    <BsCalendarWeek className="h-4 w-4" />
                    Week
                  </p>
                  <p
                    className={`${
                      index == "year" &&
                      "border-dashed border border-blue-500 p-1 rounded-lg text-blue-500"
                    } cursor-pointer flex justify-center items-center gap-2 select-none`}
                    onClick={() => setIndex("year")}
                  >
                    <svg
                      version="1.1"
                      id="Layer_1"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      viewBox="0 0 122.84 122.88"
                      fill="currentColor"
                      xmlSpace="preserve"
                      width="16px"
                      height="16px"
                    >
                      <g>
                        <path d="M81.53,4.71c0-2.62,2.58-4.71,5.77-4.71c3.2,0,5.77,2.13,5.77,4.71V25.4c0,2.62-2.58,4.71-5.77,4.71 c-3.2,0-5.77-2.13-5.77-4.71V4.71L81.53,4.71z M40.25,68.24L33.8,89.93v12.3h-8.16v-12.3l-6.23-21.68h8.11 c1.25,6.65,1.98,11.12,2.16,13.41c0.51-3.62,1.32-8.09,2.46-13.41H40.25L40.25,68.24z M42.52,68.24h14.74v6.79h-5.89v6.49h5.5v6.44 h-5.5v7.48h6.49v6.79H42.52V68.24z M76.37,68.24l5.06,33.99H72.4l-0.48-6.1h-3.19l-0.48,6.1h-9.14l4.48-33.99H76.37z M71.68,90.11 c-0.42-3.85-0.87-8.62-1.34-14.31c-0.87,6.53-1.42,11.3-1.66,14.31H71.68z M83.7,68.24h6.25c4.17,0,6.99,0.16,8.46,0.48 c1.48,0.32,2.68,1.15,3.61,2.47c0.93,1.32,1.4,3.43,1.4,6.32c0,2.64-0.33,4.42-0.99,5.33c-0.65,0.91-1.95,1.45-3.88,1.63 c1.75,0.44,2.93,1.02,3.53,1.75c0.6,0.72,0.97,1.4,1.12,2.01c0.15,0.61,0.22,2.28,0.22,5.03v8.97h-8.21V90.92 c0-1.82-0.14-2.94-0.43-3.38c-0.28-0.44-1.02-0.65-2.23-0.65v15.34H83.7V68.24z M92.56,74.04v7.56c0.99,0,1.68-0.14,2.07-0.41 c0.39-0.27,0.59-1.16,0.59-2.66v-1.87c0-1.08-0.19-1.79-0.57-2.13C94.27,74.21,93.57,74.04,92.56,74.04z M29.53,4.71 C29.53,2.09,32.11,0,35.3,0c3.2,0,5.77,2.13,5.77,4.71V25.4c0,2.62-2.58,4.71-5.77,4.71c-3.2,0-5.77-2.13-5.77-4.71V4.71z M7.56,44.09h107.62V22.66c0-0.8-0.31-1.55-0.84-2.04c-0.53-0.53-1.24-0.84-2.04-0.84h-9.31c-1.78,0-3.2-2.63-3.2-4.41 c0-1.78,1.42-3.2,3.2-3.2h10.53c2.58,0,4.88,1.07,6.57,2.75c1.69,1.69,2.75,4.04,2.75,6.57v92.06c0,2.58-1.07,4.88-2.75,6.57 c-1.69,1.69-4.04,2.75-6.57,2.75H9.33c-2.58,0-4.88-1.07-6.57-2.75C1.07,118.44,0,116.09,0,113.55V21.49 c0-2.58,1.07-4.88,2.75-6.57c1.69-1.69,4.04-2.75,6.57-2.75h11.28c1.78,0,3.2,1.42,3.2,3.2c0,1.78-1.42,4.41-3.2,4.41H10.54 c-0.8,0-1.55,0.31-2.09,0.84c-0.53,0.53-0.84,1.24-0.84,2.09v21.43z M115.18,52.9H7.56v59.4c0,0.8,0.31,1.55,0.84,2.09 c0.53,0.53,1.24,0.84,2.09,0.84h101.76c0.8,0,1.55-0.31,2.09-0.84c0.53-0.53,0.84-1.24,0.84-2.09V52.9z M50.36,19.73 c-1.78,0-3.2-2.63-3.2-4.41c0-1.78,1.42-3.2,3.2-3.2h21.49c1.78,0,3.2,1.42,3.2,3.2c0,1.78-1.42,4.41-3.2,4.41H50.36z" />
                      </g>
                    </svg>
                    Year
                  </p>
                </div>
                <div className="text-white font-bold text-xl flex gap-5 items-center w-[80%]">
                  <LuTrendingUpDown className="h-6 w-6" /> Total Trades Analysis
                </div>
                <ComposedChart
                  width={chartWidth}
                  height={500}
                  data={visualTradesState}
                >
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(0, 0, 0, 0.7)",
                      borderRadius: "5px",
                    }}
                  />
                  <Legend />
                  <ReferenceLine y={0} stroke="white" />
                  <Bar
                    dataKey="loss"
                    barSize={20}
                    fill="#FF0022"
                    radius={[5, 5, 0, 0]}
                  />
                  <Line
                    type="monotone"
                    dataKey="profit"
                    stroke="#0088FE"
                    strokeWidth={3}
                    dot={false}
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
