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

export const routes = {
  login,
  dashboard,
  alerts
};
