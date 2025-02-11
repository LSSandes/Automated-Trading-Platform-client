import { createSlice } from "@reduxjs/toolkit";
import axios from "../../utils/api";
import { dispatch } from "../store";
import { MetaVisualTradesProps } from "@/types/metaStats";

const initialState: MetaVisualTradesProps = {
  error: null,
  visualTrades: [],
};

const metaVisualTrades = createSlice({
  name: "metaVisualTrades",
  initialState,
  reducers: {
    hasError(state, action) {
      state.error = action.payload;
    },
    getMetaVisualTradesSuccess(state, action) {
      state.visualTrades = action.payload;
    },
  },
});

export const { hasError, getMetaVisualTradesSuccess } =
  metaVisualTrades.actions;

export function getMetaVisualTrades(
  email: string,
  index: string,
  accountId: string
) {
  return async () => {
    try {
      const response = await axios.post("metaStats/visual-trades", {
        email,
        index,
        accountId,
      });
      dispatch(
        metaVisualTrades.actions.getMetaVisualTradesSuccess(
          response.data.data.finalResult
        )
      );
    } catch (err) {
      dispatch(metaVisualTrades.actions.hasError(err));
    }
  };
}

export default metaVisualTrades.reducer;
