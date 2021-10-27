import { IDeviceModel } from "models/user.model";
import { HttpService } from "services/http/http.service";
import { HttpServiceFactory } from "services/http/http.serviceFactory";

class DeviceService {
  private static _instance: DeviceService;
  private _httpService: HttpService;

  private constructor() {}

  public static getInstance(): DeviceService {
    if (!DeviceService._instance) {
      DeviceService._instance = new DeviceService();
      DeviceService._instance._httpService = HttpServiceFactory.getIamService();
    }

    return DeviceService._instance;
  }

  public registerDevice = async (payload: IDeviceModel) => {
    const device = await DeviceService._instance._httpService.post("device/registration/", payload);
    return device;
  };
}

export const deviceService = DeviceService.getInstance();
