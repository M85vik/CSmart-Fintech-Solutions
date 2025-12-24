// File: routes/testimonialRoutes.js
const express = require('express');
const router = express.Router();
const {
  getActiveTestimonials,
  getAllTestimonials,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
} = require('../controllers/testimonialController');
const { protect } = require('../middleware/authMiddleware');

// Public route to get active testimonials for the website
router.route('/').get(getActiveTestimonials);

// Protected routes for admin to manage all testimonials
router.route('/all').get(protect, getAllTestimonials);
router.route('/').post(protect, createTestimonial);
router.route('/:id').put(protect, updateTestimonial).delete(protect, deleteTestimonial);

module.exports = router;