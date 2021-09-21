export class CameraDataModel implements ICameraDataModel {
  public publicId: string;
  public name: string;
  public description: string;
  public cameraType: string;
  public brand: string;
  public model: string;
  public streamUrl: string;
  public cameraStatus: string;
  public passPhrase: string;
  public location: string;
  public installationDate: string;

  public constructor(model: ICameraDataModel) {
    this.publicId = model.publicId;
    this.name = model.name;
    this.description = model.description;
    this.cameraType = model.cameraType;
    this.brand = model.brand;
    this.brand = model.brand;
    this.model = model.model;
    this.streamUrl = model.streamUrl;
    this.cameraStatus = model.cameraStatus;
    this.passPhrase = model.passPhrase;
    this.location = model.location;
    this.installationDate = model.installationDate;
  }
}

export interface ICameraDataModel {
  publicId: string;
  name: string;
  description: string;
  cameraType: string;
  brand: string;
  model: string;
  streamUrl: string;
  cameraStatus: string;
  passPhrase: string;
  location: string;
  installationDate: string;
}
