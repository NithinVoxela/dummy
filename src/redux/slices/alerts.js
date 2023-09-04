import { createSlice } from '@reduxjs/toolkit';
import axios from '../../utils/axios';
import { dispatch } from '../store';

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: null,
  alertDataList: {
    total: 0,
    currentPage: 0,
    data: [],
  },
  alertDetails: {},
  alertCountDataList: {
    total: 0,
    currentPage: 0,
    data: [],
  },
};

const slice = createSlice({
  name: 'alerts',
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

    // GET CAMERAS
    getAlertsSuccess(state, action) {
      const { data } = action.payload;
      state.isLoading = false;
      state.alertDataList = { total: data.totalCount, data: data.records, currentPage: data.currentPage };
    },
    getAlertDetailsSuccess(state, action) {
      const { data } = action.payload;
      state.isLoading = false;
      state.alertDetails = data;
    },

    getDashboardAlertsSuccess(state, action) {
      const { data } = action.payload;
      state.isLoading = false;
      state.dashboardAlerts = { total: data.length, data };
    },

    getAlertCountSuccess(state, action) {
      const { data } = action.payload;
      state.alertCountDataList = { total: data.totalCount, data: data.records, currentPage: data.currentPage };
    },

    resetAlertList(state) {
      state.alertDataList = {
        total: 0,
        currentPage: 0,
        data: [],
      };
    },
  },
});

// Reducer
export default slice.reducer;

export function getAlerts(queryParams, payload = {}, countRequest = false) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const searchParams = new URLSearchParams(queryParams).toString();
      const response = await axios.put(`alert/search?${searchParams}`, payload);
      if (countRequest) {
        dispatch(slice.actions.getAlertCountSuccess(response));
      } else {
        dispatch(slice.actions.getAlertsSuccess(response));
      }
    } catch (error) {
      dispatch(slice.actions.hasError(error));
      throw error;
    }
  };
}

export async function deleteAlert(alertId) {
  try {
    await axios.delete(`alert/${alertId}`);
  } catch (error) {
    dispatch(slice.actions.hasError(error));
  }
}

export function getUnreadAlertCount(payload = {}) {
  return async () => {
    try {
      const queryParams = {
        pageNumber: 0,
        pageSize: 0,
        sortAscending: false,
      };
      payload.hasRead = false;
      const searchParams = new URLSearchParams(queryParams).toString();
      const response = await axios.put(`alert/search?${searchParams}`, payload);
      dispatch(slice.actions.getAlertCountSuccess(response));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
      throw error;
    }
  };
}

export function getAlertDetails(id) {
  return async () => {
    try {
      const response = await axios.get(`alert/view/${id}`);
      dispatch(slice.actions.getAlertDetailsSuccess(response));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export async function patchAlert(payload) {
  try {
    await axios.put('alert/patch', payload);
  } catch (error) {
    dispatch(slice.actions.hasError(error));
  }
}

export async function getDashboardAlertLog() {
  return axios.get(`alert/view/camera-alert/dashboard/latest-alerts`);
}

export function sendTestAlert(payload) {
  return async () => {
    try {
      const url = `alert/view/sendSampleNotification`;
      await axios.post(url, payload);
    } catch (error) {
      throw new Error(error);
    }
  };
}

export async function markAllAsRead() {
  try {
    await axios.put(`alert/markAllAlertsAsRead`);
  } catch (error) {
    dispatch(slice.actions.hasError(error));
  }
}

export function resetAlertList() {
  dispatch(slice.actions.resetAlertList());
}
