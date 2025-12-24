// File: src/features/testimonials/testimonialSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import testimonialService from './testimonialService';

const initialState = {
  publicTestimonials: [],
  adminTestimonials: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: '',
};

// --- ASYNC THUNKS (Now fully defined and verified) ---

export const getActiveTestimonials = createAsyncThunk('testimonials/getActive', async (_, thunkAPI) => {
    try { return await testimonialService.getActiveTestimonials() }
    catch (error) { const message = (error.response?.data?.message) || error.message; return thunkAPI.rejectWithValue(message); }
});

export const getAllTestimonials = createAsyncThunk('testimonials/getAllAdmin', async (_, thunkAPI) => {
  try { const token = thunkAPI.getState().auth.user.token; return await testimonialService.getAllTestimonials(token); }
  catch (error) { const message = (error.response?.data?.message) || error.message; return thunkAPI.rejectWithValue(message); }
});

export const createTestimonial = createAsyncThunk('testimonials/create', async (testimonialData, thunkAPI) => {
  try { const token = thunkAPI.getState().auth.user.token; return await testimonialService.createTestimonial(testimonialData, token); }
  catch (error) { const message = (error.response?.data?.message) || error.message; return thunkAPI.rejectWithValue(message); }
});

export const updateTestimonial = createAsyncThunk('testimonials/update', async (data, thunkAPI) => {
  try { const token = thunkAPI.getState().auth.user.token; return await testimonialService.updateTestimonial(data.id, data.testimonialData, token); }
  catch (error) { const message = (error.response?.data?.message) || error.message; return thunkAPI.rejectWithValue(message); }
});

export const deleteTestimonial = createAsyncThunk('testimonials/delete', async (id, thunkAPI) => {
  try { const token = thunkAPI.getState().auth.user.token; await testimonialService.deleteTestimonial(id, token); return id; }
  catch (error) { const message = (error.response?.data?.message) || error.message; return thunkAPI.rejectWithValue(message); }
});

// --- SLICE DEFINITION (Handles both public and admin state) ---

export const testimonialSlice = createSlice({
  name: 'testimonials',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      // Public-facing cases
      .addCase(getActiveTestimonials.pending, (state) => { state.isLoading = true; })
      .addCase(getActiveTestimonials.fulfilled, (state, action) => { state.isLoading = false; state.publicTestimonials = action.payload; })
      .addCase(getActiveTestimonials.rejected, (state, action) => { state.isLoading = false; state.isError = true; state.message = action.payload; })
      // Admin cases
      .addCase(getAllTestimonials.pending, (state) => { state.isLoading = true; })
      .addCase(getAllTestimonials.fulfilled, (state, action) => { state.isLoading = false; state.isSuccess = true; state.adminTestimonials = action.payload; })
      .addCase(getAllTestimonials.rejected, (state, action) => { state.isLoading = false; state.isError = true; state.message = action.payload; })
      .addCase(createTestimonial.fulfilled, (state, action) => { state.adminTestimonials.unshift(action.payload); })
      .addCase(updateTestimonial.fulfilled, (state, action) => {
        state.adminTestimonials = state.adminTestimonials.map((t) => t._id === action.payload._id ? action.payload : t);
      })
      .addCase(deleteTestimonial.fulfilled, (state, action) => {
        state.adminTestimonials = state.adminTestimonials.filter((t) => t._id !== action.payload);
      });
  },
});

export const { reset } = testimonialSlice.actions;
export default testimonialSlice.reducer;