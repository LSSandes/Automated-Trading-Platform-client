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
  orderType,
  volume,
  stopLoss_pips,
  takeProfit_pips,
  openPrice_pips,
  stopLimit_pips,
  trailingStopLoss,
  modifyType,
  moveStopLoss_pips,
  moveTakeProfit_pips,
  partialClose,
  allTrades,
}: {
  email: string;
  webhookName: string;
  webhookMode: string;
  symbol: string;
  orderDirection: string;
  orderType: string;
  volume: string;
  stopLoss_pips: string;
  takeProfit_pips: string;
  openPrice_pips: string;
  stopLimit_pips: string;
  trailingStopLoss: string;
  modifyType: string;
  moveStopLoss_pips: string;
  moveTakeProfit_pips: string;
  partialClose: string;
  allTrades: boolean;
}) {
  return async () => {
    try {
      const response = await axios.post("webhook/create-marketorder", {
        email,
        webhookName,
        webhookMode,
        symbol,
        orderDirection,
        orderType,
        volume,
        stopLoss_pips,
        takeProfit_pips,
        openPrice_pips,
        stopLimit_pips,
        trailingStopLoss,
        modifyType,
        moveStopLoss_pips,
        moveTakeProfit_pips,
        partialClose,
        allTrades,
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
    } catch (err: any) {
      toast.warn(err.response.data.message);
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
    } catch (err: any) {
      dispatch(webhook.actions.hasError(err));
      toast.warn(err.response.data.message);
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
    } catch (err: any) {
      dispatch(webhook.actions.hasError(err));
      toast.warn(err.response.data.message);
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
  orderType_new,
  volume_new,
  stopLoss_new,
  takeProfit_new,
  openPrice_new,
  stopLimit_new,
  trailingStopLoss_new,
  modifyType_new,
  moveStopLoss_pips_new,
  moveTakeProfit_pips_new,
  partialClose_new,
  allTrades_new,
}: {
  email: string;
  webhookName: string;
  webhookMode: string;
  symbol: string;
  orderDirection: string;
  webhookName_new: string;
  symbol_new: string;
  orderDirection_new: string;
  orderType_new: string;
  volume_new: string;
  stopLoss_new: string;
  takeProfit_new: string;
  openPrice_new: string;
  stopLimit_new: string;
  trailingStopLoss_new: string;
  modifyType_new: string;
  moveStopLoss_pips_new: string;
  moveTakeProfit_pips_new: string;
  partialClose_new: string;
  allTrades_new: boolean;
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
        orderType_new,
        volume_new,
        stopLoss_new,
        takeProfit_new,
        openPrice_new,
        stopLimit_new,
        trailingStopLoss_new,
        modifyType_new,
        moveStopLoss_pips_new,
        moveTakeProfit_pips_new,
        partialClose_new,
        allTrades_new,
      });
      dispatch(
        webhook.actions.udpateWebhookSuccess(response.data.data.updatedWebhook)
      );
      dispatch(webhook.actions.hasError(null));
      toast.success("Webhook is updated successfully.");
    } catch (err: any) {
      toast.warn(err.response.data.message);
    }
  };
}

export function openBasicTrade({
  email,
  accountId,
  webhookName,
  symbol,
  orderDirection,
  orderType,
  webhookMode,
  accessToken,
  accountType,
  actionType,
  allTrades,
  trailingStopLoss,
}: {
  email: string;
  accountId: string;
  webhookName: string;
  symbol: string;
  orderDirection: string;
  orderType: string;
  webhookMode: string;
  accessToken: string;
  accountType: string;
  actionType: string;
  allTrades: boolean;
  trailingStopLoss: boolean;
}) {
  return async () => {
    try {
      const response = await axios.post("webhook/open-basictrade", {
        email,
        accountId,
        webhookName,
        symbol,
        orderDirection,
        orderType,
        webhookMode,
        accessToken,
        accountType,
        actionType,
        allTrades,
        trailingStopLoss,
      });
      if (actionType == "create") {
        dispatch(
          webhook.actions.udpateWebhookSuccess(
            response.data.data.updatedWebhook
          )
        );
        toast.success(response.data.message);
      } else if (actionType == "modify") {
        toast.success(response.data.message);
      } else {
        toast.success(response.data.message);
      }
    } catch (err: any) {
      dispatch(webhook.actions.hasError(err));
      toast.warn(err.response.data.message);
    }
  };
}

export function openAdvancedTrade({
  email,
  accountId,
  webhookName,
  webhookMode,
  symbol,
  messageData,
  allTrades,
}: {
  email: string;
  accountId: string;
  webhookName: string;
  webhookMode: string;
  symbol: string;
  messageData: string;
  allTrades: boolean;
}) {
  return async () => {
    try {
      const response = await axios.post("webhook/open-advancedtrade", {
        email,
        accountId,
        webhookName,
        webhookMode,
        symbol,
        messageData,
        allTrades,
      });
      toast.success(response.data.message);
    } catch (err: any) {
      dispatch(webhook.actions.hasError(err.response.data.message));
      toast.warn(err.response.data.message);
    }
  };
}
export default webhook.reducer;
