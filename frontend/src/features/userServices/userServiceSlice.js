import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = (import.meta.env.VITE_API_URL || 'http://localhost:5001') + '/api/user-services/';

// Get user's own services
export const getMyServices = createAsyncThunk('userServices/getMy', async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    const config = { headers: { Authorization: `Bearer ${token}` } };
    const response = await axios.get(API_URL + 'my', config);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
});

// Create service (Admin)
export const createUserService = createAsyncThunk('userServices/create', async (serviceData, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    const config = { headers: { Authorization: `Bearer ${token}` } };
    const response = await axios.post(API_URL, serviceData, config);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
});

const userServiceSlice = createSlice({
  name: 'userService',
  initialState: { services: [], isLoading: false, isError: false, message: '' },
  reducers: {
    resetService: (state) => { state.isLoading = false; state.isError = false; state.message = ''; }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMyServices.pending, (state) => { state.isLoading = true; })
      .addCase(getMyServices.fulfilled, (state, action) => {
        state.isLoading = false;
        state.services = action.payload;
      })
      .addCase(createUserService.fulfilled, (state, action) => {
          state.isLoading = false;
          // We don't necessarily need to add it to state here if the admin is on a different page, but it helps
      });
  }
});

export const { resetService } = userServiceSlice.actions;
export default userServiceSlice.reducer;