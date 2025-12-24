// File: src/components/services/HomeLoanSimulator.jsx
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaRupeeSign, FaCalendarAlt, FaMoneyBillWave, FaInfoCircle, FaCheck } from 'react-icons/fa';
import CountUp from 'react-countup';
import QuickApplyModal from '../shared/QuickApplyModal'; // <-- IMPORT MODAL

const cities = ["Mumbai", "Delhi", "Bangalore", "Hyderabad", "Chennai", "Pune", "Other"];

export default function HomeLoanSimulator() {
  // --- STATE ---
  const [location, setLocation] = useState('Mumbai');
  const [incomeType, setIncomeType] = useState('monthly'); 
  const [income, setIncome] = useState(80000); 
  const [existingEmi, setExistingEmi] = useState(5000);
  const [tenure, setTenure] = useState(20);
  
  // --- OUTPUT STATE ---
  const [eligibleAmount, setEligibleAmount] = useState(0);
  const [maxEmi, setMaxEmi] = useState(0);
  
  // --- MODAL STATE ---
  const [isModalOpen, setIsModalOpen] = useState(false);

  // --- CALCULATION LOGIC ---
  useEffect(() => {
    const monthlyIncome = incomeType === 'annual' ? income / 12 : income;
    const maxAllowedEmiTotal = monthlyIncome * 0.50;
    const availableEmiCapacity = Math.max(0, maxAllowedEmiTotal - existingEmi);
    setMaxEmi(Math.round(availableEmiCapacity));

    const r = 8.5 / 12 / 100;
    const n = tenure * 12;
    
    if (availableEmiCapacity > 0) {
      const principal = (availableEmiCapacity * (Math.pow(1 + r, n) - 1)) / (r * Math.pow(1 + r, n));
      setEligibleAmount(Math.round(principal));
    } else {
      setEligibleAmount(0);
    }
  }, [income, incomeType, existingEmi, tenure]);

  const formatCurrency = (val) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(val);

  return (
    <>
      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 relative z-10">
        <div className="bg-brand-primary p-6 text-white text-center">
          <h3 className="text-2xl font-bold">Home Affordability Simulator</h3>
          <p className="opacity-90 text-sm">See exactly how much you can borrow based on your profile.</p>
        </div>

        <div className="p-6 md:p-8 grid lg:grid-cols-2 gap-12">
          {/* LEFT: INPUTS (Same as before) */}
          <div className="space-y-8">
            
            {/* 1. Location */}
            <div>
              <label className="flex items-center text-sm font-bold text-gray-600 uppercase tracking-wide mb-2">
                <FaMapMarkerAlt className="mr-2 text-brand-primary" /> Property Location
              </label>
              <select value={location} onChange={(e) => setLocation(e.target.value)} className="w-full p-3 border border-gray-300 rounded-xl bg-gray-50 focus:ring-2 focus:ring-brand-primary outline-none font-semibold">
                {cities.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            {/* 2. Income */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="flex items-center text-sm font-bold text-gray-600 uppercase tracking-wide">
                  <FaRupeeSign className="mr-2 text-brand-primary" /> Your Income
                </label>
                <div className="bg-gray-200 rounded-lg p-1 flex text-xs font-bold">
                  <button onClick={() => setIncomeType('monthly')} className={`px-3 py-1 rounded-md transition-all ${incomeType === 'monthly' ? 'bg-white text-brand-primary shadow' : 'text-gray-500'}`}>Monthly</button>
                  <button onClick={() => setIncomeType('annual')} className={`px-3 py-1 rounded-md transition-all ${incomeType === 'annual' ? 'bg-white text-brand-primary shadow' : 'text-gray-500'}`}>Annual</button>
                </div>
              </div>
              <input type="range" min={incomeType === 'monthly' ? 20000 : 300000} max={incomeType === 'monthly' ? 500000 : 6000000} step={incomeType === 'monthly' ? 5000 : 50000} value={income} onChange={(e) => setIncome(Number(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand-primary mb-2" />
              <div className="flex justify-between items-center bg-gray-50 p-3 rounded-xl border border-gray-200">
                 <span className="text-gray-500 text-sm">Amount</span>
                 <span className="font-bold text-lg text-gray-800">{formatCurrency(income)}</span>
              </div>
            </div>

            {/* 3. Existing EMI */}
            <div>
              <label className="flex items-center text-sm font-bold text-gray-600 uppercase tracking-wide mb-2">
                <FaMoneyBillWave className="mr-2 text-brand-primary" /> Current Total EMIs
              </label>
              <input type="range" min="0" max={incomeType === 'monthly' ? income : income/12} step="1000" value={existingEmi} onChange={(e) => setExistingEmi(Number(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand-primary mb-2" />
              <div className="text-right font-bold text-gray-800">{formatCurrency(existingEmi)}</div>
            </div>

            {/* 4. Tenure */}
            <div>
              <label className="flex items-center text-sm font-bold text-gray-600 uppercase tracking-wide mb-2">
                <FaCalendarAlt className="mr-2 text-brand-primary" /> Desired Tenure
              </label>
              <div className="flex items-center gap-4">
                <input type="range" min="5" max="30" step="1" value={tenure} onChange={(e) => setTenure(Number(e.target.value))} className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand-primary" />
                <span className="font-bold text-gray-800 w-16 text-right">{tenure} Years</span>
              </div>
            </div>
          </div>

          {/* RIGHT: RESULTS */}
          <div className="bg-brand-bg rounded-2xl p-8 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-white opacity-20 rounded-full blur-3xl"></div>
            <div>
              <h4 className="text-gray-600 font-semibold mb-2">Based on your profile in {location}:</h4>
              <p className="text-sm text-gray-500 flex items-center"><FaInfoCircle className="mr-1" /> Assuming 8.5% Interest Rate</p>
            </div>
            <div className="text-center my-8">
              <p className="text-lg text-gray-600 font-medium mb-1">You are eligible for a loan up to</p>
              <motion.div key={eligibleAmount} initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="text-4xl md:text-5xl font-extrabold text-brand-primary">
                ₹<CountUp end={eligibleAmount} duration={0.5} separator="," />
              </motion.div>
            </div>
            <div className="space-y-4">
              <div className="bg-white p-4 rounded-xl flex justify-between items-center shadow-sm">
                <span className="text-gray-600 text-sm font-medium">Your Affordable EMI</span>
                <span className="text-green-600 font-bold text-xl">{formatCurrency(maxEmi)}/mo</span>
              </div>
              <div className="bg-white/50 p-4 rounded-xl text-xs text-gray-500 text-center leading-relaxed">
                <strong>Pro Tip:</strong> Adding a co-applicant can increase this amount.
              </div>
            </div>
            
            {/* FUNCTIONAL BUTTON */}
            <button 
              onClick={() => setIsModalOpen(true)} // <-- TRIGGERS MODAL
              className="w-full mt-6 bg-brand-primary text-white font-bold py-4 rounded-xl hover:bg-brand-secondary transition-colors shadow-lg"
            >
              Apply for ₹{ (eligibleAmount/100000).toFixed(1) } Lakhs Now
            </button>
          </div>
        </div>
      </div>

      {/* --- NEW: SUMMARY SECTION BELOW THE SIMULATOR --- */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-8 bg-blue-50 border border-blue-100 rounded-2xl p-6 flex items-start space-x-4 max-w-4xl mx-auto"
      >
        <div className="bg-blue-100 p-2 rounded-full text-blue-600 mt-1"><FaInfoCircle size={24} /></div>
        <div>
            <h4 className="font-bold text-blue-800 text-lg">Your Affordability Summary</h4>
            <p className="text-blue-700 mt-1">
                Based on your monthly income of <strong>{formatCurrency(incomeType === 'annual' ? income/12 : income)}</strong> and existing obligations of <strong>{formatCurrency(existingEmi)}</strong>, 
                you have a disposable capacity of approximately <strong>{formatCurrency(maxEmi)}</strong> for a new home loan EMI. 
                Over a tenure of <strong>{tenure} years</strong>, this allows you to borrow up to <strong>₹{(eligibleAmount/100000).toFixed(2)} Lakhs</strong> comfortably.
            </p>
        </div>
      </motion.div>

      {/* MODAL INSTANCE */}
      <QuickApplyModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        data={{ income, location, amount: eligibleAmount, emi: maxEmi }} 
      />
    </>
  );
}