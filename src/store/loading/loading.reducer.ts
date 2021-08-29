import { IStoreAction } from "store/action.model";

import * as actions from "./loading.actions";

export interface ILoadingState {
  requestCount: number;
}

const initialState = {
  requestCount: 0
};

export const loadingReducer = (state = initialState, action = {} as IStoreAction) => {
  switch (action.type) {
    case actions.SHOW_LOADING:
      return { ...state, requestCount: state.requestCount + 1 };
    case actions.HIDE_LOADING:
      return { ...state, requestCount: state.requestCount > 0 ? state.requestCount - 1 : 0 };
    default:
      return state;
  }
};
