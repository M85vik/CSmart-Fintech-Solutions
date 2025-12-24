// File: backend8/routes/bannerRoutes.js
const express = require('express');
const router = express.Router();
const { 
    getActiveBanners, 
    getAllBanners, // <-- 1. IMPORT new controller function
    createBanner, 
    deleteBanner 
} = require('../controllers/bannerController');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../config/cloudinary'); 
router.route('/').get(getActiveBanners);

router.route('/').post(protect, upload.fields([{ name: 'desktopImage', maxCount: 1 }, { name: 'mobileImage', maxCount: 1 }]), createBanner);

router.route('/all').get(protect, getAllBanners);

router.route('/:id').delete(protect, deleteBanner);

module.exports = router;