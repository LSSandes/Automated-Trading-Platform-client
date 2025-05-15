import React, { useEffect } from "react";
import {
  TrendingUp,
  TrendingDown,
  BarChart2,
  Clock,
  DollarSign,
  Target,
  Zap,
} from "lucide-react";
import { dispatch, useSelector } from "@/app/store";
import { getTotalTradesStats } from "@/app/reducers/trade";

interface StatCardProps {
  label: string;
  value: string | number;
  percentage?: number;
  progressValue?: number;
  icon?: React.ReactNode;
  trend?: "up" | "down";
  highlight?: boolean;
}

function StatCard({ label, value, icon, trend, highlight }: StatCardProps) {
  return (
    <div
      className={`glass-panel rounded-xl p-4 border border-dark-300/20 transition-all duration-300 hover:scale-[1.02] ${
        highlight ? "bg-gradient-to-br from-accent/10 to-transparent" : ""
      }`}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          {icon && (
            <div className={highlight ? "text-accent" : "text-gray-400"}>
              {icon}
            </div>
          )}
          <span className="text-gray-400 text-sm">{label}</span>
        </div>
      </div>
      <div className="flex items-baseline space-x-2">
        <div
          className={`text-xl font-semibold ${
            highlight ? "text-accent" : "text-white"
          }`}
        >
          <span>{value}</span>
        </div>
        {trend && (
          <div className={trend === "up" ? "text-emerald-400" : "text-red-400"}>
            {trend === "up" ? (
              <TrendingUp className="h-4 w-4" />
            ) : (
              <TrendingDown className="h-4 w-4" />
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default function TradeStats({
  account,
  accountType,
}: {
  account: string;
  accountType: string;
}) {
  const totalTradesStats = useSelector((state) => state.trade.totalTradesStats);
  useEffect(() => {
    if (accountType == "MetaTrader") {
      account && dispatch(getTotalTradesStats({ accountId: account }));
    } else {
    }
  }, [account, accountType]);
  const convertMilliseconds = (milliseconds: number) => {
    let seconds = Math.floor(milliseconds / 1000);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);

    seconds = seconds % 60;
    minutes = minutes % 60;

    return `${hours}h : ${minutes}m : ${seconds}s`;
  };
  const stats = [
    {
      label: "Total Profit",
      value: `$ ${String(totalTradesStats.totalProfit.toFixed(2))}`,
      icon: <DollarSign className="h-4 w-4" />,
      trend:
        totalTradesStats.totalProfit < 0 ? ("down" as const) : ("up" as const),
      highlight: true,
    },
    {
      label: "Average Profit",
      value: `$ ${String(totalTradesStats.averageProfit.toFixed(2))}`,
      icon: <DollarSign className="h-4 w-4" />,
      highlight: true,
    },
    {
      label: "Total Trades",
      value: String(totalTradesStats.totalTrades),
      icon: <BarChart2 className="h-4 w-4" />,
      trend: "up" as const,
    },
    {
      label: "Avg Trade Duration",
      value: convertMilliseconds(totalTradesStats.avgTradeDuration),
      icon: <Clock className="h-4 w-4" />,
    },
    {
      label: "Total Volume",
      value: `${String(totalTradesStats.totalLots.toFixed(2))} lot`,
      icon: <Target className="h-4 w-4" />,
    },
    {
      label: "Best Trade",
      value: `$ ${String(totalTradesStats.bestTrade.toFixed(2))}`,
      icon: <Zap className="h-4 w-4" />,
      trend: "up" as const,
    },
    {
      label: "Worst Trade",
      value: `$ ${String(totalTradesStats.worstTrade.toFixed(2))}`,
      progressValue: 25,
      trend: "down" as const,
    },
    {
      label: "Average RR Ratio",
      value: String(totalTradesStats.averageRRRatio.toFixed(2)),
    },
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <StatCard
          key={index}
          label={stat.label}
          value={stat.value}
          progressValue={stat.progressValue}
          icon={stat.icon}
          trend={stat.trend}
          highlight={stat.highlight}
        />
      ))}
    </div>
  );
}
