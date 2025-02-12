import { useState, useEffect } from "react";
import { Signal, Plus, Terminal, ExternalLink } from "lucide-react";
import WebhookCard from "../components/webhooks/WebhookCard";
import NewWebhookModal from "../components/webhooks/NewWebhookModal";
import { userAtom } from "@/store/atoms";
import { useAtom } from "jotai";
import { useSelector, dispatch } from "@/app/store";
import { getWebhooks, getCloseOrders } from "@/app/reducers/webhook";
import CloseOrderCard from "@/components/webhooks/CloseOrderCard";

export default function SignalsView() {
  const [user] = useAtom(userAtom);
  const [showNewWebhook, setShowNewWebhook] = useState(false);
  const webhooksState = useSelector((state) => state.webhook.webhooks);
  const closeOrdersState = useSelector((state) => state.webhook.closeOrders);
  useEffect(() => {
    dispatch(getWebhooks(user?.email)).then(() => {
      dispatch(getCloseOrders(user?.email));
    });
  }, []);
  console.log("---------------->", user?.email);
  const handleChangeColor = (id: string) => {
    console.log("Change color for webhook:", id);
  };

  const handleToggleActive = (id: string) => {
    console.log("--------handleToggleActive------->", id);
  };

  const handleTogglePublic = (id: string) => {
    console.log("--------handleTogglePublic------->", id);
  };
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
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
          className="premium-button flex items-center"
        >
          <Plus className="h-5 w-5 mr-2" />
          New Webhook
        </button>
      </div>

      {/* Webhooks Sections */}
      {webhooksState.length > 0 && (
        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-medium text-white mb-4">
              Advanced webhooks
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {webhooksState
                .filter((webhook) => webhook.webhookMode === "advanced")
                .map((webhook) => (
                  <WebhookCard
                    key={webhook.id}
                    webhook={webhook}
                    onChangeColor={handleChangeColor}
                    onToggleActive={handleToggleActive}
                    onTogglePublic={handleTogglePublic}
                  />
                ))}
            </div>
          </div>

          <div>
            <h2 className="text-lg font-medium text-white mb-4">
              Basic webhooks
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {webhooksState
                .filter((webhook) => webhook.webhookMode === "basic")
                .map((webhook) => (
                  <WebhookCard
                    key={webhook.id}
                    webhook={webhook}
                    onChangeColor={handleChangeColor}
                    onToggleActive={handleToggleActive}
                    onTogglePublic={handleTogglePublic}
                  />
                ))}
            </div>
          </div>
        </div>
      )}
      {closeOrdersState.length > 0 && (
        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-medium text-white mb-4">
              Close Orders
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {closeOrdersState.map((order) => (
              <CloseOrderCard closeOrder={order} />
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
