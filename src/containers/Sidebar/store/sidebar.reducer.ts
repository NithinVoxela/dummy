import { IStoreAction } from "store/action.model";

import * as actions from "./sidebar.action";

const initialState = {
  open: false
};

export const sidebarReducer = (state = initialState, action = {} as IStoreAction) => {
  switch (action.type) {
    case actions.TOGGLE_SIDEBAR:
      return state.open ? { ...state, open: false } : { ...state, open: true };
    default:
      return state;
  }
};
