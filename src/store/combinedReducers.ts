import { combineReducers } from "redux";

import { notifierReducer } from "containers/Notifier/store/notifier.reducer";
import { sidebarReducer } from "containers/Sidebar/store/sidebar.reducer";
import { loadingReducer } from "store/loading/loading.reducer";

import { translationReducer } from "./translation/translation.reducer";

const allReducers = {
  translation: translationReducer,
  environment: (state = {}) => state,
  loading: loadingReducer,
  notifications: notifierReducer,
  sidebar: sidebarReducer
};

const rootReducer = combineReducers(allReducers);

export { rootReducer, allReducers };
