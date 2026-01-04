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
const upload = require('../config/cloudinary'); // Use your existing Cloudinary config

// Public / User Routes
router.get('/my', protect, getMyServices);

// Admin Routes
router.get('/all', protect, getAllServices);

// UPDATE: Add 'upload.single' to handle the file
router.post('/', protect, upload.single('document'), createUserService);

router.put('/status/:id', protect, toggleServiceStatus);
router.delete('/:id', protect, deleteUserService);

module.exports = router;