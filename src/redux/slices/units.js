import { createSlice } from '@reduxjs/toolkit';
import axios from '../../utils/axios';
import { dispatch } from '../store';

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: null,
  unitDataList: {
    total: 0,
    data: [],
  },
  unitDetails: {},
};

const slice = createSlice({
  name: 'units',
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    getUnitSuccess(state, action) {
      const { data } = action.payload;
      state.isLoading = false;
      state.unitDataList = { total: data.totalCount, data: data.records };
    },
    getUnitDetails(state, action) {
      const { data } = action.payload;
      state.unitDetails = data;
    },
    resetUnitDetails(state) {
      state.unitDetails = {};
    },
    resetUnitList(state) {
      state.unitDataList = [];
    },
  },
});

// Reducer
export default slice.reducer;

export function getUnits(queryParams, payload = {}) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const searchParams = new URLSearchParams(queryParams).toString();
      const response = await axios.post(`unit/search?${searchParams}`, payload);
      dispatch(slice.actions.getUnitSuccess(response));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function resetUnitDetails() {
  return () => {
    dispatch(slice.actions.resetUnitDetails());
  };
}

export function resetUnitList() {
  dispatch(slice.actions.resetUnitList());
}

export async function saveUnit(payload, queryParams) {
  const urlParams = queryParams ? `?${new URLSearchParams(queryParams).toString()}` : '';
  const response = await axios.post(`unit${urlParams}`, payload);
  return response;
}

export async function patchUnit(payload) {
  await axios.put('unit/patch', payload);
}

export function getUnitDetails(id, queryParams) {
  return async () => {
    try {
      const urlParams = queryParams ? `?${new URLSearchParams(queryParams).toString()}` : '';
      const response = await axios.get(`unit/${id}${urlParams}`);
      dispatch(slice.actions.getUnitDetails(response));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function deleteUnit(id) {
  return async () => {
    try {
      await axios.delete(`unit/${id}`);
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
