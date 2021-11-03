export class AlertDataModel implements IAlertDataModel {
  public id: number;
  public cameraId: string;
  public type: string;
  public alertTime: Date;
  public thumbnailUrl: string;
  public mediaUrl: string;
  public videoDuration: number;
  public severity: string;
  public cameraName: string;
  public cameraLocation: string;
  public fileName: string;
  public hasRead: boolean;

  public constructor(model: IAlertDataModel) {
    this.cameraId = model.cameraId;
    this.id = model.id;
    this.type = model.type;
    this.alertTime = model.alertTime;
    this.thumbnailUrl = model.thumbnailUrl;
    this.mediaUrl = model.mediaUrl;
    this.videoDuration = model.videoDuration;
    this.severity = model.severity;
    this.cameraName = model.cameraName;
    this.cameraLocation = model.cameraLocation;
    this.fileName = model.fileName;
    this.hasRead = model.hasRead;
  }
}

export interface IAlertDataModel {
  id?: number;
  cameraId?: string;
  alertTime?: Date;
  type?: string;
  thumbnailUrl?: string;
  mediaUrl?: string;
  videoDuration?: number;
  severity?: string;
  cameraName?: string;
  cameraLocation?: string;
  fileName?: string;
  hasRead?: boolean;
}
