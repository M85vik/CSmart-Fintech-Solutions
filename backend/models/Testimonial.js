// File: Verity Finance-backend/models/Testimonial.js
const mongoose = require('mongoose');

const TestimonialSchema = new mongoose.Schema({
  name: { type: String, required: true },
  quote: { type: String, required: true },
  company: { type: String }, // e.g., 'Founder of XYZ'
  imageUrl: { type: String, required: false }, // <-- ADD THIS LINE
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model('Testimonial', TestimonialSchema);