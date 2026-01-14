
// File: src/pages/Contact.jsx
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { submitContactForm, reset } from '../features/contacts/contactSlice';
import { Helmet } from 'react-helmet-async';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

function Contact() {
  const dispatch = useDispatch();
  const { isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.contact
  );

  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', serviceOfInterest: 'General Inquiry', message: '',
  });

  const { name, email, phone, serviceOfInterest, message: formMessage } = formData;

  useEffect(() => {
    if (isError) {
      toast.error(message || 'Something went wrong!');
    }
    if (isSuccess) {
      toast.success(message || 'Your message has been sent!');
      setFormData({
        name: '', email: '', phone: '', serviceOfInterest: 'General Inquiry', message: ''
      });
    }
    if (isError || isSuccess) {
        dispatch(reset());
    }
  }, [isSuccess, isError, message, dispatch]);

  const onChange = (e) => setFormData((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(submitContactForm(formData));
  };

  return (
    <>
      <Helmet>
        <title>Contact Us | CS Smart Finserv</title>
        <meta name="description" content="Get in touch with the CS Smart Finserv team for inquiries about our loan and insurance services. We're here to help." />
      </Helmet>
      
      <div className="relative bg-white overflow-hidden">
        {/* Two-tone background */}
        <div className="absolute top-0 left-0 w-full h-1/2 bg-brand-bg" />
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-white" />

        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <motion.div 
            initial={{ opacity: 0, y: -20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl font-extrabold text-center text-dark mb-4">Get in Touch</h1>
            <p className="text-center text-lg text-gray-600 max-w-3xl mx-auto">
              We're here to help you on your financial journey. Reach out to us with any questions.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="bg-white p-8 rounded-2xl shadow-2xl grid grid-cols-1 lg:grid-cols-3 gap-12"
          >
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold text-dark mb-6">Send us a Message</h2>
              <form onSubmit={onSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                    <input type="text" id="name" name="name" value={name} onChange={onChange} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent" required />
                  </div>
                   <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Your Email</label>
                    <input type="email" id="email" name="email" value={email} onChange={onChange} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent" required />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                   <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone (Optional)</label>
                    <input type="tel" id="phone" name="phone" value={phone} onChange={onChange} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent" />
                  </div>
                   <div>
                    <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-1">Service of Interest</label>
                    <select id="service" name="serviceOfInterest" value={serviceOfInterest} onChange={onChange} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent">
                        <option>General Inquiry</option><option>Home Loan</option><option>Car Loan</option><option>Business Loan</option><option>Personal Loan</option><option>Insurance</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Your Message</label>
                  <textarea id="message" name="message" value={formMessage} onChange={onChange} rows="5" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent" required></textarea>
                </div>
                <button type="submit" className="bg-brand-primary text-white font-bold py-3 px-8 rounded-lg hover:bg-brand-secondary transition-colors w-full sm:w-auto disabled:bg-gray-400" disabled={isLoading}>
                  {isLoading ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>

            {/* Contact Details */}
            <div className="bg-brand-primary text-white p-8 rounded-2xl flex flex-col justify-center">
                <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
                <ul className="space-y-6">
                  <li className="flex items-start"><FaMapMarkerAlt className="mt-1 mr-4 flex-shrink-0" size={20} /><address className="not-italic">2546, Sector-16,<br/>Faridabad, Haryana 121003</address></li>
                  <li className="flex items-center"><FaPhoneAlt className="mr-4" size={20} /><a href="tel:+1234567890" className="hover:underline">9999423000</a></li>
                  <li className="flex items-center"><FaEnvelope className="mr-4" size={20} /><a href="mailto:contact@CS Smart Finserv.com" className="hover:underline">sales@cssmartfinserve.com</a></li>
                </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}

export default Contact;