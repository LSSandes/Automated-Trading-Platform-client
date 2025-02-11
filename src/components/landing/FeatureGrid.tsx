import React from 'react';
import { 
  Cpu, Shield, Webhook, Users, BellRing, LineChart 
} from 'lucide-react';

const features = [
  {
    icon: <Cpu className="h-6 w-6" />,
    title: "AI-Powered Trading",
    description: "Our advanced ML algorithms analyze market patterns 24/7 for optimal trade execution"
  },
  {
    icon: <Shield className="h-6 w-6" />,
    title: "Enterprise Security",
    description: "Bank-grade encryption and advanced security measures protect your assets"
  },
  {
    icon: <Webhook className="h-6 w-6" />,
    title: "TradingView Integration",
    description: "Seamlessly connect your TradingView strategies via webhooks"
  },
  {
    icon: <Users className="h-6 w-6" />,
    title: "Copy Trading",
    description: "Follow and automatically copy top-performing traders"
  },
  {
    icon: <BellRing className="h-6 w-6" />,
    title: "Real-time Alerts",
    description: "Instant notifications for market movements and trade signals"
  },
  {
    icon: <LineChart className="h-6 w-6" />,
    title: "Advanced Analytics",
    description: "Comprehensive trading analytics and performance metrics"
  }
];

export default function FeatureGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {features.map((feature, index) => (
        <div 
          key={index}
          className="glass-panel glass-panel-hover rounded-xl p-8 
                   transform hover:scale-105 transition-all duration-300 
                   animate-on-scroll opacity-0"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <div className="flex items-center space-x-4 mb-4">
            <div className="p-3 bg-accent/10 rounded-lg text-accent">
              {feature.icon}
            </div>
            <h3 className="text-xl font-medium text-white">{feature.title}</h3>
          </div>
          <p className="text-gray-400">{feature.description}</p>
        </div>
      ))}
    </div>
  );
}