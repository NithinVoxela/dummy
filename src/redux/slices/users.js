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
  userDetails: {},
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

    // GET USERS
    getUserSuccess(state, action) {
      const { data } = action.payload;
      state.isLoading = false;
      state.userList = { total: data.totalCount, data: data.records };
    },

    getUsersDetails(state, action) {
      const { data } = action.payload;
      state.userDetails = data;
    },

    resetUsersDetails(state) {
      state.userDetails = {};
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
      const response = await axios.get(`user?${searchParams}`, payload);
      dispatch(slice.actions.getUserSuccess(response));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function deleteUser(id) {
  return async () => {
    try {
      await axios.delete(`user/${id}`);
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export async function saveUser(payload) {
  await axios.post(`user`, payload);
}

export function getUserDetails(id) {
  return async () => {
    try {
      const response = await axios.get(`user/${id}`);
      dispatch(slice.actions.getUsersDetails(response));
    } catch (error) {
      throw new Error(error);
    }
  };
}

export function resetUserDetails() {
  return () => {
    dispatch(slice.actions.resetUsersDetails());
  };
}

export function resetUserList() {
  dispatch(slice.actions.resetUserList());
}

export async function patchUser(payload) {
  await axios.put('user/patch', payload);
}
