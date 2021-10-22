export interface IRoute {
  to: string;
}

const login: IRoute = { to: "/login" };

const dashboard: IRoute = {
  to: "/"
};

const alerts: IRoute = {
  to: "/alerts"
};

const cameras: IRoute = {
  to: "/cameras"
};

const camera: IRoute = {
  to: "/camera/:id?"
};

const liveStream: IRoute = {
  to: "/stream"
};

export const routes = {
  login,
  dashboard,
  alerts,
  cameras,
  camera,
  liveStream
};
