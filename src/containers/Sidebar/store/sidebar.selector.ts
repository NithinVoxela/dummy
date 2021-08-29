import { IApplicationState } from "store/state.model";

export const getSidebarStatus = (state: IApplicationState): boolean => state.sidebar.open;
