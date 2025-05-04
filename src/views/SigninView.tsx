import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import logo from "@/assets/dark-logo.png";
import DynamicSvg from "@/components/DynamicSvg";
import { toast } from "react-toastify";
import { env } from "@/config/env";
const SigninView: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ email, password });
  };
  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      console.log("Google Token Response:", tokenResponse);
      try {
        const response = await axios.post(`${env.BASE_URL}/auth/google`, {
          access_token: tokenResponse.access_token,
        });
        localStorage.setItem("token", response.data.token);
        navigate("/");
      } catch (error) {
        console.error("Error during authentication:", error);
        toast.warn("Error during authentication!");
      }
    },
    onError: () => {
      console.error("Google login failed");
      toast.warn("Google login failed!");
    },
  });
  const handleLogin = async () => {
    try {
      const response = await axios.post(`${env.BASE_URL}/auth/login`, {
        email: email,
        password: password,
      });
      localStorage.setItem("token", response.data.token);
    } catch (error: any) {
      console.error("error during authentication", error.response.data.message);
      toast.warn(error.response.data.message);
    }
  };
  return (
    <div className="relative flex lg:flex-row flex-col w-full justify-center items-center min-h-screen bg-[#070707] lg:gap-0 gap-4">
      <DynamicSvg />
      <div className="relative flex w-full justify-center items-center lg:hidden">
        <img src={logo} alt="" className="w-[80%] h-auto" />
      </div>
      <div className="flex flex-col items-center justify-center z-20">
        <form
          onSubmit={handleSubmit}
          className="bg-[#070707] p-6 rounded shadow-md w-80 border border-[#333333] border-dashed"
        >
          <h1 className="text-2xl font-bold mb-4 text-[#666666]">Sign In</h1>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className=" text-gray-300 placeholder-gray-700 text-sm mt-1 block w-full p-2 bg-[#070707] rounded-[10px] border-dashed border border-gray-500 focus:border-blue-500 focus:ring-0 focus:ring-none"
              required
            />
          </div>
          <div className="mb-4">
            <label className="text-sm block text-gray-700" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="text-gray-300 placeholder-gray-700 text-sm mt-1 block w-full p-2 bg-[#070707] rounded-[10px] border-dashed border border-gray-500 focus:border-blue-500 focus:ring-0 focus:ring-nonee"
              required
            />
          </div>
          <p className="text-gray-600 text-sm my-2">Forgot your password?</p>
          <button
            type="submit"
            className="w-full text-sm bg-blue-500 text-white p-2 rounded-[20px] hover:bg-blue-600 h-9"
            onClick={() => handleLogin()}
          >
            Sign In
          </button>
          <div className="mt-4 w-full flex flex-col justify-center items-center gap-5">
            <div>
              <p className="text-gray-600">Or</p>
            </div>
            <button
              type="submit"
              className="flex justify-center items-center w-64 font-bold bg-gray-600 text-white p-2 rounded-[20px] hover:bg-gray-900 h-9 text-sm"
              onClick={() => handleGoogleLogin()}
            >
              <svg
                className="mr-2"
                fill="#fff"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 30 30"
                width="18px"
                height="18px"
              >
                <path d="M 15.003906 3 C 8.3749062 3 3 8.373 3 15 C 3 21.627 8.3749062 27 15.003906 27 C 25.013906 27 27.269078 17.707 26.330078 13 L 25 13 L 22.732422 13 L 15 13 L 15 17 L 22.738281 17 C 21.848702 20.448251 18.725955 23 15 23 C 10.582 23 7 19.418 7 15 C 7 10.582 10.582 7 15 7 C 17.009 7 18.839141 7.74575 20.244141 8.96875 L 23.085938 6.1289062 C 20.951937 4.1849063 18.116906 3 15.003906 3 z" />
              </svg>
              CONTINUE WITH GOOGLE
            </button>
            <p className=" cursor-pointer">
              Dont you have account?{" "}
              <Link className="text-blue-500" to={"/signup"}>
                Sign up
              </Link>
            </p>
          </div>
        </form>
      </div>
      <div className="relative lg:flex w-1/2 justify-center items-center hidden">
        <img src={logo} alt="" className="w-[80%] h-auto" />
      </div>
    </div>
  );
};

export default SigninView;
