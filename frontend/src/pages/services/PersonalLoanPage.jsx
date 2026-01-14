// File: src/pages/services/PersonalLoanPage.jsx
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaUser, FaBriefcase, FaCheckCircle, FaPercentage, 
  FaFileInvoiceDollar, FaMoneyBillWave, FaShieldAlt, FaArrowRight 
} from 'react-icons/fa';
import LoanQuestionnaire from '../../components/services/LoanQuestionnaire';

// --- BRAND COLORS ---
const ORANGE_MAIN = '#ff6d00';

// --- DATA: CONTENT FOR BOTH TABS ---
const content = {
  personal: {
    heroImage: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80", // Happy Group/Travel
    title: "Fund Your Lifestyle",
    subtitle: "Weddings, travel, or medical needs. Get instant funds up to ₹40 Lakhs without collateral.",
    description: "A Personal Loan is an unsecured credit provided by financial institutions based on criteria like employment history, repayment capacity, income level, profession, and credit history. It is a multi-purpose loan, which you can use to meet any of your immediate needs.",
    benefits: [
      "No Collateral Required",
      "Disbursal in 24 Hours",
      "Flexible Tenure (12 - 60 Months)",
      "Minimal Documentation"
    ],
    rates: [
      { label: "Interest Rate", value: "10.50% - 21.00% p.a" },
      { label: "Loan Amount", value: "₹50k - ₹40 Lakhs" },
      { label: "Processing Fee", value: "1.5% - 2.5%" },
      { label: "Pre-closure Charges", value: "Zero (After 12 EMIs)" }
    ],
    fees: [
        { title: "Processing Fee", desc: "Up to 2.5% of the loan amount + GST" },
        { title: "Bounce Charges", desc: "₹500 per bounce" },
        { title: "Penal Interest", desc: "2% per month on overdue amount" },
        { title: "Foreclosure Charges", desc: "0% after 12 months, 4% before 12 months" }
    ]
  },
  business: {
    heroImage: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80", // Corporate Office
    title: "Fuel Your Business Growth",
    subtitle: "Working capital, machinery, or expansion. Capital that works as hard as you do.",
    description: "Business Loans are financial offerings used by companies to fund their operations, buy machinery, or expand. Whether you are a small SME or a large enterprise, we offer unsecured business loans to help you scale without putting your assets at risk.",
    benefits: [
      "Loans up to ₹75 Lakhs (Unsecured)",
      "Overdraft Facility Available",
      "Turnover Based Funding",
      "Tax Benefits on Interest"
    ],
    rates: [
      { label: "Interest Rate", value: "12.00% - 24.00% p.a" },
      { label: "Loan Amount", value: "₹2 Lakhs - ₹5 Crores" },
      { label: "Processing Fee", value: "2.0% - 3.0%" },
      { label: "Tenure", value: "12 - 48 Months" }
    ],
    fees: [
        { title: "Processing Fee", desc: "Up to 3% of the loan amount + GST" },
        { title: "Documentation Charges", desc: "At actuals (approx ₹2500)" },
        { title: "Penal Interest", desc: "2% per month on overdue amount" },
        { title: "Foreclosure Charges", desc: "4% of principal outstanding" }
    ]
  }
};

