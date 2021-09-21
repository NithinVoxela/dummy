import { IApplicationState } from "store/state.model";

export const getRedirectTo = (state: IApplicationState): string => state.redirectConfig.redirectUrl;
