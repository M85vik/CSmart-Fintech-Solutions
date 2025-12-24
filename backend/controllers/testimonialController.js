// File: Verity Finance-backend/controllers/testimonialController.js
const Testimonial = require('../models/Testimonial');

exports.getActiveTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find({ isActive: true }).sort({ createdAt: -1 });
    res.json(testimonials);
  } catch (error) { res.status(500).json({ message: 'Server Error' }); }
};

exports.getAllTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find({}).sort({ createdAt: -1 });
    res.json(testimonials);
  } catch (error) { res.status(500).json({ message: 'Server Error' }); }
};

exports.createTestimonial = async (req, res) => {
  // Ensure imageUrl is destructured from the request body
  const { name, quote, company, imageUrl, isActive } = req.body;
  if (!name || !quote) {
    return res.status(400).json({ message: 'Name and quote are required' });
  }
  try {
    // Ensure imageUrl is included when creating the new testimonial
    const testimonial = new Testimonial({ name, quote, company, imageUrl, isActive });
    const createdTestimonial = await testimonial.save();
    res.status(201).json(createdTestimonial);
  } catch (error) { res.status(500).json({ message: 'Server Error' }); }
};

exports.updateTestimonial = async (req, res) => {
  // Ensure imageUrl is destructured from the request body
  const { name, quote, company, imageUrl, isActive } = req.body;
  try {
    const testimonial = await Testimonial.findById(req.params.id);
    if (testimonial) {
      testimonial.name = name || testimonial.name;
      testimonial.quote = quote || testimonial.quote;
      testimonial.company = company;
      // Ensure imageUrl is updated on the testimonial object before saving
      testimonial.imageUrl = imageUrl;
      testimonial.isActive = isActive !== undefined ? isActive : testimonial.isActive;

      const updatedTestimonial = await testimonial.save();
      res.json(updatedTestimonial);
    } else {
      res.status(404).json({ message: 'Testimonial not found' });
    }
  } catch (error) { res.status(500).json({ message: 'Server Error' }); }
};

exports.deleteTestimonial = async (req, res) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);
    if (testimonial) {
      await testimonial.deleteOne();
      res.json({ message: 'Testimonial removed' });
    } else {
      res.status(404).json({ message: 'Testimonial not found' });
    }
  } catch (error) { res.status(500).json({ message: 'Server Error' }); }
};