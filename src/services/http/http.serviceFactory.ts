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
    HttpServiceFactory._coreService.httpService = HttpServiceFactory._createHttpService();
  }

  private static _createIamService() {
    HttpServiceFactory._iamService.httpService = HttpServiceFactory._createHttpService();
  }

  private static _createHttpService(): AxiosInstance {
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
    authenticationHeaders["X-AuthToken"] = state.userAccount.token;

    const apiEndPoint = HttpServiceFactory._getTenantUrl();
    return axios.create({
      baseURL: apiEndPoint,
      headers: {
        common: authenticationHeaders
      },
      paramsSerializer: stringify
    });
  }

  private static _getTenantUrl() {
    const environment = {
      protocal: window.location.protocol,
      host: window.location.hostname,
      port: window.location.port
    };
    // const BASE_URL =
    //   (environment.protocal.indexOf(":") > 0 ? environment.protocal + "//" : environment.protocal + "://") +
    //   environment.host +
    //   (environment.port && environment.port !== "" ? ":" + environment.port : "") +
    //   "/cortexa-service/api/v2/";
    const BASE_URL = "http://localhost:9090/cortexa-service/api/v2/";
    return BASE_URL;
  }
}
