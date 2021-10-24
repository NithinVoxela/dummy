import { IAlertLogModel } from "models/alert.model";
import { IAlertDataModel } from "models/alertData.model";
import { IStoreAction } from "store/action.model";

import * as actions from "./alert.actions";

export interface IAlertLogState {
  alertLog: IAlertLogModel;
  alert: IAlertDataModel;
}

export interface IAlertState extends IAlertLogModel {
  alert: IAlertDataModel;
}

const initialState: IAlertLogState = {
  alertLog: { alerts: [], totalCount: 0 },
  alert: {}
};

export const alertLogReducer = (state: IAlertLogState = initialState, action = {} as IStoreAction): IAlertLogState => {
  switch (action.type) {
    case actions.GET_ALERT_LOG_SUCCESS:
      return { ...state, alertLog: { ...state.alertLog, ...action.payload } };
    case actions.GET_ALERT_LOG_NEXT_PAGE_SUCCESS:
      return {
        ...state,
        alertLog: { ...state.alertLog, alerts: [...state.alertLog.alerts, ...action.payload.alerts] }
      };
    case actions.CLEAN_ALERT_LOGS:
      return initialState;
    default:
      return state;
  }
};
