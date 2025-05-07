import { useState, useEffect } from "react";
import { Award, Star, Shield, Clock, ChevronRight } from "lucide-react";
import { useWhop } from "@/context/whopContext";
import DemoModal from "./DemoModal";
const tradingStats = [
  { value: "$2.8B+", label: "Trading Volume", change: "+12.5% this month" },
  { value: "0.04s", label: "Execution Speed", change: "Industry leading" },
  { value: "50K+", label: "Active Traders", change: "+8.3% this month" },
  { value: "99.9%", label: "Uptime", change: "Enterprise grade" },
];

const liveUpdates = [
  {
    profit: 1250.5,
    trader: "Alex Trading",
    time: "2 minutes ago",
    type: "buy",
  },
  {
    profit: 890.25,
    trader: "Pro Signals",
    time: "5 minutes ago",
    type: "sell",
  },
  {
    profit: 450.75,
    trader: "Master Trader",
    time: "8 minutes ago",
    type: "buy",
  },
];

export default function HeroSection() {
  const { isAuthenticated } = useWhop();
  const [showDemo, setShowDemo] = useState(false);
  const [currentUpdate, setCurrentUpdate] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentUpdate((prev) => (prev + 1) % liveUpdates.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);
  const handleGetAccess = async () => {
    const whopCheckoutLink =
      "https://whop.com/checkout/plan_k3Qm1nWejXxDa?d2c=true";
    window.location.href = whopCheckoutLink;
  };
  console.log("-0------------->", isAuthenticated);
  return (
    <div className="relative min-h-[90vh] flex items-center">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-dark/95 via-dark/80 to-dark"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(0,122,255,0.15),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(124,58,237,0.15),transparent_50%)]"></div>
        <div className="absolute top-20 left-1/4 w-72 h-72 bg-accent/30 rounded-full blur-[128px] animate-pulse"></div>
        <div className="absolute bottom-20 right-1/4 w-72 h-72 bg-purple-500/30 rounded-full blur-[128px] animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-20">
        {/* Top Badge */}
        <div className="flex justify-center mb-8 animate-fade-in-up">
          <div
            className="inline-flex items-center px-4 py-2 rounded-full bg-accent/10 text-accent
                        border border-accent/20 backdrop-blur-sm"
          >
            <Award className="h-4 w-4 mr-2" />
            <span className="text-sm">
              Ranked #1 Trading Automation Platform
            </span>
          </div>
        </div>

        {/* Main Heading */}
        <div
          className="text-center mb-12 animate-fade-in-up"
          style={{ animationDelay: "200ms" }}
        >
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight leading-tight">
            Trade Smarter with
            <br />
            <span
              className="bg-gradient-to-r from-accent via-purple-500 to-accent 
                           bg-clip-text text-transparent animate-gradient-x"
            >
              AI-Powered Automation
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Connect TradingView to automated execution in 5 minutes. Join
            50,000+ traders achieving{" "}
            <span className="text-emerald-400 font-semibold">
              312% higher returns
            </span>{" "}
            with our advanced platform.
          </p>
        </div>

        {/* CTA Buttons */}
        <div
          className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 mb-16
                      animate-fade-in-up"
          style={{ animationDelay: "400ms" }}
        >
          <button
            className="w-full sm:w-auto group px-8 py-4 bg-accent hover:bg-accent-dark text-white rounded-xl
                         flex items-center justify-center space-x-2 transition-all duration-300
                         transform hover:translate-y-[-2px] hover:shadow-xl hover:shadow-accent/20"
            onClick={handleGetAccess}
          >
            <span className="text-lg font-medium">Start Free Trial</span>
            <ChevronRight className="h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={() => setShowDemo(true)}
            className="w-full sm:w-auto px-8 py-4 border-2 border-accent/30 text-accent rounded-xl
                     hover:bg-accent/10 transition-all duration-300 text-lg font-medium
                     transform hover:translate-y-[-2px]"
          >
            Watch Demo
          </button>
        </div>

        {/* Live Updates */}
        <div
          className="max-w-lg mx-auto mb-16 animate-fade-in-up"
          style={{ animationDelay: "600ms" }}
        >
          <div className="glass-panel rounded-xl p-4 border border-accent/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                <span className="text-emerald-400">Live Updates</span>
              </div>
              <span className="text-gray-400">
                {liveUpdates[currentUpdate].time}
              </span>
            </div>
            <div className="mt-2">
              <div className="flex items-center justify-between">
                <span className="text-white">
                  {liveUpdates[currentUpdate].trader}
                </span>
                <span className="text-emerald-400">
                  +${liveUpdates[currentUpdate].profit}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-fade-in-up"
          style={{ animationDelay: "800ms" }}
        >
          {tradingStats.map((stat, index) => (
            <div
              key={index}
              className="glass-panel rounded-xl p-6 text-center
                                    transform hover:scale-105 transition-all duration-300"
            >
              <div className="text-3xl font-bold text-white mb-2">
                {stat.value}
              </div>
              <div className="text-gray-400 text-sm">{stat.label}</div>
              <div className="text-xs text-accent mt-2">{stat.change}</div>
            </div>
          ))}
        </div>

        {/* Trust Indicators */}
        <div
          className="flex flex-wrap justify-center items-center gap-8 mt-16 text-sm text-gray-400
                      animate-fade-in-up"
          style={{ animationDelay: "1000ms" }}
        >
          <div className="flex items-center space-x-2">
            <Star className="h-5 w-5 text-yellow-400" />
            <span>4.9/5 Rating (10K+ Reviews)</span>
          </div>
          <div className="flex items-center space-x-2">
            <Shield className="h-5 w-5 text-emerald-400" />
            <span>Bank-Grade Security</span>
          </div>
          <div className="flex items-center space-x-2">
            <Clock className="h-5 w-5 text-accent" />
            <span>5-Min Setup</span>
          </div>
        </div>
      </div>

      <DemoModal isOpen={showDemo} onClose={() => setShowDemo(false)} />
    </div>
  );
}
