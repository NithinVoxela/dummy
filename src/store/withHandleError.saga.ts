import { call, put } from "redux-saga/effects";

import { handleError } from "containers/Notifier/store/errorHandler.action";

export const withHandleErrorSaga = (saga: () => unknown) => {
  const errorHandlerSaga = function*() {
    try {
      yield call(saga);
    } catch (err) {
      yield put(handleError(err));
    }
  };
  return errorHandlerSaga;
};
