import axios, { AxiosStatic } from "axios";

class ConfigurationService {
  private static _instance: ConfigurationService;
  public httpService: AxiosStatic;

  private constructor() {}

  public static getInstance(): ConfigurationService {
    if (!ConfigurationService._instance) {
      ConfigurationService._instance = new ConfigurationService();
      ConfigurationService._instance.httpService = axios;
    }

    return ConfigurationService._instance;
  }

  public getEnvironment = () => {
    return ConfigurationService._instance.httpService.get("config.json").then(res => res.data);
  };
}

export const configurationService = ConfigurationService.getInstance();
