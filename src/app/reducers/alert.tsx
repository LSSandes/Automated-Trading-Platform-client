import { createSlice } from "@reduxjs/toolkit";
import axios from "../../utils/api";
import { dispatch } from "../store";
import { AlertStateProps } from "@/types/alert";
import { toast } from "react-toastify";

const initialState: AlertStateProps = {
  error: null,
  alerts: [],
};

const alert = createSlice({
  name: "alert",
  initialState,
  reducers: {
    hasError(state, action) {
      state.error = action.payload;
    },
    getAlertsSuccess(state, action) {
      state.alerts = action.payload;
    },
    addAlertSuccess(state, action) {
      state.alerts = [...state.alerts, action.payload];
    },
    updateAlertSuccess(state, action) {
      state.alerts = state.alerts.map((alert) =>
        alert.id === action.payload.id ? action.payload : alert
      );
    },
  },
});

export const { hasError, getAlertsSuccess } = alert.actions;

export function getAlerts(email: string) {
  return async () => {
    try {
      console.log("----------alert email----->", email);
      const response = await axios.post("alert/get/allAlerts", {
        email,
      });
      dispatch(alert.actions.getAlertsSuccess(response.data.data.alerts));
      console.log("--------alerts 1------->", response.data.data.alerts);
    } catch (err: any) {
      dispatch(alert.actions.hasError(err.response.data.message));
      toast.warn(err.response.data.message);
    }
  };
}

export function addAlert(newAlert: any) {
  return async () => {
    try {
      console.log("-------new alert redux-------->", newAlert.newAlert);
      dispatch(alert.actions.addAlertSuccess(newAlert.newAlert));
    } catch (err) {
      dispatch(alert.actions.hasError(err));
    }
  };
}

export function updateAlert(updatedAlert: any) {
  return async () => {
    try {
      console.log(
        "-------updated alert redux-------->",
        updatedAlert.updatedAlert
      );
      dispatch(alert.actions.updateAlertSuccess(updatedAlert.updatedAlert));
    } catch (err) {
      dispatch(alert.actions.hasError(err));
    }
  };
}

export function updateAlertView(email: string) {
  return async () => {
    try {
      const response = await axios.post("alert/update/alert", {
        email,
      });
      console.log("updated alerts------>", response.data.data.alerts);
      dispatch(alert.actions.getAlertsSuccess(response.data.data.alerts));
    } catch (err) {
      dispatch(alert.actions.hasError(err));
    }
  };
}

export default alert.reducer;
