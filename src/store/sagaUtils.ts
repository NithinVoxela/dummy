import { all, call, delay, put, select } from "redux-saga/effects";

import { handleError } from "containers/Notifier/store/errorHandler.action";
import { IStoreAction } from "store/action.model";
import { getIntervals } from "store/environment/environment.selectors";

import { hideLoading, showLoading } from "./loading/loading.actions";

export interface ILoadingSagaItem {
  generator: any;
  action: IStoreAction;
}

export const loadingSaga = function*(loadingSagaItems: ILoadingSagaItem[] | ILoadingSagaItem) {
  try {
    yield put(showLoading());
    const items = Array.isArray(loadingSagaItems) ? loadingSagaItems : [loadingSagaItems];
    const generatorItems = items.map((item: ILoadingSagaItem) => call(item.generator, item.action));
    yield all(generatorItems);
  } catch (err) {
    yield put(handleError(err));
  } finally {
    yield put(hideLoading());
  }
};

export const delayedSaga = function*(intervalKey: string) {
  const intervals = yield select(getIntervals);
  const interval = intervals[intervalKey];
  yield delay(interval);
};
