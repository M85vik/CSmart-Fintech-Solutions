// File: src/features/banners/bannerSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import bannerService from './bannerService';

const initialState = {
  banners: [],        // For public carousel
  adminBanners: [],   // For admin list
  isLoading: false,   // Simplified loading state
  isError: false,
  message: '',
};

// --- THUNKS ---

// Public Thunk (already exists)
export const getActiveBanners = createAsyncThunk('banners/getActive', async (_, thunkAPI) => {
    try { return await bannerService.getActiveBanners(); } 
    catch (error) { const message = (error.response?.data?.message) || error.message; return thunkAPI.rejectWithValue(message); }
});

// Admin Thunks (New)
export const getAllBanners = createAsyncThunk('banners/getAllAdmin', async (_, thunkAPI) => {
    try { const token = thunkAPI.getState().auth.user.token; return await bannerService.getAllBanners(token); } 
    catch (error) { const message = (error.response?.data?.message) || error.message; return thunkAPI.rejectWithValue(message); }
});

export const createBanner = createAsyncThunk('banners/create', async (bannerData, thunkAPI) => {
    try { const token = thunkAPI.getState().auth.user.token; return await bannerService.createBanner(bannerData, token); } 
    catch (error) { const message = (error.response?.data?.message) || error.message; return thunkAPI.rejectWithValue(message); }
});

export const deleteBanner = createAsyncThunk('banners/delete', async (id, thunkAPI) => {
    try { const token = thunkAPI.getState().auth.user.token; await bannerService.deleteBanner(id, token); return id; } 
    catch (error) { const message = (error.response?.data?.message) || error.message; return thunkAPI.rejectWithValue(message); }
});


export const bannerSlice = createSlice({
  name: 'banner',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      // Public-facing cases
      .addCase(getActiveBanners.pending, (state) => { state.isLoading = true; })
      .addCase(getActiveBanners.fulfilled, (state, action) => { state.isLoading = false; state.banners = action.payload; })
      .addCase(getActiveBanners.rejected, (state, action) => { state.isLoading = false; state.isError = true; state.message = action.payload; })
      
      // Admin cases
      .addCase(getAllBanners.pending, (state) => { state.isLoading = true; })
      .addCase(getAllBanners.fulfilled, (state, action) => { state.isLoading = false; state.adminBanners = action.payload; })
      .addCase(getAllBanners.rejected, (state, action) => { state.isLoading = false; state.isError = true; state.message = action.payload; })
      
      .addCase(createBanner.pending, (state) => { state.isLoading = true; })
      .addCase(createBanner.fulfilled, (state, action) => { state.isLoading = false; state.adminBanners.push(action.payload); })
      .addCase(createBanner.rejected, (state, action) => { state.isLoading = false; state.isError = true; state.message = action.payload; })
      
      .addCase(deleteBanner.pending, (state) => { state.isLoading = true; })
      .addCase(deleteBanner.fulfilled, (state, action) => { 
        state.isLoading = false; 
        state.adminBanners = state.adminBanners.filter((banner) => banner._id !== action.payload); 
      })
      .addCase(deleteBanner.rejected, (state, action) => { state.isLoading = false; state.isError = true; state.message = action.payload; });
  },
});

export const { reset } = bannerSlice.actions;
export default bannerSlice.reducer;