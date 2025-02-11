import { createSlice } from "@reduxjs/toolkit";
import axios from "../../utils/api";
import { dispatch } from "../store";
import { MetaAccountInfoProps } from "@/types/metaAccount";
const initialState: MetaAccountInfoProps = {
  error: null,
  accountsInfo: [],
};
const metaAccountInfo = createSlice({
  name: "metaAccountInfo",
  initialState,
  reducers: {
    hasError(state, action) {
      state.error = action.payload;
    },
    getAccountsInfoSuccess(state, action) {
      state.accountsInfo = [...state.accountsInfo, action.payload];
    },
    udpateAccountInfoSuccess(state, action) {
      const updatedAccount = action.payload;
      const index = state.accountsInfo.findIndex(
        (account) => account.login == updatedAccount.login
      );
      if (index !== -1) {
        state.accountsInfo[index] = updatedAccount;
      }
    },
  },
});

export const { hasError, getAccountsInfoSuccess } = metaAccountInfo.actions;

export function getAccountsInfo(accountId: string) {
  return async () => {
    try {
      const response = await axios.post("meta/get-accountInfo", { accountId });
      dispatch(
        metaAccountInfo.actions.getAccountsInfoSuccess(
          response.data.data.accountInformation
        )
      );
    } catch (err) {
      dispatch(metaAccountInfo.actions.hasError(err));
    }
  };
}

export function updateAccountInfo(accountId: string) {
  return async () => {
    try {
      const response = await axios.post("meta/get-accountInfo", { accountId });
      dispatch(
        metaAccountInfo.actions.udpateAccountInfoSuccess(
          response.data.data.accountInformation
        )
      );
    } catch (err) {
      dispatch(metaAccountInfo.actions.hasError(err));
    }
  };
}

export default metaAccountInfo.reducer;
