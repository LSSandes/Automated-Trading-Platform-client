import { createSlice } from "@reduxjs/toolkit";
import axios from "../../utils/api";
import { dispatch } from "../store";
import { TradesStateProps } from "@/types/trade";

const initialState: TradesStateProps = {
  error: null,
  tradelockerOrdersHistory: [],
};

const trade = createSlice({
  name: "trade",
  initialState,
  reducers: {
    hasError(state, action) {
      state.error = action.payload;
    },
    getTradelockerOrdersHistorySuccess(state, action) {
      state.tradelockerOrdersHistory = action.payload;
    },
  },
});

export const { hasError, getTradelockerOrdersHistorySuccess } = trade.actions;

export function getTradelockerOrdersHistory({
  accessToken,
  accountId,
  accNum,
  accountType,
}: {
  accessToken: string;
  accountId: string;
  accNum: string;
  accountType: string;
}) {
  return async () => {
    try {
      const response = await axios.post("/trade/tradelocker/getTrades", {
        accessToken,
        accountId,
        accNum,
        accountType,
      });
      dispatch(
        getTradelockerOrdersHistorySuccess(response.data.data.ordersHistory)
      );
    } catch (err) {
      dispatch(trade.actions.hasError(err));
    }
  };
}

export default trade.reducer;
