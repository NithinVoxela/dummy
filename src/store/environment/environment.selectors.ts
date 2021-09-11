import { IApplicationState } from "store/state.model";

export const getEnvironment = (state: IApplicationState) => state.environment;

export interface IIntervals {
  userLogout: number;
}

export const getIntervals = (state: IApplicationState): IIntervals => state.environment.intervals;
