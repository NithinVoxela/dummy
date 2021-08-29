import * as React from "react";
import * as ReactDOM from "react-dom";
import { AnyAction, Store } from "redux";

import { configurationService } from "services/configuration/configuration.service";
import { HttpServiceFactory } from "services/http/http.serviceFactory";
import { translationService } from "services/translation/translation.service";
import { AppStore, sagaMiddleware } from "store/configureStore";
import { IEnvironment } from "store/environment.model";
import { rootSaga } from "store/sagas";
import { IApplicationState } from "store/state.model";

import { App } from "./App";

const root = document.getElementById("root");

const bootstrapStore = (() => {
  let bootstraped = false;
  return (environment: IEnvironment): Store<IApplicationState, AnyAction> => {
    const store = AppStore.getInstance({ environment });
    if (!bootstraped) {
      sagaMiddleware.run(rootSaga);
      bootstraped = true;
    }
    return store;
  };
})();

const hideLoading = () => {
  const loading = document.getElementById("loading");
  document.body.style.height = "100%";
  loading.style.display = "none";
};

const render = async (Component: React.FunctionComponent<{ store: Store<IApplicationState, AnyAction> }>) => {
  const environment = await configurationService.getEnvironment();
  const store = bootstrapStore(environment);
  HttpServiceFactory.createServices();
  void translationService.loadTranslations(store);
  hideLoading();

  ReactDOM.render(<Component store={store} />, root);
};

void render(App);
