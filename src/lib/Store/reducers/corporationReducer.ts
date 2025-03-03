import { combineReducers } from "@reduxjs/toolkit";
import corporateInfoReducer from "../slices/corporationFeatures/corporateInfoSlice";

const corporataionReducer = combineReducers({
  corporateInfo: corporateInfoReducer,
});

export default corporataionReducer;
