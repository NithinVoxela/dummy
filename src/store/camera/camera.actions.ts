import { ICameraModel, ICameraRequestOptions } from "models/camera.model";
import { ICameraDataModel } from "models/cameraData.model";
import { IFilterParams } from "services/camera/camera.service";

import { ICameraState } from "./camera.reducer";

export const GET_CAMERAS_LOADING_REQUEST = "[CAMERA] GET_CAMERAS_LOADING_REQUEST";
export const GET_CAMERAS_SUCCESS = "[CAMERA] GET_CAMERAS_SUCCESS";
export const GET_CAMERA_SUCCESS = "[CAMERA] GET_CAMERA_SUCCESS";
export const REGISTER_CAMERA_REQUEST = "[CAMERA] REGISTER_CAMERA_REQUEST";
export const UPDATE_CAMERA_REQUEST = "[CAMERA] UPDATE_CAMERA_REQUEST";
export const GET_CAMERA_REQUEST = "[CAMERA] GET_CAMERA_REQUEST";
export const DELETE_CAMERA_REQUEST = "[CAMERA] DELETE_CAMERA_REQUEST";
export const RESET_CAMERA_LIST = "[CAMERA] RESET_CAMERA_LIST";
export const UPDATE_CAMERA_APP_REQUEST = "[CAMERA] UPDATE_CAMERA_APP_REQUEST";
export const ADD_CAMERA_APP_REQUEST = "[CAMERA] ADD_CAMERA_APP_REQUEST";
export const GET_APP_SCHEDULE_LOADING_REQUEST = "[CAMERA] GET_APP_SCHEDULE_LOADING_REQUEST";
export const GET_APP_SCHEDULE_SUCCESS = "[CAMERA] GET_APP_SCHEDULE_SUCCESS";
export const RESET_APP_SCHEDULE = "[CAMERA] RESET_APP_SCHEDULE";
export const UPDATE_APP_SCHEDULE = "[CAMERA] UPDATE_APP_SCHEDULE";

export const getCamerasLoadingRequest = (filterParams: IFilterParams, options?: ICameraRequestOptions) => ({
  type: GET_CAMERAS_LOADING_REQUEST,
  payload: filterParams,
  options
});

export const getCamerasSuccess = (cameras: ICameraModel) => ({
  type: GET_CAMERAS_SUCCESS,
  payload: cameras
});

export const getCameraSuccess = (payload: Partial<ICameraState>) => ({
  type: GET_CAMERA_SUCCESS,
  payload
});

export const registerCameraRequest = (payload: ICameraDataModel) => ({
  type: REGISTER_CAMERA_REQUEST,
  payload
});

export const updateCameraRequest = (payload: ICameraDataModel) => ({
  type: UPDATE_CAMERA_REQUEST,
  payload
});

export const getCameraRequest = (payload: { publicId: string }) => ({
  type: GET_CAMERA_REQUEST,
  payload
});

export const deleteCameraRequest = (payload: { publicId: string; name: string }) => ({
  type: DELETE_CAMERA_REQUEST,
  payload
});

export const resetCameraList = () => ({
  type: RESET_CAMERA_LIST
});

export const updateCameraAppRequest = (payload: any) => ({
  type: UPDATE_CAMERA_APP_REQUEST,
  payload
});

export const addCameraAppRequest = (payload: any) => ({
  type: ADD_CAMERA_APP_REQUEST,
  payload
});

export const getAppScheduleLoadingRequest = (filterParams: any) => ({
  type: GET_APP_SCHEDULE_LOADING_REQUEST,
  payload: filterParams
});

export const getAppScheduleSuccess = (response: any) => ({
  type: GET_APP_SCHEDULE_SUCCESS,
  payload: response
});

export const updateAppScheduleRequest = (payload: any) => ({
  type: UPDATE_APP_SCHEDULE,
  payload
});
