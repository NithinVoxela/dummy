import { IAlertFilterParams } from "services/alert/alert.service";
import { IStoreAction } from "store/action.model";

import * as actions from "./alertLogFilters.actions";

const initialState: IAlertFilterParams = {
  cameraName: "",
  pageSize: 20,
  pageNumber: 0,
  dateRange: {
    startDate: null,
    endDate: null
  },
  location: ""
};

export const alertFilterReducer = (
  state: IAlertFilterParams = initialState,
  action = {} as IStoreAction
): IAlertFilterParams => {
  switch (action.type) {
    case actions.UPDATE_ALERT_LOG_FILTERS:
      return { ...state, ...action.payload };
    case actions.CLEAN_ALERT_LOG_FILTERS:
      return initialState;
    default:
      return state;
  }
};
