import { IFilterParams } from "services/camera/camera.service";

export const UPDATE_CAMERA_FILTERS = "[CAMERA_FILTER] UPDATE_CAMERA_FILTERS";
export const CLEAN_CAMERA_FILTERS = "[CAMERA_FILTER] CLEAN_CAMERA_FILTERS";

export const updateCameraFilters = (filterParams: Partial<IFilterParams>) => ({
  type: UPDATE_CAMERA_FILTERS,
  payload: filterParams
});

export const cleanCameraFilters = () => ({
  type: CLEAN_CAMERA_FILTERS
});
