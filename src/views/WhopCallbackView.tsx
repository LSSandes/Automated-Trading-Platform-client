import WHOP_LOGO from "@/assets/whop_logo.png";
import { toast } from "react-toastify";
import { env } from "@/config/env";
import axios from "axios";
import { Loader } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const WhopCallbackView: React.FC = () => {
  const params = new URLSearchParams(window.location.search);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const code = params.get("code");
  const client_id = env.CLINET_ID;
  const client_secret = env.CLIENT_SECRET;
  const redirect_url = env.REDIRECT_URL;
  const handleGetAccess = async () => {
    setLoading(true);
    if (code) {
      try {
        const response = await axios.post(`${env.BASE_URL}/auth/whop`, {
          code,
          client_id,
          client_secret,
          redirect_url,
        });
        setLoading(false);
        console.log("whop response----->", response.data);
        localStorage.setItem("jwtToken", response.data.jwtToken);
        localStorage.setItem("whopToken", response.data.whopToken);
        navigate("/");
      } catch (error: any) {
        toast.warn(error.response.data.message);
      }
    } else {
      toast.warn("Code is not available!");
    }
  };
  return (
    <div className="flex justify-center items-center w-full min-h-screen">
      <div className="flex flex-col items-center justify-center gap-5">
        <img src={WHOP_LOGO} alt="" className="w-20 h-20 rounded-full" />
        <div className="flex justify-center items-center gap-2 text-gray-400">
          <span>Your code:</span>
          <span>{code}</span>
        </div>
        <button
          className="flex justify-center items-center p-2 bg-[#FA4616] hover:bg-[#ff9378] text-white w-52 rounded-full"
          onClick={handleGetAccess}
        >
          {loading && <Loader className="h-5 w-5 mr-2 animate-spin" />}
          <span>Get Access</span>
        </button>
      </div>
    </div>
  );
};

export default WhopCallbackView;
