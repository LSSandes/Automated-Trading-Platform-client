import { useEffect, useState } from "react";
import { Bell, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import UserMenu from "./UserMenu";
import { jwtDecode } from "jwt-decode"; // Corrected import
import { LogIn, UserRoundPlus } from "lucide-react";
import logo from "@/assets/dark-logo.png";
import { useSetAtom, useAtom } from "jotai";
import { userAtom } from "@/store/atoms";
// import { User } from "@/types";
import axios from "axios";
import { env } from "@/config/env";
export default function Navbar() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const handleLogo = () => {
    navigate("/");
  };
  const [token, setToken] = useState<string>("");
  // const [userInfo, setUserInfo] = useState<User>({} as User);
  const setUserInfoGlobal = useSetAtom(userAtom);
  const [userInfoGlobal] = useAtom(userAtom);
  useEffect(() => {
    const userToken = localStorage.getItem("token") || "";
    if (userToken) {
      setToken(userToken);
      setUserInfoGlobal(jwtDecode(userToken));
      // setUserInfoGlobal(jwtDecode(userToken));
    }
  }, []);
  useEffect(() => {
    if (userInfoGlobal) {
      axios
        .post(`${env.BASE_URL}/profile/get`, { email: userInfoGlobal?.email })
        .then((res) => {
          setUserInfoGlobal(res.data.data.user);
        });
    }
  }, []);
  const getFirstLetterUppercase = (str: string) => {
    if (str.length === 0) return "";
    return str.charAt(0).toUpperCase();
  };
  const handleSignin = () => {
    navigate("/signin");
  };
  const handleSignup = () => {
    navigate("/signup");
  };
  console.log("------navbar userinfo--------", userInfoGlobal?.picture);
  return (
    <nav className="fixed w-full bg-dark/80 backdrop-blur-xl border-b border-dark-300/50 z-50 py-5 px-16">
      <div className="">
        <div className="flex items-center justify-between h-16">
          <div
            className="flex items-center cursor-pointer"
            onClick={handleLogo}
          >
            <img src={logo} alt="" className="max-w-52 min-w-52 h-auto" />
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search webhooks..."
                className="pl-10 pr-4 py-2 bg-dark-200/50 text-gray-300 rounded-lg 
                         border border-dark-300/50 backdrop-blur-xl
                         focus:outline-none focus:ring-1 focus:ring-accent/50
                         transition-all duration-300"
              />
            </div>
            <button className="p-2 text-gray-400 hover:text-white hover:bg-dark-200/50 rounded-lg transition-all duration-300">
              <Bell className="h-5 w-5" />
            </button>
            {token != "" ? (
              <button
                onClick={() => setIsMenuOpen(true)}
                className="flex items-center space-x-2 p-1.5 text-gray-400 
                       hover:text-white hover:bg-dark-200/50 rounded-lg 
                       transition-all duration-300"
              >
                {userInfoGlobal?.picture != null ? (
                  <img
                    src={`${
                      userInfoGlobal?.picture?.includes("uploads")
                        ? env.AVATAR_URL + userInfoGlobal?.picture
                        : userInfoGlobal?.picture
                    }`}
                    alt="Profile"
                    className="w-10 h-10 rounded-full border border-accent/50"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full border border-accent/50  text-3xl">
                    {getFirstLetterUppercase(userInfoGlobal?.email || "")}
                  </div>
                )}
              </button>
            ) : (
              <div className="flex justify-center items-center gap-4">
                <div
                  className="text-[white] gap-2 flex justify-center items-center text-lg font-serif border border-accent/20 rounded-[10px] px-2 py-1 cursor-pointer hover:bg-accent/20"
                  onClick={handleSignin}
                >
                  <LogIn className="h-5 w-5" />
                  Sign In
                </div>
                <div
                  className="text-[white] gap-2 flex justify-center items-center text-lg font-serif border border-accent/20 rounded-[10px] px-2 py-1 cursor-pointer  hover:bg-accent/20"
                  onClick={handleSignup}
                >
                  <UserRoundPlus className="h-5 w-5" />
                  Sign Up
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {token != "" && (
        <UserMenu
          isOpen={isMenuOpen}
          email={userInfoGlobal?.email || ""}
          picture={userInfoGlobal?.picture || ""}
          onClose={() => setIsMenuOpen(false)}
        />
      )}
    </nav>
  );
}
