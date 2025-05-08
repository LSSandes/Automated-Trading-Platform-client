import WHOP_LOGO from "@/assets/whop_logo.png";

const WhopCallbackView: React.FC = () => {
  const params = new URLSearchParams(window.location.search);
  const code = params.get("code");
  return (
    <div className="flex justify-center items-center w-full min-h-screen">
      <div className="flex flex-col items-center justify-center">
        <img src={WHOP_LOGO} alt="" className="w-20 h-20 rounded-full" />
        <div className="flex justify-center items-center gap-2 text-gray-400">
          <span>Your code:</span>
          <span>{code}</span>
        </div>
        <button className="flex justify-center items-center bg-[#FA4616] text-white rounded-md">
          Get Access
        </button>
      </div>
    </div>
  );
};

export default WhopCallbackView;
