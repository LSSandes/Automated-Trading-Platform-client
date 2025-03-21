import { useState, useEffect } from "react";
import { Signal, Plus, Terminal, ExternalLink } from "lucide-react";
import WebhookCard from "../components/webhooks/WebhookCard";
import NewWebhookModal from "../components/webhooks/NewWebhookModal";
import { userAtom } from "@/store/atoms";
import { useAtom } from "jotai";
import { useSelector, dispatch } from "@/app/store";
import { getWebhooks } from "@/app/reducers/webhook";
import { GiShoppingCart } from "react-icons/gi";

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

  // const handleTogglePublicCloseOrder = (id: number) => {
  //   console.log("-------handleTogglePublic--------->", id);
  // };

  // const handleToggleActiveCloseOrder = (id: number) => {
  //   console.log("--------handleToggleActive--------->", id);
  // };
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
          className="premium-button flex items-center outline-1 outline-dashed outline-blue-500 p-2 outline-offset-2 lg:w-[20%] xl:w-[10%] w-full justify-center"
        >
          <Plus className="h-5 w-5 mr-2" />
          New Webhook
        </button>
      </div>

      {/* Webhooks Sections */}
      {webhooksState.length > 0 && (
        <div className="space-y-6">
          {webhooksState.find(
            (webhook) => webhook.webhookMode === "advanced"
          ) && (
            <>
              <div className="text-2xl mb-4 flex justify-start items-center gap-2">
                <GiShoppingCart className="w-6 h-6"/>
                <span className="text-white font-medium">Advanced webhooks</span>
              </div>
            </>
          )}
          <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-4">
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
          {webhooksState.find((webhook) => webhook.webhookMode === "basic") && (
            <>
              <div className="text-2xl mb-4 flex justify-start items-center gap-2">
                <GiShoppingCart className="w-6 h-6"/>
                <span className="text-white font-medium">Basic webhooks</span>
              </div>
            </>
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
      {/* Documentation Link */}
      {webhooksState.length > 0 && (
        <div className="mt-8 p-6 glass-panel rounded-xl">
          <div className="flex items-start space-x-4">
            <div className="p-3 bg-accent/10 rounded-lg">
              <Terminal className="h-6 w-6 text-accent" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-medium text-white mb-2">
                TradingView Webhook Documentation
              </h3>
              <p className="text-gray-400 mb-4">
                Learn how to set up and configure TradingView alerts to work
                with our webhook system. Get detailed examples and best
                practices for reliable signal automation.
              </p>
              <a
                href="#"
                className="inline-flex items-center text-accent hover:text-accent-dark transition-colors"
              >
                View Documentation
                <ExternalLink className="h-4 w-4 ml-2" />
              </a>
            </div>
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
