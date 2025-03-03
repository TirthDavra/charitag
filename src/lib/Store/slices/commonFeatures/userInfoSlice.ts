import { IUserDetails } from "@/api/auth/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IUserState {
  userDetails: IUserDetails | null;
}

const initialState: IUserState = {
  userDetails: null,
};

export const userInfoSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    setUserDetails(
      state,
      action: PayloadAction<{ data: IUserDetails | null }>,
    ) {
      state.userDetails = action.payload.data;
    },
  },
});

export const { setUserDetails } = userInfoSlice.actions;
export const userInfoReducer = userInfoSlice.reducer;
