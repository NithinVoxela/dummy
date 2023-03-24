import { createSlice } from '@reduxjs/toolkit';
import axios from '../../utils/axios';
import { dispatch } from '../store';

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: null,
  agentDataList: {
    total: 0,
    data: [],
  },
  agentDetails: {},
};

const slice = createSlice({
  name: 'agents',
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    getAgentSuccess(state, action) {
      const { data } = action.payload;
      state.isLoading = false;
      state.agentDataList = { total: data.totalCount, data: data.records };
    },
    getAgentDetails(state, action) {
      const { data } = action.payload;
      state.agentDetails = data;
    },
    resetAgentDetails(state) {
      state.agentDetails = {};
    },
    resetAgentList(state) {
      state.agentDataList = [];
    },
  },
});

// Reducer
export default slice.reducer;

export function getAgents(queryParams, payload = {}) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const searchParams = new URLSearchParams(queryParams).toString();
      const response = await axios.post(`agent/search?${searchParams}`, payload);
      dispatch(slice.actions.getAgentSuccess(response));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export async function getAgentsForAutoComplete(queryParams, payload = {}) {
  const searchParams = new URLSearchParams(queryParams).toString();
  return axios.post(`agent/search?${searchParams}`, payload);
}

export function resetAgentDetails() {
  return () => {
    dispatch(slice.actions.resetAgentDetails());
  };
}

export function resetAgentList() {
  dispatch(slice.actions.resetAgentList());
}

export async function saveAgent(payload) {
  await axios.post(`agent`, payload);
}

export async function patchAgent(payload) {
  await axios.put('agent/patch', payload);
}

export function getAgentDetails(id, queryParams) {
  return async () => {
    try {
      const urlParams = queryParams ? `?${new URLSearchParams(queryParams).toString()}` : '';
      const response = await axios.get(`agent/${id}${urlParams}`);
      dispatch(slice.actions.getAgentDetails(response));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export async function deleteAgent(id) {
  await axios.delete(`agent/${id}`);
}
