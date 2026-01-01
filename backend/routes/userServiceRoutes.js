// File: backend/routes/userServiceRoutes.js
const express = require('express');
const router = express.Router();
const { 
    getMyServices, 
    createUserService, 
    getAllServices, 
    toggleServiceStatus, 
    deleteUserService 
} = require('../controllers/userServiceController');
const { protect } = require('../middleware/authMiddleware');

// --- USER ROUTE ---
router.get('/my', protect, getMyServices);

// --- ADMIN ROUTES ---
router.get('/all', protect, getAllServices);          // View Master List
router.post('/', protect, createUserService);         // Assign new service
router.put('/status/:id', protect, toggleServiceStatus); // Freeze/Unfreeze
router.delete('/:id', protect, deleteUserService);    // Remove service

module.exports = router;