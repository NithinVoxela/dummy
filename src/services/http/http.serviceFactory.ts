import axios, { AxiosInstance } from "axios";

import { HttpService } from "services/http/http.service";
import { AppStore } from "store/configureStore";

export class HttpServiceFactory {
  private static _coreService = new HttpService();

  public static getCoreService(): HttpService {
    if (!HttpServiceFactory._coreService.httpService) {
      HttpServiceFactory._createCoreService();
    }

    return HttpServiceFactory._coreService;
  }

  public static createServices() {
    HttpServiceFactory._createCoreService();
  }

  private static _createCoreService() {
    HttpServiceFactory._coreService.httpService = HttpServiceFactory._createHttpService("frontEndApi");
  }

  private static _createHttpService(endpoint: string): AxiosInstance {
    const appStore = AppStore.getInstance();
    if (!appStore) {
      return null;
    }

    const state = appStore.getState();
    const environment = state.environment;
    if (!environment) {
      return null;
    }

    return axios.create({
      baseURL: environment.apiEndpoints[endpoint]
    });
  }
}
