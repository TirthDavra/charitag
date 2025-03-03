import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IPaymentsMethods } from "@/components/consumer/PaymentMethods/types";
import { ISavedAddress } from "@/api/consumer/types";

export interface IAuthState {
  allAddress: ISavedAddress[];
  init: boolean;
}

const initialState: IAuthState = {
  allAddress: [],
  init: false,
};

export const manageallAddressSlice = createSlice({
  name: "allAddress",
  initialState,
  reducers: {
    setallAddress: (
      state,
      action: PayloadAction<{ data: ISavedAddress[]; init: boolean }>,
    ) => {
      state.allAddress = action.payload.data;
      state.init = action.payload.init;
      return state;
    },
    addallAddress: (state, action: PayloadAction<ISavedAddress>) => {
      state.allAddress.push(action.payload);
    },
    updateallAddress: (
      state,
      action: PayloadAction<{ id: number; updatedMethod: ISavedAddress }>,
    ) => {
      const { id, updatedMethod } = action.payload;
      const index = state.allAddress.findIndex((method) => method.id === id);
      if (index !== -1) {
        state.allAddress[index] = updatedMethod;
      }
    },
    deleteallAddress: (state, action: PayloadAction<number>) => {
      state.allAddress = state.allAddress.filter(
        (method) => method.id !== action.payload,
      );
      return state;
    },
  },
});

export const {
  setallAddress,
  addallAddress,
  updateallAddress,
  deleteallAddress,
} = manageallAddressSlice.actions;

const manageAllAddressReducer = manageallAddressSlice.reducer;
export default manageAllAddressReducer;
