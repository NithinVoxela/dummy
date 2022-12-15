// routes
import { PATH_DASHBOARD } from './routes/paths';

// API
// ----------------------------------------------------------------------
export const getAPIUrl = () => {
  const environment = {
    protocal: window.location.protocol,
    host: window.location.hostname,
    port: window.location.port,
  };
  // const BASE_URL =
  //   `${(environment.protocal.indexOf(":") > 0 ? `${environment.protocal  }//` : `${environment.protocal  }://`) +
  //   environment.host +
  //   (environment.port && environment.port !== "" ? `:${  environment.port}` : "")
  //   }/cortexa-service/api/v2/`;
  const BASE_URL = 'https://cortexa-dev.voxela.ai/cortexa-service/api/v2/';
  return BASE_URL;
};

export const HOST_API = getAPIUrl();

export const FIREBASE_API = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APPID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

export const COGNITO_API = {
  userPoolId: process.env.REACT_APP_AWS_COGNITO_USER_POOL_ID,
  clientId: process.env.REACT_APP_AWS_COGNITO_CLIENT_ID,
};

export const AUTH0_API = {
  clientId: process.env.REACT_APP_AUTH0_CLIENT_ID,
  domain: process.env.REACT_APP_AUTH0_DOMAIN,
};

export const MAPBOX_API = process.env.REACT_APP_MAPBOX;

// ROOT PATH AFTER LOGIN SUCCESSFUL
export const PATH_AFTER_LOGIN = PATH_DASHBOARD.general.app; // as '/dashboard/app'

// LAYOUT
// ----------------------------------------------------------------------

export const HEADER = {
  MOBILE_HEIGHT: 48,
  MAIN_DESKTOP_HEIGHT: 60,
  DASHBOARD_DESKTOP_HEIGHT: 64,
  DASHBOARD_DESKTOP_OFFSET_HEIGHT: 64 - 32,
};

export const NAVBAR = {
  BASE_WIDTH: 260,
  DASHBOARD_WIDTH: 280,
  DASHBOARD_COLLAPSE_WIDTH: 88,
  //
  DASHBOARD_ITEM_ROOT_HEIGHT: 48,
  DASHBOARD_ITEM_SUB_HEIGHT: 40,
  DASHBOARD_ITEM_HORIZONTAL_HEIGHT: 32,
};

export const ICON = {
  NAVBAR_ITEM: 22,
  NAVBAR_ITEM_HORIZONTAL: 20,
};

// SETTINGS
// Please remove `localStorage` when you set settings.
// ----------------------------------------------------------------------

export const defaultSettings = {
  themeMode: 'light',
  themeDirection: 'ltr',
  themeColorPresets: 'blue',
  themeLayout: 'horizontal',
  themeStretch: true,
};
