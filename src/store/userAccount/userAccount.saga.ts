import { call, put, fork, takeLatest } from "redux-saga/effects";

import { handleError } from "containers/Notifier/store/errorHandler.action";
import { deviceService } from "services/userAccount/device.service";
import { userAccountService } from "services/userAccount/userAccount.service";
import { IStoreAction } from "store/action.model";
import { loadingSaga } from "store/sagaUtils";

import * as actions from "./userAccount.actions";

export const login = function*({ payload }: IStoreAction) {
  try {
    const userData = yield call(userAccountService.login, payload);
    yield put(actions.setUserAccount(userData));
  } catch (err) {
    yield put(handleError(err));
  }
};

export const loginLoading = function*(action: IStoreAction) {
  yield fork(loadingSaga, [{ generator: login, action }]);
};

export const watchLoginRequest = function*() {
  yield takeLatest(actions.LOGIN, login);
};

export const registerDevice = function*({ payload }: IStoreAction) {
  try {
    const device = yield call(deviceService.registerDevice, payload);
    yield put(actions.registerDeviceSuccess(device));
  } catch (err) {
    yield put(handleError(err));
  }
};

export const watchrRgisterDeviceRequest = function*() {
  yield takeLatest(actions.REGISTER_USER_DEVICE, registerDevice);
};
