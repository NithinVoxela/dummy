import { INotification } from "models/notification.model";

export const ADD_NOTIFICATION = "[NOTIFIER] ADD_NOTIFICATION";
export const DELETE_NOTIFICATION = "[NOTIFIER] DELETE_NOTIFICATION";
export const REMOVE_NOTIFICATION = "[NOTIFIER] REMOVE_NOTIFICATION";
export const SWITCH_OFF_NOTIFICATION = "[NOTIFIER] SWITCH_OFF_NOTIFICATION";

export const addNotification = (notification: INotification) => ({
  type: ADD_NOTIFICATION,
  payload: notification
});

export const deleteNotification = (id: string) => ({
  type: DELETE_NOTIFICATION,
  payload: id
});

export const removeNotification = (id: string) => ({
  type: REMOVE_NOTIFICATION,
  payload: id
});

export const switchOffNotification = (id: string) => ({
  type: SWITCH_OFF_NOTIFICATION,
  payload: id
});
