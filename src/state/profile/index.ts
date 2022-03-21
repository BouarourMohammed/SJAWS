import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ProfileState {
  user?: any | null;
}

const initialState: ProfileState = {
  user: null,
};

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setProfile: (state, action: PayloadAction<any>) => {
      state.user = action.payload;
    },
    clearProfile: (state) => {
      state.user = null;
    },
  },
});

export const { setProfile, clearProfile } = profileSlice.actions;

export default profileSlice.reducer;
