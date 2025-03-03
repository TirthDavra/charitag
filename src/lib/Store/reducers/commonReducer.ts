import { combineReducers } from "@reduxjs/toolkit";
import footerReducer from "../slices/commonFeatures/footerSlice";
import { notificationsReducer } from "../slices/commonFeatures/notificationsSlice";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { cmSupportReducer } from "../slices/commonFeatures/merchantConsumerSupportChatSlice";
import { userInfoReducer } from "../slices/commonFeatures/userInfoSlice";
import { adminSupportReducer } from "../slices/commonFeatures/adminSupportSlice";

// Define the persist configuration for the footer slice
const footerPersistConfig = {
  key: "footer",
  storage,
  version: 1,
};

// Create a persisted reducer for the footer slice
const persistedFooterReducer = persistReducer(
  footerPersistConfig,
  footerReducer,
);

const commonReducer = combineReducers({
  footer: persistedFooterReducer, // Use the persisted footer reducer here
  notifications: notificationsReducer,
  cmSupport: cmSupportReducer,
  userInfo: userInfoReducer,
  adminSupport: adminSupportReducer,
});

export default commonReducer;
