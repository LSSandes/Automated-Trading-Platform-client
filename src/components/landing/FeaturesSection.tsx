import { useState } from "react";
import {
  Webhook,
  Users,
  TrendingUp,
  DollarSign,
  Star,
  ArrowRight,
  Clock,
  Check,
  Store,
  BarChart2,
  Coins,
} from "lucide-react";

const topTraders = [
  {
    name: "Alex Trading",
    avatar:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=80&h=80",
    profit: 32.5,
    winRate: 92,
    trades: 1234,
    followers: 892,
  },
  {
    name: "Pro Signals",
    avatar:
      "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=80&h=80",
    profit: 28.7,
    winRate: 88,
    trades: 856,
    followers: 654,
  },
  {
    name: "Master Trader",
    avatar:
      "https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&w=80&h=80",
    profit: 45.2,
    winRate: 95,
    trades: 2341,
    followers: 1243,
  },
];

const webhookExamples = [
  {
    name: "GOLD Strategy",
    symbol: "XAUUSD",
    type: "buy",
    profit: 1250.5,
    time: "2 minutes ago",
    success: true,
  },
  {
    name: "Crypto Signals",
    symbol: "BTCUSD",
    type: "sell",
    profit: 890.25,
    time: "5 minutes ago",
    success: true,
  },
  {
    name: "Forex Master",
    symbol: "EURUSD",
    type: "buy",
    profit: 450.75,
    time: "8 minutes ago",
    success: true,
  },
];

const topSellingWebhooks = [
  {
    name: "Gold Scalper Pro",
    creator: "Alex Trading",
    avatar:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=80&h=80",
    price: 49.99,
    subscribers: 1234,
    rating: 4.9,
    monthlyRevenue: 12450,
    winRate: 92,
  },
  {
    name: "Crypto Momentum",
    creator: "Pro Signals",
    avatar:
      "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=80&h=80",
    price: 39.99,
    subscribers: 856,
    rating: 4.8,
    monthlyRevenue: 8890,
    winRate: 88,
  },
  {
    name: "Forex Elite",
    creator: "Master Trader",
    avatar:
      "https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&w=80&h=80",
    price: 59.99,
    subscribers: 2341,
    rating: 4.95,
    monthlyRevenue: 15680,
    winRate: 95,
  },
];

