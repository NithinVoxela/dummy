import axios, { AxiosInstance } from "axios";
import { stringify } from "qs";

import { HttpService } from "services/http/http.service";
import { AppStore } from "store/configureStore";

export class HttpServiceFactory {
  private static _coreService = new HttpService();
  private static _iamService = new HttpService();

  public static getCoreService(): HttpService {
    if (!HttpServiceFactory._coreService.httpService) {
      HttpServiceFactory._createCoreService();
    }

    return HttpServiceFactory._coreService;
  }

  public static getIamService(): HttpService {
    if (!HttpServiceFactory._iamService.httpService) {
      HttpServiceFactory._createIamService();
    }

    return HttpServiceFactory._iamService;
  }

  public static createServices() {
    HttpServiceFactory._createCoreService();
    HttpServiceFactory._createIamService();
  }

  private static _createCoreService() {
    HttpServiceFactory._coreService.httpService = HttpServiceFactory._createHttpService("frontEndApi");
  }

  private static _createIamService() {
    HttpServiceFactory._iamService.httpService = HttpServiceFactory._createHttpService("frontEndApi", true);
  }

  private static _createHttpService(endpoint: string, includeToken?: boolean): AxiosInstance {
    const appStore = AppStore.getInstance();
    if (!appStore) {
      return null;
    }

    const state = appStore.getState();
    const environment = state.environment;
    if (!environment) {
      return null;
    }

    const authenticationHeaders: any = {};
    authenticationHeaders["X-TenantID"] = environment.authenticationHeaders.tenantId;

    if (includeToken) {
      authenticationHeaders.Authorization = state.userAccount.token;
    }

    return axios.create({
      baseURL: environment.apiEndpoints[endpoint],
      headers: {
        common: authenticationHeaders
      },
      paramsSerializer: stringify
    });
  }
}
