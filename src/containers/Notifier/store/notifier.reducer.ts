import { v4 as uuid } from "uuid";

import { INotification } from "models/notification.model";
import { ErrorValues, IStoreAction } from "store/action.model";

import { ADD_NOTIFICATION, DELETE_NOTIFICATION, SWITCH_OFF_NOTIFICATION } from "./notifier.action";

const initialState: INotification[] = [];

export const notifierReducer = (state = initialState, { type, payload } = {} as IStoreAction): INotification[] => {
  switch (type) {
    case ADD_NOTIFICATION:
      if (payload.header === ErrorValues.error && state.some(error => error.message === payload.message)) {
        return state;
      }
      return [...state, { id: uuid(), active: true, ...payload }];
    case SWITCH_OFF_NOTIFICATION: {
      const currentNotification = state.find(notification => notification.id === payload);
      currentNotification.active = false;
      return [...state];
    }
    case DELETE_NOTIFICATION:
      return state.filter(notification => notification.id !== payload);
    default:
      return state;
  }
};
