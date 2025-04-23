import { /*CheckCircle2,*/ Clock, /*AlertTriangle*/ } from "lucide-react";
import { useSelector } from "@/app/store";
import { useEffect, useState } from "react";
import { AlertConfig } from "@/types/alert";

export default function RecentAlerts() {
  const alerts = useSelector((state) => state.alert.alerts);
  const [filteredAlerts, setFilteredAlerts] = useState<AlertConfig[]>([]);
  useEffect(() => {
    const fetchAlerts = async () => {
      if (alerts.length > 0) {
        await filterAlerts(alerts);
      }
    };
    fetchAlerts();
  }, [alerts]);
  const filterAlerts = async (alerts: AlertConfig[]) => {
    const date = new Date();
    const formattedDate = `${date.getFullYear()}-${String(
      date.getMonth() + 1
    ).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
    if (alerts.length > 0) {
      const filteredAlerts = alerts.filter((alert) =>
        alert.tradeStartTime.includes(formattedDate)
      );
      setFilteredAlerts(filteredAlerts);
    }
  };
  return (
    <div className="glass-panel rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-medium text-white">Recent Alerts</h2>
        <div className="text-sm text-gray-400">Last 24h</div>
      </div>

      <div className="space-y-4 max-h-[300px] overflow-y-auto">
        {filteredAlerts.map((alert, index) => (
          <div
            key={index}
            className="glass-panel rounded-lg p-4 hover:bg-dark-200/30 transition-colors"
          >
            <div className="flex items-start space-x-3">
              {/* <div
                className={`p-2 rounded-lg ${
                  alert.status === "success"
                    ? "bg-emerald-500/10"
                    : "bg-yellow-500/10"
                }`}
              >
                {alert.status === "success" ? (
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                ) : (
                  <AlertTriangle className="h-4 w-4 text-yellow-400" />
                )}
              </div> */}
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div className="text-white font-medium">
                    {alert.webhookName}
                  </div>
                  <div className="flex items-center text-gray-400 text-sm">
                    <Clock className="h-3 w-3 mr-1" />
                    <span>{alert.tradeStartTime}</span>
                  </div>
                </div>
                <div className="text-sm text-gray-400 mt-1">
                  {alert.messageData}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        className="w-full mt-4 px-4 py-2 border border-accent/30 text-accent rounded-lg
                       hover:bg-accent/10 transition-all duration-300"
      >
        View All Alerts
      </button>
    </div>
  );
}
