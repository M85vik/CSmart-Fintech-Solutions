// File: controllers/contactController.js
const Contact = require('../models/Contact');
const sendEmail = require('../services/emailService.js');
const { enqueueEmail } = require("../utils/emailQueue");

const {
  buildCustomerConfirmationHTML,
  buildInternalLeadHTML
} = require("../utils/emailTemplates");

// @desc    Create a new contact submission
// @route   POST /api/contacts
// @access  Public

exports.createContact = async (req, res) => {
  const { name, email, phone, serviceOfInterest, message } = req.body;

  if (!name || !email || !serviceOfInterest || !message) {
    return res.status(400).json({ message: 'Please fill out all required fields.' });
  }

  try {
    await Contact.create({
      name,
      email,
      phone,
      serviceOfInterest,
      message,
    });

    // 🚀 Respond immediately
    res.status(201).json({
      message: 'Your message has been received! We will get back to you shortly.',
    });

    
enqueueEmail(() =>
  sendEmail({
    to: email,
    subject: "We’ve Received Your Enquiry",
    html: buildCustomerConfirmationHTML({ name, service: serviceOfInterest }),
  })
);

enqueueEmail(() =>
  sendEmail({
    to: "support@vikasharma.online",
    subject: `New Enquiry – ${serviceOfInterest}`,
    html: buildInternalLeadHTML({ name, email, phone, service: serviceOfInterest, message }),
  })
);


  } catch (error) {
    console.error("Create contact error:", error);
    return res.status(500).json({ message: 'Server Error' });
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
            res.json({ message: 'Contact submission removed' });
        } else {
            res.status(404).json({ message: 'Contact submission not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};