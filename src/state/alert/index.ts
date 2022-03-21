import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AlertState {
  alert?: JSX.Element | null;
  navigation?: boolean | null;
}

const initialState: AlertState = {
  alert: null,
  navigation: false,
};

export const alertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    setAlert: (state, action: PayloadAction<JSX.Element>) => {
      state.alert = action.payload;
    },
    clearAlert: (state) => {
      state.alert = null;
    },
    setNavigation: (state, action: PayloadAction<boolean>) => {
      state.navigation = action.payload;
    },
  },
});

export const { setAlert, clearAlert, setNavigation } = alertSlice.actions;

export default alertSlice.reducer;
