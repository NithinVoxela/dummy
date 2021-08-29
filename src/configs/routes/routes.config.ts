export interface IRoute {
  to: string;
}

const dashboard: IRoute = {
  to: "/"
};

const alerts: IRoute = {
  to: "/alerts"
};

export const routes = {
  dashboard,
  alerts
};
