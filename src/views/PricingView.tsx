import React, { useEffect, useState } from "react";
import {
  CheckIcon,
  ShieldIcon,
  SparklesIcon,
  TrendingUpIcon,
  RocketIcon,
  StarIcon,
} from "lucide-react";
import { PricingTier, TradingPlatform } from "../types/pricing";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAtom } from "jotai";
import { userAtom } from "@/store/atoms";
import axios from "@/utils/api";
import { env } from "@/config/env";
// import { toast } from "react-toastify";

const PricingPage: React.FC = () => {
  const upcomingPlatforms = [
    { name: "TradeStation", icon: "📉" },
    { name: "NinjaTrader", icon: "🎯" },
    { name: "cTrader", icon: "🌐" },
    { name: "Coinbase", icon: "₿" },
    { name: "Binance", icon: "🔶" },
    { name: "Interactive Brokers", icon: "🏛️" },
    { name: "Kraken", icon: "🐙" },
    { name: "Bitfinex", icon: "📈" },
    { name: "KuCoin", icon: "🌟" },
  ];

  const tradingPlatforms: TradingPlatform[] = [
    {
      id: "tradingview",
      name: "TradingView",
      icon: "📊",
      description: "Seamless TradingView webhook integration",
      status: "available",
    },
    {
      id: "hankox",
      name: "Hankox ActTrader",
      icon: "💹",
      description: "Professional multi-broker solution",
      status: "available",
    },
    {
      id: "metatrader",
      name: "MetaTrader 4 & 5",
      icon: "📈",
      description: "Industry standard MT4/MT5 platforms",
      status: "available",
    },
    {
      id: "tradelocker",
      name: "TradeLocker",
      icon: "🔒",
      description: "Professional trading platform integration",
      status: "available",
    },
  ];

  const pricingTiers: PricingTier[] = [
    {
      id: "basic",
      name: "Basic",
      price: 29,
      description: "1 Webhook - Perfect for a single strategy",
      buttonText: "Get Started",
      features: [
        { text: "1 Webhook Connection", included: true },
        { text: "1 Trading Account Included", included: true },
        { text: "Market Order Support", included: true },
        { text: "Stop Loss & Take Profit", included: true },
        { text: "Position Management", included: true },
        { text: "Basic Alert Templates", included: true },
        { text: "Email Support", included: true },
        { text: "Real-time Execution", included: true },
      ],
      additionalAccountPrice: 19,
    },
    {
      id: "premium",
      name: "Premium",
      price: 59,
      description: "3 Webhooks - Run multiple strategies",
      buttonText: "Get Started",
      features: [
        { text: "3 Webhook Connections", included: true },
        { text: "1 Trading Account Included", included: true },
        { text: "Multiple Take-Profit Levels", included: true },
        { text: "Smart Position Distribution", included: true },
        { text: "Dynamic Trailing Stop-Loss", included: true },
        { text: "Priority Support", included: true },
        { text: "Advanced Templates", included: true },
        { text: "Custom Alert Builder", included: true },
      ],
      additionalAccountPrice: 19,
    },
    {
      id: "advanced",
      name: "Advanced",
      price: 99,
      description: "10 Webhooks - For power users & copy trading",
      buttonText: "Get Started",
      features: [
        { text: "10 Webhook Connections", included: true },
        { text: "1 Trading Account Included", included: true },
        { text: "Copy Trading Features", included: true },
        { text: "Multi-Account Distribution", included: true },
        { text: "Advanced Risk Management", included: true },
        { text: "VIP Support", included: true },
        { text: "Strategy Consultation", included: true },
        { text: "Custom Integration Options", included: true },
      ],
      additionalAccountPrice: 19,
    },
    {
      id: "lifetime",
      name: "Lifetime Partner",
      price: 2999,
      description: "Unlimited access forever with premium benefits",
      buttonText: "Become a Partner",
      isLifetime: true,
      features: [
        { text: "Unlimited Webhook Connections", included: true },
        { text: "Unlimited Hankox Trading Accounts", included: true },
        { text: "Additional Platform Accounts $4.99/mo", included: true },
        { text: "Priority Feature Access", included: true },
        { text: "Dedicated Support Manager", included: true },
        { text: "1-on-1 Expert Setup Call", included: true },
        { text: "Custom Integration Development", included: true },
        { text: "Never Pay Full Price Again", included: true },
      ],
    },
  ];
  const [user] = useAtom(userAtom);
  const [searchParams] = useSearchParams();
  const roleParam = searchParams.get("role");
  const accountCountParam = searchParams.get("accountCount");
  const [selectedTier, setSelectedTier] = useState<PricingTier>(
    pricingTiers[1]
  );
  const [accountCount, setAccountCount] = useState<number>(1);
  const [hoveredPlatform, setHoveredPlatform] = useState<string | null>(null);
  const navigate = useNavigate();
  const calculateTotalPrice = () => {
    if (selectedTier.isLifetime) {
      return {
        oneTime: selectedTier.price,
        monthly: 0,
      };
    }
    const basePrice = selectedTier.price;
    const additionalAccounts = accountCount - 1;
    const additionalCost =
      additionalAccounts * (selectedTier.additionalAccountPrice || 0);
    return {
      oneTime: 0,
      monthly: Number((basePrice + additionalCost).toFixed(2)),
    };
  };
  useEffect(() => {
    const checkPayment = async () => {
      if (roleParam && accountCountParam) {
        console.log("searchParam------->", roleParam, accountCountParam);
        const whopToken = localStorage.getItem("whopToken");
        if (!whopToken) return;
        const product_id = await defineProductId(roleParam);
        console.log("product ID, whopToken------->", product_id, whopToken);
        const resCheckPayment = await axios.post("payment/check", {
          product_id,
          whopToken,
        });

        console.log("Payment check successful");
        if (resCheckPayment.data.data.access == true) {
          await axios.post("payment/update", {
            email: user?.email,
            role: roleParam,
            accountCount: Number(accountCountParam),
            product_id,
          });
        }
      }
    };
    checkPayment();
  }, [roleParam, accountCountParam]);
  const prices = calculateTotalPrice();
  const handleGetStartedClick = async () => {
    console.log(
      "Get Started button clicked------>",
      selectedTier.name,
      "accountCount------->",
      accountCount,
      "user email------->",
      user?.email
    );
    await redirectWhopPageFunc(selectedTier.name, accountCount);
  };
  const redirectWhopPageFunc = async (name: string, accountCount: number) => {
    if (name == "Basic") {
      if (accountCount == 1) {
        window.location.href = `https://whop.com/checkout/${env.BASIC_PLAN_1}?d2c=true`;
      } else if (accountCount == 2) {
        window.location.href = `https://whop.com/checkout/${env.BASIC_PLAN_2}?d2c=true`;
      } else if (accountCount == 3) {
        window.location.href = `https://whop.com/checkout/${env.BASIC_PLAN_3}?d2c=true`;
      } else if (accountCount == 4) {
        window.location.href = `https://whop.com/checkout/${env.BASIC_PLAN_4}?d2c=true`;
      } else if (accountCount == 5) {
        window.location.href = `https://whop.com/checkout/${env.BASIC_PLAN_5}?d2c=true`;
      } else if (accountCount == 6) {
        window.location.href = `https://whop.com/checkout/${env.BASIC_PLAN_6}?d2c=true`;
      } else if (accountCount == 7) {
        window.location.href = `https://whop.com/checkout/${env.BASIC_PLAN_7}?d2c=true`;
      } else if (accountCount == 8) {
        window.location.href = `https://whop.com/checkout/${env.BASIC_PLAN_8}?d2c=true`;
      } else if (accountCount == 9) {
        window.location.href = `https://whop.com/checkout/${env.BASIC_PLAN_9}?d2c=true`;
      } else if (accountCount == 10) {
        window.location.href = `https://whop.com/checkout/${env.BASIC_PLAN_10}?d2c=true`;
      } else {
        window.location.href = `https://whop.com/checkout/${env.BASIC_PLAN_11}?d2c=true`;
      }
    } else if (name == "Premium") {
      if (accountCount == 1) {
        window.location.href = `https://whop.com/checkout/${env.PREMIUM_PLAN_1}?d2c=true`;
      } else if (accountCount == 2) {
        window.location.href = `https://whop.com/checkout/${env.PREMIUM_PLAN_2}?d2c=true`;
      } else if (accountCount == 3) {
        window.location.href = `https://whop.com/checkout/${env.PREMIUM_PLAN_3}?d2c=true`;
      } else if (accountCount == 4) {
        window.location.href = `https://whop.com/checkout/${env.PREMIUM_PLAN_4}?d2c=true`;
      } else if (accountCount == 5) {
        window.location.href = `https://whop.com/checkout/${env.PREMIUM_PLAN_5}?d2c=true`;
      } else if (accountCount == 6) {
        window.location.href = `https://whop.com/checkout/${env.PREMIUM_PLAN_6}?d2c=true`;
      } else if (accountCount == 7) {
        window.location.href = `https://whop.com/checkout/${env.PREMIUM_PLAN_7}?d2c=true`;
      } else if (accountCount == 8) {
        window.location.href = `https://whop.com/checkout/${env.PREMIUM_PLAN_8}?d2c=true`;
      } else if (accountCount == 9) {
        window.location.href = `https://whop.com/checkout/${env.PREMIUM_PLAN_9}?d2c=true`;
      } else if (accountCount == 10) {
        window.location.href = `https://whop.com/checkout/${env.PREMIUM_PLAN_10}?d2c=true`;
      } else {
        window.location.href = `https://whop.com/checkout/${env.PREMIUM_PLAN_11}?d2c=true`;
      }
    } else if (name == "Advanced") {
      if (accountCount == 1) {
        window.location.href = `https://whop.com/checkout/${env.ADVANCED_PLAN_1}?d2c=true`;
      } else if (accountCount == 2) {
        window.location.href = `https://whop.com/checkout/${env.ADVANCED_PLAN_2}?d2c=true`;
      } else if (accountCount == 3) {
        window.location.href = `https://whop.com/checkout/${env.ADVANCED_PLAN_3}?d2c=true`;
      } else if (accountCount == 4) {
        window.location.href = `https://whop.com/checkout/${env.ADVANCED_PLAN_4}?d2c=true`;
      } else if (accountCount == 5) {
        window.location.href = `https://whop.com/checkout/${env.ADVANCED_PLAN_5}?d2c=true`;
      } else if (accountCount == 6) {
        window.location.href = `https://whop.com/checkout/${env.ADVANCED_PLAN_6}?d2c=true`;
      } else if (accountCount == 7) {
        window.location.href = `https://whop.com/checkout/${env.ADVANCED_PLAN_7}?d2c=true`;
      } else if (accountCount == 8) {
        window.location.href = `https://whop.com/checkout/${env.ADVANCED_PLAN_8}?d2c=true`;
      } else if (accountCount == 9) {
        window.location.href = `https://whop.com/checkout/${env.ADVANCED_PLAN_9}?d2c=true`;
      } else if (accountCount == 10) {
        window.location.href = `https://whop.com/checkout/${env.ADVANCED_PLAN_10}?d2c=true`;
      } else {
        window.location.href = `https://whop.com/checkout/${env.ADVANCED_PLAN_11}?d2c=true`;
      }
    } else if (name == "Lifetime Partner" && accountCount == 1) {
      window.location.href = `https://whop.com/checkout/${env.LIFETIME_PLAN_1}?d2c=true`;
    }
  };
  const defineProductId = async (name: string) => {
    if (name == "Basic") {
      return env.BASIC_PLAN_ID;
    } else if (name == "Premium") {
      return env.PREMIUM_PLAN_ID;
    } else if (name == "Advanced") {
      return env.ADVANCED_PLAN_ID;
    } else if (name == "Lifetime Partner") {
      return env.LIFETIME_PLAN_ID;
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-black to-slate-900 text-white py-8 px-4 md:py-16">
      <div className="max-w-[1200px] mx-auto">
        {/* Social Proof Banner */}
        <div className="bg-blue-500/10 border border-blue-500/20 rounded-full py-2 px-4 mb-12 max-w-fit mx-auto">
          <div className="flex items-center gap-2 text-sm md:text-base">
            <StarIcon className="w-4 h-4 text-yellow-400" />
            <span className="text-blue-400">
              Trusted by 50,000+ traders worldwide
            </span>
          </div>
        </div>

        <div className="text-center mb-12">
          <div className="inline-flex items-center bg-green-500/10 rounded-full p-1 pr-4 mb-6">
            <span className="bg-green-500 text-white text-xs px-3 py-1 rounded-full mr-2">
              Limited Time
            </span>
            <span className="text-green-400 text-sm">
              Save 20% on Lifetime plan
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Automate Your Trading.
            <br />
            <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              10x Your Results.
            </span>
          </h1>

          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-8">
            Join thousands of profitable traders who use our platform to
            automate their
            <span className="text-blue-400"> TradingView</span> strategies 24/7.
          </p>

          {/* Key Benefits */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto mb-12">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <div className="bg-blue-500/20 p-3 rounded-xl w-fit mx-auto mb-4">
                <RocketIcon className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Lightning Fast</h3>
              <p className="text-gray-400">Execute trades in 0.04 seconds</p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <div className="bg-purple-500/20 p-3 rounded-xl w-fit mx-auto mb-4">
                <TrendingUpIcon className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-lg font-semibold mb-2">24/7 Trading</h3>
              <p className="text-gray-400">Never miss a trading opportunity</p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <div className="bg-pink-500/20 p-3 rounded-xl w-fit mx-auto mb-4">
                <ShieldIcon className="w-6 h-6 text-pink-400" />
              </div>
              <h3 className="text-lg font-semibold mb-2">
                Bank-Grade Security
              </h3>
              <p className="text-gray-400">Your funds are always protected</p>
            </div>
          </div>
        </div>

        {/* Pricing Tier Selection */}
        <div className="flex justify-center mb-8">
          <div className="bg-white/5 backdrop-blur-sm p-1.5 rounded-xl flex flex-wrap justify-center gap-2">
            {pricingTiers.map((tier) => (
              <button
                key={tier.id}
                onClick={() => {
                  setSelectedTier(tier);
                  setAccountCount(1);
                }}
                className={`px-4 md:px-6 py-3 rounded-lg transition-all duration-300 flex items-center gap-2 ${
                  selectedTier.id === tier.id
                    ? "bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white scale-105"
                    : "text-gray-400 hover:text-white hover:bg-white/10"
                }`}
              >
                {tier.isLifetime && <SparklesIcon className="w-4 h-4" />}
                <div className="text-left">
                  <div className="font-semibold">{tier.name}</div>
                  <div className="text-xs opacity-80">
                    ${tier.price}
                    {tier.isLifetime ? " one-time" : "/mo"}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Main Pricing Card */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-xl border border-white/10">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  {selectedTier.isLifetime && (
                    <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs px-3 py-1 rounded-full flex items-center gap-1">
                      <SparklesIcon className="w-3 h-3" />
                      BEST VALUE
                    </div>
                  )}
                </div>

                <h2 className="text-2xl md:text-3xl font-bold mb-3 flex items-center gap-2">
                  {selectedTier.name}
                  {selectedTier.isLifetime && (
                    <div className="bg-green-500/20 text-green-400 text-xs px-2 py-1 rounded-full ml-2">
                      Save 20%
                    </div>
                  )}
                </h2>
                <p className="text-gray-400 text-lg mb-4">
                  {selectedTier.description}
                </p>

                <div className="flex items-baseline gap-2 mb-6">
                  <span className="text-4xl md:text-5xl font-bold">
                    $
                    {prices.oneTime > 0
                      ? prices.oneTime.toLocaleString()
                      : prices.monthly}
                  </span>
                  <span className="text-gray-400 text-xl">
                    {prices.oneTime > 0 ? "one-time" : "/month"}
                  </span>
                </div>
                <div className="flex lg:flex-row flex-col items-center gap-2 mb-4">
                  <button
                    className="w-full md:w-auto bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:opacity-90 text-white px-8 py-4 rounded-xl font-medium transition-all duration-300 text-lg mb-4"
                    onClick={handleGetStartedClick}
                  >
                    {selectedTier.buttonText} →
                  </button>
                  <button
                    className="w-full md:w-auto bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 hover:opacity-90 text-white px-8 py-4 rounded-xl font-medium transition-all duration-300 text-lg mb-4"
                    onClick={() => navigate("/dashboard")}
                  >
                    Go to Dashboard →
                  </button>
                </div>

                <p className="text-sm text-gray-400">
                  30-day money-back guarantee • Cancel anytime • No hidden fees
                </p>
              </div>

              <div className="md:w-[300px] bg-black/30 rounded-xl p-6 border border-white/10">
                <h3 className="font-semibold mb-4">What's included:</h3>
                <div className="space-y-3">
                  {selectedTier.features.map((feature, index) => (
                    <div key={index} className="flex items-start">
                      <CheckIcon className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-300">
                        {feature.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Account Selection */}
            {!selectedTier.isLifetime && (
              <div className="bg-black/30 rounded-xl p-6 mb-8">
                <h3 className="text-xl font-semibold mb-4">Trading Accounts</h3>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="text-sm text-gray-400 mb-1">
                      Number of Accounts
                    </div>
                    <div className="text-2xl font-semibold">{accountCount}</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() =>
                        accountCount > 1 && setAccountCount(accountCount - 1)
                      }
                      className="w-10 h-10 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                      disabled={accountCount === 1}
                    >
                      -
                    </button>
                    <span className="w-12 text-center text-xl font-semibold">
                      {accountCount}
                    </span>
                    <button
                      onClick={() =>
                        accountCount < 10 && setAccountCount(accountCount + 1)
                      }
                      className={`w-10 h-10 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors ${
                        accountCount >= 10
                          ? "opacity-50 cursor-not-allowed"
                          : ""
                      }`}
                      disabled={accountCount >= 10}
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="text-sm text-gray-400">
                  First account included
                  {accountCount > 1 && (
                    <>
                      , +${(accountCount - 1) * 19}/mo for {accountCount - 1}{" "}
                      additional{" "}
                      {accountCount - 1 === 1 ? "account" : "accounts"}
                    </>
                  )}
                </div>
              </div>
            )}

            {/* Supported Platforms */}
            <div>
              <h3 className="text-xl font-semibold mb-4">
                Supported Platforms
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {tradingPlatforms.map((platform) => (
                  <div
                    key={platform.id}
                    className="bg-black/30 rounded-xl p-4 border border-white/10 hover:border-white/20 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">{platform.icon}</div>
                      <div>
                        <div className="font-medium">{platform.name}</div>
                        <div className="text-sm text-gray-400">
                          {platform.description}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Coming Soon Platforms */}
                <div className="relative">
                  <div
                    className="bg-black/30 rounded-xl p-4 border border-white/10 hover:border-white/20 transition-colors cursor-pointer"
                    onMouseEnter={() => setHoveredPlatform("upcoming")}
                    onMouseLeave={() => setHoveredPlatform(null)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="text-2xl">🚀</div>
                        <div>
                          <div className="font-medium">
                            More Platforms Coming Soon
                          </div>
                          <div className="text-sm text-gray-400">
                            {upcomingPlatforms.length}+ new integrations in
                            development
                          </div>
                        </div>
                      </div>
                      <div className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-xs font-medium">
                        Coming Soon
                      </div>
                    </div>
                  </div>

                  {hoveredPlatform === "upcoming" && (
                    <div className="absolute bottom-full left-0 right-0 mb-2 bg-black/90 backdrop-blur-sm rounded-xl p-4 shadow-xl border border-white/10 z-10">
                      <div className="grid grid-cols-2 gap-2">
                        {upcomingPlatforms.map((platform, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-2 p-2 rounded-lg hover:bg-white/5 transition-colors"
                          >
                            <span className="text-xl">{platform.icon}</span>
                            <span className="text-sm text-gray-200">
                              {platform.name}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* How it Works Section */}
        <div className="max-w-4xl mx-auto mt-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              How It Works
            </h2>
            <p className="text-gray-400 text-lg">
              Get started in minutes with three simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <div className="bg-blue-500/20 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-blue-400">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Connect Your Account
              </h3>
              <p className="text-gray-400">
                Link your TradingView account and set up your preferred trading
                platform.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <div className="bg-purple-500/20 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-purple-400">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Configure Alerts</h3>
              <p className="text-gray-400">
                Set up your TradingView alerts using our pre-made templates or
                create custom ones.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <div className="bg-pink-500/20 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-pink-400">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Start Trading</h3>
              <p className="text-gray-400">
                Your trades will be automatically executed 24/7 based on your
                strategy alerts.
              </p>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-4xl mx-auto mt-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-400 text-lg">
              Everything you need to know about our platform
            </p>
          </div>

          <div className="space-y-4">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <h3 className="text-xl font-semibold mb-2">
                What trading platforms do you support?
              </h3>
              <p className="text-gray-400">
                We support major platforms including TradingView, MetaTrader
                4/5, and our proprietary Hankox ActTrader. We're constantly
                adding new integrations based on user demand.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <h3 className="text-xl font-semibold mb-2">
                How fast are the trade executions?
              </h3>
              <p className="text-gray-400">
                Our average execution time is 0.04 seconds from receiving the
                alert to placing the trade, ensuring you never miss a trading
                opportunity.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <h3 className="text-xl font-semibold mb-2">
                Is my trading data secure?
              </h3>
              <p className="text-gray-400">
                Yes, we use bank-grade encryption and security measures to
                protect your data and trading accounts. We never store your
                trading platform passwords.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <h3 className="text-xl font-semibold mb-2">
                Can I try before I buy?
              </h3>
              <p className="text-gray-400">
                Yes! We offer a 30-day money-back guarantee on all plans. You
                can test all features risk-free and get a full refund if you're
                not satisfied.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <h3 className="text-xl font-semibold mb-2">
                What happens if I need help?
              </h3>
              <p className="text-gray-400">
                Our support team is available 24/7. Premium and Advanced plans
                include priority support, while Lifetime partners get a
                dedicated support manager.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <h3 className="text-xl font-semibold mb-2">
                Can I cancel my subscription?
              </h3>
              <p className="text-gray-400">
                Yes, you can cancel your subscription at any time with no
                questions asked. We'll stop billing you for the next period.
              </p>
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <div className="max-w-4xl mx-auto mt-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Automate Your Trading?
          </h2>
          <p className="text-gray-400 text-lg mb-8">
            Join 50,000+ traders who trust our platform for reliable, fast, and
            secure automated trading.
          </p>
          <button className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:opacity-90 text-white px-8 py-4 rounded-xl font-medium transition-all duration-300 text-lg">
            Get Started Now →
          </button>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;
