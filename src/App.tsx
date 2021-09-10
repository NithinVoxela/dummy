import { CssBaseline } from "@material-ui/core";
import * as React from "react";
import { hot } from "react-hot-loader/root";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { AnyAction, Store } from "redux";
import { PersistGate } from "redux-persist/integration/react";

import { AuthGuard } from "containers/Authentication/AuthGuard";
import { BaseComponent } from "containers/Base";
import { Notifier } from "containers/Notifier";
import { ThemeProvider } from "containers/ThemeProvider";
import { AppStore } from "store/configureStore";

import { MainRoutes } from "./Routes";
import { IApplicationState } from "./store/state.model";

interface IProps {
  store: Store<IApplicationState, AnyAction>;
}

let AppComponent = ({ store }: IProps) => {
  return (
    <PersistGate persistor={AppStore.storePersistor} loading={null}>
      <Provider store={store}>
        <ThemeProvider>
          <CssBaseline />
          <BrowserRouter>
            <Notifier />
            <AuthGuard>
              <BaseComponent>
                <MainRoutes />
              </BaseComponent>
            </AuthGuard>
          </BrowserRouter>
        </ThemeProvider>
      </Provider>
    </PersistGate>
  );
};

if (module.hot) {
  AppComponent = hot(AppComponent);
}

export const App = AppComponent;
