import { createSlice } from "@reduxjs/toolkit";
import axios from "../../utils/api";
import { dispatch } from "../store";
import { MetaTotalStatsStateProps } from "@/types/metaStats";

const initialState: MetaTotalStatsStateProps = {
  error: null,
  totalStats: {
    balance: 0,
    equity: 0,
    profit: 0,
    todayWinRate: 0,
    totalTrades: 0,
    winTrades: 0,
    avgHoldTime: 0,
    successRate: 0,
  },
};

const metaTotalStats = createSlice({
  name: "metaTotalStats",
  initialState,
  reducers: {
    hasError(state, action) {
      state.error = action.payload;
    },
    getMetaTotalStatsSuccess(state, action) {
      state.totalStats = action.payload;
    },
  },
});

export const {hasError, getMetaTotalStatsSuccess} = metaTotalStats.actions;

export function getMetaTotalStats(accountId: string) {
    return async () => {
        try {
            const response = await axios.post("metaStats/total-stats", {accountId});
            dispatch(metaTotalStats.actions.getMetaTotalStatsSuccess(response.data.data.data))
        } catch(err) {
            dispatch(metaTotalStats.actions.hasError(err))
        }
    }
}

export default metaTotalStats.reducer