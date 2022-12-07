import { createSlice } from '@reduxjs/toolkit';
import axios from '../../utils/axios';
import { dispatch } from '../store';

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: null,
  recordingDataList : {
    total: 0,
    currentPage: 0,
    data: []
  },
  recordingDetails: {},
};

const slice = createSlice({
  name: 'recordings',
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

    getRecordingsSuccess(state, action) {
      const { data } = action.payload;
      state.isLoading = false;
      state.recordingDataList = { total: data.totalCount, data: data.records, currentPage: data.currentPage };
    },    
    getRecordingDetailsSuccess(state, action) {
      const { data } = action.payload;
      state.isLoading = false;
      state.recordingDetails = data;
    },  
   
    resetRecordingList(state) {
      state.recordingDataList = {
        total: 0,
        currentPage: 0,
        data: []
      };
    },
  },
});

// Reducer
export default slice.reducer;


export function getRecordings(queryParams, payload = {}) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const searchParams = new URLSearchParams(queryParams).toString();
      const response = await axios.post(`recording/search?${searchParams}`, payload);
      dispatch(slice.actions.getRecordingsSuccess(response));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
      throw(error);
    }
  };
}

export function getRecordingDetails(id, queryParams= {}) {
  return async () => {    
    try {      
      const urlParams = new URLSearchParams(queryParams).toString();
      const response = await axios.get(`recording/${id}?${urlParams}`);
      dispatch(slice.actions.getRecordingDetailsSuccess(response));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function patch(payload) { 
  return async () => {    
    try {      
      await axios.put(`recording/patch`, payload);      
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
};

export function resetRecordingList() {
  dispatch(slice.actions.resetRecordingList()); 
};

