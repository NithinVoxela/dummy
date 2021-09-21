import * as React from "react";
import { Route } from "react-router-dom";

import { IRoute, routes } from "configs/routes/routes.config";
import { Camera } from "containers/Cameras/Camera";
import { Cameras } from "containers/Cameras/Cameras";
import { Dashboard } from "containers/Dashboard/Dashboard";

interface IRouteCreaterOptions {
  routeConfig: IRoute;
  exact?: boolean;
}

const routeCreater = (Component: React.ComponentType, { routeConfig, exact = true }: IRouteCreaterOptions) => ({
  Component,
  exact,
  path: routeConfig.to
});

const routeMap = [
  routeCreater(Dashboard, { routeConfig: routes.dashboard }),
  routeCreater(Dashboard, { routeConfig: routes.alerts }),
  routeCreater(Cameras, { routeConfig: routes.cameras }),
  routeCreater(Camera, { routeConfig: routes.camera })
];

export const MainRoutes: React.FunctionComponent = () => (
  // eslint-disable-next-line react/jsx-no-useless-fragment
  <>
    {routeMap.map(({ Component, exact, path }) => {
      return <Route exact={exact} path={path} key={path} component={Component} />;
    })}
  </>
);
