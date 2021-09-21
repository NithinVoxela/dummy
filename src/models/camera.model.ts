import { CameraDataModel, ICameraDataModel } from "./cameraData.model";

export interface ICameraModel {
  cameras: ICameraDataModel[];
  totalCount: number;
}

export interface ICameraRequestOptions {
  withDebounce?: boolean;
}

export class CameraModel implements ICameraModel {
  public cameras: ICameraDataModel[];
  public totalCount: number;

  public constructor(model: ICameraModel) {
    this.cameras = model.cameras ? model.cameras.map(camera => new CameraDataModel(camera)) : [];
    this.totalCount = model.totalCount;
  }
}
