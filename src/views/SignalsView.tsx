import { useState, useEffect } from "react";
import { Signal, Plus } from "lucide-react";
import WebhookCard from "../components/webhooks/WebhookCard";
import NewWebhookModal from "../components/webhooks/NewWebhookModal";
import { userAtom } from "@/store/atoms";
import { useAtom } from "jotai";
import { useSelector, dispatch } from "@/app/store";
import { getWebhooks } from "@/app/reducers/webhook";
// import { GiShoppingCart } from "react-icons/gi";
import { AiOutlineSafety } from "react-icons/ai";
import { MdOutlineWorkspacePremium } from "react-icons/md";
import { IoRocketOutline } from "react-icons/io5";

export default function SignalsView() {
  const [user] = useAtom(userAtom);
  const [showNewWebhook, setShowNewWebhook] = useState(false);
  const webhooksState = useSelector((state) => state.webhook.webhooks);
  useEffect(() => {
    if (user?.email) {
      dispatch(getWebhooks(user?.email));
    }
  }, [user?.email]);
  const handleChangeColor = (id: string) => {
    console.log("Change color for webhook:", id);
  };

  const handleToggleActiveMarketOrder = (id: string) => {
    console.log("--------handleToggleActive------->", id);
  };

  const handleTogglePublicMarketOrder = (id: string) => {
    console.log("--------handleTogglePublic------->", id);
  };
  return (
    <div className="space-y-6">
      <div className="flex justify-between lg:items-center items-start lg:flex-row flex-col gap-4">
        <div className="flex items-center space-x-3">
          <Signal className="h-8 w-8 text-accent" />
          <div>
            <h1 className="text-3xl font-medium text-white tracking-tight">
              Webhooks
            </h1>
            <p className="text-gray-400 mt-1">
              Manage your TradingView webhooks and signal templates
            </p>
          </div>
        </div>
        <button
          onClick={() => setShowNewWebhook(true)}
          className="premium-button flex items-center outline-1 outline-dashed outline-blue-500 py-2 px-3 outline-offset-2 justify-center"
        >
          <Plus className="h-5 w-5 mr-2" />
          New Webhook
        </button>
      </div>

      {/* Webhooks Sections */}
      {webhooksState.length > 0 && (
        <div className="space-y-3">
          {webhooksState.find(
            (webhook) => webhook.webhookMode === "advanced"
          ) && (
            <div className="text-2xl mb-4 flex justify-start items-center gap-2">
              <IoRocketOutline className="w-6 h-6 text-orange-500" />
              <span className="text-orange-500 font-medium">
                Advanced webhooks
              </span>
            </div>
          )}
          <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-4 h-min items-start">
            {webhooksState
              .filter((webhook) => webhook.webhookMode === "advanced")
              .map((webhook) => (
                <WebhookCard
                  key={webhook.id}
                  webhook={webhook}
                  onChangeColor={handleChangeColor}
                  onToggleActive={handleToggleActiveMarketOrder}
                  onTogglePublic={handleTogglePublicMarketOrder}
                />
              ))}
          </div>
          {webhooksState.find(
            (webhook) => webhook.webhookMode === "premium"
          ) && (
            <div className="text-2xl mb-4 flex justify-start items-center gap-2">
              <MdOutlineWorkspacePremium className="w-6 h-6 text-purple-500" />
              <span className="text-purple-500 font-medium">
                Premium webhooks
              </span>
            </div>
          )}
          <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-4 h-min items-start">
            {webhooksState
              .filter((webhook) => webhook.webhookMode === "premium")
              .map((webhook) => (
                <WebhookCard
                  key={webhook.id}
                  webhook={webhook}
                  onChangeColor={handleChangeColor}
                  onToggleActive={handleToggleActiveMarketOrder}
                  onTogglePublic={handleTogglePublicMarketOrder}
                />
              ))}
          </div>
          {webhooksState.find((webhook) => webhook.webhookMode === "basic") && (
            <div className="text-2xl mb-4 flex justify-start items-center gap-2">
              <AiOutlineSafety className="w-6 h-6 text-blue-500" />
              <span className=" font-medium text-blue-500">Basic webhooks</span>
            </div>
          )}
          <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-4 h-min items-start">
            {webhooksState
              .filter((webhook) => webhook.webhookMode === "basic")
              .map((webhook) => (
                <WebhookCard
                  key={webhook.id}
                  webhook={webhook}
                  onChangeColor={handleChangeColor}
                  onToggleActive={handleToggleActiveMarketOrder}
                  onTogglePublic={handleTogglePublicMarketOrder}
                />
              ))}
          </div>
        </div>
      )}
      <NewWebhookModal
        isOpen={showNewWebhook}
        onClose={() => setShowNewWebhook(false)}
      />
    </div>
  );
}
