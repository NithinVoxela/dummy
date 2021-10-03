import { IAlertLogModel, IAlertRequestOptions } from "models/alert.model";
import { IAlertFilterParams } from "services/alert/alert.service";

export const GET_ALERT_LOG_LOADING_REQUEST = "[ALERT_LOG] GET_ALERT_LOG_LOADING_REQUEST";
export const GET_ALERT_LOG_SUCCESS = "[ALERT_LOG] GET_ALERT_LOG_SUCCESS";
export const GET_ALERT_LOG_NEXT_PAGE_REQUEST = "[ALERT_LOG] GET_ALERT_LOG_NEXT_PAGE_REQUEST";
export const GET_ALERT_LOG_NEXT_PAGE_SUCCESS = "[ALERT_LOG] GET_ALERT_LOG_NEXT_PAGE_SUCCESS";
export const CLEAN_ALERT_LOGS = "[ALERT_LOG] CLEAN_ALERT_LOGS";

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
