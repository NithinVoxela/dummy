import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';
// slices
import camerasReducer from './slices/cameras';
import alertsReducer from './slices/alerts';
import authReducer from './slices/auth';

// ----------------------------------------------------------------------

const rootPersistConfig = {
  key: 'root',
  storage,
  keyPrefix: 'redux-',
  whitelist: [],
};


const rootReducer = combineReducers({
  cameras: camerasReducer,
  alerts: alertsReducer,
  auth: authReducer
});

export { rootPersistConfig, rootReducer };
