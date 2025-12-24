// File: src/components/services/GetQuoteForm.jsx
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { submitContactForm } from '../../features/contacts/contactSlice';
import toast from 'react-hot-toast';

// We add props here: defaultService and hideService
export default function GetQuoteForm({ defaultService = "General Inquiry", hideService = false }) {
    const dispatch = useDispatch();
    const { isLoading } = useSelector((state) => state.contact);
    
    // Initialize state with the passed prop
    const [formData, setFormData] = useState({ name: '', phone: '', type: defaultService });

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const submissionData = {
            name: formData.name,
            phone: formData.phone,
            email: 'N/A', // Or add email field if needed
            serviceOfInterest: formData.type,
            message: 'Quick Quote Request from Service Page',
        };

        const result = await dispatch(submitContactForm(submissionData));
        
        if (!result.error) {
            toast.success(`Request sent for ${formData.type}! We will call you shortly.`);
            setFormData({ name: '', phone: '', type: defaultService });
        } else {
            toast.error("Something went wrong. Please try again.");
        }
    }

    return (
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Get a Free Quote</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                    <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} required className="mt-1 block w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary outline-none" placeholder="Enter your name" />
                </div>
                 <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
                    <input type="tel" name="phone" id="phone" value={formData.phone} onChange={handleChange} required className="mt-1 block w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary outline-none" placeholder="Enter mobile number" />
                </div>
                
                {/* Conditionally render the dropdown */}
                {!hideService ? (
                    <div>
                        <label htmlFor="type" className="block text-sm font-medium text-gray-700">Type of Service</label>
                        <select id="type" name="type" value={formData.type} onChange={handleChange} className="mt-1 block w-full p-3 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-brand-primary outline-none">
                            <option>Health Insurance</option>
                            <option>Life Insurance</option>
                            <option>Vehicle Insurance</option>
                            <option>Home Loan</option>
                            <option>Personal Loan</option>
                        </select>
                    </div>
                ) : (
                    // If hidden, we show a nice badge instead so the user knows what they apply for
                    <div className="bg-brand-bg text-brand-primary font-bold px-4 py-2 rounded-lg text-center border border-brand-primary/20">
                        Applying for: {defaultService}
                    </div>
                )}

                <button disabled={isLoading} type="submit" className="w-full bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors shadow-md disabled:bg-gray-400">
                    {isLoading ? 'Sending...' : 'Request a Callback'}
                </button>
            </form>
        </div>
    )
}