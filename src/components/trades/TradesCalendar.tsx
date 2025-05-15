import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Calendar } from "lucide-react";
import { dispatch, useSelector } from "@/app/store";
import { getCalendarTradesStats } from "@/app/reducers/trade";
import { DayStats } from "@/types/trade";

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function TradesCalendar({
  account,
  accountType,
}: {
  account: string;
  accountType: string;
}) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [hoveredDay, setHoveredDay] = useState<number | null>(null);
  const monthStats = useSelector((state) => state.trade.monthStats);
  const totalTradesStats = useSelector((state) => state.trade.totalTradesStats);
  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();

  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  ).getDay();

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)));
  };
  const getDayColor = (_day: number, stats?: DayStats) => {
    if (!stats) return "hover:bg-dark-200/50";
    return stats.profit >= 0
      ? "bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400"
      : "bg-red-500/10 hover:bg-red-500/20 text-red-400";
  };

  const getIntensityClass = (stats?: DayStats) => {
    if (!stats) return "";
    const intensity = Math.min((Math.abs(stats.profit) / 1000) * 100, 100);
    return `opacity-${Math.round(intensity / 10) * 10}`;
  };

  useEffect(() => {
    if (accountType == "MetaTrader") {
      account &&
        dispatch(
          getCalendarTradesStats({
            currentDate: String(currentDate),
            accountId: account,
          })
        );
    } else {
    }
  }, [account, currentDate, setCurrentDate, accountType]);

  return (
    <div className="glass-panel rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-accent/10 rounded-lg">
            <Calendar className="h-5 w-5 text-accent" />
          </div>
          <h2 className="text-lg font-medium text-white">Trading Activity</h2>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={prevMonth}
            className="p-1 hover:bg-dark-200/50 rounded transition-colors"
          >
            <ChevronLeft className="h-4 w-4 text-gray-400" />
          </button>
          <span className="text-white font-medium">
            {currentDate.toLocaleString("default", {
              month: "long",
              year: "numeric",
            })}
          </span>
          <button
            onClick={nextMonth}
            className="p-1 hover:bg-dark-200/50 rounded transition-colors"
          >
            <ChevronRight className="h-4 w-4 text-gray-400" />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-1">
        {DAYS.map((day) => (
          <div
            key={day}
            className="text-center text-xs font-medium text-gray-500 py-2"
          >
            {day}
          </div>
        ))}
        {Array.from({ length: firstDayOfMonth }).map((_, index) => (
          <div key={`empty-start-${index}`} className="aspect-square" />
        ))}
        {Array.from({ length: daysInMonth }).map((_, index) => {
          const day = index + 1;
          const stats = monthStats[day];
          const isToday =
            day === new Date().getDate() &&
            currentDate.getMonth() === new Date().getMonth() &&
            currentDate.getFullYear() === new Date().getFullYear();

          return (
            <div
              key={day}
              className={`aspect-square relative flex items-center justify-center 
                         ${getDayColor(day, stats)}
                         ${isToday ? "ring-2 ring-accent" : ""}
                         rounded-lg transition-colors cursor-pointer`}
              onMouseEnter={() => setHoveredDay(day)}
              onMouseLeave={() => setHoveredDay(null)}
            >
              <span className={stats ? "font-medium" : "text-gray-400"}>
                {day}
              </span>

              {stats && hoveredDay === day && (
                <div
                  className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 
                               bg-dark-100/95 rounded-lg p-3 text-xs border border-dark-300/50
                               backdrop-blur-xl shadow-xl z-10 whitespace-nowrap min-w-[160px]"
                >
                  <div className="text-gray-300 mb-1">
                    Trades: {stats.trades}
                  </div>
                  <div
                    className={
                      stats.profit >= 0 ? "text-emerald-400" : "text-red-400"
                    }
                  >
                    Profit: {stats.profit >= 0 ? "+" : ""}
                    {stats.profit.toFixed(2)} USD
                  </div>
                  <div className="text-accent mt-1">
                    Win Rate: {stats.winRate}%
                  </div>
                  {stats.bestTrade && (
                    <div className="text-emerald-400 mt-1">
                      Best: {stats.bestTrade.toFixed(2)} USD
                    </div>
                  )}
                  {stats.worstTrade && (
                    <div className="text-red-400">
                      Worst: {stats.worstTrade.toFixed(2)} USD
                    </div>
                  )}
                  <div
                    className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1 
                                border-4 border-transparent border-t-dark-100/95"
                  ></div>
                </div>
              )}

              {stats && (
                <div
                  className={`absolute top-1 right-1 w-1.5 h-1.5 rounded-full 
                               bg-current ${getIntensityClass(stats)}`}
                />
              )}
            </div>
          );
        })}

        {/* Empty cells for next month */}
        {Array.from({
          length: (7 - ((firstDayOfMonth + daysInMonth) % 7)) % 7,
        }).map((_, index) => (
          <div key={`empty-end-${index}`} className="aspect-square" />
        ))}
      </div>

      {/* Monthly Summary */}
      <div className="grid grid-cols-3 gap-4 mt-6">
        <div className="glass-panel rounded-lg p-4">
          <div className="text-sm text-gray-400 mb-1">Total Trades</div>
          <div className="text-xl font-semibold text-emerald-400">
            {totalTradesStats.currentMonthTrades} trade
          </div>
          <div
            className={`text-xs font-semibold ${
              totalTradesStats.tradesPercent > 0
                ? "text-emerald-400"
                : "text-red-500"
            }`}
          >
            {totalTradesStats.tradesPercent.toFixed(2)}% vs last month
          </div>
        </div>
        <div className="glass-panel rounded-lg p-4">
          <div className="text-sm text-gray-400 mb-1">Lots</div>
          <div className="text-xl font-semibold text-emerald-400">
            {totalTradesStats.currentMonthLots.toFixed(2)} lot
          </div>
          <div
            className={`text-xs font-semibold ${
              totalTradesStats.lotsPercent > 0
                ? "text-emerald-400"
                : "text-red-500"
            }`}
          >
            {totalTradesStats.lotsPercent.toFixed(2)}% vs last month
          </div>
        </div>
        <div className="glass-panel rounded-lg p-4">
          <div className="text-sm text-gray-400 mb-1">Profit</div>
          <div
            className={`text-xl font-semibold ${
              totalTradesStats.profitPercent > 0
                ? "text-emerald-400"
                : "text-red-500"
            }`}
          >
            ${totalTradesStats.currentMonthProfit.toFixed(2)}
          </div>
          <div
            className={`text-xs font-semibold ${
              totalTradesStats.profitPercent > 0
                ? "text-emerald-400"
                : "text-red-500"
            }`}
          >
            {totalTradesStats.profitPercent.toFixed(2)}% vs last month
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center space-x-6 mt-6 text-xs text-gray-400">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-emerald-400/20"></div>
          <span>Profitable Day</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-400/20"></div>
          <span>Loss Day</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full ring-2 ring-accent"></div>
          <span>Today</span>
        </div>
      </div>
    </div>
  );
}
