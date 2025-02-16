import { createSlice } from "@reduxjs/toolkit";
import axios from "../../utils/api";
import { dispatch } from "../store";
import { WebhookStateProps } from "@/types/webhook";
import { toast } from "react-toastify";

const initialState: WebhookStateProps = {
  error: null,
  webhooks: [],
};

const webhook = createSlice({
  name: "webhook",
  initialState,
  reducers: {
    hasError(state, action) {
      state.error = action.payload;
    },
    getWebhooksSuccess(state, action) {
      state.webhooks = action.payload;
    },

    addWebhookSuccess(state, action) {
      state.webhooks = [...state.webhooks, action.payload];
    },

    deleteWebhookSuccess(state, action) {
      state.webhooks = state.webhooks.filter(
        (webhook) => webhook.id !== action.payload.id
      );
    },

    udpateWebhookSuccess(state, action) {
      state.webhooks = state.webhooks.map((webhook) =>
        webhook.id === action.payload.id ? action.payload : webhook
      );
    },
  },
});

export const { hasError, getWebhooksSuccess, addWebhookSuccess } =
  webhook.actions;

export function getWebhooks(email: string | undefined) {
  return async () => {
    try {
      console.log("-----webhook------", email);
      const response = await axios.post("webhook/get-marketorders", { email });
      dispatch(
        webhook.actions.getWebhooksSuccess(response.data.data.existingWebhooks)
      );
    } catch (err) {
      dispatch(webhook.actions.hasError(err));
    }
  };
}

export function createMarketOrder({
  email,
  webhookName,
  webhookMode,
  symbol,
  orderDirection,
  volume,
  stopLoss,
  takeProfit,
}: {
  email: string;
  webhookName: string;
  webhookMode: string;
  symbol: string;
  orderDirection: string;
  volume: string;
  stopLoss: string;
  takeProfit: string;
}) {
  return async () => {
    try {
      const response = await axios.post("webhook/create-marketorder", {
        email,
        webhookName,
        webhookMode,
        symbol,
        orderDirection,
        volume,
        stopLoss,
        takeProfit,
      });
      dispatch(
        webhook.actions.addWebhookSuccess(response.data.data.newWebhook)
      );
      dispatch(webhook.actions.hasError(null));
      toast.success("New MarketOrder is created");
    } catch (err) {
      dispatch(webhook.actions.hasError(err));
      toast.warn("Internal Server Error");
    }
  };
}

export function deleteMarketOrder({
  email,
  webhookName,
  orderDirection,
  symbol,
}: {
  email: string;
  webhookName: string;
  orderDirection: string;
  symbol: string;
}) {
  return async () => {
    console.log(
      "------redux------>",
      email,
      webhookName,
      orderDirection,
      symbol
    );
    try {
      const response = await axios.post("webhook/delete-marketorder", {
        email,
        webhookName,
        orderDirection,
        symbol,
      });
      dispatch(
        webhook.actions.deleteWebhookSuccess(response.data.data.deletedWebhook)
      );
      toast.success("The webhook has been deleted");
    } catch (err) {
      dispatch(webhook.actions.hasError(err));
      toast.success("Internal Server Error");

    }
  };
}

export function connectMarketOrder({
  accountId,
  webhookName,
  symbol,
  orderDirection,
}: {
  accountId: string;
  webhookName: string;
  symbol: string;
  orderDirection: string;
}) {
  return async () => {
    try {
      const response = await axios.post("webhook/connect-marketorder", {
        accountId,
        webhookName,
        symbol,
        orderDirection,
      });
      dispatch(
        webhook.actions.udpateWebhookSuccess(response.data.data.updatedWebhook)
      );
      dispatch(webhook.actions.hasError(null));
      toast.success("Successfully connected to the account");
    } catch (err) {
      dispatch(webhook.actions.hasError(err));
      toast.warn("The market is closed");
    }
  };
}

export function disconnectMarketOrder({
  accountId,
  webhookName,
  symbol,
  orderDirection,
}: {
  accountId: string;
  webhookName: string;
  symbol: string;
  orderDirection: string;
}) {
  return async () => {
    console.log(
      "------diconnectWebhook----->",
      accountId,
      webhookName,
      symbol,
      orderDirection
    );
    try {
      const response = await axios.post("webhook/disconnect-marketorder", {
        accountId,
        webhookName,
        symbol,
        orderDirection,
      });
      dispatch(
        webhook.actions.udpateWebhookSuccess(response.data.data.updatedWebhook)
      );
      dispatch(webhook.actions.hasError(null));
      toast.success("Disconnected from the account.");
    } catch (err) {
      dispatch(webhook.actions.hasError(err));
      toast.warn("Connection Error")
    }
  };
}

export function editMarketOrder({
  email,
  webhookName,
  symbol,
  orderDirection,
  webhookName_new,
  symbol_new,
  orderDirection_new,
  volume_new,
  stopLoss_new,
  takeProfit_new,
}: {
  email: string;
  webhookName: string;
  symbol: string;
  orderDirection: string;
  webhookName_new: string;
  symbol_new: string;
  orderDirection_new: string;
  volume_new: string;
  stopLoss_new: string;
  takeProfit_new: string;
}) {
  return async () => {
    console.log("--->", email);
    try {
      const response = await axios.post("webhook/edit-marketorder", {
        email,
        webhookName,
        symbol,
        orderDirection,
        webhookName_new,
        symbol_new,
        orderDirection_new,
        volume_new,
        stopLoss_new,
        takeProfit_new,
      });
      dispatch(
        webhook.actions.udpateWebhookSuccess(response.data.data.updatedWebhook)
      );
      dispatch(webhook.actions.hasError(null));
      toast.success("Webhook is updated successfully.");
    } catch (err) {
      dispatch(webhook.actions.hasError(err));
      toast.warn("Internal Server Error");
    }
  };
}

export function openMarketOrder({
  accountId,
  webhookName,
  symbol,
  orderDirection,
  webhookMode,
}: {
  accountId: string;
  webhookName: string;
  symbol: string;
  orderDirection: string;
  webhookMode: string;
}) {
  return async () => {
    try {
      console.log(
        "openTrademarketOrder-------->",
        accountId,
        webhookName,
        symbol,
        orderDirection,
        webhookMode
      );
      const response = await axios.post("webhook/open-marketorder", {
        accountId,
        webhookName,
        symbol,
        orderDirection,
        webhookMode,
      });
      dispatch(
        webhook.actions.udpateWebhookSuccess(response.data.data.updatedWebhook)
      );
      dispatch(webhook.actions.hasError(null));
      toast.success("Trade has opened.");
    } catch (err) {
      dispatch(webhook.actions.hasError(err));
      toast.info("The market is closed");
    }
  };
}

export default webhook.reducer;
