import { CssBaseline } from "@material-ui/core";
import * as React from "react";
import { hot } from "react-hot-loader/root";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { AnyAction, Store } from "redux";

import { BaseComponent } from "containers/Base";
import { ThemeProvider } from "containers/ThemeProvider";

import { MainRoutes } from "./Routes";
import { IApplicationState } from "./store/state.model";

interface IProps {
  store: Store<IApplicationState, AnyAction>;
}

let AppComponent = ({ store }: IProps) => {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <CssBaseline />
        <BrowserRouter>
          <BaseComponent>
            <MainRoutes />
          </BaseComponent>
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  );
};

if (module.hot) {
  AppComponent = hot(AppComponent);
}

export const App = AppComponent;
