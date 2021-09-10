import { combineReducers } from "redux";
import { persistReducer, PersistConfig } from "redux-persist";
import storage from "redux-persist/lib/storage";

import { notifierReducer } from "containers/Notifier/store/notifier.reducer";
import { sidebarReducer } from "containers/Sidebar/store/sidebar.reducer";
import { loadingReducer } from "store/loading/loading.reducer";

import { translationReducer } from "./translation/translation.reducer";
import { userAccountReducer } from "./userAccount/userAccount.reducer";

export const userAccountPersistConfiguration: PersistConfig<unknown> = {
  key: "userAccount",
  storage
};

const allReducers = {
  translation: translationReducer,
  environment: (state = {}) => state,
  loading: loadingReducer,
  notifications: notifierReducer,
  sidebar: sidebarReducer,
  userAccount: persistReducer(userAccountPersistConfiguration, userAccountReducer)
};

const rootReducer = combineReducers(allReducers);

export { rootReducer, allReducers };
