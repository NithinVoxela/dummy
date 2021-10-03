import { AlertLogModel } from "models/alert.model";
import { HttpService } from "services/http/http.service";
import { HttpServiceFactory } from "services/http/http.serviceFactory";
import { formatDate } from "src/helpers/dateTime";

export interface IAlertFilterParams {
  cameraName?: string;
  pageNumber?: number;
  pageSize?: number;
  dateRange?: {
    startDate: Date;
    endDate: Date;
  };
  location?: string;
  dateTimeDisplayValue?: string;
}

class AlertService {
  private static _instance: AlertService;
  private _httpService: HttpService;

  private constructor() {}

  public static getInstance(): AlertService {
    if (!AlertService._instance) {
      AlertService._instance = new AlertService();
      AlertService._instance._httpService = HttpServiceFactory.getCoreService();
    }

    return AlertService._instance;
  }

  public getAlertLog = async (filterParams: IAlertFilterParams) => {
    const { pageNumber, pageSize, ...params } = this.sanitizeFilters(filterParams);
    const alerts = await AlertService._instance._httpService.put(
      `alert/search?pageNumber=${pageNumber}&pageSize=${pageSize}`,
      params
    );
    const alertsData = {
      alerts: alerts.records,
      totalCount: alerts.totalCount
    };
    return new AlertLogModel(alertsData);
  };

  public sanitizeFilters = (filterParams: IAlertFilterParams) => {
    return {
      pageNumber: filterParams.pageNumber,
      pageSize: filterParams.pageSize,
      ...(filterParams.cameraName && {
        cameraName: filterParams.cameraName
      }),
      ...(filterParams.location && {
        location: filterParams.location
      }),
      ...(filterParams.dateRange.startDate &&
        filterParams.dateRange.endDate && {
          startDate: formatDate(filterParams.dateRange.startDate),
          endDate: formatDate(filterParams.dateRange.endDate)
        })
    };
  };
}

export const alertService = AlertService.getInstance();
