import { createSlice } from "@reduxjs/toolkit";
import axios from "../../utils/api";
import { dispatch } from "../store";
import { MetaAccountStateProps } from "@/types/metaAccount";
import { toast } from "react-toastify";
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
      dispatch(metaAccount.actions.hasError(""));
    } catch (err: any) {
      dispatch(metaAccount.actions.hasError(err.response.data.message));
    }
  };
}

export function addAccount({
  email,
  login,
  password,
  server,
  platform,
  whopToken,
}: {
  email: string;
  login: string;
  password: string;
  server: string;
  platform: string;
  whopToken: string;
}) {
  return async () => {
    try {
      const response = await axios.post("meta/create-account", {
        email,
        login,
        password,
        server,
        platform,
        whopToken,
      });
      dispatch(
        metaAccount.actions.addAccountSuccess(response.data.data.newAccount)
      );
      dispatch(metaAccount.actions.hasError(null));
      toast.success("New Account has added");
    } catch (err: any) {
      dispatch(metaAccount.actions.hasError(err.response.data.message));
      toast.warn(err.response.data.message);
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
      dispatch(metaAccount.actions.hasError(null));
      toast.success("Account has deleted");
    } catch (err: any) {
      dispatch(metaAccount.actions.hasError(err.response.data.message));
      toast.warn(err.response.data.message);
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
        metaAccount.actions.updateAccountSuccess(
          response.data.data.updatedAccount
        )
      );
      dispatch(metaAccount.actions.hasError(null));
      toast.success("Account has updated");
    } catch (err) {
      dispatch(metaAccount.actions.hasError(err));
      toast.warn("Internal Server Error");
    }
  };
}
export default metaAccount.reducer;
