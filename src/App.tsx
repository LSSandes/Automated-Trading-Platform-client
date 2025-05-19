import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingView from "./views/LandingView";
import DashboardView from "./views/DashboardView";
import TradesView from "./views/TradesView";
import SignalsView from "./views/SignalsView";
import MarketsView from "./views/MarketsView";
import AlertsView from "./views/AlertsView";
import MetaTraderView from "./views/MetaTraderView";
import TradeLockerView from "./views/TradeLockerView";
// import LeaderboardView from "./views/LeaderboardView";
import ChatWindow from "./components/ChatWindow";
import Layout from "./layout";
// import SignupView from "./views/SignupView";
// import SigninView from "./views/SigninView";
import ProfileSettingView from "./views/ProfileSettingView";
import { ToastContainer, Flip } from "react-toastify";
import WhopCallbackView from "./views/WhopCallbackView";
import PricingView from "./views/PricingView";
import ActTraderView from "./views/ActTraderView";

function App() {
  const [activeChats, setActiveChats] = useState<string[]>([]);
  const menuCollapsed: boolean = false;
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [activeView, setActiveView] = useState("landing");
  console.log(activeView);

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
      <div className="bg-gradient-to-b bg-dark-100">
        <main
          className={`transition-all duration-300 w-full ${
            menuCollapsed ? "ml-20" : "ml-0"
          }`}
        >
          <div className="max-w-full mx-auto">
            <Routes>
              {/* <Route path="/signup" element={<SignupView />} /> */}
              {/* <Route path="/login" element={<SigninView />} /> */}
              <Route path="/callback/whop" element={<WhopCallbackView />} />
              <Route path="/" element={<Layout />}>
                <Route
                  path="dashboard"
                  element={
                    <DashboardView
                      onChat={toggleChat}
                      onViewChange={setActiveView}
                    />
                  }
                />
                <Route path="" element={<LandingView />} />
                <Route path="/pricing" element={<PricingView />} />
                <Route path="trades" element={<TradesView />} />
                <Route path="signals" element={<SignalsView />} />
                <Route path="markets" element={<MarketsView />} />
                <Route path="alerts" element={<AlertsView />} />
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
                <Route path="tradelocker" element={<TradeLockerView />} />
                <Route path="acttrader" element={<ActTraderView />} />
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
