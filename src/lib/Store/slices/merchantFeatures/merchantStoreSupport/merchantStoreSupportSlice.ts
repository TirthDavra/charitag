import { IConsumerChatistoryData } from "@/api/merchant/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IMerchantStoreSupportState {
  init: boolean;
  storeSupport: IConsumerChatistoryData[];
}

const initialState: IMerchantStoreSupportState = {
  init: false,
  storeSupport: [],
};

export const merchantStoreSupportSlice = createSlice({
  name: "merchantStoreSupport",
  initialState,
  reducers: {
    setStoreSupportChatHistoryData: (
      state,
      action: PayloadAction<IConsumerChatistoryData[]>,
    ) => {
      state.storeSupport = action.payload;
      state.init = true;
    },
    addMessageToStoreSupportChatHistory: (
      state,
      action: PayloadAction<IConsumerChatistoryData>,
    ) => {
      state.storeSupport.push(action.payload);
    },
  },
});

export const {
  setStoreSupportChatHistoryData,
  addMessageToStoreSupportChatHistory,
} = merchantStoreSupportSlice.actions;
export const merchantStoreSupportReducer = merchantStoreSupportSlice.reducer;
