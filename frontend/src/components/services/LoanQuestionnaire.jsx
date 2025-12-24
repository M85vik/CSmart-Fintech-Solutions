// File: src/components/services/LoanQuestionnaire.jsx
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { submitContactForm } from '../../features/contacts/contactSlice';
import { FaPlane, FaRing, FaStethoscope, FaHome, FaBuilding, FaTools, FaChartLine, FaCheckCircle, FaArrowRight } from 'react-icons/fa';
import toast from 'react-hot-toast';

// Options for Personal vs Business
const options = {
  personal: [
    { id: 'wedding', label: 'Dream Wedding', icon: FaRing },
    { id: 'travel', label: 'Vacation', icon: FaPlane },
    { id: 'medical', label: 'Medical Emergency', icon: FaStethoscope },
    { id: 'renovation', label: 'Home Renovation', icon: FaHome },
  ],
  business: [
    { id: 'expansion', label: 'Business Expansion', icon: FaChartLine },
    { id: 'machinery', label: 'Buy Machinery', icon: FaTools },
    { id: 'working-capital', label: 'Working Capital', icon: FaBuilding },
    { id: 'marketing', label: 'Marketing', icon: FaCheckCircle },
  ]
};

export default function LoanQuestionnaire({ type = 'personal' }) {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.contact);
  
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    goal: '',
    amount: '',
    name: '',
    email: '',
    phone: ''
  });

  const currentOptions = type === 'personal' ? options.personal : options.business;

  const handleNext = () => setStep(step + 1);
  const handleBack = () => setStep(step - 1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // We format the data to fit your existing Contact Model
    const submissionData = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      serviceOfInterest: `${type.toUpperCase()} LOAN - ${formData.goal}`, // Custom Subject Line
      message: `User is requesting a ${type} loan of ₹${formData.amount} for ${formData.goal}.`,
    };

    const result = await dispatch(submitContactForm(submissionData));
    if (!result.error) {
      toast.success("Request received! Our expert will email you shortly.");
      setStep(4); // Success Screen
    } else {
      toast.error("Something went wrong. Please try again.");
    }
  };

  // Animation Variants
  const slideVariants = {
    enter: { x: 100, opacity: 0 },
    center: { x: 0, opacity: 1 },
    exit: { x: -100, opacity: 0 },
  };

  return (
    <div className="bg-white rounded-2xl shadow-2xl overflow-hidden min-h-[450px] relative">
      <div className="bg-brand-primary p-4 text-white text-center font-bold">
        {type === 'personal' ? 'Lifestyle Funding Wizard' : 'Business Growth Engine'}
      </div>
      
      <div className="p-8 h-full">
        <AnimatePresence mode="wait">
          
          {/* STEP 1: GOAL SELECTION */}
          {step === 1 && (
            <motion.div key="step1" variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{duration:0.3}} className="h-full flex flex-col">
              <h3 className="text-xl font-bold text-gray-800 mb-6 text-center">What is this fund for?</h3>
              <div className="grid grid-cols-2 gap-4">
                {currentOptions.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => { setFormData({...formData, goal: opt.label}); handleNext(); }}
                    className="p-4 rounded-xl border-2 border-gray-100 hover:border-brand-primary hover:bg-brand-bg transition-all flex flex-col items-center justify-center gap-2 group"
                  >
                    <opt.icon className="text-2xl text-gray-400 group-hover:text-brand-primary" />
                    <span className="text-sm font-semibold text-gray-600 group-hover:text-gray-900">{opt.label}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* STEP 2: AMOUNT INPUT */}
          {step === 2 && (
            <motion.div key="step2" variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{duration:0.3}} className="h-full flex flex-col justify-center">
              <h3 className="text-xl font-bold text-gray-800 mb-6 text-center">How much do you need?</h3>
              <div className="relative mb-8">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-bold">₹</span>
                <input 
                  type="number" 
                  placeholder="Enter Amount" 
                  value={formData.amount}
                  onChange={(e) => setFormData({...formData, amount: e.target.value})}
                  className="w-full pl-10 p-4 text-2xl font-bold border-b-2 border-gray-300 focus:border-brand-primary outline-none text-center"
                  autoFocus
                />
              </div>
              <div className="flex justify-between">
                <button onClick={handleBack} className="text-gray-500 hover:text-gray-800">Back</button>
                <button onClick={handleNext} disabled={!formData.amount} className="bg-brand-primary text-white px-6 py-2 rounded-lg disabled:opacity-50">Next</button>
              </div>
            </motion.div>
          )}

          {/* STEP 3: CONTACT DETAILS (EMAIL ENQUIRY) */}
          {step === 3 && (
            <motion.div key="step3" variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{duration:0.3}}>
              <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">Where should we send the quote?</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input type="text" placeholder="Your Name" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full p-3 border rounded-lg" />
                <input type="email" placeholder="Email Address" required value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full p-3 border rounded-lg" />
                <input type="tel" placeholder="Phone Number" required value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="w-full p-3 border rounded-lg" />
                
                <div className="flex justify-between items-center pt-4">
                  <button type="button" onClick={handleBack} className="text-gray-500">Back</button>
                  <button type="submit" disabled={isLoading} className="bg-brand-primary text-white px-8 py-3 rounded-lg font-bold hover:bg-brand-secondary transition-colors shadow-lg flex items-center">
                    {isLoading ? 'Sending...' : <>Get Offers <FaArrowRight className="ml-2" /></>}
                  </button>
                </div>
              </form>
            </motion.div>
          )}

          {/* STEP 4: SUCCESS */}
          {step === 4 && (
            <motion.div key="step4" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="h-full flex flex-col items-center justify-center text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <FaCheckCircle className="text-4xl text-green-500" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Application Received!</h3>
              <p className="text-gray-600">
                We have sent a confirmation to <strong>{formData.email}</strong>.<br/>
                Our advisor will analyze your profile and call you within 24 hours.
              </p>
              <button onClick={() => {setStep(1); setFormData({goal:'', amount:'', name:'', email:'', phone:''})}} className="mt-8 text-brand-primary font-semibold hover:underline">
                Start Another Application
              </button>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}