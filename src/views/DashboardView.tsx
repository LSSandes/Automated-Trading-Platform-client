import { Zap } from "lucide-react";
import QuickActions from "../components/QuickActions";
import { useNavigate } from "react-router-dom";
import ActiveTrades from "../components/dashboard/ActiveTrades";
import RecentAlerts from "../components/dashboard/RecentAlerts";
import AccountsOverview from "../components/dashboard/AccountsOverview";

interface DashboardViewProps {
  onChat: (traderId: string) => void;
  onViewChange: (view: string) => void;
}

export default function DashboardView({ onViewChange }: DashboardViewProps) {
  const introduction = [
    {
      title: "MAKE YOUR OWN BOTS",
      content:
        "with amazing built in features to help you turn your TradingView Alerts into profitable trades. Highly configurable and easy to manage. Works with all indicators and most prop firms, also tracks all account data so you can win more trades!",
      button: "Start Now",
    },
    {
      title: "SHARE YOUR BOTS",
      content:
        "Once you find a profitable system you can make it public and it will show on your profile for others to follow. You can also automate your tradingview alerts into telegram & discord & become a Signal provider just start looking for the perfect alerts!",
      button: "Coming soon",
    },
    {
      title: "COPY OTHER TRADERS",
      content:
        "Don't worry if you are new to trading with Automated Trader you can connect to traders around the world. Passive investing handsfree, just find a profitable trading solution that works for you. We show you all the users public data so you can know exactly what to expect when following a signal provider!",
      button: "Coming soon",
    },
    {
      title: "TOP OF THE LINE AFFILIATE PROGRAM",
      content:
        "Competitive commission rates, which can add up quickly if you have a large and engaged audience. With every scale made through your affiliate link, you will earn a percentage of the revenue, which can be a powerful way to monetize your website or social media presence",
      button: "Coming soon",
    },
  ];
  const navigate = useNavigate();
  return (
    <div className="space-y-8" style={{ height: "calc(100vh - 80px)" }}>
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-medium text-white tracking-tight">
            Dashboard
          </h1>
          <p className="text-gray-400 mt-1">
            Welcome back, your portfolio is up 23% this week
          </p>
        </div>
        <button
          className="premium-button flex items-center space-x-2 px-6 self-start lg:self-auto"
          onClick={() => navigate("/pricing")}
        >
          <Zap className="h-5 w-5" />
          <div>
            <span className="block text-sm">Upgrade to Pro</span>
            <span className="block text-xs opacity-80">
              Unlock Advanced Features
            </span>
          </div>
        </button>
      </div>
      <div className="grid xl:grid-cols-4 lg:grid-cols-2 grid-cols-1 gap-2">
        {introduction.map((item, index) => (
          <div
            key={index}
            className="flex flex-col justify-between items-start gap-2 bg-dark-200 p-4 rounded-lg"
          >
            <div className="flex justify-between items-center gap-2 ">
              <span className="bg-blue-500 rounded-lg px-[8px] py-[1px]">
                {index + 1}
              </span>
              <span className="text-white font-bold">{item.title}</span>
            </div>
            <div className="flex justify-start items-center">
              <span className="text-gray-400 font-bold text-sm">
                {item.content}
              </span>
            </div>
            <div className="flex justify-center items-center">
              <button className="text-blue-700 font-bold">{item.button}</button>
            </div>
          </div>
        ))}
      </div>
      <QuickActions
        onNewWebhook={() => /*setShowWebhookModal(true)*/ {}}
        onViewChange={onViewChange}
      />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div>
          <AccountsOverview />
        </div>
        <div>
          <ActiveTrades onViewChange={onViewChange} />
        </div>
        <div>
          <RecentAlerts />
        </div>
      </div>
    </div>
  );
}
