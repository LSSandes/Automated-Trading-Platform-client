import { useState } from "react";
import { AlertConfig } from "@/types/alert";
import { HiOutlineBellAlert } from "react-icons/hi2";

interface AlertsListProps {
  alerts: AlertConfig[];
  expanded: boolean;
}

export default function AlertsList({ alerts, expanded }: AlertsListProps) {
  const [visibleCount, setVisibleCount] = useState(10); // State to track how many alerts to show

  // Sort alerts by createdAt in descending order
  const sortedAlerts = [...alerts].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  // Slice the sorted alerts to show only the visibleCount
  const visibleAlerts = sortedAlerts.slice(0, visibleCount);

  const handleLoadMore = () => {
    setVisibleCount((prevCount) => Math.min(prevCount + 10, sortedAlerts.length)); // Ensure we don't exceed the total alerts
  };

  return (
    <>
      <div className="grid grid-cols-1 gap-4">
        {visibleAlerts.map((alert, index) => (
          <button
            key={index}
            className="w-full text-left glass-panel rounded-xl p-4 hover:bg-dark-200/30 transition-colors duration-300 outline-1 outline-dashed outline-dark-200 outline-offset-2"
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center justify-between w-full px-5">
                <div className="flex space-x-4 items-center">
                  <div className="p-2 bg-dark-200/50 rounded-lg">
                    <HiOutlineBellAlert className="h-5 w-5 text-accent" />
                  </div>
                  <div className="flex flex-col justify-center items-start">
                    <div className="flex justify-center items-center gap-5">
                      <h3
                        className={`${
                          alert.webhookMode == "basic"
                            ? "text-blue-500"
                            : "text-purple-500"
                        }  font-medium text-xl`}
                      >
                        {alert.webhookName}
                      </h3>
                    </div>
                    <div className="flex justify-start items-center gap-5">
                      <div
                        className={`${
                          alert.webhookMode == "basic"
                            ? "text-blue-500"
                            : "text-purple-500"
                        }  font-xs capitalize`}
                      >
                        {alert.webhookMode}
                      </div>
                      <div className="text-gray-400 font-xs">
                        {alert.volume} lot
                      </div>
                      <h5
                        className={`${
                          alert.webhookMode == "basic"
                            ? "text-blue-500"
                            : "text-purple-500"
                        }  font-medium text-sm`}
                      >
                        {alert.symbol}
                      </h5>
                    </div>
                  </div>
                  <div className="flex flex-col justify-center items-start gap-2">
                    <p className="text-gray-400 text-sm">{alert.messageData}</p>
                    <div className="flex justify-start items-start gap-1 flex-col">
                      <p className="text-gray-300 text-sm">
                        Metatrader:{" "}
                        {alert.positionId_m ? alert.positionId_m : "N/A"}
                      </p>
                      <p className="text-gray-300 text-sm">
                        Tradelocker:{" "}
                        {alert.positionId_t ? alert.positionId_t : "N/A"}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex  justify-center items-center gap-3">
                  <div className="text-red-500 flex justify-center items-center gap-2">
                    <span>{alert.positionId_m && "MetaTrader"}</span>
                    <span>{alert.positionId_t && "Tradelocker"}</span>
                  </div>
                  <div>
                    {alert.createdAt.replace("T", " ").substring(0, 19)}
                  </div>
                </div>
              </div>
            </div>
          </button>
        ))}

        {expanded && visibleCount < sortedAlerts.length && (
          <button
            onClick={handleLoadMore}
            className="glass-panel rounded-xl p-4 text-center text-accent hover:bg-dark-200/30 transition-colors duration-300"
          >
            Load More Alerts
          </button>
        )}
      </div>
    </>
  );
}