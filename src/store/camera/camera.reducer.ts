import { ICameraModel } from "models/camera.model";
import { ICameraDataModel } from "models/cameraData.model";
import { IStoreAction } from "store/action.model";

import * as actions from "./camera.actions";

export interface ICameraState extends ICameraModel {
  camera: ICameraDataModel;
}

const initialState: ICameraState = {
  cameras: [],
  totalCount: 0,
  camera: {
    publicId: "",
    name: "",
    description: "",
    cameraType: "",
    brand: "",
    model: "",
    streamUrl: "",
    cameraStatus: "",
    passPhrase: "",
    location: "",
    installationDate: ""
  }
};

export const cameraReducer = (state: ICameraModel = initialState, action = {} as IStoreAction): ICameraModel => {
  switch (action.type) {
    case actions.GET_CAMERAS_SUCCESS:
      return { ...state, ...action.payload };
    case actions.GET_CAMERA_SUCCESS:
      return { ...state, ...action.payload };
    case actions.RESET_CAMERA_LIST:
      return { ...state, cameras: [], totalCount: 0 };
    default:
      return state;
  }
};
