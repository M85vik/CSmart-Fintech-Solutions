// File: src/features/vehicles/vehicleSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import vehicleService from './vehicleService';

const initialState = {
  vehicles: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

// Get all vehicles
export const getVehicles = createAsyncThunk('vehicles/getAll', async (_, thunkAPI) => {
  try {
    return await vehicleService.getVehicles();
  } catch (error) {
    const message = (error.response?.data?.message) || error.message;
    return thunkAPI.rejectWithValue(message);
  }
});

// Create vehicle
export const createVehicle = createAsyncThunk('vehicles/create', async (vehicleData, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await vehicleService.createVehicle(vehicleData, token);
  } catch (error) {
    const message = (error.response?.data?.message) || error.message;
    return thunkAPI.rejectWithValue(message);
  }
});

// Delete vehicle
export const deleteVehicle = createAsyncThunk('vehicles/delete', async (id, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    await vehicleService.deleteVehicle(id, token);
    return id;
  } catch (error) {
    const message = (error.response?.data?.message) || error.message;
    return thunkAPI.rejectWithValue(message);
  }
});

export const vehicleSlice = createSlice({
  name: 'vehicle',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getVehicles.pending, (state) => { state.isLoading = true; })
      .addCase(getVehicles.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.vehicles = action.payload;
      })
      .addCase(getVehicles.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(createVehicle.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.vehicles.push(action.payload);
      })
      .addCase(deleteVehicle.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.vehicles = state.vehicles.filter((v) => v._id !== action.payload);
      });
  },
});

export const { reset } = vehicleSlice.actions;
export default vehicleSlice.reducer;