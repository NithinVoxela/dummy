import { IAuthModel } from "models/user.model";

import { IUserAccount } from "./userAccount.reducer";

export const LOGIN = "[USER_ACCOUNT] LOGIN";
// export const AUTO_LOGIN = "[AUTH] AUTO_LOGIN";
// export const SIGNUP = "[AUTH] SIGNUP";
export const SET_USER_ACCOUNT = "[USER_ACCOUNT] SET_USER_ACCOUNT";
export const REMOVE_USER_ACCOUNT = "[USER_ACCOUNT] REMOVE_USER_ACCOUNT";
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
