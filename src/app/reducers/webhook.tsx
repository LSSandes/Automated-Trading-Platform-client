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
        "webhook/getWebhooks",
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

export function createBasicWebhook({
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
  whopToken,
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
  whopToken: string;
}) {
  return async () => {
    try {
      const response = await axios.post("webhook/createBasicWebhook", {
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
        whopToken,
      });
      dispatch(
        webhook.actions.addWebhookSuccess(response.data.data.newWebhook)
      );
      dispatch(webhook.actions.hasError(null));
      toast.success(response.data.message);
    } catch (err: any) {
      dispatch(webhook.actions.hasError(err));
      toast.warn(err.response.data.message);
    }
  };
}

export function createPremiumWebhook({
  email,
  webhookName,
  webhookMode,
  symbol,
  orderDirection,
  orderType,
  volume,
  multiTakeProfit_pips,
  stopLoss_pips,
  trailingDistance_pips,
  activationTrigger_pips,
  timeBasedExitMinute,
  breakenEvenSetting_pips,
  whopToken,
}: {
  email: string;
  webhookName: string;
  webhookMode: string;
  symbol: string;
  orderDirection: string;
  orderType: string;
  volume: string;
  multiTakeProfit_pips: string;
  stopLoss_pips: string;
  trailingDistance_pips: string;
  activationTrigger_pips: string;
  timeBasedExitMinute: string;
  breakenEvenSetting_pips: string;
  whopToken: string;
}) {
  return async () => {
    try {
      const response = await axios.post("webhook/createPremiumWebhook", {
        email,
        webhookName,
        webhookMode,
        symbol,
        orderDirection,
        orderType,
        volume,
        multiTakeProfit_pips,
        stopLoss_pips,
        trailingDistance_pips,
        activationTrigger_pips,
        timeBasedExitMinute,
        breakenEvenSetting_pips,
        whopToken,
      });
      dispatch(
        webhook.actions.addWebhookSuccess(response.data.data.newWebhook)
      );
      dispatch(webhook.actions.hasError(null));
      toast.success(response.data.message);
    } catch (err: any) {
      dispatch(webhook.actions.hasError(err));
      toast.warn(err.response.data.message);
    }
  };
}

export function createAdvancedWebhook({
  email,
  webhookName,
  webhookMode,
  symbol,
  volume,
  whopToken
}: {
  email: string;
  webhookName: string;
  webhookMode: string;
  symbol: string;
  volume: string;
  whopToken: string;
}) {
  return async () => {
    try {
      const response = await axios.post("webhook/createAdvancedWebhook", {
        email,
        webhookName,
        webhookMode,
        symbol,
        volume,
        whopToken,
      });
      dispatch(
        webhook.actions.addWebhookSuccess(response.data.data.newWebhook)
      );
      dispatch(webhook.actions.hasError(null));
      toast.success(response.data.message);
    } catch (err: any) {
      dispatch(webhook.actions.hasError(err));
      toast.warn(err.response.data.message);
    }
  };
}

export function deleteWebhook({
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
      const response = await axios.post("webhook/deleteWebhook", {
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

export function connectWebhook({
  email,
  accountId,
  webhookName,
  webhookMode,
  symbol,
  appName,
  accNum,
  accountType,
  refreshToken,
}: {
  email: string;
  accountId: string;
  webhookName: string;
  webhookMode: string;
  symbol: string;
  appName: string;
  accNum: string;
  accountType: string;
  refreshToken: string;
}) {
  return async () => {
    try {
      const response = await axios.post("webhook/connectWebhook", {
        email,
        accountId,
        webhookName,
        webhookMode,
        symbol,
        appName,
        accNum,
        accountType,
        refreshToken,
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

export function disconnectWebhook({
  email,
  webhookName,
  webhookMode,
  symbol,
  orderDirection,
  appName,
}: {
  email: string;
  webhookName: string;
  webhookMode: string;
  symbol: string;
  orderDirection: string;
  appName: string;
}) {
  return async () => {
    try {
      const response = await axios.post("webhook/diconnectWebhook", {
        email,
        webhookName,
        webhookMode,
        symbol,
        orderDirection,
        appName,
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

export function updateBasicWebhook({
  email,
  webhookName,
  webhookMode,
  symbol,
  webhookName_new,
  symbol_new,
  orderDirection_new,
  orderType_new,
  volume_new,
  stopLoss_pips_new,
  takeProfit_pips_new,
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
  webhookName_new: string;
  symbol_new: string;
  orderDirection_new: string;
  orderType_new: string;
  volume_new: string;
  stopLoss_pips_new: string;
  takeProfit_pips_new: string;
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
      const response = await axios.post("webhook/updateBasicWebhook", {
        email,
        webhookName,
        webhookMode,
        symbol,
        webhookName_new,
        symbol_new,
        orderDirection_new,
        orderType_new,
        volume_new,
        stopLoss_pips_new,
        takeProfit_pips_new,
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
      toast.success(response.data.message);
    } catch (err: any) {
      toast.warn(err.response.data.message);
    }
  };
}

export function updatePremiumWebhook({
  email,
  webhookName,
  webhookMode,
  symbol,
  webhookName_new,
  symbol_new,
  volume_new,
  multiTakeProfit_pips_new,
  stopLoss_pips_new,
  trailingDistance_pips_new,
  activationTrigger_pips_new,
  timeBasedExitMinute_new,
  breakenEvenSetting_pips_new,
}: {
  email: string;
  webhookName: string;
  webhookMode: string;
  symbol: string;
  webhookName_new: string;
  symbol_new: string;
  volume_new: string;
  multiTakeProfit_pips_new: string;
  stopLoss_pips_new: string;
  trailingDistance_pips_new: string;
  activationTrigger_pips_new: string;
  timeBasedExitMinute_new: string;
  breakenEvenSetting_pips_new: string;
}) {
  return async () => {
    try {
      const response = await axios.post("webhook/updatePremiumWebhook", {
        email,
        webhookName,
        webhookMode,
        symbol,
        webhookName_new,
        symbol_new,
        volume_new,
        multiTakeProfit_pips_new,
        stopLoss_pips_new,
        trailingDistance_pips_new,
        activationTrigger_pips_new,
        timeBasedExitMinute_new,
        breakenEvenSetting_pips_new,
      });
      dispatch(
        webhook.actions.udpateWebhookSuccess(response.data.data.updatedWebhook)
      );
      toast.success(response.data.message);
    } catch (err: any) {
      toast.warn(err.response.data.message);
    }
  };
}

export function updateAdvancedWebhook({
  email,
  webhookName,
  webhookMode,
  symbol,
  webhookName_new,
  symbol_new,
  volume_new,
}: {
  email: string;
  webhookName: string;
  webhookMode: string;
  symbol: string;
  webhookName_new: string;
  symbol_new: string;
  volume_new: string;
}) {
  return async () => {
    try {
      const response = await axios.post("webhook/updateAdvancedWebhook", {
        email,
        webhookName,
        webhookMode,
        symbol,
        webhookName_new,
        symbol_new,
        volume_new,
      });
      dispatch(
        webhook.actions.udpateWebhookSuccess(response.data.data.updatedWebhook)
      );
      toast.success(response.data.message);
    } catch (err: any) {
      toast.warn(err.response.data.message);
    }
  };
}

export function openBasicTrade({
  email,
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
  webhookName,
  webhookMode,
  symbol,
  messageData,
  allTrades,
}: {
  email: string;
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
