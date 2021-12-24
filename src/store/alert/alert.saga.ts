import { call, fork, put, select, takeEvery, takeLatest } from "redux-saga/effects";

import { handleError } from "containers/Notifier/store/errorHandler.action";
import { addNotification } from "containers/Notifier/store/notifier.action";
import { IAlertLogModel } from "models/alert.model";
import { IAlertDataModel } from "models/alertData.model";
import { alertService } from "services/alert/alert.service";
import { translationService } from "services/translation/translation.service";
import { IStoreAction } from "store/action.model";
import * as actions from "store/alert/alert.actions";
import { delayedSaga, loadingSaga } from "store/sagaUtils";

import { getAlertLogFilter } from "./alertLogFilters/alertLogFilters.selector";

export const getAlertLog = function*({ payload }: IStoreAction) {
  try {
    const alerts: IAlertLogModel = yield call(alertService.getAlertLog, payload);
    yield put(actions.getAlertLogSuccess(alerts));
  } catch (err) {
    yield put(handleError(err));
  }
};

export const getAlertLogLoading = function*(action: IStoreAction) {
  const {
    options: { withDebounce }
  } = action;
  if (withDebounce) {
    yield call(delayedSaga, "searchInputDebounce");
  }
  yield fork(loadingSaga, [{ generator: getAlertLog, action }]);
};

export const watchGetAlertsLoadingRequest = function*() {
  yield takeLatest(actions.GET_ALERT_LOG_LOADING_REQUEST, getAlertLogLoading);
};

export const getAlertLogNextPage = function*({ payload }: IStoreAction) {
  try {
    const nextPage = yield call(alertService.getAlertLog, payload);
    yield put(actions.setAlertLogNextPage(nextPage));
  } catch (err) {
    yield put(handleError(err));
  }
};

export const watchGetAlertLogNextPageRequest = function*() {
  yield takeEvery(actions.GET_ALERT_LOG_NEXT_PAGE_REQUEST, getAlertLogNextPage);
};

export const getAlert = function*({ payload }: IStoreAction) {
  try {
    const alert: IAlertDataModel = yield call(alertService.getAlert, payload);
    yield put(actions.getAlertSuccess({ alert }));
  } catch (err) {
    yield put(handleError(err));
  }
};

export const watchGetAlertRequest = function*() {
  yield takeLatest(actions.GET_ALERT_REQUEST, getAlert);
};

export const markAsRead = function*({ payload }: IStoreAction) {
  try {
    const alert: IAlertDataModel = yield call(alertService.markAsRead, payload);
    yield put(
      addNotification({
        header: translationService.getMessageTranslation("alert-read-success-title", "Alert"),
        message: `${translationService.getMessageTranslation("alert-read-success-desc", "Alert updated successfully.")}`
      })
    );
    const filterParams = yield select(getAlertLogFilter);
    yield fork(getAlertLog, {
      type: "",
      payload: { ...filterParams, pageNumber: 0, pageSize: (filterParams.pageNumber + 1) * filterParams.pageSize }
    });
  } catch (err) {
    yield put(handleError(err));
  }
};

export const watchMarkAsReadRequest = function*() {
  yield takeLatest(actions.MARK_AS_READ, markAsRead);
};


export const getDashboardAlertLog = function*({ payload }: IStoreAction) {
  try {
    const dashboardAlerts: any = yield call(alertService.getDashboardAlertLog, payload);
    yield put(actions.getDashboardAlertSuccess(dashboardAlerts));
  } catch (err) {
    yield put(handleError(err));
  }
};

export const watchGetDashboardAlertLogRequest = function*() {
  yield takeEvery(actions.GET_DASHBOARD_ALERT_REQUEST, getDashboardAlertLog);
};

export const getDashboardCameraAlertLog = function*({ payload }: IStoreAction) {
  try {
    const dashboardCameraAlerts: any = yield call(alertService.getDashboardCameraAlertLog, payload);
    yield put(actions.getDashboardCameraAlertSuccess(dashboardCameraAlerts));
  } catch (err) {
    yield put(handleError(err));
  }
};

export const watchGetDashboardCameraAlertLogRequest = function*() {
  yield takeEvery(actions.GET_DASHBOARD_CAMERA_ALERT_REQUEST, getDashboardCameraAlertLog);
};
