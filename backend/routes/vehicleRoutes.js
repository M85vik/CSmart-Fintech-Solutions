// File: backend8/routes/vehicleRoutes.js
const express = require('express');
const router = express.Router();
const { 
  getVehicles, 
  getVehicleById, 
  createVehicle, 
  deleteVehicle 
} = require('../controllers/vehicleController');
const { protect } = require('../middleware/authMiddleware');

// Public routes
router.get('/', getVehicles);
router.get('/:id', getVehicleById);

// Admin protected routes
router.post('/', protect, createVehicle);
router.delete('/:id', protect, deleteVehicle);

module.exports = router;