// File: src/features/testimonials/testimonialService.js
import axios from 'axios';
const API_URL = (import.meta.env.VITE_API_URL || 'http://localhost:5001')+ '/api/testimonials/';

// Get active testimonials (public)
const getActiveTestimonials = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Get all testimonials (admin)
const getAllTestimonials = async (token) => {
  const config = { headers: { Authorization: `Bearer ${token}` } };
  const response = await axios.get(API_URL + 'all', config);
  return response.data;
};

// Create a testimonial
const createTestimonial = async (testimonialData, token) => {
  const config = { headers: { Authorization: `Bearer ${token}` } };
  // The testimonialData object, which now includes imageUrl, is sent here
  const response = await axios.post(API_URL, testimonialData, config);
  return response.data;
};

// Update a testimonial
const updateTestimonial = async (testimonialId, testimonialData, token) => {
  const config = { headers: { Authorization: `Bearer ${token}` } };
  // The updated testimonialData object is sent here
  const response = await axios.put(API_URL + testimonialId, testimonialData, config);
  return response.data;
};

// Delete a testimonial
const deleteTestimonial = async (testimonialId, token) => {
  const config = { headers: { Authorization: `Bearer ${token}` } };
  const response = await axios.delete(API_URL + testimonialId, config);
  return response.data;
};

const testimonialService = {
  getActiveTestimonials,
  getAllTestimonials,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
};

export default testimonialService;