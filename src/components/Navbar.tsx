import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserMenu from "./UserMenu";
import { jwtDecode } from "jwt-decode";
import { userAtom } from "@/store/atoms";
import { useSetAtom, useAtom } from "jotai";
import { io } from "socket.io-client";
import { dispatch, useSelector } from "@/app/store";
import { addAlert, updateAlert } from "@/app/reducers/alert";
import axios from "axios";
import { env } from "@/config/env";
import SideMenu_M from "./SideMenu_M";
import WHOP_LOGO from "@/assets/whop_logo.png";
import logo from "@/assets/dark-logo.png";
import m_logo from "@/assets/m-dark-logo.png";
import { Bell, LogIn } from "lucide-react";
import { FaCircleChevronRight, FaCircleChevronLeft } from "react-icons/fa6";

export default function Navbar() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const handleLogo = () => {
    navigate("/");
  };
  const [jwtToken, setJwtToken] = useState<string>("");
  const setUserInfoGlobal = useSetAtom(userAtom);
  const [userInfoGlobal] = useAtom(userAtom);
  const [openSideMenu, setOpenSideMenu] = useState<boolean>(false);
  const alerts = useSelector((state) => state.alert.alerts);
  const unviewedAlerts = alerts.filter((alert) => alert.view === false);
  useEffect(() => {
    const asyncFn = async () => {
      const jwtToken = localStorage.getItem("jwtToken") || "";
      if (jwtToken) {
        setJwtToken(jwtToken);
        setUserInfoGlobal(jwtDecode(jwtToken));
      }
    };
    asyncFn();
  }, []);
  useEffect(() => {
    const asyncFn = async () => {
      if (userInfoGlobal) {
        axios
          .post(`${env.BASE_URL}/profile/get`, { email: userInfoGlobal?.email })
          .then((res) => {
            setUserInfoGlobal(res.data.data.user);
          });
      }
    };
    asyncFn();
  }, []);

  //--------------alert socket-------------------//
  const socket = io(env.AVATAR_URL);
  useEffect(() => {
    const handleNewAlert = (newAlert: string) => {
      dispatch(addAlert({ newAlert }));
    };
    const handleUpdatedAlert = (updatedAlert: string) => {
      dispatch(updateAlert({ updatedAlert }));
    };
    socket.on(`${userInfoGlobal?.email}_new`, handleNewAlert);
    socket.on(`${userInfoGlobal?.email}_update`, handleUpdatedAlert);
    return () => {
      socket.off(`${userInfoGlobal?.email}_new`, handleNewAlert);
      socket.off(`${userInfoGlobal?.email}_update`, handleUpdatedAlert);
    };
  }, []);
  // ----------------------------------//

  const getFirstLetterUppercase = (str: string) => {
    if (str.length === 0) return "";
    return str.charAt(0).toUpperCase();
  };
  const handleOpenSideMenu = () => {
    setOpenSideMenu(!openSideMenu);
  };
  const handleLoginByWhop = () => {
    const whopCheckoutLink = `https://whop.com/oauth?client_id=${env.CLINET_ID}&redirect_uri=${env.REDIRECT_URL}`;
    window.location.href = whopCheckoutLink;
  };
  console.log("------navbar picture--------", userInfoGlobal?.picture);
  return (
    <nav className="w-full bg-dark/80 backdrop-blur-xl border-b border-dark-300/50 z-50 py-5 lg:px-16 px-10">
      <div className="flex items-center justify-between h-10 w-full">
        <div
          className="lg:flex items-center cursor-pointer hidden"
          onClick={handleLogo}
        >
          <img src={logo} alt="" className="max-w-52 min-w-52 h-auto" />
        </div>
        <div className="lg:hidden flex items-center cursor-pointer">
          <img src={m_logo} alt="" className="max-w-8 min-w-8 h-auto" />
        </div>

        <div className="flex items-center space-x-4">
          <button className="p-2 text-gray-400 hover:text-white hover:bg-dark-200/50 rounded-lg transition-all duration-300 relative">
            <Bell className="h-5 w-5" />
            {unviewedAlerts.length ? (
              <span className="px-2 py-1 text-xs bg-red-500 text-white rounded-full absolute top-0 -right-2">
                {unviewedAlerts.length}
              </span>
            ) : (
              <></>
            )}
          </button>
          {jwtToken != "" ? (
            <button
              onClick={() => setIsMenuOpen(true)}
              className="flex items-center space-x-2 p-1.5 text-gray-400 
                       hover:text-white hover:bg-dark-200/50 rounded-lg 
                       transition-all duration-300"
            >
              {userInfoGlobal?.picture !== undefined ? (
                <img
                  src={`${
                    userInfoGlobal?.picture.includes("uploads")
                      ? env.AVATAR_URL + userInfoGlobal.picture
                      : userInfoGlobal?.picture
                  }`}
                  alt=""
                  referrerPolicy="no-referrer"
                  className="w-10 h-10 rounded-full border border-accent/50"
                />
              ) : (
                <div className="w-10 h-10 rounded-full border border-accent/50  text-3xl">
                  {getFirstLetterUppercase(userInfoGlobal?.email || "")}
                </div>
              )}
            </button>
          ) : (
            <>
              <div className="lg:flex justify-center items-center gap-4 hidden">
                <button
                  className="w-full sm:w-auto px-3 py-3 border-2 border-accent/30 text-accent rounded-xl
                     hover:bg-accent/10 transition-all duration-300 text-sm font-medium
                     transform hover:translate-y-[-2px] flex justify-center items-center gap-2"
                  onClick={handleLoginByWhop}
                >
                  <span className="text-sm font-medium">Login By Whop</span>
                  <LogIn className="h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
              <div className="flex justify-center items-center gap-4 lg:hidden">
                <button
                  className="rounded-full border border-white p-1"
                  onClick={handleLoginByWhop}
                >
                  <img
                    src={WHOP_LOGO}
                    alt=""
                    className="w-5 h-5 rounded-full"
                  />
                </button>
              </div>
            </>
          )}
        </div>
      </div>
      <div className="absolute left-0 -bottom-4 flex lg:hidden">
        {!openSideMenu && (
          <button
            className="bg-dark-50 rounded-full border border-dark-400"
            onClick={handleOpenSideMenu}
          >
            <FaCircleChevronRight className="w-6 h-6 m-1" />
          </button>
        )}
        {openSideMenu && (
          <button
            className="bg-dark-50 rounded-full border border-dark-400"
            onClick={handleOpenSideMenu}
          >
            <FaCircleChevronLeft className="w-6 h-6 m-1" />
          </button>
        )}
      </div>

      {jwtToken != "" && (
        <UserMenu
          isOpen={isMenuOpen}
          email={userInfoGlobal?.email || ""}
          picture={userInfoGlobal?.picture || ""}
          onClose={() => setIsMenuOpen(false)}
        />
      )}
      <SideMenu_M
        isOpen={openSideMenu}
        onClose={() => setOpenSideMenu(false)}
      />
    </nav>
  );
}
