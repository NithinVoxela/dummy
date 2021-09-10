import { INotification } from "models/notification.model";
import { IUserAccount } from "models/user.model";
import { IEnvironment } from "store/environment.model";
import { ILoadingState } from "store/loading/loading.reducer";

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
}
