// File: routes/contactRoutes.js
const express = require('express');
const router = express.Router();
const {
  createContact,
  getContacts,
  deleteContact
} = require('../controllers/contactController');
const { protect } = require('../middleware/authMiddleware');

// Public route for anyone to submit the form
// Protected route for admin to view all submissions
router.route('/')
  .post(createContact)
  .get(protect, getContacts);

// Protected route for admin to delete a submission
router.route('/:id').delete(protect, deleteContact);

module.exports = router;