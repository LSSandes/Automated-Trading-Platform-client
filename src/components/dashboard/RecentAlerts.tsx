import React from 'react';
import { Bell, CheckCircle2, Clock, AlertTriangle } from 'lucide-react';

const alerts = [
  {
    id: 1,
    title: "EURUSD Buy Signal",
    message: "Buy order executed at 1.0950",
    time: "2 minutes ago",
    status: "success"
  },
  {
    id: 2,
    title: "Risk Warning",
    message: "Daily loss limit approaching",
    time: "15 minutes ago",
    status: "warning"
  },
  {
    id: 3,
    title: "XAUUSD Take Profit",
    message: "Take profit hit at 2025.50",
    time: "1 hour ago",
    status: "success"
  }
];

export default function RecentAlerts() {
  return (
    <div className="glass-panel rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-medium text-white">Recent Alerts</h2>
        <div className="text-sm text-gray-400">Last 24h</div>
      </div>

      <div className="space-y-4">
        {alerts.map((alert) => (
          <div 
            key={alert.id}
            className="glass-panel rounded-lg p-4 hover:bg-dark-200/30 transition-colors"
          >
            <div className="flex items-start space-x-3">
              <div className={`p-2 rounded-lg ${
                alert.status === 'success'
                  ? 'bg-emerald-500/10'
                  : 'bg-yellow-500/10'
              }`}>
                {alert.status === 'success' ? (
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                ) : (
                  <AlertTriangle className="h-4 w-4 text-yellow-400" />
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div className="text-white font-medium">{alert.title}</div>
                  <div className="flex items-center text-gray-400 text-sm">
                    <Clock className="h-3 w-3 mr-1" />
                    <span>{alert.time}</span>
                  </div>
                </div>
                <div className="text-sm text-gray-400 mt-1">{alert.message}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button className="w-full mt-4 px-4 py-2 border border-accent/30 text-accent rounded-lg
                       hover:bg-accent/10 transition-all duration-300">
        View All Alerts
      </button>
    </div>
  );
}