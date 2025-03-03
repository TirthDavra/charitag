import { IDatum } from "@/api/common/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IWishlistState {
  subItem: IDatum[];
  init: boolean;
}

const initialState: IWishlistState = {
  subItem: [],
  init: false,
};

export const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    setWishlist: (
      state,
      action: PayloadAction<{ data: IDatum[]; init: boolean }>,
    ) => {
      state.subItem = action.payload.data;
      state.init = action.payload.init;
      return state;
    },
    addSubItem: (state, action: PayloadAction<number>) => {
      const updatedItems = state.subItem.map((item) =>
        item.id === action.payload
          ? {
              ...item,
              wishlist_count: item.wishlist_count + 1,
            }
          : item,
      );
      state.subItem = updatedItems;
    },

    deleteSubItem: (state, action: PayloadAction<number>) => {
      const updatedItems = state.subItem.map((item) =>
        item.id === action.payload
          ? {
              ...item,
              wishlist_count: item.wishlist_count - 1,
            }
          : item,
      );
      state.subItem = updatedItems;
    },
    // deleteAllSubItem: (state, action: PayloadAction<number>) => {
    //   const updatedItems = state.subItem.map((item) =>
    //     item.id === action.payload
    //       ? {
    //           ...item,
    //           wishlist_count: 0,
    //         }
    //       : item,
    //   );
    //   state.subItem = updatedItems;
    // },
    addNewSubItem: (state, action: PayloadAction<IDatum>) => {
      state.subItem = [...state.subItem, action.payload];
    },
    deleteWishlist: (state, action: PayloadAction<number>) => {
      state.subItem = state.subItem.filter(
        (item) => item.id !== action.payload,
      );
    },
  },
});

export const {
  setWishlist,
  addSubItem,
  deleteSubItem,
  // deleteAllSubItem,
  addNewSubItem,
  deleteWishlist,
} = wishlistSlice.actions;

const wishlistReducer = wishlistSlice.reducer;
export default wishlistReducer;
