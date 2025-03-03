import { combineReducers } from "@reduxjs/toolkit";
import managePaymentMethodsReducer from "../slices/consumerFeatures/paymentMethod/paymentMethodSlice";
import notificationsConsumerReducer from "../slices/consumerFeatures/notification/notificationSlice";
import wishlistReducer from "../slices/consumerFeatures/wishlist/wishlistSlice";
import manageAllAddressReducer from "../slices/consumerFeatures/address/address";
import { chatHistoryConsumerReducer } from "../slices/consumerFeatures/consumerSupport/consumerSupportSlice";
import cartReducer from "../slices/consumerFeatures/cart/cartSlice";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

// Define the persist configuration for the cart slice
const cartPersistConfig = {
  key: "cart",
  storage,
  version: 1,
  blacklist: ["currentStep"],
};

// Create a persisted reducer for the cart slice
const persistedCartReducer = persistReducer(cartPersistConfig, cartReducer);

const consumerReducer = combineReducers({
  paymentMethods: managePaymentMethodsReducer,
  ConsumerNotifications: notificationsConsumerReducer,
  address: manageAllAddressReducer,
  wishlist: wishlistReducer,
  consumerChat: chatHistoryConsumerReducer,
  cart: persistedCartReducer, // Use the persisted cart reducer here
});

export default consumerReducer;
