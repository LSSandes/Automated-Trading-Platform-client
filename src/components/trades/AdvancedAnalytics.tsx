import React from "react";
import {
  Shield,
  AlertTriangle,
  Target,
  // Clock,
  BarChart2,
  DollarSign,
  // Percent,
  Activity,
} from "lucide-react";
import { useSelector } from "@/app/store";

const MetricsCard = ({
  title,
  icon,
  metrics,
}: {
  title: string;
  icon: React.ReactNode;
  metrics: {
    label: string;
    value: string | number;
    highlight?: boolean;
    negative?: boolean;
  }[];
}) => (
  <div className="glass-panel rounded-xl p-6">
    <div className="flex items-center space-x-3 mb-6">
      <span className="text-accent">{icon}</span>
      <h3 className="text-lg font-medium text-white">{title}</h3>
    </div>
    <div className="space-y-4">
      {metrics.map((metric, index) => (
        <div key={index} className="flex justify-between items-center">
          <span className="text-gray-400">{metric.label}</span>
          <span
            className={`font-medium ${
              metric.highlight
                ? "text-accent"
                : metric.negative
                ? "text-red-400"
                : "text-white"
            }`}
          >
            {metric.value}
          </span>
        </div>
      ))}
    </div>
  </div>
);

const RiskCard = ({
  title,
  icon,
  value,
  description,
  status = "normal",
}: {
  title: string;
  icon: React.ReactNode;
  value: string;
  description: string;
  status?: "normal" | "warning" | "success";
}) => (
  <div className="glass-panel rounded-xl p-6">
    <div className="flex items-center space-x-3 mb-4">
      <span className="text-accent">{icon}</span>
      <h3 className="text-lg font-medium text-white">{title}</h3>
    </div>
    <div className="space-y-2">
      <div className="text-3xl font-bold text-white">{value}</div>
      <div
        className={`text-sm ${
          status === "warning"
            ? "text-yellow-400"
            : status === "success"
            ? "text-emerald-400"
            : "text-gray-400"
        }`}
      >
        {description}
      </div>
    </div>
  </div>
);

