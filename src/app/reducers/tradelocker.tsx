import { createSlice } from "@reduxjs/toolkit";
import axios from "../../utils/api";
import { dispatch } from "../store";
import { TradeLockerStateProps } from "@/types/tradeLocker";

const initialState: TradeLockerStateProps = {
  error: null,
  accounts: [],
};

const tradelocker = createSlice({
  name: "tradelocker",
  initialState,
  reducers: {
    hasError(state, action) {
      state.error = action.payload;
    },
    getAccountsSuccess(state, action) {
      state.accounts = action.payload;
    },
  },
});

export const { hasError, getAccountsSuccess } = tradelocker.actions;

export function getAccounts({
  accessToken,
  accountType,
}: {
  accessToken: string;
  accountType: string;
}) {
  return async () => {
    try {
      const response = await axios.post("tradelocker/all-accounts", {
        accessToken,
        accountType,
      });
      dispatch(
        tradelocker.actions.getAccountsSuccess(
          response.data.data.accounts.accounts
        )
      );
    } catch (err) {
      dispatch(tradelocker.actions.hasError(err));
    }
  };
}

export default tradelocker.reducer;
