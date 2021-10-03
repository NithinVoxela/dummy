import { IAlertFilterParams } from "services/alert/alert.service";

export const UPDATE_ALERT_LOG_FILTERS = "[ALERT_FILTER] UPDATE_ALERT_LOG_FILTERS";
export const CLEAN_ALERT_LOG_FILTERS = "[ALERT_FILTER] CLEAN_ALERT_LOG_FILTERS";

export const updateAlertLogFilter = (filterParams: Partial<IAlertFilterParams>) => ({
  type: UPDATE_ALERT_LOG_FILTERS,
  payload: filterParams
});

export const cleanAlertLogFilter = () => ({
  type: CLEAN_ALERT_LOG_FILTERS
});
