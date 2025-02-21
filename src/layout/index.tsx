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
