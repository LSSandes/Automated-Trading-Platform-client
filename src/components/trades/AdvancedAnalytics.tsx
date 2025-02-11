import React from 'react';
import { 
  Shield, AlertTriangle, Target, TrendingUp, Clock, 
  BarChart2, DollarSign, Percent, Users, Activity 
} from 'lucide-react';

const MetricsCard = ({ 
  title, 
  icon, 
  metrics 
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
          <span className={`font-medium ${
            metric.highlight ? 'text-accent' :
            metric.negative ? 'text-red-400' :
            'text-white'
          }`}>
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
  status = 'normal'
}: {
  title: string;
  icon: React.ReactNode;
  value: string;
  description: string;
  status?: 'normal' | 'warning' | 'success';
}) => (
  <div className="glass-panel rounded-xl p-6">
    <div className="flex items-center space-x-3 mb-4">
      <span className="text-accent">{icon}</span>
      <h3 className="text-lg font-medium text-white">{title}</h3>
    </div>
    <div className="space-y-2">
      <div className="text-3xl font-bold text-white">{value}</div>
      <div className={`text-sm ${
        status === 'warning' ? 'text-yellow-400' :
        status === 'success' ? 'text-emerald-400' :
        'text-gray-400'
      }`}>
        {description}
      </div>
    </div>
  </div>
);

export default function AdvancedAnalytics() {
  return (
    <div className="space-y-6">
      {/* Top Row - Key Metrics */}
      <div className="grid grid-cols-3 gap-6">
        <MetricsCard
          title="Trading Performance"
          icon={<Activity className="h-5 w-5" />}
          metrics={[
            { label: "Total Trades", value: "1,234" },
            { label: "Win Rate", value: "89.5%", highlight: true },
            { label: "Loss Rate", value: "10.5%", negative: true },
            { label: "Best Streak", value: "12 trades", highlight: true },
            { label: "Worst Streak", value: "3 trades", negative: true },
            { label: "Monthly Target", value: "85% achieved", highlight: true }
          ]}
        />

        <MetricsCard
          title="Profit Analysis"
          icon={<DollarSign className="h-5 w-5" />}
          metrics={[
            { label: "Total Profit", value: "$48,256.32", highlight: true },
            { label: "Average Profit", value: "$325.50", highlight: true },
            { label: "Best Trade", value: "$2,850.75", highlight: true },
            { label: "Worst Trade", value: "-$450.25", negative: true },
            { label: "Profit Factor", value: "2.8" },
            { label: "Monthly Growth", value: "+12.5%", highlight: true }
          ]}
        />

        <MetricsCard
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
        />
      </div>

      {/* Middle Row - Risk Cards */}
      <div className="grid grid-cols-3 gap-6">
        <RiskCard
          title="Risk Score"
          icon={<Shield className="h-5 w-5" />}
          value="Low"
          description="Based on last 100 trades"
          status="success"
        />

        <RiskCard
          title="Max Drawdown"
          icon={<AlertTriangle className="h-5 w-5" />}
          value="8.5%"
          description="Within safe limits"
          status="normal"
        />

        <RiskCard
          title="Risk/Reward"
          icon={<Target className="h-5 w-5" />}
          value="1:2.5"
          description="Above target"
          status="success"
        />
      </div>

      {/* Bottom Row - Additional Metrics */}
      <div className="grid grid-cols-3 gap-6">
        <MetricsCard
          title="Position Sizing"
          icon={<BarChart2 className="h-5 w-5" />}
          metrics={[
            { label: "Avg Position Size", value: "2.5 lots" },
            { label: "Max Position", value: "5.0 lots" },
            { label: "Margin Usage", value: "28.5%" },
            { label: "Free Margin", value: "$25,450", highlight: true },
            { label: "Risk Per Trade", value: "1.2%" }
          ]}
        />

        <MetricsCard
          title="Risk Metrics"
          icon={<Target className="h-5 w-5" />}
          metrics={[
            { label: "Sharpe Ratio", value: "2.1", highlight: true },
            { label: "Sortino Ratio", value: "2.8", highlight: true },
            { label: "Win/Loss Ratio", value: "2.5" },
            { label: "Recovery Factor", value: "3.2" },
            { label: "Overall Rating", value: "Excellent", highlight: true }
          ]}
        />

        <MetricsCard
          title="Exposure Analysis"
          icon={<Percent className="h-5 w-5" />}
          metrics={[
            { label: "Total Exposure", value: "32.5%" },
            { label: "Currency Exposure", value: "EUR (45%)" },
            { label: "Correlation Risk", value: "Low", highlight: true },
            { label: "Market Risk", value: "Moderate" },
            { label: "Risk Level", value: "Within Limits", highlight: true }
          ]}
        />
      </div>
    </div>
  );
}