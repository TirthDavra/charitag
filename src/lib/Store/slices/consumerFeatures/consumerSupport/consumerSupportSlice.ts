import { IChatHistoryData } from "@/components/consumer/Orders/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface IChatHistoryDataState {
  init: boolean;
  chatHistory: IChatHistoryData[];
}
const initialState: IChatHistoryDataState = {
  init: false,
  chatHistory: [],
};

export const getChatHistorySlice = createSlice({
  name: "chatHistory",
  initialState,
  reducers: {
    setConsumerChatHistoryData: (
      state,
      action: PayloadAction<IChatHistoryData[]>,
    ) => {
      state.chatHistory = action.payload;
      state.init = true;
    },
    addMessageToConsumerChatHistory: (
      state,
      action: PayloadAction<IChatHistoryData>,
    ) => {
      state.chatHistory.push(action.payload);
    },
  },
});

export const { setConsumerChatHistoryData, addMessageToConsumerChatHistory } =
  getChatHistorySlice.actions;
export const chatHistoryConsumerReducer = getChatHistorySlice.reducer;
