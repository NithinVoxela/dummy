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

  public post(url: string, body?: any): Promise<any> {
    return this.httpService.post(url, this._trimValues(body)).then(res => res.data);
  }

  public put(url: string, body?: any): Promise<any> {
    return this.httpService.put(url, this._trimValues(body)).then(res => res.data);
  }

  public delete(url: string, queryParams?: any): Promise<any> {
    const params = this._sanitizeParameter(queryParams);
    return this.httpService
      .delete(url, {
        params
      })
      .then(res => res.data);
  }

  private _trimValues(body: any): any {
    if (typeof body === "object") {
      for (const prop in body) {
        if (body[prop]) {
          if (typeof body[prop] === "string") {
            body[prop] = body[prop].trim();
          } else if (typeof body[prop] === "object") {
            this._trimValues(body[prop]);
          }
        }
      }
    } else if (typeof body === "string") {
      return body.trim();
    }
    return body;
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
