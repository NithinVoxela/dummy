import { all } from "redux-saga/effects";

import { watchErrorHandle } from "containers/Notifier/store/errorHandler.saga";
import { watchRemoveNotification } from "containers/Notifier/store/notifier.saga";

import {
  watchGetAlertLogNextPageRequest,
  watchGetAlertsLoadingRequest,
  watchGetAlertRequest,
  watchMarkAsReadRequest,
  watchGetDashboardAlertLogRequest,
  watchGetDashboardCameraAlertLogRequest
} from "./alert/alert.saga";
import {
  watchDeleteCameraRequest,
  watchGetCameraRequest,
  watchGetCamerasLoadingRequest,
  watchRegisterCameraRequest,
  watchUpdateCameraRequest,
  watchUpdateCameraAppRequest,
  watchaddCameraAppRequest
} from "./camera/camera.saga";
import {
  watchLoginRequest,
  watchrRgisterDeviceRequest,
  watchrUserAlertCountRequest
} from "./userAccount/userAccount.saga";

export const rootSaga = function*(): any {
  yield all([
    watchErrorHandle(),
    watchRemoveNotification(),
    watchLoginRequest(),
    watchGetCamerasLoadingRequest(),
    watchRegisterCameraRequest(),
    watchGetCameraRequest(),
    watchUpdateCameraRequest(),
    watchDeleteCameraRequest(),
    watchGetAlertsLoadingRequest(),
    watchGetAlertLogNextPageRequest(),
    watchGetAlertRequest(),
    watchrRgisterDeviceRequest(),
    watchrUserAlertCountRequest(),
    watchMarkAsReadRequest(),
    watchUpdateCameraAppRequest(),
    watchaddCameraAppRequest(),
    watchGetDashboardAlertLogRequest(),
    watchGetDashboardCameraAlertLogRequest()
  ]);
};
