import { combineReducers } from "@reduxjs/toolkit";
import merchantInfoReducer from "../slices/merchantFeatures/merchantProfile/merchantInfoSlice";
import { merchantStoreSupportReducer } from "../slices/merchantFeatures/merchantStoreSupport/merchantStoreSupportSlice";

const merchantReducer = combineReducers({
  merchantInfo: merchantInfoReducer,
  merchantStoreSupport: merchantStoreSupportReducer,
});

export default merchantReducer;
