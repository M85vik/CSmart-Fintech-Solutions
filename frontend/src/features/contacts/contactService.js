// // File: src/features/contacts/contactService.js
// import axios from 'axios';

// const API_URL = 'http://localhost:5001/api/contacts/';

// // Submit the contact form
// const submitContactForm = async (formData) => {
//   const response = await axios.post(API_URL, formData);
//   return response.data; // The backend should return a success message
// };

// const contactService = {
//   submitContactForm,
// };

// export default contactService;


// File: src/features/contacts/contactService.js
import axios from 'axios';

const API_URL = 'http://localhost:5001/api/contacts/';

// --- PUBLIC FUNCTION ---

// Submit the contact form
const submitContactForm = async (formData) => {
  const response = await axios.post(API_URL, formData);
  return response.data;
};

// --- ADMIN FUNCTIONS ---

// Get all contact submissions
const getContacts = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL, config);
  return response.data;
};

// Delete a contact submission
const deleteContact = async (contactId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.delete(API_URL + contactId, config);
  return response.data;
};

const contactService = {
  submitContactForm,
  getContacts,
  deleteContact,
};

export default contactService;