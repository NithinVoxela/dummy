import { AlertDataModel, IAlertDataModel } from "./alertData.model";

export interface IAlertLogModel {
  alerts: IAlertDataModel[];
  totalCount: number;
}

export interface IAlertRequestOptions {
  withDebounce?: boolean;
}

export class AlertLogModel implements IAlertLogModel {
  public alerts: IAlertDataModel[];
  public totalCount: number;

  public constructor(model: IAlertLogModel) {
    this.alerts = model.alerts ? model.alerts.map(alert => new AlertDataModel(alert)) : [];
    this.totalCount = model.totalCount;
  }
}
