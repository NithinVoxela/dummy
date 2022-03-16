import { CameraAppSettingsTab } from "containers/Cameras/CameraSettingsTab";
import * as React from "react";
import { Route } from "react-router-dom";

import { IRoute, routes } from "configs/routes/routes.config";
import { AlertDetails } from "containers/Alerts/AlertDetails";
import { Alerts } from "containers/Alerts/Alerts";
import { Camera } from "containers/Cameras/Camera";
import { CameraApps } from "containers/Cameras/CameraApps";
import { Cameras } from "containers/Cameras/Cameras";
import { Dashboard } from "containers/Dashboard/Dashboard";
import { LiveStream } from "containers/LiveStream/LiveStream";

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
  routeCreater(Alerts, { routeConfig: routes.alerts }),
  routeCreater(AlertDetails, { routeConfig: routes.alertDetails }),
  routeCreater(Cameras, { routeConfig: routes.cameras }),
  routeCreater(Camera, { routeConfig: routes.camera }),
  routeCreater(Camera, { routeConfig: routes.addCamera }),
  routeCreater(LiveStream, { routeConfig: routes.liveStream }),
  routeCreater(CameraApps, { routeConfig: routes.cameraAppsList }),
  routeCreater(CameraAppSettingsTab, { routeConfig: routes.cameraAppsDetails })
];

export const MainRoutes: React.FunctionComponent = () => (
  // eslint-disable-next-line react/jsx-no-useless-fragment
  <>
    {routeMap.map(({ Component, exact, path }) => {
      return <Route exact={exact} path={path} key={path} component={Component} />;
    })}
  </>
);
