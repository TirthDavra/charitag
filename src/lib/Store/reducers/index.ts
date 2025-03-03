import { combineReducers } from "@reduxjs/toolkit";
import charityReducer from "./charityReducer";
import merchantReducer from "./merchantReducer";
import corporataionReducer from "./corporationReducer";
import consumerReducer from "./consumerReducer";
import commonReducer from "./commonReducer";

const rootReducer = combineReducers({
  charity: charityReducer,
  merchant: merchantReducer,
  corporation: corporataionReducer,
  consumer: consumerReducer,
  common: commonReducer,
});

export default rootReducer;