export default function PersonalLoanPage() {
  const [activeTab, setActiveTab] = useState('personal'); // 'personal' or 'business'
  const data = content[activeTab];

  return (
    <>
      <Helmet>
        <title>{activeTab === 'personal' ? 'Personal Loans' : 'Business Loans'} | CS Smart Finserv Hub</title>
      </Helmet>

      <div className="bg-gray-50 min-h-screen">
        
        {/* 1. GRAND HERO SECTION */}
        <div className="relative pt-28 pb-48 lg:pb-64 overflow-hidden bg-black">
           {/* Dynamic Background Image */}
           <AnimatePresence mode='wait'>
             <motion.div 
               key={activeTab}
               initial={{ opacity: 0 }}
               animate={{ opacity: 0.6 }}
               exit={{ opacity: 0 }}
               transition={{ duration: 0.5 }}
               className="absolute inset-0 bg-cover bg-center"
               style={{ backgroundImage: `url(${data.heroImage})` }}
             />
           </AnimatePresence>
           
           {/* Gradient Overlay */}
           <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-gray-50/10"></div>

           <div className="container mx-auto px-4 relative z-10 text-center">
             
             {/* TAB SWITCHER (The Control Center) */}
             <div className="inline-flex bg-white/10 backdrop-blur-md p-2 rounded-full mb-10 border border-white/20">
                <button 
                  onClick={() => setActiveTab('personal')}
                  className={`flex items-center px-8 py-3 rounded-full font-bold transition-all text-lg ${activeTab === 'personal' ? 'bg-[#ff6d00] text-white shadow-lg shadow-orange-500/50' : 'text-white hover:bg-white/10'}`}
                >
                  <FaUser className="mr-2" /> Personal
                </button>
                <button 
                  onClick={() => setActiveTab('business')}
                  className={`flex items-center px-8 py-3 rounded-full font-bold transition-all text-lg ${activeTab === 'business' ? 'bg-[#ff6d00] text-white shadow-lg shadow-orange-500/50' : 'text-white hover:bg-white/10'}`}
                >
                  <FaBriefcase className="mr-2" /> Business
                </button>
             </div>

             <motion.h1 
               key={data.title}
               initial={{ y: 20, opacity: 0 }}
               animate={{ y: 0, opacity: 1 }}
               className="text-5xl lg:text-7xl font-extrabold text-white mb-6"
             >
               {data.title}
             </motion.h1>
             <motion.p 
               key={data.subtitle}
               initial={{ y: 20, opacity: 0 }}
               animate={{ y: 0, opacity: 1 }}
               transition={{ delay: 0.1 }}
               className="text-xl text-gray-200 max-w-2xl mx-auto"
             >
               {data.subtitle}
             </motion.p>
           </div>
        </div>

        {/* 2. THE WIZARD CARD (Overlapping the Hero) */}
        <div className="container mx-auto px-4 -mt-32 relative z-20">
           <div className="bg-white rounded-3xl shadow-2xl p-2 lg:p-4 border-t-8 border-[#ff6d00]">
             {/* We pass the activeTab type so the questionnaire adapts */}
             <LoanQuestionnaire type={activeTab} />
           </div>
        </div>

        {/* 3. WHAT IS & BENEFITS */}
        <div className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
               <motion.div 
                 key={activeTab + "desc"}
                 initial={{ opacity: 0, x: -30 }}
                 animate={{ opacity: 1, x: 0 }}
                 transition={{ duration: 0.5 }}
               >
                 <span className="text-[#ff6d00] font-bold tracking-wider uppercase text-sm">About the Product</span>
                 <h2 className="text-4xl font-extrabold text-gray-900 mt-2 mb-6">
                   What is a {activeTab === 'personal' ? 'Personal' : 'Business'} Loan?
                 </h2>
                 <p className="text-lg text-gray-600 leading-relaxed mb-8">
                   {data.description}
                 </p>
                 <button className="text-[#ff6d00] font-bold inline-flex items-center hover:underline">
                    Read More in Blogs <FaArrowRight className="ml-2" />
                 </button>
               </motion.div>

               <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {data.benefits.map((benefit, i) => (
                    <motion.div 
                      key={benefit}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="bg-orange-50 p-6 rounded-xl border border-orange-100 flex items-start"
                    >
                      <FaCheckCircle className="text-[#ff6d00] text-xl mt-1 mr-4 flex-shrink-0" />
                      <span className="font-bold text-gray-800">{benefit}</span>
                    </motion.div>
                  ))}
               </div>
            </div>
          </div>
        </div>

        {/* 4. PRODUCT & INTEREST RATES (The Table/Grid) */}
        <div className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
               <h2 className="text-3xl font-bold text-gray-900">Interest Rates & Highlights</h2>
               <p className="text-gray-500 mt-2">At a glance details for your {activeTab} loan.</p>
            </div>
            
            <div className="grid md:grid-cols-4 gap-6">
              {data.rates.map((item, i) => (
                <div key={i} className="bg-white p-8 rounded-2xl shadow-lg text-center hover:-translate-y-2 transition-transform duration-300">
                   <div className="w-16 h-16 mx-auto bg-orange-100 rounded-full flex items-center justify-center text-[#ff6d00] text-2xl mb-4">
                     {i === 0 ? <FaPercentage /> : i === 1 ? <FaMoneyBillWave /> : <FaFileInvoiceDollar />}
                   </div>
                   <p className="text-gray-500 text-sm uppercase tracking-wide font-bold mb-2">{item.label}</p>
                   <h3 className="text-2xl font-extrabold text-gray-900">{item.value}</h3>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 5. FEES & CHARGES */}
        <div className="py-20 bg-white">
           <div className="container mx-auto px-4 max-w-5xl">
             <div className="text-center mb-12">
               <h2 className="text-3xl font-bold text-gray-900">Fees & Charges</h2>
               <p className="text-gray-500 mt-2">Transparent pricing. No hidden surprises.</p>
             </div>

             <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
                {data.fees.map((fee, i) => (
                  <div key={i} className={`flex flex-col md:flex-row justify-between items-center p-6 ${i !== data.fees.length - 1 ? 'border-b border-gray-100' : ''}`}>
                     <div className="flex items-center mb-2 md:mb-0">
                        <FaShieldAlt className="text-gray-300 mr-4" />
                        <h4 className="font-bold text-gray-800">{fee.title}</h4>
                     </div>
                     <span className="text-gray-600 font-medium">{fee.desc}</span>
                  </div>
                ))}
             </div>
             <p className="text-center text-xs text-gray-400 mt-6">* GST applicable on all fees and charges.</p>
           </div>
        </div>

        {/* 6. GO FOR IT BANNER */}
        <div className="bg-[#1a1a1a] py-16 text-center text-white relative overflow-hidden">
           {/* Decorative circles */}
           <div className="absolute top-0 left-0 w-64 h-64 bg-[#ff6d00] opacity-10 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
           <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#ff6d00] opacity-10 rounded-full translate-x-1/2 translate-y-1/2"></div>

           <div className="container mx-auto px-4 relative z-10">
              <h2 className="text-4xl font-extrabold mb-4">Ready to get started?</h2>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                 {activeTab === 'personal' 
                    ? "Turn your dreams into reality today. Check your eligibility in 2 minutes." 
                    : "Take your business to the next level with our customized capital solutions."}
              </p>
              <button 
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} // Scroll back to wizard
                className="bg-[#ff6d00] text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-orange-600 transition-colors shadow-xl shadow-orange-600/20"
              >
                Apply Now
              </button>
           </div>
        </div>

      </div>
    </>
  );
}