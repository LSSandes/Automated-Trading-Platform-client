import { BarChart2, TrendingUp, Clock, DollarSign, Target, Shield } from 'lucide-react';

export default function QuickStats() {
  const stats = [
    {
      title: "Total Trades",
      value: "1,234",
      change: "+12.5%",
      icon: <BarChart2 className="h-5 w-5 text-accent" />
    },
    {
      title: "Win Rate",
      value: "89.5%",
      change: "+2.3%",
      icon: <Target className="h-5 w-5 text-emerald-400" />
    },
    {
      title: "Avg Trade Time",
      value: "2h 15m",
      change: "-15m",
      icon: <Clock className="h-5 w-5 text-purple-400" />
    },
    {
      title: "Total Profit",
      value: "$48,256",
      change: "+18.2%",
      icon: <DollarSign className="h-5 w-5 text-accent" />
    },
    {
      title: "Success Rate",
      value: "92.3%",
      change: "+5.2%",
      icon: <TrendingUp className="h-5 w-5 text-emerald-400" />
    },
    {
      title: "Risk Score",
      value: "Low",
      change: "Stable",
      icon: <Shield className="h-5 w-5 text-accent" />
    }
  ];

  return (
    <div className="grid grid-cols-3 gap-4">
      {stats.map((stat, index) => (
        <div key={index} className="glass-panel rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="p-2 bg-dark-200/50 rounded-lg">
              {stat.icon}
            </div>
            <div className="text-emerald-400 text-sm">{stat.change}</div>
          </div>
          <div className="mt-2">
            <div className="text-2xl font-semibold text-white">{stat.value}</div>
            <div className="text-sm text-gray-400">{stat.title}</div>
          </div>
        </div>
      ))}
    </div>
  );
}