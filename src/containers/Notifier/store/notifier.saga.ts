import { delay, put, takeEvery } from "redux-saga/effects";

import { NUMBERS } from "configs/constants";
import { IStoreAction } from "store/action.model";

import * as actions from "./notifier.action";

export const removeNotification = function*({ payload }: IStoreAction) {
  yield put(actions.switchOffNotification(payload));
  yield delay(NUMBERS.ONE_THOUSAND);
  yield put(actions.deleteNotification(payload));
};

export const watchRemoveNotification = function*() {
  yield takeEvery(actions.REMOVE_NOTIFICATION, removeNotification);
};
