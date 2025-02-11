import { createSlice } from "@reduxjs/toolkit";
import axios from "../../utils/api";
import { dispatch } from "../store";
import { WebhookStateProps } from "@/types/webhook";

const initialState: WebhookStateProps = {
  error: null,
  webhooks: [],
  closeOrders: [],
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
    getCloseOrdersSuccess(state, action) {
      state.closeOrders = action.payload;
    },
    addWebhookSuccess(state, action) {
      state.webhooks = [...state.webhooks, action.payload];
    },
    addCloseOrderSuccess(state, action) {
      state.closeOrders = [...state.closeOrders, action.payload];
    },
    deleteWebhookSuccess(state, action) {
      state.webhooks = state.webhooks.filter(
        (webhook) => webhook.id !== action.payload.id
      );
    },
    deleteCloseOrderSuccess(state, action) {
      state.closeOrders = state.closeOrders.filter(
        (closeOrder) => closeOrder.id !== action.payload.id
      );
    },
    udpateWebhookSuccess(state, action) {
      state.webhooks = state.webhooks.map((webhook) =>
        webhook.id === action.payload.id ? action.payload : webhook
      );
    },
    updateCloseOrderSuccess(state, action) {
      state.closeOrders = state.closeOrders.map((closeOrder) =>
        closeOrder.id === action.payload.id ? action.payload : closeOrder
      );
    },
  },
});

export const { hasError, getWebhooksSuccess, addWebhookSuccess } =
  webhook.actions;

export function getWebhooks(email: string | undefined) {
  return async () => {
    try {
      const response = await axios.post("webhook/get-marketorders", { email });
      dispatch(
        webhook.actions.getWebhooksSuccess(response.data.data.existingWebhooks)
      );
    } catch (err) {
      dispatch(webhook.actions.hasError(err));
    }
  };
}

export function getCloseOrders(email: string | undefined) {
  return async () => {
    try {
      const response = await axios.post("webhook/get-closeorders", { email });
      dispatch(
        webhook.actions.getCloseOrdersSuccess(
          response.data.data.existingCloseOrders
        )
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
      dispatch(webhook.actions.hasError(""));
    } catch (err) {
      dispatch(webhook.actions.hasError(err));
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
    } catch (err) {
      dispatch(webhook.actions.hasError(err));
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
      dispatch(webhook.actions.hasError(""));
    } catch (err) {
      dispatch(webhook.actions.hasError(err));
    }
  };
}

export function connectCloseOrder({
  email,
  accountId,
  webhookName,
  webhookMode,
  symbol,
}: {
  email: string;
  accountId: string;
  webhookName: string;
  webhookMode: string;
  symbol: string;
}) {
  return async () => {
    try {
      const response = await axios.post("webhook/connect-closeorder", {
        email,
        accountId,
        webhookName,
        webhookMode,
        symbol,
      });
      dispatch(
        webhook.actions.updateCloseOrderSuccess(
          response.data.data.newCloseOrder
        )
      );
    } catch (err) {
      dispatch(webhook.actions.hasError(err));
    }
  };
}

export function disconnectWebhook({
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
      dispatch(webhook.actions.hasError(""));
    } catch (err) {
      dispatch(webhook.actions.hasError(err));
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
      dispatch(webhook.actions.hasError(""));
    } catch (err) {
      dispatch(webhook.actions.hasError(err));
    }
  };
}

export function addCloseOrder({
  email,
  webhookName,
  webhookMode,
  symbol,
}: {
  email: string;
  webhookName: string;
  webhookMode: string;
  symbol: string;
}) {
  return async () => {
    try {
      const response = await axios.post("webhook/create-closeorder", {
        email,
        webhookName,
        webhookMode,
        symbol,
      });
      dispatch(
        webhook.actions.addCloseOrderSuccess(response.data.data.newCloseOrder)
      );
    } catch (err) {
      dispatch(webhook.actions.hasError(err));
    }
  };
}

export function editCloseOrder({
  email,
  webhookName,
  webhookMode,
  symbol,
  webhookName_new,
  symbol_new,
}: {
  email: string;
  webhookName: string;
  webhookMode: string;
  symbol: string;
  webhookName_new: string;
  symbol_new: string;
}) {
  return async () => {
    try {
      const response = await axios.post("webhook/edit-closeorder", {
        email,
        webhookName,
        webhookMode,
        symbol,
        webhookName_new,
        symbol_new,
      });
      console.log(
        "-------update close order----",
        response.data.data.updatedCloseOrder
      );
      dispatch(
        webhook.actions.updateCloseOrderSuccess(
          response.data.data.updatedCloseOrder
        )
      );
    } catch (err) {
      dispatch(webhook.actions.hasError(err));
    }
  };
}

export function deleteCloseOrder({
  email,
  webhookName,
  webhookMode,
  symbol,
}: {
  email: string;
  webhookName: string;
  webhookMode: string;
  symbol: string;
}) {
  return async () => {
    try {
      const response = await axios.post("webhook/delete-closeorder", {
        email,
        webhookName,
        webhookMode,
        symbol,
      });
      dispatch(
        webhook.actions.deleteCloseOrderSuccess(
          response.data.data.deletedCloseOrder
        )
      );
    } catch (err) {
      dispatch(webhook.actions.hasError(err));
    }
  };
}
export default webhook.reducer;
