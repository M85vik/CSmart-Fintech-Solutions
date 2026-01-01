// File: src/features/banners/bannerService.js
import axios from 'axios';
const API_URL = (import.meta.env.VITE_API_URL || 'http://localhost:5001') + '/api/banners/';

// --- PUBLIC FUNCTION (Already exists) ---
const getActiveBanners = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// --- NEW ADMIN FUNCTIONS ---

// Get all banners for the admin dashboard
const getAllBanners = async (token) => {
  const config = { headers: { Authorization: `Bearer ${token}` } };
  const response = await axios.get(API_URL + 'all', config); // We'll need to add this '/all' route to the backend
  return response.data;
};

// Create a new banner
const createBanner = async (bannerData, token) => {
  const config = { 
    headers: { 
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${token}`,
    } 
  };
  const response = await axios.post(API_URL, bannerData, config);
  return response.data;
};

// Delete a banner
const deleteBanner = async (bannerId, token) => {
  const config = { headers: { Authorization: `Bearer ${token}` } };
  const response = await axios.delete(API_URL + bannerId, config);
  return response.data;
};


const bannerService = {
  getActiveBanners,
  getAllBanners,    // <-- Add new function
  createBanner,     // <-- Add new function
  deleteBanner,     // <-- Add new function
};

export default bannerService;