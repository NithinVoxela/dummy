import { IAlertLogModel } from "models/alert.model";
import { IAlertDataModel } from "models/alertData.model";
import { IStoreAction } from "store/action.model";

import * as actions from "./alert.actions";

export interface IAlertLogState {
  alertLog: IAlertLogModel;
  alert: IAlertDataModel;
  dashboardAlertLog: any;
  dashboardCameraAlert: any;
}

export interface IAlertState extends IAlertLogModel {
  alert: IAlertDataModel;
}

const initialState: IAlertLogState = {
  alertLog: { alerts: [], totalCount: 0 },
  alert: {},
  dashboardAlertLog: { alerts: [], totalCount: 0 },
  dashboardCameraAlert: { alerts: [], totalCount: 0 }
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
    case actions.GET_ALERT_SUCCESS:
      return { ...state, ...action.payload };
    case actions.GET_DASHBOARD_ALERT_SUCCESS:
      return {
        ...state,
        dashboardAlertLog: {
          ...state.dashboardAlertLog,
          alerts: [...state.dashboardAlertLog.alerts, ...action.payload.alerts]
        }
      };
    case actions.GET_DASHBOARD_CAMERA_ALERT_SUCCESS:
      return {
        ...state,
        dashboardCameraAlert: {
          ...state.dashboardCameraAlert,
          alerts: [...state.dashboardCameraAlert.alerts, ...action.payload.alerts]
        }
      };
    default:
      return state;
  }
};
