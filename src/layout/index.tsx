import SideMenu from "@/components/SideMenu";
import { useState, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import axios from "../utils/api";
import { UserParams } from "@/types/tradeLocker";
import { userAtom } from "@/store/atoms";
import { useAtom } from "jotai";
import { getAccounts } from "@/app/reducers/metaAccount";
import { getAlerts } from "@/app/reducers/alert";
import { dispatch } from "@/app/store";

export default function Layout() {
  const navigate = useNavigate();
  const [user] = useAtom(userAtom);
  const [menuCollapsed, setMenuCollapsed] = useState(false);
  const [activeView, setActiveView] = useState("landing");
  const location = useLocation();
  const currentPath = location.pathname;
  useEffect(() => {
    user && dispatch(getAccounts(user?.email));
    user && dispatch(getAlerts(user?.email));
  }, [user]);
  useEffect(() => {
    const jwtToken = localStorage.getItem("jwtToken");
    const whopToken = localStorage.getItem("whopToken");
    if ((!jwtToken || !whopToken) && currentPath != "/") {
      navigate("/");
    }
  }, [navigate, currentPath]);

  useEffect(() => {
    const fetchData = async () => {
      const refreshToken = localStorage.getItem("refreshToken");
      const tradelockerUser: UserParams | null = localStorage.getItem("user")
        ? JSON.parse(localStorage.getItem("user") as string)
        : null;
      if (refreshToken && tradelockerUser) {
        const response = await axios.post("tradelocker/refresh", {
          refreshToken,
          accountType: tradelockerUser.accountType,
        });
        localStorage.setItem("accessToken", response.data.data.newAccessToken);
        localStorage.setItem(
          "refreshToken",
          response.data.data.newRefreshToken
        );
      }
    };
    fetchData();
    const interval = setInterval(fetchData, 30 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="flex flex-col w-full h-screen">
      <Navbar />
      <div className="flex left-0 w-full h-full">
        <div className="lg:flex hidden h-full">
          {currentPath != "/" && currentPath != "/pricing" ? (
            <SideMenu
              activeView={activeView}
              onViewChange={setActiveView}
              isCollapsed={menuCollapsed}
              onCollapsedChange={setMenuCollapsed}
            />
          ) : null}
        </div>
        <div
          className={`flex-1 ${
            currentPath == "/" || currentPath == "/pricing"
              ? ""
              : "lg:p-10 py-6 px-3"
          } overflow-y-auto h-full`}
          style={{ height: "calc(100vh - 82px)" }}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
}
