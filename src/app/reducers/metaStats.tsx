import { createSlice } from "@reduxjs/toolkit";
import axios from "../../utils/api";
import { dispatch } from "../store";
import { MetaStatsStateProps } from "@/types/metaStats";

const initialState: MetaStatsStateProps = {
  error: null,
  stats: [],
  won_lost: [],
  trades_by_week: [],
  trades_by_hour: [],
};

const metaStats = createSlice({
  name: "metaStats",
  initialState,
  reducers: {
    hasError(state, action) {
      state.error = action.payload;
    },
    getMetaStatsSuccess(state, action) {
      state.stats = action.payload;
    },
    getVisualStatsSuccess(state, action) {
      state.won_lost = action.payload.won_lost;
      state.trades_by_week = action.payload.trades_by_week;
      state.trades_by_hour = action.payload.trades_by_hour;
    },
  },
});

export const { hasError, getMetaStatsSuccess } = metaStats.actions;

export function getMetaStats(accountId: string, email: string) {
  return async () => {
    try {
      const response = await axios.post("metaStats/trades", {
        accountId,
        email,
      });
      const trades = response.data.data.trades;
      dispatch(metaStats.actions.getMetaStatsSuccess(trades));
    } catch (err) {
      dispatch(metaStats.actions.hasError(err));
    }
  };
}

export function getVisualStats(accountId: string) {
  return async () => {
    try {
      const response = await axios.post("metaStats/visual-stats", {
        accountId,
      });
      dispatch(metaStats.actions.getVisualStatsSuccess(response.data.data));
    } catch (err) {
      dispatch(metaStats.actions.hasError(err));
    }
  };
}

export default metaStats.reducer;
