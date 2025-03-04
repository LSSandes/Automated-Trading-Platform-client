import { createSlice } from "@reduxjs/toolkit";
import axios from "../../utils/api";
import { dispatch } from "../store";
import { TradeLockerInfoStateProps } from "@/types/tradeLocker";

const initialState: TradeLockerInfoStateProps = {
  error: null,
  accountInfo: [],
};

const tradelockerInfo = createSlice({
  name: "tradelockerInfo",
  initialState,
  reducers: {
    hasError(state, action) {
      state.error = action.payload;
    },
    getAccountsInfoSuccess(state, action) {
      const isPayloadExist = state.accountInfo.some(
        (accountInfo) =>
          JSON.stringify(accountInfo) === JSON.stringify(action.payload)
      );

      if (!isPayloadExist) {
        state.accountInfo = [...state.accountInfo, action.payload];
      }
    },
  },
});

export const { hasError, getAccountsInfoSuccess } = tradelockerInfo.actions;

export function getAccountInfo({
  accessToken,
  accountType,
  accountId,
  accNum,
}: {
  accessToken: string;
  accountType: string;
  accountId: string;
  accNum: string;
}) {
  return async () => {
    try {
      const response = await axios.post("tradelocker/info", {
        accessToken,
        accountType,
        accountId,
        accNum,
      });
      dispatch(
        tradelockerInfo.actions.getAccountsInfoSuccess(response.data.data)
      );
    } catch (err) {
      dispatch(tradelockerInfo.actions.hasError(err));
    }
  };
}

export default tradelockerInfo.reducer;
