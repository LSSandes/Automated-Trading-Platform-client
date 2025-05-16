import { useState, useEffect } from "react";
import { Bell, Filter, Search } from "lucide-react";
import { dispatch, useSelector } from "@/app/store";
import AlertsList from "@/components/AlertsList";
import { getAlerts, updateAlertView } from "@/app/reducers/alert";
import { useAtom } from "jotai";
import { userAtom } from "@/store/atoms";

export default function AlertsView() {
  const [user] = useAtom(userAtom);
  const [filterType, setFilterType] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const alerts = useSelector((state) => state.alert.alerts);
  useEffect(() => {
    user && dispatch(getAlerts(user?.email));
    user && dispatch(updateAlertView(user?.email));
  }, []);
  console.log("-----------alert2------------>", alerts);
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <Bell className="h-8 w-8 text-accent" />
          <div>
            <h1 className="text-3xl font-medium text-white tracking-tight">
              Alerts
            </h1>
            <p className="text-gray-400 mt-1">
              Monitor your trading signals and notifications
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Filter className="h-5 w-5 text-gray-400" />
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="bg-dark-200/30 text-gray-300 pl-3 pr-8 py-2 rounded-lg 
                       border border-dark-300/30 appearance-none cursor-pointer
                       focus:outline-none focus:ring-1 focus:ring-accent/50"
            >
              <option value="all">All Alerts</option>
              <option value="webhook">Webhook Signals</option>
              <option value="copy_trade">Copy Trades</option>
            </select>
          </div>
        </div>

        <div className="relative w-full sm:w-auto">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search alerts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full sm:w-64 pl-10 pr-4 py-2 bg-dark-200/30 text-gray-300 rounded-lg 
                     border border-dark-300/30 focus:outline-none focus:ring-1 
                     focus:ring-accent/50 transition-all duration-300"
          />
        </div>
      </div>
      <AlertsList alerts={alerts} expanded={true} />
    </div>
  );
}
