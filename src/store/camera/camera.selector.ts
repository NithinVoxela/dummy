import { IApplicationState } from "store/state.model";

export const getCamerasList = (state: IApplicationState) => state.cameraData.cameras;
export const getCamerasTotalCount = (state: IApplicationState) => state.cameraData.totalCount;
export const getCamera = (state: IApplicationState) => state.cameraData.camera;
export const getAppScheduleList = (state: IApplicationState) => {
  return state.cameraData?.camera?.scheduleList || [];
};
