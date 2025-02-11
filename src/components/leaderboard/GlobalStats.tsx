import React from 'react';
import { BarChart2, Users, Target, Zap } from 'lucide-react';

const globalStats = [
  {
    title: "Total Volume",
    value: "$2.8B+",
    change: "+12.5%",
    icon: <BarChart2 className="h-5 w-5 text-accent" />
  },
  {
    title: "Active Traders",
    value: "1,245",
    change: "+8.3%",
    icon: <Users className="h-5 w-5 text-emerald-400" />
  },
  {
    title: "Success Rate",
    value: "85.2%",
    change: "+2.1%",
    icon: <Target className="h-5 w-5 text-purple-400" />
  },
  {
    title: "Copy Speed",
    value: "0.04s",
    change: "-15ms",
    icon: <Zap className="h-5 w-5 text-accent" />
  }
];

export default function GlobalStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {globalStats.map((stat, index) => (
        <div key={index} className="glass-panel rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              {stat.icon}
              <span className="text-gray-400">{stat.title}</span>
            </div>
            <div className={`text-xs ${
              stat.change.startsWith('+') ? 'text-emerald-400' : 'text-red-400'
            }`}>
              {stat.change}
            </div>
          </div>
          <div className="text-xl font-semibold text-white">{stat.value}</div>
        </div>
      ))}
    </div>
  );
}