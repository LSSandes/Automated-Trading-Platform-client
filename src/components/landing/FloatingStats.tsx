import { DollarSign, Users, Globe, Laptop } from 'lucide-react';

const stats = [
  {
    icon: <DollarSign className="h-8 w-8 text-accent mx-auto mb-4" />,
    value: "$2.8B+",
    label: "Trading Volume"
  },
  {
    icon: <Users className="h-8 w-8 text-accent mx-auto mb-4" />,
    value: "50K+",
    label: "Active Traders"
  },
  {
    icon: <Globe className="h-8 w-8 text-accent mx-auto mb-4" />,
    value: "30+",
    label: "Supported Exchanges"
  },
  {
    icon: <Laptop className="h-8 w-8 text-accent mx-auto mb-4" />,
    value: "99.9%",
    label: "Uptime"
  }
];

export default function FloatingStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
      {stats.map((stat, index) => (
        <div 
          key={index}
          className="glass-panel rounded-xl p-6 text-center transform 
                   hover:scale-105 transition-all duration-300"
        >
          {stat.icon}
          <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
          <div className="text-gray-400">{stat.label}</div>
        </div>
      ))}
    </div>
  );
}