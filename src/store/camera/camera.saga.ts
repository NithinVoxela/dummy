import { call, fork, put, select, takeLatest } from "redux-saga/effects";

import { handleError } from "containers/Notifier/store/errorHandler.action";
import { addNotification } from "containers/Notifier/store/notifier.action";
import { ICameraModel } from "models/camera.model";
import { ICameraDataModel } from "models/cameraData.model";
import { cameraService } from "services/camera/camera.service";
import { translationService } from "services/translation/translation.service";
import { IStoreAction } from "store/action.model";
import * as actions from "store/camera/camera.actions";
import * as redirectActions from "store/redirect/redirect.action";
import { delayedSaga, loadingSaga } from "store/sagaUtils";

import { getCameraFilters } from "./cameraFilters/cameraFilters.selector";

export const getCameras = function*({ payload }: IStoreAction) {
  try {
    const cameras: ICameraModel = yield call(cameraService.getCamreas, payload);
    yield put(actions.getCamerasSuccess(cameras));
  } catch (err) {
    yield put(handleError(err));
  }
};

export const getCamerasLoading = function*(action: IStoreAction) {
  const {
    options: { withDebounce }
  } = action;
  if (withDebounce) {
    yield call(delayedSaga, "searchInputDebounce");
  }
  yield fork(loadingSaga, [{ generator: getCameras, action }]);
};

export const watchGetCamerasLoadingRequest = function*() {
  yield takeLatest(actions.GET_CAMERAS_LOADING_REQUEST, getCamerasLoading);
};

export const registerCamera = function*({ payload }: IStoreAction) {
  try {
    const camera: ICameraDataModel = yield call(cameraService.registerCamera, payload);
    yield put(
      addNotification({
        header: translationService.getMessageTranslation("global-success-label", "Success"),
        message: translationService.getMessageTranslation(
          "camera-saved-success-mesaage",
          "{0} registered Successfully.",
          camera.name
        )
      })
    );
  } catch (err) {
    yield put(handleError(err));
  }
};

export const watchRegisterCameraRequest = function*() {
  yield takeLatest(actions.REGISTER_CAMERA_REQUEST, registerCamera);
};

export const updateCamera = function*({ payload }: IStoreAction) {
  try {
    const camera: ICameraDataModel = yield call(cameraService.updateCamera, payload);
    yield put(actions.getCameraSuccess({ camera }));
    yield put(
      addNotification({
        header: translationService.getMessageTranslation("update-successfull-label", "Update Successful"),
        message: `${translationService.getMessageTranslation("you-have-updated-label", "You have updated")} ${
          camera.name
        }`
      })
    );
  } catch (err) {
    yield put(handleError(err));
  }
};

export const watchUpdateCameraRequest = function*() {
  yield takeLatest(actions.UPDATE_CAMERA_REQUEST, updateCamera);
};

export const getCamera = function*({ payload }: IStoreAction) {
  try {
    const camera: ICameraDataModel = yield call(cameraService.getCamera, payload);
    yield put(actions.getCameraSuccess({ camera }));
  } catch (err) {
    yield put(handleError(err));
  }
};

export const watchGetCameraRequest = function*() {
  yield takeLatest(actions.GET_CAMERA_REQUEST, getCamera);
};

export const deleteCamera = function*({ payload }: IStoreAction) {
  try {
    const { name } = payload;
    yield call(cameraService.deleteCamera, payload);
    yield put(
      addNotification({
        header: translationService.getMessageTranslation("delete-successfull-label", "Delete Successful"),
        message: `${translationService.getMessageTranslation("you-have-deleted-label", "You have deleted")} ${name}`
      })
    );
    const filterParams = yield select(getCameraFilters);
    yield fork(getCameras, {
      type: "",
      payload: filterParams
    });
  } catch (err) {
    yield put(handleError(err));
  }
};

export const watchDeleteCameraRequest = function*() {
  yield takeLatest(actions.DELETE_CAMERA_REQUEST, deleteCamera);
};

export const updateCameraApp = function*({ payload }: IStoreAction) {
  try {
    const camera: ICameraDataModel = yield call(cameraService.updateCameraApp, payload);
    yield put(actions.getCameraSuccess({ camera }));
    yield fork(getCamera, {
      type: "",
      payload: camera
    });
    yield put(
      addNotification({
        header: translationService.getMessageTranslation("update-successfull-label", "App update Successful"),
        message: `${translationService.getMessageTranslation("you-have-updated-label", "You have updated ml app.")} ${
          camera.name
        }`
      })
    );
  } catch (err) {
    yield put(handleError(err));
  }
};

export const watchUpdateCameraAppRequest = function*() {
  yield takeLatest(actions.UPDATE_CAMERA_APP_REQUEST, updateCameraApp);
};

export const addCameraApp = function*({ payload }: IStoreAction) {
  try {
    const camera: ICameraDataModel = yield call(cameraService.addCameraApp, payload);
    yield put(actions.getCameraSuccess({ camera }));
    yield fork(getCamera, {
      type: "",
      payload: camera
    });
    yield put(
      addNotification({
        header: translationService.getMessageTranslation("update-successfull-label", "App configured Successful"),
        message: `${translationService.getMessageTranslation(
          "you-have-updated-label",
          "You have configured a ml app."
        )} ${camera.name}`
      })
    );
  } catch (err) {
    yield put(handleError(err));
  }
};

export const watchaddCameraAppRequest = function*() {
  yield takeLatest(actions.ADD_CAMERA_APP_REQUEST, addCameraApp);
};
