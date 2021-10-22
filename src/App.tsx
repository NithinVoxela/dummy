import { CssBaseline } from "@material-ui/core";
import * as React from "react";
import { useState } from "react";
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

import { getToken, onMessageListener } from "./firebase";
import { MainRoutes } from "./Routes";
import { IApplicationState } from "./store/state.model";

interface IProps {
  store: Store<IApplicationState, AnyAction>;
}

let AppComponent = ({ store }: IProps) => {
  const [isTokenFound, setTokenFound] = useState(false);
  getToken(setTokenFound);


  const [show, setShow] = useState(false);

  onMessageListener()
    .then((message: any) => {
      setShow(true);
      console.log(message);
    })
    .catch((err: any) => console.log("failed: ", err));

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
                {isTokenFound && <h1> Notification permission enabled 👍🏻 </h1>}
                {!isTokenFound && <h1> Need notification permission ❗️ </h1>}
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
