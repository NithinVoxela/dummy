import { IApplicationState } from "store/state.model";

export const getAlertLogFilter = (state: IApplicationState) => state.alertFilters;
