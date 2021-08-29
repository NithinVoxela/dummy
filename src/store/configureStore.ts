import { Store, applyMiddleware, compose, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";
import createSagaMiddleware from "redux-saga";

import { rootReducer } from "./combinedReducers";

export const sagaMiddleware = createSagaMiddleware();

const selectedCompose: typeof composeWithDevTools =
  process.env.NODE_ENV === "development" ? composeWithDevTools : compose;

export class AppStore {
  private static _instance: Store = null;
  private constructor() {}

  public static getInstance(initialState?: any): Store<any> {
    if (!AppStore._instance && initialState) {
      const store = createStore(rootReducer, initialState, selectedCompose(applyMiddleware(sagaMiddleware)));

      if (module.hot) {
        module.hot.accept("./combinedReducers.ts", () => {
          // @ts-ignore
          const nextRootReducer = rootReducer.default;
          store.replaceReducer(nextRootReducer);
        });
      }

      AppStore._instance = store;
    }

    return AppStore._instance;
  }
}
