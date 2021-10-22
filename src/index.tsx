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
import { registerServiceWorker } from "./serviceWorker";

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

let userLogoutTimerId: NodeJS.Timeout;
const onUserActivity = (environment: IEnvironment) => {
  clearTimeout(userLogoutTimerId);
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  userLogoutTimerId = setTimeout(async () => {
    await AppStore.storePersistor.purge();
  }, environment.intervals.userLogout);
};

const bootstrapUserLogout = (environment: IEnvironment) => {
  const handleUserAcivity = () => {
    onUserActivity(environment);
  };
  handleUserAcivity();
  window.addEventListener("click", handleUserAcivity, true);
  window.addEventListener("keydown", handleUserAcivity, true);
};

const render = async (Component: React.FunctionComponent<{ store: Store<IApplicationState, AnyAction> }>) => {
  const environment = await configurationService.getEnvironment();
  const store = bootstrapStore(environment);
  AppStore.storePersistor.persist();
  await translationService.loadTranslations(store);
  HttpServiceFactory.createServices();
  bootstrapUserLogout(environment);
  hideLoading();

  ReactDOM.render(<Component store={store} />, root);
};

void render(App);
