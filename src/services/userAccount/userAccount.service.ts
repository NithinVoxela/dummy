import { IAuthModel } from "models/user.model";
import { HttpService } from "services/http/http.service";
import { HttpServiceFactory } from "services/http/http.serviceFactory";

class UserAccountService {
  private static _instance: UserAccountService;
  private _httpService: HttpService;

  private constructor() {}

  public static getInstance(): UserAccountService {
    if (!UserAccountService._instance) {
      UserAccountService._instance = new UserAccountService();
      UserAccountService._instance._httpService = HttpServiceFactory.getIamService();
    }

    return UserAccountService._instance;
  }

  public login = async (params: IAuthModel) => {
    const authParams = { ...params, userPassword: btoa(params.userPassword) };
    const userConfig = await UserAccountService._instance._httpService.post("login", authParams);
    return userConfig;
  };
}

export const userAccountService = UserAccountService.getInstance();
