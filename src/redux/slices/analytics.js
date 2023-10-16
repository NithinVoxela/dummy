import { createSlice } from '@reduxjs/toolkit';
import axios from '../../utils/axios';
import { dispatch } from '../store';

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: null,
  userList: {
    total: 0,
    data: [],
  },
  cameraStats: {},
  severityStats: {},
  alertStats: {},
};

const slice = createSlice({
  name: 'analytics',
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
    },

    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    getCameraStats(state, action) {
      const { data } = action.payload;
      state.cameraStats = data;
    },

    getCameraSeverityStats(state, action) {
      const { data } = action.payload;
      state.severityStats = data;
    },

    getAlertsStats(state, action) {
      const { data } = action.payload;
      state.alertStats = data;
    },

    resetAnalytics(state) {
      state.cameraStats = {};
      state.severityStats = {};
      state.alertStats = {};
    },
  },
});

// Reducer
export default slice.reducer;

export function getCameraSeverityStats(params = {}) {
  return async () => {
    try {
      const response = await axios.get(`alert/view/by-severity/dashboard`, { params });
      dispatch(slice.actions.getCameraSeverityStats(response));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getCameraStats(params = {}) {
  return async () => {
    try {
      const response = await axios.get(`camera/view/by-status/dashboard`, { params });
      dispatch(slice.actions.getCameraStats(response));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getAlertsStats(params = {}) {
  return async () => {
    try {
      const response = await axios.get(`alert/view/by-camera/dashboard`, { params });
      dispatch(slice.actions.getAlertsStats(response));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function resetAnalytics() {
  dispatch(slice.actions.resetAnalytics());
}
