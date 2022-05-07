import { createSlice } from '@reduxjs/toolkit';
import axios from '../../utils/axios';
import { dispatch } from '../store';

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: null,
  alertDataList : {
    total: 0,
    currentPage: 0,
    data: []
  },
  alertDetails: {},  
  dashboardAlerts: {
    data: [],
    total: 0
  },
  dashboardCameraAlerts: {
    data: [],
    total: 0
  },
  alertCountDataList: {
    total: 0,
    currentPage: 0,
    data: []
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

    getDashboardCameraAlertsSuccess(state, action) {
      const { data } = action.payload;
      state.isLoading = false;
      state.dashboardCameraAlerts = { total: data.length, data };
    },

    cleanDashboardAlertLogs(state) {
      const emptyResponse = {
        data: [],
        total: 0
      };      
      state.dashboardAlerts = emptyResponse;
      state.dashboardCameraAlerts = emptyResponse;
    },

    getAlertCountSuccess(state, action) {
      const { data } = action.payload;      
      state.alertCountDataList = { total: data.totalCount, data: data.records, currentPage: data.currentPage };
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

export function markAsRead(id) { 
  return async () => {    
    try {      
      await axios.put(`alert/${id}/markRead`);      
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
};

export function getDashboardAlertLog() { 
  return async () => {    
    try {      
      const response = await axios.get(`alert/view/camera-alert/dashboard/latest-alerts`);
      dispatch(slice.actions.getDashboardAlertsSuccess(response));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
};

export function getDashboardCameraAlertLog() { 
  return async () => {    
    try {      
      const response = await axios.get(`alert/view/camera-alert/dashboard`);
      dispatch(slice.actions.getDashboardCameraAlertsSuccess(response));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
};

export function cleanDashboardAlertLogs() { 
  return async () => {    
    try {            
      dispatch(slice.actions.cleanDashboardAlertLogs());
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
};

