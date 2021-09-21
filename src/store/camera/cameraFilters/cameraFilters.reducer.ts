import { IFilterParams } from "services/camera/camera.service";
import { IStoreAction } from "store/action.model";

import * as actions from "./cameraFilters.actions";

const initialState: IFilterParams = {
  keywords: "",
  pageSize: 5,
  pageNumber: 0
  // sortBy: null,
  // sortOrder: "ASC"
};

export const cameraFilterReducer = (
  state: IFilterParams = initialState,
  action = {} as IStoreAction
): IFilterParams => {
  switch (action.type) {
    case actions.UPDATE_CAMERA_FILTERS:
      return { ...state, ...action.payload };
    case actions.CLEAN_CAMERA_FILTERS:
      return initialState;
    default:
      return state;
  }
};
