// File: backend8/models/Vehicle.js
const mongoose = require('mongoose');

const VehicleSchema = new mongoose.Schema({
  make: { type: String, required: true }, // e.g., Tata, Hyundai
  model: { type: String, required: true }, // e.g., Nexon, Creta
  category: { 
    type: String, 
    required: true,
    enum: ['Hatchback', 'Sedan', 'SUV', 'MUV', 'Luxury', 'EV'] 
  },
  price: { type: Number, required: true }, // Ex-showroom price in INR
  imageUrl: { type: String, required: true },
  
  // Specs for comparison
  fuelType: { type: String, required: true }, // Petrol, Diesel, Electric, Hybrid
  transmission: { type: String, required: true }, // Manual, Automatic
  mileage: { type: String, required: true }, // e.g., "18 kmpl" or "350 km range"
  engine: { type: String }, // e.g., "1497 cc"
  seatingCapacity: { type: Number, default: 5 },
  safetyRating: { type: Number }, // Global NCAP stars (1-5)

  // For "Featured Cars" section on the Auto Loan Hub
  isFeatured: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model('Vehicle', VehicleSchema);