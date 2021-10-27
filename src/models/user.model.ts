export interface IUserAccount {
  userName: string;
  email: string;
  mobileNo: number;
  locale: string;
  role: string;
  firstName: string;
  lastName: string;
  timezone: string;
  dateFormat: string;
  token: string;
  password: string;
  deleted: boolean;
}

export interface IAuthModel {
  userName: string;
  userPassword: string;
}

export interface IDeviceModel {
  fireBaseId: string;
  deviceType: string;
}
