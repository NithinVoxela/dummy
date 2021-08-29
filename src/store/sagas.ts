import { all } from "redux-saga/effects";

import { watchErrorHandle } from "containers/Notifier/store/errorHandler.saga";
import { watchRemoveNotification } from "containers/Notifier/store/notifier.saga";

export const rootSaga = function*(): any {
  yield all([watchErrorHandle(), watchRemoveNotification()]);
};
