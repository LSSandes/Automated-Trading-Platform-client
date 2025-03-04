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
      const response = await axios.post(
        "webhook/get-marketorders",
        { email },
        {
          headers: {
            "Cache-Control": "no-cache",
            "Content-Type": "application/json",
          },
        }
      );
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
  stopLoss_pips,
  takeProfit_pips,
}: {
  email: string;
  webhookName: string;
  webhookMode: string;
  symbol: string;
  orderDirection: string;
  volume: string;
  stopLoss_pips: string;
  takeProfit_pips: string;
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
        stopLoss_pips,
        takeProfit_pips,
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
  webhookMode,
  orderDirection,
  symbol,
}: {
  email: string;
  webhookName: string;
  webhookMode: string;
  orderDirection: string;
  symbol: string;
}) {
  return async () => {
    console.log(
      "------redux------>",
      email,
      webhookName,
      webhookMode,
      orderDirection,
      symbol
    );
    try {
      const response = await axios.post("webhook/delete-marketorder", {
        email,
        webhookName,
        webhookMode,
        orderDirection,
        symbol,
      });
      dispatch(
        webhook.actions.deleteWebhookSuccess(response.data.data.deletedWebhook)
      );
      toast.success("The webhook has been deleted");
    } catch (err) {
      dispatch(webhook.actions.hasError(err));
      toast.warn("Internal Server Error");
    }
  };
}

export function connectMarketOrder({
  email,
  accountId,
  webhookName,
  webhookMode,
  symbol,
  orderDirection,
  appName,
  accNum,
}: {
  email: string;
  accountId: string;
  webhookName: string;
  webhookMode: string;
  symbol: string;
  orderDirection: string;
  appName: string;
  accNum: string;
}) {
  return async () => {
    try {
      const response = await axios.post("webhook/connect-marketorder", {
        email,
        accountId,
        webhookName,
        webhookMode,
        symbol,
        orderDirection,
        appName,
        accNum,
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
  email,
  accountId,
  webhookName,
  webhookMode,
  symbol,
  orderDirection,
}: {
  email: string;
  accountId: string;
  webhookName: string;
  webhookMode: string;
  symbol: string;
  orderDirection: string;
}) {
  return async () => {
    try {
      const response = await axios.post("webhook/disconnect-marketorder", {
        email,
        accountId,
        webhookName,
        webhookMode,
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
      toast.warn("Connection Error");
    }
  };
}

export function editMarketOrder({
  email,
  webhookName,
  webhookMode,
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
  webhookMode: string;
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
    try {
      const response = await axios.post("webhook/edit-marketorder", {
        email,
        webhookName,
        webhookMode,
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
      if (err instanceof Error) {
        toast.warn(err.message);
      } else {
        toast.warn("An unknown error occurred.");
      }
    }
  };
}

export function openMarketOrder({
  email,
  accountId,
  webhookName,
  symbol,
  orderDirection,
  webhookMode,
  accessToken,
  accountType,
}: {
  email: string;
  accountId: string;
  webhookName: string;
  symbol: string;
  orderDirection: string;
  webhookMode: string;
  accessToken: string;
  accountType: string;
}) {
  return async () => {
    try {
      const response = await axios.post("webhook/open-marketorder", {
        email,
        accountId,
        webhookName,
        symbol,
        orderDirection,
        webhookMode,
        accessToken,
        accountType,
      });
      dispatch(
        webhook.actions.udpateWebhookSuccess(response.data.data.updatedWebhook)
      );
      dispatch(webhook.actions.hasError(null));
      toast.success("Trade has opened.");
    } catch (err) {
      dispatch(webhook.actions.hasError(err));
      toast.info("Market is closed");
    }
  };
}

export default webhook.reducer;
