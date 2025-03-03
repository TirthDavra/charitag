import { INotificationsData } from "@/api/common/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface INotificationsState {
  notifications: INotificationsData[];
  modalNotifications: INotificationsData[];
  modalInit: boolean;
  init: boolean;
  count: number;
  total: number;
}

const initialState: INotificationsState = {
  notifications: [],
  modalNotifications: [],
  count: 0,
  modalInit: false,
  init: false,
  total: 0,
};

export const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    setNotification: (
      state,
      action: PayloadAction<{
        data: INotificationsData[];
        init: boolean;
        total: number;
      }>,
    ) => {
      state.notifications = action.payload.data;
      state.init = action.payload.init;
      state.total = action.payload.total;
    },
    addNotification: (
      state,
      action: PayloadAction<{
        data: INotificationsData;
      }>,
    ) => {
      state.notifications = [
        action.payload.data,
        ...(state.notifications.length > 9
          ? state.notifications.slice(0, state.notifications.length - 1)
          : state.notifications),
      ];

      state.modalNotifications = [
        action.payload.data,
        ...state.modalNotifications,
      ];
      state.total = state.total + 1;
    },
    appendNotification: (
      state,
      action: PayloadAction<{
        data: INotificationsData[];
        total: number;
        isSelectedRemove: boolean;
      }>,
    ) => {
      state.notifications = action.payload.isSelectedRemove
        ? action.payload.data
        : [...state.notifications, ...action.payload.data];
      state.total = action.payload.total;
    },

    setCount: (state, action: PayloadAction<number>) => {
      state.count = action.payload;
    },
    incrementCount: (state) => {
      state.count = state.count + 1;
    },
    decrementMultipleCount: (state, action: PayloadAction<number>) => {
      state.count = state.count - action.payload;
    },
    removeNotification: (state, action: PayloadAction<number>) => {
      state.notifications = state.notifications.filter(
        (item) => item.id !== action.payload,
      );
      state.total = state.total - 1;
    },

    removeSelectedNotifications: (
      state,
      action: PayloadAction<Set<number>>,
    ) => {
      state.notifications = state.notifications.filter(
        (item) => !action.payload.has(item.id),
      );
      state.total = state.total - action.payload.size;
    },
    markAsReadNotifications: (state, action: PayloadAction<string[]>) => {
      const idsToMarkAsRead = new Set(action.payload);

      state.notifications = state.notifications.map((item) => {
        if (idsToMarkAsRead.has(item.id.toString())) {
          item.mark_as_read = true;
        }
        return item;
      });
    },
    markAsAllReadNotifications: (state) => {
      state.notifications = state.notifications.map((item) => {
        item.mark_as_read = true;
        return item;
      });
      state.modalNotifications = state.modalNotifications.map((item) => {
        item.mark_as_read = true;
        return item;
      });
    },

    setModalNotification: (
      state,
      action: PayloadAction<INotificationsData[]>,
    ) => {
      state.modalNotifications = action.payload;
      state.modalInit = true;
    },
    appendNotificationModal: (
      state,
      action: PayloadAction<INotificationsData>,
    ) => {
      state.modalNotifications = [action.payload, ...state.modalNotifications];
    },
    removeNotificationModal: (state, action: PayloadAction<number>) => {
      state.modalNotifications = state.modalNotifications.filter(
        (item) => item.id !== action.payload,
      );
    },
    markAsAllReadNotificationsModal: (state) => {
      state.modalNotifications = state.modalNotifications.map((item) => {
        item.mark_as_read = true;
        return item;
      });
    },
  },
});

export const {
  setNotification,
  removeNotification,
  markAsReadNotifications,
  removeSelectedNotifications,
  markAsAllReadNotifications,
  setCount,
  incrementCount,
  appendNotification,
  addNotification,
  setModalNotification,
  appendNotificationModal,
  removeNotificationModal,
  decrementMultipleCount,
} = notificationsSlice.actions;

export const notificationsReducer = notificationsSlice.reducer;
