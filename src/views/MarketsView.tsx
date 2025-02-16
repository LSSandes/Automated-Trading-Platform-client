// import { useState } from "react";
import { BarChart2 } from "lucide-react";
// import { Market } from "../types/market";
// import MarketStats from "../components/markets/MarketStats";
// import MarketFilters from "../components/markets/MarketFilters";
// import MarketTable from "../components/markets/MarketTable";
import MarketChart from "../components/markets/MarketChart";
// import axios from "axios";
// const markets: Market[] = [
//   {
//     symbol: "BTCUSD",
//     name: "Bitcoin",
//     price: 48256.32,
//     change: 2.5,
//     volume: 28.5e9,
//     marketCap: 928.4e9,
//     signal: "buy",
//     strength: 78,
//     volatility: 45,
//     trending: true,
//   },
//   {
//     symbol: "EURUSD",
//     name: "Euro / US Dollar",
//     price: 1.0956,
//     change: -0.15,
//     volume: 125.3e9,
//     signal: "sell",
//     strength: 65,
//     volatility: 25,
//   },
//   {
//     symbol: "XAUUSD",
//     name: "Gold",
//     price: 2023.5,
//     change: 0.85,
//     volume: 45.2e9,
//     signal: "buy",
//     strength: 82,
//     volatility: 35,
//     trending: true,
//   },
//   {
//     symbol: "NAS100",
//     name: "Nasdaq 100",
//     price: 17568.25,
//     change: 1.25,
//     volume: 85.7e9,
//     signal: "neutral",
//     strength: 58,
//     volatility: 40,
//   },
//   {
//     symbol: "ETHUSD",
//     name: "Ethereum",
//     price: 2856.75,
//     change: 3.2,
//     volume: 15.8e9,
//     marketCap: 328.5e9,
//     signal: "buy",
//     strength: 75,
//     volatility: 50,
//     trending: true,
//   },
// ];
export default function MarketsView () {
  // const [activeTab, setActiveTab] = useState("all");
  // // const [searchQuery, setSearchQuery] = useState("");
  // const [selectedMarket, setSelectedMarket] = useState<Market | null>(
  //   markets[0]
  // );
  // const [marketData, setMarketData] = useState<any>(null);
  // const filteredMarkets = markets.filter((market) => {
  //   const matchesSearch =
  //     market.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //     market.name.toLowerCase().includes(searchQuery.toLowerCase());
  //   const matchesTab =
  //     activeTab === "all" ||
  //     (activeTab === "crypto" && market.symbol.includes("USD")) ||
  //     (activeTab === "forex" && market.symbol.length === 6) ||
  //     (activeTab === "indices" && ["NAS100", "US30"].includes(market.symbol));
  //   return matchesSearch && matchesTab;
  // });
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
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

      {/* <MarketStats
        totalVolume={285.5}
        activeSignals={24}
        sentiment="Bullish"
        volatilityIndex={42.5}
      /> */}

      {/* <MarketFilters
        activeTab={activeTab}
        searchQuery={searchQuery}
        onTabChange={setActiveTab}
        onSearchChange={setSearchQuery}
      /> */}

      {/* <MarketTable
        markets={filteredMarkets}
        onSelectMarket={setSelectedMarket}
        onShowAutomation={(market) => {
          setSelectedMarket(market);
          setShowAutomation(true);
        }}
      /> */}


        <MarketChart
          // market={selectedMarket}
        />
    </div>
  );
}
