import { IStoreAction } from "store/action.model";

import * as actions from "./redirect.action";

const initialState = {
  redirectUrl: ""
};

export const redirectReducer = (state = initialState, action = {} as IStoreAction) => {
  switch (action.type) {
    case actions.REDIRECT_TO:
      return { ...state, redirectUrl: action.payload };
    default:
      return state;
  }
};
