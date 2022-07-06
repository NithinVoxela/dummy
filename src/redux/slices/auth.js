import { createSlice } from '@reduxjs/toolkit';
import axios from '../../utils/axios';

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: null,  
};

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {       
  },
});

// Reducer
export default slice.reducer;


export async function registerDevice(payload = {}) {        
  await axios.post('device/registration/save', payload); 
}

