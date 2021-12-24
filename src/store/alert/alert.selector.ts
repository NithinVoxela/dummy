import { IApplicationState } from "store/state.model";

export const getAlerts = (state: IApplicationState) => state.alerts.alertLog.alerts;
export const getAlertLogTotalCount = (state: IApplicationState) => state.alerts.alertLog.totalCount;
export const getAlert = (state: IApplicationState) => state.alerts.alert;

export const getDashboardAlerts = (state: IApplicationState) => state.alerts.dashboardAlertLog.alerts;
export const getCameraAlerts = (state: IApplicationState) => state.alerts.dashboardCameraAlert.alerts;
