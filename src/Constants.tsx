export const SEVERITY = ["High", "Medium", "Low"];

export const SEVERITY_COLORS = {
  High: "#ed6c02",
  Critical: "#d32f2f",
  Low: "#0288d1",
  Medium: "#efd600"
};

export const DEVICE_TYPE = "WEB";

export const getAPIUrl = () => {
  const environment = {
    protocal: window.location.protocol,
    host: window.location.hostname,
    port: window.location.port
  };
  const BASE_URL =
    (environment.protocal.indexOf(":") > 0 ? environment.protocal + "//" : environment.protocal + "://") +
    environment.host +
    (environment.port && environment.port !== "" ? ":" + environment.port : "") +
    "/cortexa-service/api/v2/";
  // const BASE_URL = "http://localhost:9090/cortexa-service/api/v2/";
  return BASE_URL;
};
