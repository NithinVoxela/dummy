import { CameraDataModel, ICameraDataModel } from "./cameraData.model";

export interface ICameraModel {
  cameras: ICameraDataModel[];
  totalCount: number;
  scheduleList: any[];
}

export interface ICameraRequestOptions {
  withDebounce?: boolean;
}

export class CameraModel implements ICameraModel {
  public cameras: ICameraDataModel[];
  public totalCount: number;
  public scheduleList: any[];

  public constructor(model: ICameraModel) {
    this.cameras = model.cameras ? model.cameras.map(camera => new CameraDataModel(camera)) : [];
    this.totalCount = model.totalCount;
    this.scheduleList = model?.scheduleList || [];
  }
}
