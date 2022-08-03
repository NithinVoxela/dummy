import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';
// slices
import camerasReducer from './slices/cameras';
import alertsReducer from './slices/alerts';
import authReducer from './slices/auth';
import userReducer from './slices/users';

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
  auth: authReducer,
  users: userReducer
});

export { rootPersistConfig, rootReducer };
