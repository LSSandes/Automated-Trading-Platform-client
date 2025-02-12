import { DollarSign, TrendingUp, Users, Clock } from 'lucide-react';

const stats = [
  {
    icon: <DollarSign className="h-5 w-5 text-accent" />,
    label: "Total Volume",
    value: "$2.8B+",
    change: "+12.5%"
  },
  {
    icon: <TrendingUp className="h-5 w-5 text-emerald-400" />,
    label: "Success Rate",
    value: "92.3%",
    change: "+5.2%"
  },
  {
    icon: <Users className="h-5 w-5 text-purple-400" />,
    label: "Active Users",
    value: "50K+",
    change: "+8.7%"
  },
  {
    icon: <Clock className="h-5 w-5 text-accent" />,
    label: "Avg Response",
    value: "0.04s",
    change: "-15ms"
  }
];

export default function StatsGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <div 
          key={index}
          className="glass-panel rounded-xl p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-dark-200/50 rounded-lg">
                {stat.icon}
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-400">{stat.label}</h3>
                <p className="text-2xl font-semibold text-white">{stat.value}</p>
              </div>
            </div>
            <div className="text-emerald-400 text-sm font-medium">{stat.change}</div>
          </div>
          <div className="h-2 bg-dark-200 rounded-full overflow-hidden">
            <div className="h-full w-3/4 bg-gradient-to-r from-accent to-accent-dark rounded-full" />
          </div>
        </div>
      ))}
    </div>
  );
}