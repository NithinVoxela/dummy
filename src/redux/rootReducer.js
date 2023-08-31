import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';
// slices
import camerasReducer from './slices/cameras';
import alertsReducer from './slices/alerts';
import recordingsReducer from './slices/recordings';
import authReducer from './slices/auth';
import userReducer from './slices/users';
import tenantReducer from './slices/tenants';
import unitReducer from './slices/units';
import agentReducer from './slices/agents';
import analyticsReducer from './slices/analytics';

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
  recordings: recordingsReducer,
  auth: authReducer,
  users: userReducer,
  analytics: analyticsReducer,
  tenants: tenantReducer,
  units: unitReducer,
  agents: agentReducer,
});

export { rootPersistConfig, rootReducer };
