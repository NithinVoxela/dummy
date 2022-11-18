import { createSlice } from '@reduxjs/toolkit';
import axios from '../../utils/axios';
import { dispatch } from '../store';

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: null,
  userList : {
    total: 0,
    data: []
  },  
};

const slice = createSlice({
  name: 'users',
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
    getUserSuccess(state, action) {
      const { data } = action.payload;
      state.isLoading = false;
      state.userList = { total: data.totalCount, data: data.records };
    },        

    resetUserList(state) {
      state.userList = [];
    },
  },
});

// Reducer
export default slice.reducer;


export function getUsers(queryParams, payload = {}) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const searchParams = new URLSearchParams(queryParams).toString();
      const response = await axios.put(`view/user/all?${searchParams}`, payload);
      dispatch(slice.actions.getUserSuccess(response));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function resetUserList() {
  dispatch(slice.actions.resetUserList()); 
};

export async function patchUser(payload = {}) {        
  await axios.put('user/patch', payload); 
}

