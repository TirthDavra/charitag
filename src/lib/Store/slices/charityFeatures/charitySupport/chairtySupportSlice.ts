import { IGetSupportMessages } from "@/api/charity/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface IChatHistoryDataState {
  init: boolean;
  chatHistory: IGetSupportMessages[];
  userTyping: string | null;
}
const initialState: IChatHistoryDataState = {
  init: false,
  chatHistory: [],
  userTyping: null,
};

export const getChatHistorySlice = createSlice({
  name: "chatHistory",
  initialState,
  reducers: {
    setCharityChatHistoryData: (
      state,
      action: PayloadAction<IGetSupportMessages[]>,
    ) => {
      state.chatHistory = action.payload;
      state.init = true;
    },
    addMessageToCharityChatHistory: (
      state,
      action: PayloadAction<IGetSupportMessages>,
    ) => {
      state.chatHistory.push(action.payload);
    },
    setUserTyping: (state, action: PayloadAction<string | null>) => {
      state.userTyping = action.payload;
    },
  },
});

export const {
  setCharityChatHistoryData,
  addMessageToCharityChatHistory,
  setUserTyping,
} = getChatHistorySlice.actions;
export const chatHistoryCharityReducer = getChatHistorySlice.reducer;
