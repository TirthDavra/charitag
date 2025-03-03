import { ICategories } from "@/api/auth/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IFooterState {
  categories: ICategories[];
  init: boolean;
}

const initialState: IFooterState = {
  categories: [],
  init: false,
};

export const footerSlice = createSlice({
  name: "footer",
  initialState,
  reducers: {
    setCategories: (
      state,
      action: PayloadAction<{ data: ICategories[]; init: boolean }>,
    ) => {
      state.categories = action.payload.data;
      state.init = action.payload.init;
      return state;
    },
  },
});

export const { setCategories } = footerSlice.actions;

const footerReducer = footerSlice.reducer;
export default footerReducer;