export default function FeaturesSection() {
  const [activeTab, setActiveTab] = useState<
    "webhooks" | "copyTrading" | "marketplace"
  >("webhooks");

  return (
    <div className="py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">
            Everything You Need to Trade Like a Pro
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Our platform combines advanced technology with an intuitive
            interface to give you the ultimate trading experience
          </p>
        </div>

        {/* Feature Tabs */}
        <div className="flex justify-center mb-12">
          <div className="flex rounded-lg bg-dark-200/30 p-1">
            <button
              onClick={() => setActiveTab("webhooks")}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition-all ${
                activeTab === "webhooks"
                  ? "bg-accent text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              <Webhook className="h-5 w-5" />
              <span>Webhook Automation</span>
            </button>
            <button
              onClick={() => setActiveTab("copyTrading")}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition-all ${
                activeTab === "copyTrading"
                  ? "bg-accent text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              <Users className="h-5 w-5" />
              <span>Copy Trading</span>
            </button>
            <button
              onClick={() => setActiveTab("marketplace")}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition-all ${
                activeTab === "marketplace"
                  ? "bg-accent text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              <Store className="h-5 w-5" />
              <span>Sell Your Signals</span>
            </button>
          </div>
        </div>

        {/* Feature Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Left Panel - Feature Description */}
          <div className="glass-panel rounded-xl p-8">
            {activeTab === "webhooks" && (
              <>
                <div className="flex items-center space-x-3 mb-6">
                  <div className="p-3 bg-accent/10 rounded-lg">
                    <Webhook className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">
                      Webhook Automation
                    </h3>
                    <p className="text-gray-400">
                      Turn TradingView alerts into automated trades
                    </p>
                  </div>
                </div>

                <div className="space-y-6 mb-8">
                  {webhookExamples.map((webhook, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 bg-dark-200/30 rounded-lg"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="p-2 bg-accent/10 rounded-lg">
                          <Webhook className="h-5 w-5 text-accent" />
                        </div>
                        <div>
                          <div className="text-white font-medium">
                            {webhook.name}
                          </div>
                          <div className="flex items-center space-x-2 text-sm">
                            <span className="text-gray-400">
                              {webhook.symbol}
                            </span>
                            <span
                              className={`px-2 py-0.5 rounded-full text-xs ${
                                webhook.type === "buy"
                                  ? "bg-emerald-500/20 text-emerald-400"
                                  : "bg-red-500/20 text-red-400"
                              }`}
                            >
                              {webhook.type.toUpperCase()}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-emerald-400 font-medium">
                          +${webhook.profit.toLocaleString()}
                        </div>
                        <div className="text-gray-400 text-sm">
                          {webhook.time}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <button className="premium-button w-full flex items-center justify-center">
                  Create Webhook
                  <ArrowRight className="ml-2 h-5 w-5" />
                </button>
              </>
            )}

            {activeTab === "copyTrading" && (
              <>
                <div className="flex items-center space-x-3 mb-6">
                  <div className="p-3 bg-accent/10 rounded-lg">
                    <Users className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">
                      Copy Trading
                    </h3>
                    <p className="text-gray-400">
                      Follow top traders and copy their success
                    </p>
                  </div>
                </div>

                <div className="space-y-6 mb-8">
                  {topTraders.map((trader, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 bg-dark-200/30 rounded-lg"
                    >
                      <div className="flex items-center space-x-4">
                        <img
                          src={trader.avatar}
                          alt={trader.name}
                          className="w-12 h-12 rounded-full border-2 border-accent/20"
                        />
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="text-white font-medium">
                              {trader.name}
                            </span>
                            <div className="flex items-center space-x-1 text-yellow-400">
                              <Star className="h-4 w-4 fill-current" />
                              <span className="text-sm">{trader.winRate}%</span>
                            </div>
                          </div>
                          <div className="flex items-center space-x-3 text-sm text-gray-400">
                            <span>{trader.trades.toLocaleString()} trades</span>
                            <span>
                              {trader.followers.toLocaleString()} followers
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-emerald-400 font-medium">
                        +{trader.profit}%
                      </div>
                    </div>
                  ))}
                </div>

                <button className="premium-button w-full flex items-center justify-center">
                  Start Copy Trading
                  <ArrowRight className="ml-2 h-5 w-5" />
                </button>
              </>
            )}

            {activeTab === "marketplace" && (
              <>
                <div className="flex items-center space-x-3 mb-6">
                  <div className="p-3 bg-accent/10 rounded-lg">
                    <Store className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">
                      Signal Marketplace
                    </h3>
                    <p className="text-gray-400">
                      Turn your strategies into passive income
                    </p>
                  </div>
                </div>

                <div className="space-y-6 mb-8">
                  {topSellingWebhooks.map((webhook, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 bg-dark-200/30 rounded-lg"
                    >
                      <div className="flex items-center space-x-4">
                        <img
                          src={webhook.avatar}
                          alt={webhook.creator}
                          className="w-12 h-12 rounded-full border-2 border-accent/20"
                        />
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="text-white font-medium">
                              {webhook.name}
                            </span>
                            <div className="flex items-center space-x-1 text-yellow-400">
                              <Star className="h-4 w-4 fill-current" />
                              <span className="text-sm">{webhook.rating}</span>
                            </div>
                          </div>
                          <div className="flex items-center space-x-3 text-sm text-gray-400">
                            <span>${webhook.price}/mo</span>
                            <span>
                              {webhook.subscribers.toLocaleString()} subscribers
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-emerald-400 font-medium">
                        ${webhook.monthlyRevenue.toLocaleString()}
                        <div className="text-xs text-gray-400">
                          Monthly Revenue
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <button className="premium-button w-full flex items-center justify-center">
                  Start Selling Signals
                  <ArrowRight className="ml-2 h-5 w-5" />
                </button>
              </>
            )}
          </div>

          {/* Right Panel - Stats & Benefits */}
          <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-2 gap-4">
              {activeTab === "webhooks" ? (
                <>
                  <div className="glass-panel rounded-xl p-6">
                    <div className="flex items-center space-x-3 mb-2">
                      <Clock className="h-5 w-5 text-accent" />
                      <div className="text-2xl font-bold text-white">0.04s</div>
                    </div>
                    <div className="text-gray-400">Average execution time</div>
                  </div>
                  <div className="glass-panel rounded-xl p-6">
                    <div className="flex items-center space-x-3 mb-2">
                      <TrendingUp className="h-5 w-5 text-emerald-400" />
                      <div className="text-2xl font-bold text-white">92.3%</div>
                    </div>
                    <div className="text-gray-400">Success rate</div>
                  </div>
                </>
              ) : activeTab === "copyTrading" ? (
                <>
                  <div className="glass-panel rounded-xl p-6">
                    <div className="flex items-center space-x-3 mb-2">
                      <Users className="h-5 w-5 text-accent" />
                      <div className="text-2xl font-bold text-white">50K+</div>
                    </div>
                    <div className="text-gray-400">Active traders</div>
                  </div>
                  <div className="glass-panel rounded-xl p-6">
                    <div className="flex items-center space-x-3 mb-2">
                      <DollarSign className="h-5 w-5 text-emerald-400" />
                      <div className="text-2xl font-bold text-white">
                        $2.8B+
                      </div>
                    </div>
                    <div className="text-gray-400">Monthly volume</div>
                  </div>
                </>
              ) : (
                <>
                  <div className="glass-panel rounded-xl p-6">
                    <div className="flex items-center space-x-3 mb-2">
                      <Coins className="h-5 w-5 text-accent" />
                      <div className="text-2xl font-bold text-white">
                        $1.2M+
                      </div>
                    </div>
                    <div className="text-gray-400">
                      Monthly marketplace volume
                    </div>
                  </div>
                  <div className="glass-panel rounded-xl p-6">
                    <div className="flex items-center space-x-3 mb-2">
                      <BarChart2 className="h-5 w-5 text-emerald-400" />
                      <div className="text-2xl font-bold text-white">15K+</div>
                    </div>
                    <div className="text-gray-400">Active subscribers</div>
                  </div>
                </>
              )}
            </div>

            {/* Benefits List */}
            <div className="glass-panel rounded-xl p-6">
              <h4 className="text-lg font-medium text-white mb-4">
                {activeTab === "webhooks"
                  ? "Webhook Benefits"
                  : activeTab === "copyTrading"
                  ? "Copy Trading Benefits"
                  : "Marketplace Benefits"}
              </h4>
              <div className="space-y-4">
                {(activeTab === "webhooks"
                  ? [
                      "Instant trade execution from TradingView alerts",
                      "Advanced risk management and position sizing",
                      "Support for multiple exchanges and brokers",
                      "Real-time performance tracking",
                      "Customizable trade parameters",
                      "24/7 automated trading",
                    ]
                  : activeTab === "copyTrading"
                  ? [
                      "Follow multiple traders simultaneously",
                      "Automatic position sizing and risk management",
                      "Real-time trade copying with ultra-low latency",
                      "Advanced trader performance analytics",
                      "Customizable copy settings per trader",
                      "Stop-loss and take-profit protection",
                    ]
                  : [
                      "Turn your trading strategies into passive income",
                      "Built-in subscription management system",
                      "Detailed analytics and subscriber insights",
                      "Automated payouts and invoicing",
                      "Customizable pricing and subscription tiers",
                      "Protection against unauthorized sharing",
                    ]
                ).map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="p-1 bg-accent/10 rounded-lg">
                      <Check className="h-4 w-4 text-accent" />
                    </div>
                    <span className="text-gray-300">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
