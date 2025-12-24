// File: src/app/store.js
import { configureStore } from '@reduxjs/toolkit';

// Import all of your feature reducers
import authReducer from '../features/auth/authSlice';
import blogReducer from '../features/blogs/blogSlice';
import testimonialReducer from '../features/testimonials/testimonialSlice';
import contactReducer from '../features/contacts/contactSlice';
import bannerReducer from '../features/banners/bannerSlice';
import vehicleReducer from '../features/vehicles/vehicleSlice';
export const store = configureStore({
  // The `reducer` object maps slice names to their reducer functions.
  // The key you use here (e.g., "banner") is what you will use to access the state
  // in your components (e.g., state.banner).
  reducer: {
    auth: authReducer,
    blogs: blogReducer,
    testimonials: testimonialReducer,
    contact: contactReducer,
    banner: bannerReducer,
    vehicle: vehicleReducer,
  },
});