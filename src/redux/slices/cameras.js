import { createSlice } from '@reduxjs/toolkit';
import axios from '../../utils/axios';
import { dispatch } from '../store';

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: null,
  cameraDataList : {
    total: 0,
    data: []
  },
  cameraDetails: {},
  schedularList: []
};

const slice = createSlice({
  name: 'cameras',
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
    getCamerasSuccess(state, action) {
      const { data } = action.payload;
      state.isLoading = false;
      state.cameraDataList = { total: data.totalCount, data: data.records };
    },    

    // GET CAMERA DETAILS
    getCamerasDetails(state, action) {
      const { data } = action.payload;      
      state.cameraDetails = data;
    }, 

    // GET CAMERA App Schedule
    getCamerasAppSchedule(state, action) {
      const { data } = action.payload;      
      state.schedularList = data;
    }, 

    resetCameraDetails(state) {
      state.cameraDetails = {};
    },
  },
});

// Reducer
export default slice.reducer;


export function getCameras(queryParams, payload = {}) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const searchParams = new URLSearchParams(queryParams).toString();
      const response = await axios.post(`camera/view/search?${searchParams}`, payload);
      dispatch(slice.actions.getCamerasSuccess(response));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function deleteCamera(cameraId) {
  return async () => {   
    try {      
      await axios.delete(`camera/deregister/${cameraId}`);      
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function saveCamera(payload) {
  return async () => {       
    await axios.post(`camera/register`, payload);          
  };
}

export function updateCamera(payload) {
  return async () => {           
    await axios.put(`camera/edit`, payload);          
  };
}

export function getCameraDetails(publicId) {
  return async () => {
    try {      
      const response = await axios.get(`camera/view/${publicId}`);
      dispatch(slice.actions.getCamerasDetails(response));
    } catch (error) {
      throw new Error(error);
    }
  };
}

export function updateCameraApp(payload) {
  return async () => {  
    const url = `camera/${payload.cameraId}/mlapp/${payload.appId}/configure`;
    delete payload.cameraId;
    delete payload.appId;     
    await axios.post(url, payload);          
  };
};

export function addCameraApp(payload) {
  return async () => {  
    const url = `camera/${payload.cameraId}/add/mlapp`;
    delete payload.cameraId;    
    await axios.post(url, payload);          
  };
};

export function getAppSchedule(payload) {
  return async () => {  
    try {      
      const response = await axios.get(`camera/app/${payload.appId}/schedule`);
      dispatch(slice.actions.getCamerasAppSchedule(response));
    } catch (error) {
      throw new Error(error);
    }          
  };
};

export function updateAppSchedule(payload) {
  return async () => {  
    try {      
      await axios.post(`camera/app/${payload.appId}/configure/schedule`, payload.schedule);      
    } catch (error) {
      throw new Error(error);
    }          
  };
};

export function resetCameraDetails() {
  return () => {       
    dispatch(slice.actions.resetCameraDetails());          
  };
}


