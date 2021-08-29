import { AxiosInstance } from "axios";

export enum HttpRequestMethod {
  GET = "get"
}

export class HttpService {
  public httpService: AxiosInstance;

  public get(url: string, queryParams?: any): Promise<any> {
    const params = this._sanitizeParameter(queryParams);
    return this.httpService
      .get(url, {
        params
      })
      .then(res => res);
  }

  private readonly _sanitizeParameter = (queryParams: any) => {
    if (queryParams) {
      return Object.entries(queryParams).reduce((acc: any, [key, value]) => {
        if (value || value === 0 || value === false) {
          acc[key] = value;
        }
        return acc;
      }, {});
    }
    return null;
  };
}
