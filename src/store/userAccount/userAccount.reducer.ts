import { REHYDRATE as REHYDRATE_USER_ACCOUNT } from "redux-persist";

import { IUserAccount } from "models/user.model";
import { IStoreAction } from "store/action.model";

import * as actions from "./userAccount.actions";

export const initialState: IUserAccount = {
  userName: null,
  email: null,
  mobileNo: null,
  locale: null,
  role: null,
  firstName: null,
  lastName: null,
  timezone: null,
  dateFormat: null,
  token: null,
  password: null,
  deleted: false,
  alertLog: { alerts: [], totalCount: 0 }
};

export const userAccountReducer = (state: IUserAccount = initialState, action = {} as IStoreAction): IUserAccount => {
  switch (action.type) {
    case actions.USER_ALERT_COUNT_SUCCESS:
      return { ...state, alertLog: { ...state.alertLog, ...action.payload } };
    case REHYDRATE_USER_ACCOUNT: {
      const { payload: userAccount = initialState } = action;
      return userAccount;
    }
    case actions.SET_USER_ACCOUNT:
      return { ...state, ...action.payload };
    case actions.REMOVE_USER_ACCOUNT:
      return { ...initialState };
    default:
      return state;
  }
};
