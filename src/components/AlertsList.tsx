// import { useState } from "react";
import {
  // AlertCircle,
  // CheckCircle2,
  // Clock,
  Webhook,
  Users,
  // TrendingUp,
  // TrendingDown,
  X,
  Edit3,
  PlayCircle,
} from "lucide-react";
// import TradeDetailsModal from "./TradeDetailsModal";
import { AlertParams } from "@/types";

interface AlertsListProps {
  alerts: AlertParams[];
  expanded: boolean;
}

export default function AlertsList({ alerts, expanded }: AlertsListProps) {
  // const [selectedTrade, setSelectedTrade] = useState<AlertParams | null>(null);

  // const getStatusIcon = (status: string) => {
  //   switch (status) {
  //     case "success":
  //       return <CheckCircle2 className="h-5 w-5 text-emerald-400" />;
  //     case "pending":
  //       return <Clock className="h-5 w-5 text-yellow-400" />;
  //     case "error":
  //       return <AlertCircle className="h-5 w-5 text-red-400" />;
  //     default:
  //       return null;
  //   }
  // };

  const getWebhookActionIcon = (action?: string) => {
    switch (action) {
      case "market_execution":
        return <PlayCircle className="h-4 w-4 text-emerald-400" />;
      case "modify_order":
        return <Edit3 className="h-4 w-4 text-yellow-400" />;
      case "close_trade":
        return <X className="h-4 w-4 text-red-400" />;
      default:
        return null;
    }
  };

  const getWebhookActionLabel = (action?: string) => {
    switch (action) {
      case "market_execution":
        return "Market Execution";
      case "modify_order":
        return "Modify Order";
      case "close_trade":
        return "Close Trade";
      default:
        return "";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "webhook":
        return <Webhook className="h-5 w-5 text-accent" />;
      case "copy_trade":
        return <Users className="h-5 w-5 text-purple-400" />;
      default:
        return null;
    }
  };



  return (
    <>
      <div className="grid grid-cols-1 gap-4">
        {alerts.map((alert) => (
          <button
            key={alert.id}
            // onClick={() => setSelectedTrade(alert)}
            className="w-full text-left glass-panel rounded-xl p-4 hover:bg-dark-200/30 transition-colors duration-300"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-4">
                <div className="p-2 bg-dark-200/50 rounded-lg">
                  {getTypeIcon(alert.orderDirection || "")}
                </div>
                <div>
                  <h3 className="text-white font-medium">
                    {alert.webhookName}
                  </h3>
                  {alert.webhookAction && (
                    <div className="flex items-center space-x-1.5 px-2 py-1 rounded-full bg-dark-200/50">
                      {getWebhookActionIcon(alert.webhookAction)}
                      <span className="text-xs text-gray-300">
                        {getWebhookActionLabel(alert.webhookAction)}
                      </span>
                    </div>
                  )}
                </div>
                <p className="text-gray-400 text-sm">{alert.message}</p>
              </div>
            </div>
          </button>
        ))}

        {expanded && (
          <button className="glass-panel rounded-xl p-4 text-center text-accent hover:bg-dark-200/30 transition-colors duration-300">
            Load More Alerts
          </button>
        )}
      </div>

      {/* {selectedTrade && (
        <TradeDetailsModal
          trade={selectedTrade}
          isOpen={true}
          onClose={() => setSelectedTrade(null)}
        />
      )} */}
    </>
  );
}
