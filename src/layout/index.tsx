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
import { useWhop } from "@/context/WhopContext";

export default function Layout() {
  const navigate = useNavigate();
  const [user] = useAtom(userAtom);
  const { hasAccess } = useWhop();
  const [menuCollapsed, setMenuCollapsed] = useState(false);
  const [activeView, setActiveView] = useState("landing");
  const location = useLocation(); // Get the current location
  const currentPath = location.pathname; // Extract the current path
  useEffect(() => {
    user && dispatch(getAccounts(user?.email));
    user && dispatch(getAlerts(user?.email));
  }, [user]);

  console.log("has==========>", hasAccess);

  useEffect(() => {
    const jwtToken = localStorage.getItem("jwtToken");
    if (
      (!jwtToken && currentPath != "/") ||
      (currentPath != "/" && hasAccess == false)
    ) {
      navigate("/"); // Redirect to login page if no token
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
          {currentPath != "/" && (
            <SideMenu
              activeView={activeView}
              onViewChange={setActiveView}
              isCollapsed={menuCollapsed}
              onCollapsedChange={setMenuCollapsed}
            />
          )}
        </div>
        <div
          className={`flex-1 ${
            currentPath == "/" ? "" : "lg:p-10 py-6 px-3"
          } overflow-y-auto h-full`}
          style={{ height: "calc(100vh - 82px)" }}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
}
