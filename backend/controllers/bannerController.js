// File: backend8/controllers/bannerController.js
const Banner = require('../models/Banner');

exports.getActiveBanners = async (req, res) => {
  try {
    const banners = await Banner.find({ isActive: true }).sort({ createdAt: 'desc' });
    res.json(banners);
  } catch (error) { res.status(500).json({ message: 'Server Error' }); }
};

exports.getAllBanners = async (req, res) => {
    try {
        const banners = await Banner.find({}).sort({ createdAt: 'desc' });
        res.json(banners);
    } catch (error) { res.status(500).json({ message: 'Server Error' }); }
};

exports.createBanner = async (req, res) => {
    const { title, subtitle, buttonText, buttonLink, isActive } = req.body;

    if (!req.files || !req.files.desktopImage || !req.files.mobileImage) {
        return res.status(400).json({ message: 'Desktop and mobile images are required.' });
    }

    try {
        const newBanner = new Banner({
            title,
            subtitle,
            buttonText,
            buttonLink,
            isActive: isActive === 'true',
            desktopImageUrl: req.files.desktopImage[0].path,
            mobileImageUrl: req.files.mobileImage[0].path
        });
        const savedBanner = await newBanner.save();
        res.status(201).json(savedBanner);
    } catch (error) { 
        console.error('Error creating banner:', error);
        res.status(500).json({ message: 'Server Error while creating banner.' }); 
    }
};

exports.deleteBanner = async (req, res) => {
    try {
        const banner = await Banner.findById(req.params.id);
        if (banner) {
            await banner.deleteOne();
            res.json({ message: 'Banner removed' });
        } else {
            res.status(404).json({ message: 'Banner not found' });
        }
    } catch (error) { res.status(500).json({ message: 'Server Error' }); }
};