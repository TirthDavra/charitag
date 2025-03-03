import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IPaymentsMethods } from "@/components/consumer/PaymentMethods/types";

export interface IAuthState {
  allPaymentMethods: IPaymentsMethods[];
  init: boolean;
}

const initialState: IAuthState = {
  allPaymentMethods: [],
  init: false,
};

export const managePaymentMethodsSlice = createSlice({
  name: "paymentMethods",
  initialState,
  reducers: {
    setPaymentMethods: (
      state,
      action: PayloadAction<{ data: IPaymentsMethods[]; init: boolean }>,
    ) => {
      state.allPaymentMethods = action.payload.data;
      state.init = action.payload.init;
      return state;
    },
    addPaymentMethod: (state, action: PayloadAction<IPaymentsMethods>) => {
      state.allPaymentMethods.push(action.payload);
    },
    updatePaymentMethod: (
      state,
      action: PayloadAction<{ id: number; updatedMethod: IPaymentsMethods }>,
    ) => {
      const { id, updatedMethod } = action.payload;
      const index = state.allPaymentMethods.findIndex(
        (method) => method.id === id,
      );
      if (index !== -1) {
        state.allPaymentMethods[index] = updatedMethod;
      }
    },
    deletePaymentMethod: (state, action: PayloadAction<number>) => {
      state.allPaymentMethods = state.allPaymentMethods.filter(
        (method) => method.id !== action.payload,
      );

      return state;
    },
  },
});

export const {
  setPaymentMethods,
  addPaymentMethod,
  updatePaymentMethod,
  deletePaymentMethod,
} = managePaymentMethodsSlice.actions;

const managePaymentMethodsReducer = managePaymentMethodsSlice.reducer;
export default managePaymentMethodsReducer;
