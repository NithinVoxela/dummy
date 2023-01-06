import { createSlice } from '@reduxjs/toolkit';
import axios from '../../utils/axios';
import { dispatch } from '../store';

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: null,
  tenantDataList: {
    total: 0,
    data: [],
  },
  tenantDetails: {},
};

const slice = createSlice({
  name: 'tenants',
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    getTenantSuccess(state, action) {
      const { data } = action.payload;
      state.isLoading = false;
      state.tenantDataList = { total: data.totalCount, data: data.records };
    },
    getTenantDetails(state, action) {
      const { data } = action.payload;
      state.tenantDetails = data;
    },
    resetTenantDetails(state) {
      state.tenantDetails = {};
    },
    resetTenantList(state) {
      state.tenantDataList = [];
    },
  },
});

// Reducer
export default slice.reducer;

export function getTenants(queryParams, payload = {}) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const searchParams = new URLSearchParams(queryParams).toString();
      const response = await axios.post(`tenant/search?${searchParams}`, payload);
      dispatch(slice.actions.getTenantSuccess(response));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function resetTenantDetails() {
  return () => {
    dispatch(slice.actions.resetTenantDetails());
  };
}

export function resetTenantList() {
  dispatch(slice.actions.resetTenantList());
}

export async function saveTenant(payload, queryParams) {
  const urlParams = queryParams ? `?${new URLSearchParams(queryParams).toString()}` : '';
  await axios.post(`tenant${urlParams}`, payload);
}

export async function patchTenant(payload) {
  await axios.put('tenant/patch', payload);
}

export function getTenantDetails(id) {
  return async () => {
    try {
      const response = await axios.get(`tenant/${id}`);
      dispatch(slice.actions.getTenantDetails(response));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
