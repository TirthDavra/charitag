import { IAdminChatistoryData } from "@/api/common/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IAdminSupportState {
  init: boolean;
  supportChat: IAdminChatistoryData[];
  userTyping: string | null;
}

const initialState: IAdminSupportState = {
  init: false,
  supportChat: [],
  userTyping: null,
};

export const adminSupportSlice = createSlice({
  name: "adminSupport",
  initialState,
  reducers: {
    setAdminSupportChatHistoryData: (
      state,
      action: PayloadAction<IAdminChatistoryData[]>,
    ) => {
      state.supportChat = action.payload;
      state.init = true;
    },
    addMessageToAdminSupportChatHistory: (
      state,
      action: PayloadAction<IAdminChatistoryData>,
    ) => {
      state.supportChat.push(action.payload);
    },
    setUserTyping: (state, action: PayloadAction<string | null>) => {
      state.userTyping = action.payload;
    },
  },
});

export const {
  setAdminSupportChatHistoryData,
  addMessageToAdminSupportChatHistory,
  setUserTyping,
} = adminSupportSlice.actions;
export const adminSupportReducer = adminSupportSlice.reducer;
