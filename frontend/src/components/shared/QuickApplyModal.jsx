// File: src/components/shared/QuickApplyModal.jsx
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { submitContactForm } from '../../features/contacts/contactSlice';
import { FaTimes, FaPaperPlane, FaCheckCircle } from 'react-icons/fa';
import toast from 'react-hot-toast';

export default function QuickApplyModal({ isOpen, onClose, data }) {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.contact);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const [formData, setFormData] = useState({ name: '', phone: '', email: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const submissionData = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      serviceOfInterest: 'HOME LOAN - SIMULATOR LEAD',
      // We pass the calculated data from the simulator into the message
      message: `User calculated eligibility for:
      - Income: ₹${data.income}
      - Loan Amount: ₹${data.amount}
      - Location: ${data.location}
      - Max EMI: ₹${data.emi}`,
    };

    const result = await dispatch(submitContactForm(submissionData));
    if (!result.error) {
        setIsSuccess(true);
        setTimeout(() => {
            setIsSuccess(false);
            onClose();
            setFormData({ name: '', phone: '', email: '' });
        }, 3000);
    } else {
        toast.error("Something went wrong. Please try again.");
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      >
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden relative"
        >
          {/* Close Button */}
          <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors">
            <FaTimes size={20} />
          </button>

          {isSuccess ? (
             <div className="p-12 text-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FaCheckCircle className="text-4xl text-green-500" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800">Request Sent!</h3>
                <p className="text-gray-500 mt-2">Our home loan expert will call you shortly.</p>
             </div>
          ) : (
            <div className="p-8">
                <h3 className="text-2xl font-bold text-brand-primary mb-2">Claim Your Offer</h3>
                <p className="text-sm text-gray-600 mb-6">
                    You are eligible for a loan up to <span className="font-bold text-gray-900">₹{(data.amount/100000).toFixed(2)} Lakhs</span>. 
                    Enter your details to lock this offer.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Name</label>
                        <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-primary outline-none" placeholder="Your Full Name" />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Mobile Number</label>
                        <input required type="tel" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-primary outline-none" placeholder="98765 43210" />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Email</label>
                        <input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-primary outline-none" placeholder="you@example.com" />
                    </div>

                    <button disabled={isLoading} className="w-full bg-brand-primary text-white font-bold py-4 rounded-xl hover:bg-brand-secondary transition-colors shadow-lg flex items-center justify-center mt-6">
                        {isLoading ? 'Processing...' : <>Get Callback <FaPaperPlane className="ml-2" /></>}
                    </button>
                </form>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}