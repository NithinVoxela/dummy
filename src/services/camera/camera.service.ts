import { CameraModel } from "models/camera.model";
import { ICameraDataModel } from "models/cameraData.model";
import { HttpService } from "services/http/http.service";
import { HttpServiceFactory } from "services/http/http.serviceFactory";

export interface IFilterParams {
  keywords?: string;
  pageNumber?: number;
  pageSize?: number;
  // sortBy?: string;
  // sortOrder?: SortDirectionType;
}

// function sleep(ms) {
//   return new Promise(resolve => setTimeout(resolve, ms));
// }

class CameraService {
  private static _instance: CameraService;
  private _httpService: HttpService;

  private constructor() {}

  public static getInstance(): CameraService {
    if (!CameraService._instance) {
      CameraService._instance = new CameraService();
      CameraService._instance._httpService = HttpServiceFactory.getCoreService();
    }

    return CameraService._instance;
  }

  public getCamreas = async (filterParams: IFilterParams) => {
    // await sleep(5000);
    const { pageNumber, pageSize, ...params } = CameraService._instance.sanitizeFilters(filterParams);
    const cameras = await CameraService._instance._httpService.post(
      `camera/view/search?pageNumber=${pageNumber}&pageSize=${pageSize}&sortAscending=true`,
      params
    );
    const camerasData = {
      cameras: cameras.records,
      totalCount: cameras.totalCount
    };
    return new CameraModel(camerasData);
  };

  public registerCamera = async (payload: ICameraDataModel) => {
    const cameras = await CameraService._instance._httpService.post("camera/register", payload);
    return cameras;
  };

  public updateCamera = async (payload: ICameraDataModel) => {
    const cameras = await CameraService._instance._httpService.put("camera/edit", payload);
    return cameras;
  };

  public getCamera = async ({ publicId }: { publicId: string }) => {
    const camera = await CameraService._instance._httpService.get(`camera/view/${publicId}`);
    return camera;
  };

  public deleteCamera = async ({ publicId }: { publicId: string }) => {
    const camera = await CameraService._instance._httpService.delete(`camera/deregister/${publicId}`);
    return camera;
  };

  public updateCameraApp = async (payload: any) => {
    const url = `camera/${payload.cameraId}/mlapp/${payload.appId}/configure`;
    delete payload.cameraId;
    delete payload.appId;
    const cameras = await CameraService._instance._httpService.post(url, payload);
    return cameras;
  };

  public addCameraApp = async (payload: any) => {
    const url = `camera/${payload.cameraId}/add/mlapp`;
    delete payload.cameraId;
    const cameras = await CameraService._instance._httpService.post(url, payload);
    return cameras;
  };

  public updateAppSchedule = async (payload: any) => {
    const response = await CameraService._instance._httpService.post(
      `camera/app/${payload.appId}/configure/schedule`,
      payload.schedule
    );
    return response;
  };

  public getAppSchedule = async (payload: any) => {
    const scheduleList = await CameraService._instance._httpService.get(`camera/app/${payload.appId}/schedule`);
    const camerasData = {
      cameras: [],
      totalCount: 0,
      scheduleList
    };
    return new CameraModel(camerasData);
  };

  public sanitizeFilters = (filterParams: IFilterParams) => {
    return {
      name: filterParams.keywords,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      // _sort: filterParams.sortBy,
      // // eslint-disable-next-line @typescript-eslint/naming-convention
      // _order: filterParams.sortOrder?.toLowerCase(),
      // eslint-disable-next-line @typescript-eslint/naming-convention
      pageNumber: filterParams.pageNumber,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      pageSize: filterParams.pageSize
    };
  };
}

export const cameraService = CameraService.getInstance();