export default function AdvancedAnalytics() {
  const totalTradesStats = useSelector((state) => state.trade.totalTradesStats);
  return (
    <div className="space-y-6">
      {/* Top Row - Key Metrics */}
      <div className="grid lg:grid-cols-2 grid-cols-1 gap-6">
        <MetricsCard
          title="Trading Performance"
          icon={<Activity className="h-5 w-5" />}
          metrics={[
            {
              label: "Total Trades",
              value: String(totalTradesStats.totalTrades),
            },
            {
              label: "Win Rate",
              value: `${String(totalTradesStats.winRate.toFixed(2))}%`,
              highlight: true,
            },
            {
              label: "Loss Rate",
              value: `${String(totalTradesStats.lossRate.toFixed(2))}%`,
              negative: true,
            },
            {
              label: "Best Trades",
              value: `${String(totalTradesStats.wonTrades)}trades`,
              highlight: true,
            },
            {
              label: "Worst Trades",
              value: `${String(totalTradesStats.lostTrades)}trades`,
              negative: true,
            },
            // { label: "Monthly Target", value: "85% achieved", highlight: true },
          ]}
        />

        <MetricsCard
          title="Profit Analysis"
          icon={<DollarSign className="h-5 w-5" />}
          metrics={[
            {
              label: "Total Profit",
              value: `$${String(totalTradesStats.totalProfit.toFixed(2))}`,
              highlight: true,
            },
            // { label: "Average Profit", value: "$325.50", highlight: true },
            {
              label: "Best Trade",
              value: `$${String(totalTradesStats.bestTrade.toFixed(2))}`,
              highlight: true,
            },
            {
              label: "Worst Trade",
              value: `$${String(totalTradesStats.worstTrade.toFixed(2))}`,
              negative: true,
            },
            {
              label: "Profit Factor",
              value: String(totalTradesStats.profitFactor.toFixed(2)),
            },
            {
              label: "Cagr",
              value: `${String(totalTradesStats.cagr.toFixed(2))}`,
              highlight: true,
            },
          ]}
        />

        {/* <MetricsCard
          title="Time Analysis"
          icon={<Clock className="h-5 w-5" />}
          metrics={[
            { label: "Avg Hold Time", value: "2h 15m" },
            { label: "Best Session", value: "London", highlight: true },
            { label: "Best Day", value: "Tuesday", highlight: true },
            { label: "Trade Frequency", value: "8.5/day" },
            { label: "Active Hours", value: "6.2/day" },
            { label: "Efficiency Score", value: "92.5%", highlight: true }
          ]}
        /> */}
      </div>

      {/* Middle Row - Risk Cards */}
      <div className="grid lg:grid-cols-2 grid-cols-1 gap-6">
        <RiskCard
          title="Risk Score"
          icon={<Shield className="h-5 w-5" />}
          value={String(totalTradesStats.riskScore)}
          description={`Based on win/loss ${String(
            totalTradesStats.wonTrades
          )}/${String(totalTradesStats.lostTrades)} trades`}
          status={`${
            totalTradesStats.riskScore == "High" ? "success" : "normal"
          }`}
        />

        <RiskCard
          title="Max Drawdown"
          icon={<AlertTriangle className="h-5 w-5" />}
          value={`${String(totalTradesStats.maxDrawdown.toFixed(2))}`}
          description="Within safe limits"
          status="normal"
        />

        {/* <RiskCard
          title="Risk/Reward"
          icon={<Target className="h-5 w-5" />}
          value="1:2.5"
          description="Above target"
          status="success"
        /> */}
      </div>

      {/* Bottom Row - Additional Metrics */}
      <div className="grid lg:grid-cols-2 grid-cols-1 gap-6">
        <MetricsCard
          title="Position Sizing"
          icon={<BarChart2 className="h-5 w-5" />}
          metrics={[
            {
              label: "Avg Position Size",
              value: `${String(
                totalTradesStats.avgPositionSize.toFixed(2)
              )}lots`,
            },
            {
              label: "Margin Level",
              value: `${String(totalTradesStats.marginLevel.toFixed(2))}`,
            },
            {
              label: "Free Margin",
              value: `${String(totalTradesStats.freeMargin.toFixed(2))}`,
            },
            {
              label: "Margin Usage",
              value: `${String(totalTradesStats.marginUsage.toFixed(2))}`,
              highlight: true,
            },
            // { label: "Risk Per Trade", value: "1.2%" },
          ]}
        />

        <MetricsCard
          title="Risk Metrics"
          icon={<Target className="h-5 w-5" />}
          metrics={[
            {
              label: "Sharpe Ratio",
              value: `${String(totalTradesStats.sharpeRatio.toFixed(2))}`,
              highlight: true,
            },
            {
              label: "Sortino Ratio",
              value: `${String(totalTradesStats.sortinoRatio.toFixed(2))}`,
              highlight: true,
            },
            {
              label: "Win/Loss Ratio",
              value: `${String(totalTradesStats.winLossRatio.toFixed(2))}`,
            },
            {
              label: "Recovery Factor",
              value: `${String(totalTradesStats.recoveryFactor.toFixed(2))}`,
            },
            // { label: "Overall Rating", value: "Excellent", highlight: true },
          ]}
        />

        {/* <MetricsCard
          title="Exposure Analysis"
          icon={<Percent className="h-5 w-5" />}
          metrics={[
            { label: "Total Exposure", value: "32.5%" },
            { label: "Currency Exposure", value: "EUR (45%)" },
            { label: "Correlation Risk", value: "Low", highlight: true },
            { label: "Market Risk", value: "Moderate" },
            { label: "Risk Level", value: "Within Limits", highlight: true }
          ]}
        /> */}
      </div>
    </div>
  );
}
