import { useDispatch, useSelector, useStore } from "react-redux";
import { AppDispatch, AppStore, RootState } from "./store";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppStore = useStore.withTypes<AppStore>();

// Custom hooks for each user state
export const useAppSelectorMerchant = <T>(
  adminSelector: (charity: RootState["merchant"]) => T,
) => {
  return useAppSelector((state) => adminSelector(state.merchant));
};

export const useAppSelectorCharity = <T>(
  charitySelector: (charity: RootState["charity"]) => T,
) => {
  return useAppSelector((state) => charitySelector(state.charity));
};

export const useAppSelectorConsumer = <T>(
  consumerSelector: (consumer: RootState["consumer"]) => T,
) => {
  return useAppSelector((state) => consumerSelector(state.consumer));
};
export const useAppSelectorCorporation = <T>(
  corporationSelector: (Corporation: RootState["corporation"]) => T,
) => {
  return useAppSelector((state) => corporationSelector(state.corporation));
};
export const useAppSelectorCommon = <T>(
  commonSelector: (Common: RootState["common"]) => T,
) => {
  return useAppSelector((state) => commonSelector(state.common));
};
