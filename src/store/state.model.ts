import { INotification } from "models/notification.model";
import { IUserAccount } from "models/user.model";
import { IAlertFilterParams } from "services/alert/alert.service";
import { IFilterParams } from "services/camera/camera.service";
import { ICameraState } from "store/camera/camera.reducer";
import { IEnvironment } from "store/environment.model";
import { ILoadingState } from "store/loading/loading.reducer";

import { IAlertLogState } from "./alert/alert.reducer";
import { ITranslationState } from "./translation/translation.reducer";

export interface IApplicationState {
  environment: IEnvironment;
  loading: ILoadingState;
  notifications: INotification[];
  sidebar: {
    open: boolean;
  };
  translation: ITranslationState;
  userAccount: IUserAccount;
  cameraData: ICameraState;
  cameraFilters: IFilterParams;
  alerts: IAlertLogState;
  alertFilters: IAlertFilterParams;
  redirectConfig: {
    redirectUrl: string;
  };
}
