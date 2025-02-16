import { createSlice } from "@reduxjs/toolkit";
import axios from "../../utils/api";
import { dispatch } from "../store";
import { CloseOrderStateProps } from "@/types/webhook";
import { toast } from "react-toastify";
const initialState: CloseOrderStateProps = {
  error: null,
  closeOrders: [],
};

const closeOrder = createSlice({
  name: "closeOrder",
  initialState,
  reducers: {
    hasError(state, action) {
      state.error = action.payload;
    },
    getCloseOrdersSuccess(state, action) {
      state.closeOrders = action.payload;
    },
    addCloseOrderSuccess(state, action) {
      state.closeOrders = [...state.closeOrders, action.payload];
    },
    deleteCloseOrderSuccess(state, action) {
      state.closeOrders = state.closeOrders.filter(
        (closeOrder) => closeOrder.id !== action.payload.id
      );
    },
    updateCloseOrderSuccess(state, action) {
      state.closeOrders = state.closeOrders.map((closeOrder) =>
        closeOrder.id === action.payload.id ? action.payload : closeOrder
      );
    },
  },
});

export const {
  hasError,
  getCloseOrdersSuccess,
  addCloseOrderSuccess,
  deleteCloseOrderSuccess,
  updateCloseOrderSuccess,
} = closeOrder.actions;

export function getCloseOrders(email: string | undefined) {
  return async () => {
    try {
      console.log("-------closeOrder----->", email);
      const response = await axios.post("webhook/get-closeorders", { email });
      dispatch(
        closeOrder.actions.getCloseOrdersSuccess(
          response.data.data.existingCloseOrders
        )
      );
    } catch (err) {
      dispatch(closeOrder.actions.hasError(err));
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
        closeOrder.actions.updateCloseOrderSuccess(
          response.data.data.newCloseOrder
        )
      );
      toast.success("This CloseOrder has generated");
    } catch (err) {
      dispatch(closeOrder.actions.hasError(err));
      toast.info("The market is closed");
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
        closeOrder.actions.addCloseOrderSuccess(
          response.data.data.newCloseOrder
        )
      );
      toast.success("New CloseOrder is added");
    } catch (err) {
      dispatch(closeOrder.actions.hasError(err));
      toast.warn("Internal Server Error");
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
      dispatch(
        closeOrder.actions.updateCloseOrderSuccess(
          response.data.data.updatedCloseOrder
        )
      );
      toast.success("The CloseOrder is updated");
    } catch (err) {
      dispatch(closeOrder.actions.hasError(err));
      toast.warn("Internal Server Error");
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
        closeOrder.actions.deleteCloseOrderSuccess(
          response.data.data.deletedCloseOrder
        )
      );
      toast.success("The CloseOrder is deleted");
    } catch (err) {
      dispatch(closeOrder.actions.hasError(err));
      toast.warn("Internal Server Error");
    }
  };
}

export function disconnectCloseOrder({
  accountId,
  webhookName,
  symbol,
  webhookMode,
}: {
  accountId: string;
  webhookName: string;
  symbol: string;
  webhookMode: string;
}) {
  return async () => {
    try {
      const response = await axios.post("webhook/disconnect-closeorder", {
        accountId,
        webhookName,
        symbol,
        webhookMode,
      });
      dispatch(
        closeOrder.actions.updateCloseOrderSuccess(
          response.data.data.updatedCloseOrder
        )
      );
      dispatch(closeOrder.actions.hasError(""));
      toast.success("This CloseOrder has disconnected");
    } catch (err) {
      dispatch(closeOrder.actions.hasError(err));
      toast.warn("Internal Server Error");
    }
  };
}

export default closeOrder.reducer;
