import { combineReducers } from "@reduxjs/toolkit";
import charityInfoReducer from "../slices/charityFeatures/charityProfile/charityInfoSlice";
import { chatHistoryCharityReducer } from "../slices/charityFeatures/charitySupport/chairtySupportSlice";

const charityReducer = combineReducers({
  charityInfo: charityInfoReducer,
  chatHistory: chatHistoryCharityReducer,
});

export default charityReducer;
