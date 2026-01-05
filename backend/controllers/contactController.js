const Contact = require('../models/Contact');
const { enqueueEmail } = require('../utils/emailQueue');
const { buildInternalLeadHTML, buildCustomerConfirmationHTML } = require('../utils/emailTemplates');

// @desc    Create a new contact submission & Send Emails
// @route   POST /api/contacts
// @access  Public
exports.createContact = async (req, res) => {
  const { name, email, phone, serviceOfInterest, message } = req.body;

  if (!name || !email || !serviceOfInterest || !message) {
    return res.status(400).json({ message: 'Please fill out all required fields.' });
  }

  try {
    // 1. Save to Database (The original logic)
    const contact = new Contact({ name, email, phone, serviceOfInterest, message });
    await contact.save();

    // 2. Prepare Email Data
    const adminEmail = process.env.ADMIN_EMAIL || 'your-admin-email@example.com'; // Set this in .env!

    // 3. Queue Email to ADMIN (New Lead Alert)
    enqueueEmail(async () => {
      const { sendEmail } = require('../utils/emailService');
      await sendEmail({
        to: [adminEmail],
        subject: `🚀 New Lead: ${serviceOfInterest} - ${name}`,
        html: buildInternalLeadHTML({ name, email, phone, service: serviceOfInterest, message }),
      });
    });

    // 4. Queue Email to CUSTOMER (Confirmation)
    // Only send if email is valid
    if (email && email.includes('@')) {
      enqueueEmail(async () => {
        const { sendEmail } = require('../utils/emailService');
        await sendEmail({
          to: [email],
          subject: `We received your request for ${serviceOfInterest} - Verity Finance`,
          html: buildCustomerConfirmationHTML({ name, service: serviceOfInterest }),
        });
      });
    }

    res.status(201).json({ message: 'Request received! Check your email for confirmation.' });
  } catch (error) {
    console.error("Contact Controller Error:", error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get all contact submissions
// @route   GET /api/contacts
// @access  Private
exports.getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find({}).sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Delete a contact submission
// @route   DELETE /api/contacts/:id
// @access  Private
exports.deleteContact = async (req, res) => {
    try {
        const contact = await Contact.findById(req.params.id);
        if(contact) {
            await contact.deleteOne();
            res.json({ message: 'Message deleted' });
        } else {
            res.status(404).json({ message: 'Message not found'});
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};