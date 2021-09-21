import { all } from "redux-saga/effects";

import { watchErrorHandle } from "containers/Notifier/store/errorHandler.saga";
import { watchRemoveNotification } from "containers/Notifier/store/notifier.saga";

import {
  watchDeleteCameraRequest,
  watchGetCameraRequest,
  watchGetCamerasLoadingRequest,
  watchRegisterCameraRequest,
  watchUpdateCameraRequest
} from "./camera/camera.saga";
import { watchLoginRequest } from "./userAccount/userAccount.saga";

export const rootSaga = function*(): any {
  yield all([
    watchErrorHandle(),
    watchRemoveNotification(),
    watchLoginRequest(),
    watchGetCamerasLoadingRequest(),
    watchRegisterCameraRequest(),
    watchGetCameraRequest(),
    watchUpdateCameraRequest(),
    watchDeleteCameraRequest()
  ]);
};
