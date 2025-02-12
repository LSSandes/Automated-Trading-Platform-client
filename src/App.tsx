import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingView from "./views/LandingView";
import DashboardView from "./views/DashboardView";
// import TradesView from "./views/TradesView";
import SignalsView from "./views/SignalsView";
// import AnalyticsView from "./views/AnalyticsView";
// import MarketsView from "./views/MarketsView";
// import AlertsView from "./views/AlertsView";
import MetaTraderView from "./views/MetaTraderView";
// import LeaderboardView from "./views/LeaderboardView";
// import TelegramView from "./views/TelegramView";
// import AdminView from "./views/AdminView";
import TestLoginView from "./views/TestLoginView";
import ChatWindow from "./components/ChatWindow";
import CheckoutModal from "./components/CheckoutModal";
import Layout from "./layout";
import SignupView from "./views/SignupView";
import SigninView from "./views/SigninView";
import ProfileSettingView from "./views/ProfileSettingView";
import { ToastContainer, Flip } from "react-toastify";

function App() {
  const [activeChats, setActiveChats] = useState<string[]>([]);
  const [copyingTraders, setCopyingTraders] = useState<string[]>([]);
  const [checkoutTrader, setCheckoutTrader] = useState<any>(null);
  const menuCollapsed: boolean = false;
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [activeView, setActiveView] = useState("landing");
  console.log(activeView);

  const handleCopyTrader = (
    traderId: string,
    name: string,
    profit: number,
    winRate: number,
    price: number
  ) => {
    if (copyingTraders.includes(traderId)) {
      setCopyingTraders((prev) => prev.filter((id) => id !== traderId));
    } else {
      const avatarUrl = `https://images.unsplash.com/photo-$
        {
          name === "Alex Trading" ? "1560250097-0b93528c311a" :
          name === "Pro Signals" ? "1573497019940-1c28c88b4f3e" :
          "1566492031773-4f4e44671857"
        }?auto=format&fit=crop&w=80&h=80`;

      setCheckoutTrader({ traderId, name, profit, winRate, price, avatarUrl });
    }
  };

  const handleSubscribe = () => {
    if (checkoutTrader) {
      // setCopyingTraders((prev) => [...prev, checkoutTrader.traderId]);
      setCheckoutTrader(null);
    }
  };

  const toggleChat = (traderId: string) => {
    setActiveChats((prev) =>
      prev.includes(traderId)
        ? prev.filter((id) => id !== traderId)
        : [...prev, traderId]
    );
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    // setActiveView("dashboard");
  };

  return (
    <Router>
      <div className="  bg-gradient-to-b bg-dark-100">
        <main
          className={`transition-all duration-300 w-full ${
            menuCollapsed ? "ml-20" : "ml-0"
          }`}
        >
          <div className="max-w-full mx-auto">
            <Routes>
              <Route path="/test-login" element={<TestLoginView />} />
              <Route path="/signup" element={<SignupView />} />
              <Route path="/signin" element={<SigninView />} />
              <Route path="/" element={<Layout />}>
                <Route
                  path="dashboard"
                  element={
                    <DashboardView
                      onCopyTrader={handleCopyTrader}
                      onChat={toggleChat}
                      copyingTraders={copyingTraders}
                      onViewChange={setActiveView}
                    />
                  }
                />
                <Route path="" element={<LandingView />} />
                {/* <Route path="trades" element={<TradesView />} /> */}
                <Route path="signals" element={<SignalsView />} />
                {/* <Route path="analytics" element={<AnalyticsView />} /> */}
                {/* <Route path="markets" element={<MarketsView />} /> */}
                {/* <Route path="alerts" element={<AlertsView />} /> */}
                <Route path="settings" element={<ProfileSettingView />} />
                <Route
                  path="metatrader"
                  element={
                    <MetaTraderView
                      onLogin={handleLogin}
                      isLoggedIn={isLoggedIn}
                    />
                  }
                />
                {/* <Route path="leaderboard" element={<LeaderboardView />} /> */}
                {/* <Route path="telegram" element={<TelegramView />} /> */}
                {/* <Route path="admin" element={<AdminView />} /> */}
                {/* <Route path="*" element={<LandingView />} /> */}
              </Route>
            </Routes>
          </div>
        </main>
        <div className="fixed bottom-4 right-4 flex flex-col space-y-4">
          {activeChats.map((traderId) => (
            <ChatWindow
              key={traderId}
              traderId={traderId}
              traderName={traderId}
              onMinimize={() => toggleChat(traderId)}
            />
          ))}
        </div>
        {checkoutTrader && (
          <CheckoutModal
            isOpen={true}
            onClose={() => setCheckoutTrader(null)}
            trader={checkoutTrader}
            onSubscribe={handleSubscribe}
          />
        )}
        <ToastContainer
          autoClose={3000}
          hideProgressBar={false}
          closeOnClick={false}
          pauseOnHover={true}
          draggable={true}
          theme="dark"
          transition={Flip}
        />
      </div>
    </Router>
  );
}

export default App;
