import { AxiosResponse } from "axios";
import { put, takeEvery } from "redux-saga/effects";

import { addNotification } from "containers/Notifier/store/notifier.action";
import { translationService } from "services/translation/translation.service";
import { ErrorValues, IStoreAction } from "store/action.model";

import * as actions from "./errorHandler.action";

export const getErrorMessage = (response: AxiosResponse, payload: { message: string }) => {
  let errorMessage = "";
  const errorResponse = response && Object.entries(response.data || {}).find(a => a[0] !== "code" && a[1] !== false);
  if (errorResponse) {
    errorMessage = errorResponse[1] as string;
  }
  return errorMessage || payload.message;
};

export const handleError = function*({
  payload,
  payload: {
    error: { response }
  }
}: IStoreAction) {
  if (["production", "development"].includes(process.env.NODE_ENV)) {
    // eslint-disable-next-line no-console
    console.error(payload.error);
  }

  yield put(
    addNotification({
      header: translationService.getMessageTranslation("global-error-label", ErrorValues.error),
      message: getErrorMessage(response, payload)
    })
  );
};

export const watchErrorHandle = function*() {
  yield takeEvery(actions.HANDLE_ERROR, handleError);
};
