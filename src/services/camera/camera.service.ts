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
