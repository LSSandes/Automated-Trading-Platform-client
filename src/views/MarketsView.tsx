import { BarChart2 } from "lucide-react";
import MarketChart from "../components/markets/MarketChart";
export default function MarketsView() {
  return (
    <>
      <div className="flex justify-between items-center my-3">
        <div className="flex items-center space-x-3">
          <BarChart2 className="h-8 w-8 text-accent" />
          <div>
            <h1 className="text-3xl font-medium text-white tracking-tight">
              Markets
            </h1>
            <p className="text-gray-400 mt-1">
              Real-time market analysis and automation
            </p>
          </div>
        </div>
      </div>
      <MarketChart />
    </>
  );
}
