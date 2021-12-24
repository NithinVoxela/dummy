import { IAlertLogModel, IAlertRequestOptions } from "models/alert.model";
import { IAlertFilterParams } from "services/alert/alert.service";

import { IAlertState } from "./alert.reducer";

export const GET_ALERT_LOG_LOADING_REQUEST = "[ALERT_LOG] GET_ALERT_LOG_LOADING_REQUEST";
export const GET_ALERT_LOG_SUCCESS = "[ALERT_LOG] GET_ALERT_LOG_SUCCESS";
export const GET_ALERT_LOG_NEXT_PAGE_REQUEST = "[ALERT_LOG] GET_ALERT_LOG_NEXT_PAGE_REQUEST";
export const GET_ALERT_LOG_NEXT_PAGE_SUCCESS = "[ALERT_LOG] GET_ALERT_LOG_NEXT_PAGE_SUCCESS";
export const CLEAN_ALERT_LOGS = "[ALERT_LOG] CLEAN_ALERT_LOGS";
export const GET_ALERT_REQUEST = "[ALERT_LOG] GET_ALERT_REQUEST";
export const GET_ALERT_SUCCESS = "[ALERT_LOG] GET_ALERT_SUCCESS"; //
export const MARK_AS_READ = "[ALERT_LOG] MARK_AS_READ";
export const GET_DASHBOARD_ALERT_REQUEST = "[ALERT_LOG] GET_DASHBOARD_ALERT_REQUEST";
export const GET_DASHBOARD_ALERT_SUCCESS = "[ALERT_LOG] GET_DASHBOARD_ALERT_SUCCESS";
export const GET_DASHBOARD_CAMERA_ALERT_REQUEST = "[ALERT_LOG] GET_DASHBOARD_CAMERA_ALERT_REQUEST";
export const GET_DASHBOARD_CAMERA_ALERT_SUCCESS = "[ALERT_LOG] GET_DASHBOARD_CAMERA_ALERT_SUCCESS";

export const getAlertLogLoadingRequest = (filterParams: IAlertFilterParams, options?: IAlertRequestOptions) => ({
  type: GET_ALERT_LOG_LOADING_REQUEST,
  payload: filterParams,
  options
});

export const getAlertLogSuccess = (alert: IAlertLogModel) => ({
  type: GET_ALERT_LOG_SUCCESS,
  payload: alert
});

export const getAlertLogNextPageRequest = (filterParams: IAlertFilterParams) => ({
  type: GET_ALERT_LOG_NEXT_PAGE_REQUEST,
  payload: filterParams
});

export const setAlertLogNextPage = (alert: IAlertLogModel) => ({
  type: GET_ALERT_LOG_NEXT_PAGE_SUCCESS,
  payload: alert
});

export const cleanAlertLogs = () => ({
  type: CLEAN_ALERT_LOGS
});

export const getAlertRequest = (payload: { publicId: string }) => ({
  type: GET_ALERT_REQUEST,
  payload
});

export const getAlertSuccess = (payload: Partial<IAlertState>) => ({
  type: GET_ALERT_SUCCESS,
  payload
});

export const markAsRead = (payload: Partial<IAlertState>) => ({
  type: MARK_AS_READ,
  payload
});

export const getDashboardAlertRequest = (filterParams: IAlertFilterParams) => ({
  type: GET_DASHBOARD_ALERT_REQUEST,
  payload: filterParams
});

export const getDashboardAlertSuccess = (alerts: any) => ({
  type: GET_DASHBOARD_ALERT_SUCCESS,
  payload: alerts
});

export const getDashboardCameraAlertRequest = (filterParams: IAlertFilterParams) => ({
  type: GET_DASHBOARD_CAMERA_ALERT_REQUEST,
  payload: filterParams
});

export const getDashboardCameraAlertSuccess = (alerts: any) => ({
  type: GET_DASHBOARD_CAMERA_ALERT_SUCCESS,
  payload: alerts
});
