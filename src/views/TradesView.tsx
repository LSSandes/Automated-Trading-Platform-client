import { useState } from "react";
import { Plus /*Brain*/ } from "lucide-react";
import { GrOverview } from "react-icons/gr";
// import TradeStats from '../components/trades/TradeStats';
// import TradesCalendar from '../components/trades/TradesCalendar';
import TradesTable from "../components/trades/TradesTable";
import AIInsights from "../components/trades/AIInsights";
// import LiveTradesPanel from '../components/trades/LiveTradesPanel';
import AdvancedAnalytics from "../components/trades/AdvancedAnalytics";
import TradeFilters from "../components/trades/TradeFilters";
import { useAtom } from "jotai";
import { selectedAccountAtom, selectedAccountTypeAtom } from "@/store/atoms";

// const liveTrades = [
//   {
//     id: '1',
//     tradeBy: 'YT GOLD1',
//     app: 'Metatrader',
//     symbol: 'XAUUSD',
//     type: 'sell' as 'sell',
//     lot: 0.55,
//     openPrice: 2687.59,
//     currentPrice: 2685.26,
//     time: '2024 11 08 18:51:01',
//     profit: 251.91
//   },
//   {
//     id: '2',
//     tradeBy: 'YT GOLD1',
//     app: 'Metatrader',
//     symbol: 'XAUUSD',
//     type: 'sell' as 'sell',
//     lot: 0.14,
//     openPrice: 2698.97,
//     currentPrice: 2685.26,
//     time: '2024 11 08 17:20:07',
//     profit: 769.11
//   }
// ];

export default function TradesView() {
  const [activeTab, setActiveTab] = useState<
    "overview" | "advanced" | "ai" | "journal"
  >("overview");
  const [selectedAccount] = useAtom(selectedAccountAtom);
  const [selectedAccountType] = useAtom(selectedAccountTypeAtom);
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-medium text-white tracking-tight">
            Trades
          </h2>
          <p className="text-gray-400 mt-1">
            View and analyze your trading history
          </p>
        </div>
        <button className="premium-button flex items-center outline-1 outline-dashed outline-blue-500 outline-offset-2 rounded-lg">
          <Plus className="h-5 w-5 mr-2" />
          Open Trade
        </button>
      </div>

      {/* Tabs */}
      <div className="border-b border-dark-300/30">
        <div className="flex space-x-8">
          {[
            { id: "overview", label: "Overview", icon: <GrOverview className="w-5 h-5"/> },
            // { id: 'advanced', label: 'Advanced Analytics', icon: null },
            // { id: 'ai', label: 'AI Insights', icon: <Brain className="h-4 w-4" /> },
            // { id: 'journal', label: 'Trading Journal', icon: null }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`pb-2 relative flex items-center justify-center space-x-2 ${
                activeTab === tab.id
                  ? "text-white border-b-2 border-solid border-blue-500"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Filters Bar */}
      <TradeFilters />

      {/* Live Trades */}
      {/* <LiveTradesPanel trades={liveTrades} /> */}

      {/* Content based on active tab */}
      {activeTab === "overview" && (
        <>
          {/* <TradeStats /> */}
          {/* <TradesCalendar /> */}
          <TradesTable
            account={selectedAccount}
            accountType={selectedAccountType}
          />
        </>
      )}

      {activeTab === "advanced" && <AdvancedAnalytics />}

      {activeTab === "ai" && <AIInsights />}

      {activeTab === "journal" && (
        <div className="glass-panel rounded-xl p-6">
          <h2 className="text-lg font-medium text-white mb-4">
            Trading Journal
          </h2>
          {/* Add trading journal content */}
        </div>
      )}
    </div>
  );
}
