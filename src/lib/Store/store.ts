import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import charityReducer from "./reducers/charityReducer";
import merchantReducer from "./reducers/merchantReducer";
import corporationReducer from "./reducers/corporationReducer";
import consumerReducer from "./reducers/consumerReducer";
import commonReducer from "./reducers/commonReducer";

const makeStore = () => {
  return configureStore({
    reducer: {
      charity: charityReducer,
      merchant: merchantReducer,
      corporation: corporationReducer,
      consumer: consumerReducer,
      common: commonReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
    devTools: process.env.NODE_ENV !== "production",
  });
};
let store: AppStore;
export const getStore = () => {
  if (!store) store = makeStore();
  return store;
};

// Create a persistor
export const persistor = persistStore(getStore());

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
