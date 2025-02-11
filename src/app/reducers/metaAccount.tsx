import { createSlice } from "@reduxjs/toolkit";
import axios from "../../utils/api";
import { dispatch } from "../store";
import { MetaAccountStateProps } from "@/types/metaAccount";
const initialState: MetaAccountStateProps = {
  error: null,
  accounts: [],
};

const metaAccount = createSlice({
  name: "metaAccount",
  initialState,
  reducers: {
    hasError(state, action) {
      state.error = action.payload;
    },
    getAccountsSuccess(state, action) {
      state.accounts = action.payload;
    },
    addAccountSuccess(state, action) {
      state.accounts = [...state.accounts, action.payload];
    },
    deleteAccountSuccess(state, action) {
      const deletedAccount = action.payload;
      state.accounts = state.accounts.filter(
        (account) => account.accountId !== deletedAccount.accountId
      );
    },
    updateAccountSuccess(state, action) {
      state.accounts = state.accounts.map((account) =>
        account.accountId === action.payload.accountId
          ? action.payload
          : account
      );
    },
  },
});

export const { hasError, getAccountsSuccess, addAccountSuccess } =
  metaAccount.actions;

export function getAccounts(email: string) {
  return async () => {
    try {
      const response = await axios.post("meta/get-accounts", { email });
      dispatch(
        metaAccount.actions.getAccountsSuccess(response.data.data.accounts)
      );
    } catch (err) {
      dispatch(metaAccount.actions.hasError(err));
    }
  };
}

export function addAccount({
  email,
  // broker,
  // name,
  login,
  password,
  server,
  platform,
}: {
  email: string;
  // broker: string;
  // name: string;
  login: string;
  password: string;
  server: string;
  platform: string;
}) {
  console.log(
    "redux--add--account-->",
    email,
    // broker,
    // name,
    login,
    password,
    server,
    platform
  );
  return async () => {
    try {
      const response = await axios.post("meta/create-account", {
        email,
        // broker,
        // name,
        login,
        password,
        server,
        platform,
      });
      dispatch(
        metaAccount.actions.addAccountSuccess(response.data.data.newAccount)
      );
    } catch (err) {
      dispatch(metaAccount.actions.hasError(err));
    }
  };
}

export function deleteAccount(accountId: string) {
  return async () => {
    try {
      const response = await axios.post("meta/delete-account", { accountId });
      dispatch(
        metaAccount.actions.deleteAccountSuccess(
          response.data.data.deletedAccount
        )
      );
    } catch (err) {
      dispatch(metaAccount.actions.hasError(err));
    }
  };
}

export function updateAccount({
  name,
  accountId,
  password,
  server,
}: {
  name: string;
  accountId: string;
  password: string;
  server: string;
}) {
  return async () => {
    try {
      const response = await axios.post("meta/update-account", {
        name,
        accountId,
        password,
        server,
      });
      dispatch(
        metaAccount.actions.updateAccountSuccess(response.data.data.updatedAccount)
      );
    } catch (err) {
      dispatch(metaAccount.actions.hasError(err));
    }
  };
}
export default metaAccount.reducer;
