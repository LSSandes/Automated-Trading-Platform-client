import SideMenu from "@/components/SideMenu";
import { useState, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Layout() {
  const navigate = useNavigate();
  const [menuCollapsed, setMenuCollapsed] = useState(false);
  const [activeView, setActiveView] = useState("landing");
  const location = useLocation(); // Get the current location
  const currentPath = location.pathname; // Extract the current path
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token && currentPath != "/") {
      navigate("/login"); // Redirect to login page if no token
    }
  }, [navigate, currentPath]);
  return (
    <div className="relative flex flex-col w-full ">
      <Navbar />
      <div className="absolute flex left-0 top-[100px] w-full">
        {currentPath != "/" && (
          <SideMenu
            activeView={activeView}
            onViewChange={setActiveView}
            isCollapsed={menuCollapsed}
            onCollapsedChange={setMenuCollapsed}
          />
        )}
        <div
          className={`flex-1 ${currentPath == "/" ? "" : "p-10"} ${
            currentPath != "/" ? "absolute right-0" : ""
          } ${!menuCollapsed ? "w-[83%]" : "w-[95%]"} overflow-y-auto`}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
}
