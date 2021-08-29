import { IApplicationState } from "store/state.model";

export const getLoadingStatus = (state: IApplicationState): boolean => state.loading.requestCount > 0;
