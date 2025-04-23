import { createSlice } from "@reduxjs/toolkit";
import axios from "../../utils/api";
import { dispatch } from "../store";
import { TradesStateProps } from "@/types/trade";
import { toast } from "react-toastify";

const initialState: TradesStateProps = {
  error: null,
  tradelockerOrdersHistory: [],
  totalTradesStats: {
    totalProfit: 0,
    averageProfit: 0,
    totalTrades: 0,
    avgTradeDuration: 0,
    totalLots: 0,
    bestTrade: 0,
    worstTrade: 0,
    averageRRRatio: 0,
    currentMonthProfit: 0,
    currentMonthLots: 0,
    currentMonthTrades: 0,
    profitPercent: 0,
    lotsPercent: 0,
    tradesPercent: 0,
    winRate: 0,
    lossRate: 0,
    wonTrades: 0,
    lostTrades: 0,
    profitFactor: 0,
    cagr: 0,
    riskScore: "",
    maxDrawdown: 0,
    sharpeRatio: 0,
    sortinoRatio: 0,
    winLossRatio: 0,
    recoveryFactor: 0,
    avgPositionSize: 0,
    marginLevel: 0,
    freeMargin: 0,
    marginUsage: 0,
  },
  monthStats: {},
  positionsMetatrader: [],
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
    getTotalTradesStatsSuccess(state, action) {
      state.totalTradesStats = action.payload;
    },
    getCalendarTradesStatsSuccess(state, action) {
      state.monthStats = action.payload;
    },
    getActivePositionsSuccess(state, action) {
      state.positionsMetatrader = action.payload;
    },
  },
});

export const {
  hasError,
  getTradelockerOrdersHistorySuccess,
  getTotalTradesStatsSuccess,
  getCalendarTradesStatsSuccess,
} = trade.actions;

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
    } catch (err: any) {
      dispatch(trade.actions.hasError(err.response.data.message));
      toast.warn(err.response.data.message);
    }
  };
}

export function getTotalTradesStats({ accountId }: { accountId: string }) {
  return async () => {
    try {
      const response = await axios.post("/trade/meta/totalTradesStats", {
        accountId,
      });
      dispatch(getTotalTradesStatsSuccess(response.data.data));
    } catch (err: any) {
      toast.warn(err.response.data.message);
    }
  };
}

export function getCalendarTradesStats({
  currentDate,
  accountId,
}: {
  currentDate: string;
  accountId: string;
}) {
  return async () => {
    try {
      const response = await axios.post("/trade/meta/calendarTradesStats", {
        currentDate,
        accountId,
      });
      dispatch(getCalendarTradesStatsSuccess(response.data.data.monthStats));
    } catch (err: any) {
      toast.warn(err.response.data.message);
    }
  };
}

export function getActivePositionsMetatrader({ accountId }: { accountId: string }) {
  return async () => {
    try {
      const response = await axios.post("/trade/meta/getTrades", { accountId });
      console.log("redux-active-positions--->", response.data.data);
      dispatch(
        trade.actions.getActivePositionsSuccess(
          response.data.data.filteredPositions
        )
      );
    } catch (err: any) {
      dispatch(trade.actions.hasError(err.response.data.message));
    }
  };
}

export default trade.reducer;
