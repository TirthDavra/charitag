import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { NotificationsSettingsState } from "@/components/consumer/NotificationSetting";

export interface IAuthState {
  consumerNotifications: NotificationsSettingsState;
  init: boolean;
}

const initialState: IAuthState = {
  consumerNotifications: {
    newsletter_charity_ids: [],
    category_ids: [],
    charity_ids: [],
    is_newsletter: false,
    is_deals: false,
    is_charity: false,
    is_volunteer_missions: false,
  },
  init: false,
};

export const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    setNotifications: (
      state,
      action: PayloadAction<{
        data: NotificationsSettingsState;
        init: boolean;
      }>,
    ) => {
      state.consumerNotifications = action.payload.data;
      state.init = action.payload.init;
      return state;
    },
    updateNotificationSettings: (
      state,
      action: PayloadAction<Partial<NotificationsSettingsState>>,
    ) => {
      state.consumerNotifications = {
        ...state.consumerNotifications,
        ...action.payload,
      };
    },
  },
});

export const { setNotifications, updateNotificationSettings } =
  notificationsSlice.actions;

const notificationsConsumerReducer = notificationsSlice.reducer;
export default notificationsConsumerReducer;
