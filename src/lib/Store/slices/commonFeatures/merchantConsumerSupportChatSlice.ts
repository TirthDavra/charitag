import { ICMChatistoryData } from "@/api/merchant/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ICMSupportState {
  init: boolean;
  supportChat: ICMChatistoryData[];
}

const initialState: ICMSupportState = {
  init: false,
  supportChat: [],
};

export const cmSupportSlice = createSlice({
  name: "merchantStoreSupport",
  initialState,
  reducers: {
    setCMSupportChatHistoryData: (
      state,
      action: PayloadAction<ICMChatistoryData[]>,
    ) => {
      state.supportChat = action.payload;
      state.init = true;
    },
    addMessageToCMSupportChatHistory: (
      state,
      action: PayloadAction<ICMChatistoryData>,
    ) => {
      state.supportChat.push(action.payload);
    },
  },
});

export const { setCMSupportChatHistoryData, addMessageToCMSupportChatHistory } =
  cmSupportSlice.actions;
export const cmSupportReducer = cmSupportSlice.reducer;
