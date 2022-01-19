import { IAlertLogModel } from "models/alert.model";
import { IAuthModel, IUserAccount, IDeviceModel } from "models/user.model";
import { IAlertFilterParams } from "services/alert/alert.service";

export const LOGIN = "[USER_ACCOUNT] LOGIN";
// export const AUTO_LOGIN = "[AUTH] AUTO_LOGIN";
// export const SIGNUP = "[AUTH] SIGNUP";
export const SET_USER_ACCOUNT = "[USER_ACCOUNT] SET_USER_ACCOUNT";
export const REMOVE_USER_ACCOUNT = "[USER_ACCOUNT] REMOVE_USER_ACCOUNT";
export const REGISTER_USER_DEVICE = "[USER_ACCOUNT] REGISTER_USER_DEVICE";
export const REGISTER_USER_DEVICE_SUCCESS = "[USER_ACCOUNT] REGISTER_USER_DEVICE_SUCCESS";
export const USER_ALERT_COUNT = "[USER_ACCOUNT] USER_ALERT_COUNT";
export const USER_ALERT_COUNT_SUCCESS = "[USER_ACCOUNT] USER_ALERT_COUNT_SUCCESS";
// export const SET_USER_ACCOUNT_ERROR = "[USER_ACCOUNT] SET_USER_ACCOUNT_ERROR";
// export const CLEAR_USER_ACCOUNT_ERROR = "[USER_ACCOUNT] CLEAR_USER_ACCOUNT_ERROR";
// export const LOGOUT = "[AUTH] LOGOUT";

export interface ILoginRequstPayload {
  payload: IAuthModel;
}

export const login = (payload: IAuthModel) => ({
  type: LOGIN,
  payload
});

// export const autoLogin = () => ({
//   type: AUTO_LOGIN
// });

export const setUserAccount = (payload: IUserAccount) => ({
  type: SET_USER_ACCOUNT,
  payload
});

export const removeUserAccount = () => ({
  type: REMOVE_USER_ACCOUNT
});

export const userDeviceRegistration = (payload: IDeviceModel) => ({
  type: REGISTER_USER_DEVICE,
  payload
});

export const registerDeviceSuccess = (payload: Partial<IDeviceModel>) => ({
  type: REGISTER_USER_DEVICE_SUCCESS,
  payload
});

export const userAlertCount = (payload: IAlertFilterParams) => ({
  type: USER_ALERT_COUNT,
  payload
});

export const userAlertCountSuccess = (payload: IAlertLogModel) => ({
  type: USER_ALERT_COUNT_SUCCESS,
  payload
});

// export const setUserAccountError = (payload: string) => ({
//   type: SET_USER_ACCOUNT_ERROR,
//   payload
// });

// export const clearUserAccountError = () => ({
//   type: CLEAR_USER_ACCOUNT_ERROR
// });

// export const logout = () => ({
//   type: LOGOUT
// });
