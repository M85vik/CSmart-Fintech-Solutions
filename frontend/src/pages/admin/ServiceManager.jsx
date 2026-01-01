import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createUserService } from '../../features/userServices/userServiceSlice';
import toast from 'react-hot-toast';
import { FaSearch, FaUserCheck } from 'react-icons/fa';

export default function ServiceManager() {
  const dispatch = useDispatch();
  
  const [formData, setFormData] = useState({
    email: '',
    serviceType: 'Home Loan',
    provider: 'HDFC Bank',
    accountNumber: '',
    totalLoanAmount: '',
    emiAmount: '',
    paymentDay: '5', // Default 5th of the month
  });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loadingToast = toast.loading('Assigning Service...');
    
    // Dispatch to Redux
    const res = await dispatch(createUserService(formData));
    
    toast.dismiss(loadingToast);
    
    if (!res.error) {
        toast.success(`Service Assigned to ${formData.email}!`);
        // Reset sensitive fields
        setFormData({ ...formData, accountNumber: '', totalLoanAmount: '', emiAmount: '' }); 
    } else {
        toast.error(res.payload || 'Failed to assign service. Check email.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-brand-primary p-6 text-white">
            <h1 className="text-2xl font-bold">Assign New Service</h1>
            <p className="opacity-90">Link a loan or insurance to a user account for auto-tracking.</p>
        </div>
        
        <form onSubmit={handleSubmit} className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* User Identification */}
            <div className="md:col-span-2">
                <label className="block text-sm font-bold text-gray-700 mb-1">User Email Address</label>
                <div className="relative">
                    <input required type="email" name="email" value={formData.email} onChange={handleChange} className="w-full pl-10 p-3 border rounded-lg focus:ring-2 focus:ring-brand-primary outline-none" placeholder="client@example.com" />
                    <FaSearch className="absolute left-3 top-3.5 text-gray-400" />
                </div>
                <p className="text-xs text-gray-500 mt-1">System will verify if this user exists.</p>
            </div>

            <div className="md:col-span-2 border-t my-2"></div>

            {/* Service Details */}
            <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Service Type</label>
                <select name="serviceType" value={formData.serviceType} onChange={handleChange} className="w-full p-3 border rounded-lg bg-white">
                    <option>Home Loan</option>
                    <option>Car Loan</option>
                    <option>Personal Loan</option>
                    <option>Business Loan</option>
                    <option>Life Insurance</option>
                    <option>Health Insurance</option>
                </select>
            </div>

            <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Provider / Bank</label>
                <input required name="provider" value={formData.provider} onChange={handleChange} className="w-full p-3 border rounded-lg" placeholder="e.g. SBI, HDFC" />
            </div>

            <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Account / Policy Number</label>
                <input required name="accountNumber" value={formData.accountNumber} onChange={handleChange} className="w-full p-3 border rounded-lg" placeholder="XXXX-XXXX-XXXX" />
            </div>

            <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Total Amount (₹)</label>
                <input required type="number" name="totalLoanAmount" value={formData.totalLoanAmount} onChange={handleChange} className="w-full p-3 border rounded-lg" placeholder="500000" />
            </div>

            {/* Automation Fields */}
            <div className="md:col-span-2 bg-blue-50 p-4 rounded-lg border border-blue-100">
                <h3 className="font-bold text-blue-800 mb-4">Automation Settings</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">Monthly EMI (₹)</label>
                        <input required type="number" name="emiAmount" value={formData.emiAmount} onChange={handleChange} className="w-full p-3 border rounded-lg" placeholder="15000" />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">Payment Day (1-31)</label>
                        <input required type="number" min="1" max="31" name="paymentDay" value={formData.paymentDay} onChange={handleChange} className="w-full p-3 border rounded-lg" placeholder="5" />
                        <p className="text-xs text-gray-500 mt-1">System updates payment status on this day each month.</p>
                    </div>
                </div>
            </div>

            <div className="md:col-span-2 mt-4">
                <button type="submit" className="w-full bg-brand-primary text-white font-bold py-4 rounded-lg hover:bg-orange-600 transition-colors shadow-lg flex items-center justify-center">
                    <FaUserCheck className="mr-2" /> Assign Service & Start Tracking
                </button>
            </div>
        </form>
      </div>
    </div>
  );
}