import { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import CountUp from 'react-countup';
import { 
  FaChartLine, FaGift, FaBookReader, FaArrowRight, 
  FaCheckCircle, FaExclamationCircle, FaWallet, FaCalendarAlt, 
  FaLock, FaHashtag, FaFileDownload, FaTimes, FaBuilding, FaMoneyBillWave 
} from 'react-icons/fa';

import { getMyServices } from '../features/userServices/userServiceSlice';
import Spinner from '../components/shared/Spinner';

// --- VISUAL COMPONENTS (Sparkles, Gauge) ---
const SparkleInstance = ({ size, x, y, delay }) => (
  <motion.div className="absolute bg-yellow-400 rounded-full" style={{ width: size, height: size, left: x, top: y }} initial={{ scale: 0, opacity: 0 }} animate={{ scale: [0, 1, 0], opacity: [0, 1, 0] }} transition={{ duration: 0.8, delay, repeat: Infinity, repeatDelay: 2 }} />
);
const Sparkles = () => (<><SparkleInstance size={8} x="15%" y="20%" delay={0.1} /><SparkleInstance size={6} x="80%" y="10%" delay={0.3} /><SparkleInstance size={10} x="95%" y="70%" delay={0.5} /><SparkleInstance size={5} x="5%" y="80%" delay={0.7} /></>);

const CreditScoreGauge = ({ score }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const [hasAnimated, setHasAnimated] = useState(false);
  useEffect(() => { if (isInView) setTimeout(() => setHasAnimated(true), 300); }, [isInView]);
  const rotation = Math.max(0, Math.min(180, ((score - 300) / 600) * 180));
  let scoreText = "Good", textColor = "text-yellow-500";
  if (score >= 750) { scoreText = "Excellent"; textColor = "text-green-500"; } 
  else if (score < 650) { scoreText = "Fair"; textColor = "text-orange-500"; }
  return (
    <div ref={ref} className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg text-center relative overflow-hidden h-full flex flex-col justify-center items-center">
      {hasAnimated && score >= 750 && <Sparkles />}
      <div className="relative w-48 h-24 mb-4">
        <div className="absolute top-0 left-0 w-full h-full border-t-8 border-l-8 border-r-8 border-gray-200 rounded-t-full"></div>
        <div className="absolute top-0 left-0 w-full h-full border-t-8 border-l-8 border-r-8 border-transparent rounded-t-full" style={{ background: 'conic-gradient(from 180deg, #ef4444, #f97316, #eab308, #22c55e, #10b981)' }}></div>
        <div className="absolute top-0 left-0 w-full h-full bg-white rounded-t-full transform scale-[0.87]"></div>
        <motion.div className="absolute bottom-0 left-1/2 w-1 h-20 bg-gray-800 origin-bottom" initial={{ transform: 'translateX(-50%) rotate(-90deg)' }} animate={hasAnimated ? { transform: `translateX(-50%) rotate(${rotation - 90}deg)` } : {}} transition={{ type: "spring", stiffness: 100, damping: 15, duration: 2 }} />
      </div>
      <div className="text-5xl font-extrabold text-gray-900">{hasAnimated ? <CountUp start={300} end={score} duration={2.5} separator="," /> : 300}</div>
      <motion.p className={`text-xl font-semibold mt-2 ${textColor}`} initial={{ opacity: 0 }} animate={hasAnimated ? { opacity: 1 } : {}} transition={{ delay: 1.5 }}>{scoreText}</motion.p>
    </div>
  );
};

const insightsData = { factors: [{ name: "Payment History", status: "Excellent", description: "100% on-time payments." }, { name: "Credit Utilization", status: "Good", description: "Healthy credit usage." }] };
const offersData = [{ title: "Home Loan", description: "Rates starting from 8.4% p.a.", link: "/services/home-loan" }, { title: "Premium Card", description: "Exclusive rewards & benefits.", link: "/services/credit-card" }];

export default function Dashboard() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { services, isLoading } = useSelector((state) => state.userService || { services: [], isLoading: false });

  // --- STATE FOR EXPANDED MODAL ---
  const [selectedService, setSelectedService] = useState(null);

  useEffect(() => {
    dispatch(getMyServices());
  }, [dispatch]);

  const placeholderCreditScore = 785;
  const formatDate = (date) => new Date(date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });

  return (
    <>
      <Helmet><title>My Dashboard | CS Smart Finserv</title></Helmet>

      <div className="bg-gray-50 min-h-screen py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user?.name || 'User'}!</h1>
            <p className="text-gray-600 mt-1">Here is your financial overview.</p>
          </motion.div>

          {/* --- ACTIVE SERVICES GRID --- */}
          {isLoading ? (
             <div className="py-10"><Spinner /></div>
          ) : (
            services && services.length > 0 && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
                    <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                        <FaWallet className="mr-2 text-brand-primary" /> Your Active Services
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {services.map((service) => (
                            <motion.div 
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                key={service._id} 
                                onClick={() => setSelectedService(service)} // <--- CLICK TO EXPAND
                                className={`bg-white rounded-xl shadow-sm border-l-4 overflow-hidden cursor-pointer hover:shadow-md transition-all ${service.status === 'Frozen' ? 'border-red-500' : 'border-brand-primary'}`}
                            >
                                <div className="p-5">
                                    <div className="flex justify-between items-start mb-2">
                                        <div>
                                            <h3 className="font-bold text-lg text-gray-800">{service.serviceType}</h3>
                                            <p className="text-sm text-gray-500">{service.provider}</p>
                                        </div>
                                        <span className={`px-2 py-1 text-xs font-bold rounded uppercase ${service.status === 'Frozen' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                                            {service.status}
                                        </span>
                                    </div>

                                    <div className="mb-4 inline-flex items-center px-2 py-1 bg-gray-100 rounded text-xs font-medium text-gray-600">
                                        <FaHashtag className="mr-1 text-gray-400" />
                                        Ref: <span className="ml-1 font-bold text-gray-800 font-mono">{service.accountNumber}</span>
                                    </div>

                                    {service.status === 'Frozen' ? (
                                        <div className="bg-red-50 p-4 rounded-lg mt-2 border border-red-100">
                                            <div className="flex items-start">
                                                <FaLock className="text-red-500 mt-1 mr-2" />
                                                <p className="text-sm text-red-700 font-bold">Account Frozen</p>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="space-y-3">
                                            <div className="flex justify-between text-sm">
                                                <span className="text-gray-500">Total Value</span>
                                                <span className="font-bold">₹{service.totalLoanAmount ? service.totalLoanAmount.toLocaleString() : service.totalAmount.toLocaleString()}</span>
                                            </div>
                                            <div className="w-full bg-gray-200 rounded-full h-2">
                                                <div className="bg-brand-primary h-2 rounded-full" style={{ width: `${(service.amountPaid / (service.totalLoanAmount || service.totalAmount)) * 100}%` }}></div>
                                            </div>
                                            <div className="text-center text-xs text-gray-400 mt-2">Click to view details & documents</div>
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            )
          )}

          {/* --- EXPANDED SERVICE MODAL --- */}
          <AnimatePresence>
            {selectedService && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={() => setSelectedService(null)}>
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
                        className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden"
                    >
                        {/* Modal Header */}
                        <div className="bg-brand-primary p-6 text-white flex justify-between items-start">
                            <div>
                                <h2 className="text-2xl font-bold">{selectedService.serviceType}</h2>
                                <p className="opacity-90 text-sm flex items-center mt-1"><FaBuilding className="mr-2"/> {selectedService.provider}</p>
                            </div>
                            <button onClick={() => setSelectedService(null)} className="text-white/80 hover:text-white transition-colors">
                                <FaTimes size={24} />
                            </button>
                        </div>

                        {/* Modal Body */}
                        <div className="p-6 space-y-6">
                            
                            {/* Status Banner */}
                            <div className={`flex justify-between items-center p-3 rounded-lg ${selectedService.status === 'Active' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
                                <span className="font-bold flex items-center">
                                    {selectedService.status === 'Active' ? <FaCheckCircle className="mr-2"/> : <FaLock className="mr-2"/>}
                                    Status: {selectedService.status}
                                </span>
                                <span className="text-sm font-mono bg-white px-2 py-1 rounded shadow-sm">#{selectedService.accountNumber}</span>
                            </div>

                            {/* Financial Grid */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-gray-50 p-4 rounded-xl">
                                    <p className="text-xs text-gray-500 uppercase font-bold mb-1">Total Amount</p>
                                    <p className="text-lg font-bold text-gray-900">₹{selectedService.totalLoanAmount?.toLocaleString()}</p>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-xl">
                                    <p className="text-xs text-gray-500 uppercase font-bold mb-1">Monthly EMI</p>
                                    <p className="text-lg font-bold text-brand-primary">₹{selectedService.emiAmount?.toLocaleString()}</p>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-xl">
                                    <p className="text-xs text-gray-500 uppercase font-bold mb-1">Amount Paid</p>
                                    <p className="text-lg font-bold text-green-600">₹{selectedService.amountPaid?.toLocaleString()}</p>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-xl">
                                    <p className="text-xs text-gray-500 uppercase font-bold mb-1">Next Due Date</p>
                                    <p className="text-lg font-bold text-orange-600">{formatDate(selectedService.nextDueDate)}</p>
                                </div>
                            </div>

                            {/* Download Section */}
                            <div className="border-t border-gray-100 pt-6">
                                <h3 className="font-bold text-gray-900 mb-3 flex items-center"><FaFileDownload className="mr-2 text-brand-primary"/> Service Documents</h3>
                                {selectedService.documents && selectedService.documents.length > 0 ? (
                                  <a 
                                    href={selectedService.documents[0].url} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-between w-full bg-blue-50 border border-blue-100 p-4 rounded-xl hover:bg-blue-100 transition-colors group"
                                  >
                                    <div className="flex items-center">
                                      <div className="bg-white p-2 rounded-lg text-red-500 shadow-sm mr-3">
                                        <FaFileDownload />
                                      </div>
                                      <div>
                                        <p className="font-bold text-blue-900 text-sm">Download Official Document</p>
                                        <p className="text-xs text-blue-600">Sanction Letter / Policy PDF</p>
                                      </div>
                                    </div>
                                    <FaArrowRight className="text-blue-400 group-hover:text-blue-600" />
                                  </a>
                                ) : (
                                  <div className="text-center p-4 bg-gray-50 rounded-xl border border-dashed border-gray-300 text-gray-500 text-sm">
                                    No documents uploaded by admin yet.
                                  </div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
          </AnimatePresence>

          {/* --- CREDIT SCORE & INSIGHTS (UNCHANGED) --- */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-10">
            {/* ... (Keep existing Credit Score and Offer sections) ... */}
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }} className="lg:col-span-1">
               <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center"><FaChartLine className="mr-2 text-brand-primary" /> Credit Health</h2>
               {/* <CreditScoreGauge score={placeholderCreditScore} /> */}
               <div className="bg-white p-6 rounded-2xl shadow-lg mt-6">
                  <h3 className="font-bold text-gray-900 mb-4">Key Factors</h3>
                  <div className="space-y-4">
                    {insightsData.factors.map((factor, idx) => (
                        <div key={idx} className="flex items-start">
                             <FaCheckCircle className="text-green-500 mt-1 mr-3 flex-shrink-0" />
                             <div><p className="font-semibold text-sm text-gray-800">{factor.name}</p><p className="text-xs text-gray-500">{factor.description}</p></div>
                        </div>
                    ))}
                  </div>
               </div>
            </motion.div>
            <div className="lg:col-span-2 space-y-8">
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center"><FaGift className="mr-2 text-brand-primary" /> Exclusive Offers</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {offersData.map(offer => (
                    <Link to={offer.link} key={offer.title} className="block bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group border border-gray-100">
                      <h3 className="font-bold text-lg text-gray-900">{offer.title}</h3>
                      <p className="text-gray-500 text-sm mt-2 mb-4">{offer.description}</p>
                      <span className="font-bold text-brand-primary text-sm group-hover:underline flex items-center">Check Eligibility <FaArrowRight className="ml-2" /></span>
                    </Link>
                  ))}
                </div>
              </motion.div>
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 }}>
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center"><FaBookReader className="mr-2 text-brand-primary" /> Financial Wisdom</h2>
                <div className="bg-white p-6 rounded-2xl shadow-lg">
                   <div className="space-y-4">
                        <Link to="/blogs" className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group">
                            <div><h4 className="font-bold text-gray-800 group-hover:text-brand-primary transition-colors">5 Ways to Improve Your CIBIL Score</h4><p className="text-xs text-gray-500 mt-1">Read time: 3 mins</p></div>
                            <FaArrowRight className="text-gray-300 group-hover:text-brand-primary" />
                        </Link>
                   </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}