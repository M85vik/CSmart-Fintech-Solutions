// File: src/pages/services/HomeLoanPage.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { submitContactForm } from '../../features/contacts/contactSlice';
import toast from 'react-hot-toast';
import { FaHome, FaPercent, FaClock, FaFileInvoiceDollar, FaGift, FaCheckCircle, FaFileAlt, FaUserTie } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import HomeLoanSimulator from '../../components/services/HomeLoanSimulator';
import GetQuoteForm from '../../components/services/GetQuoteForm';
import FaqSection from '../../components/home/FaqSection';

const offers = [
  { bank: "HDFC Bank", title: "Special Festival Rate", desc: "8.35% p.a. for CIBIL > 780. Zero Processing Fee.", color: "bg-blue-600" },
  { bank: "SBI", title: "Monsoon Dhamaka", desc: "Concession of 20bps for women borrowers.", color: "bg-cyan-600" },
  { bank: "LIC HFL", title: "Griha Varishtha", desc: "Extended tenure for pensioners up to age 80.", color: "bg-yellow-500" },
];

const charges = [
  { fee: "Processing Fee", range: "0.50% - 1.00%", note: "Capped at ₹10,000 for salaried" },
  { fee: "Legal & Technical", range: "₹3,000 - ₹5,000", note: "At actuals (paid to vendor)" },
  { fee: "MOD Charges", range: "0.20% - 0.50%", note: "State government levy on mortgage" },
  { fee: "Pre-payment", range: "Nil", note: "For floating rate loans (Individuals)" },
];

const homeLoanFaqs = [
    { question: "What is the minimum down payment?", answer: "Usually 10-20% of the property value. We fund up to 90% for loans under ₹30 Lakhs." },
    { question: "Can I transfer my existing home loan?", answer: "Yes! Balance Transfer allows you to switch to a lower interest rate with zero foreclosure charges." },
    { question: "Are there tax benefits?", answer: "Yes, under Sec 80C (Principal) and Sec 24(b) (Interest) of the Income Tax Act." },
];

export default function HomeLoanPage() {
  return (
    <>
      <Helmet>
        <title>Home Loans | Check Eligibility & Offers | CS Smart Finserv</title>
      </Helmet>

      <div className="bg-gray-50 min-h-screen font-sans">
        
        {/* 1. HERO SECTION (UPDATED: Orange BG + Old Illustration) */}
        <div className="relative bg-brand-primary pt-24 pb-32 overflow-hidden text-white">
          {/* Subtle pattern overlay */}
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20"></div>
          
          <div className="relative container mx-auto px-4 z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
                
                {/* Left: Text Content */}
                <motion.div 
                    initial={{ opacity: 0, x: -50 }} 
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center lg:text-left"
                >
                    <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
                        Your Dream Home <br/> is Closer Than You Think
                    </h1>
                    <p className="text-xl md:text-2xl mb-8 opacity-95 font-light">
                        Get a home loan with competitive interest rates starting at <span className="font-bold bg-white/20 px-2 rounded">8.35%* p.a.</span>
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                        <a href="#simulator" className="bg-white text-brand-primary font-bold py-4 px-10 rounded-full hover:bg-gray-100 transition shadow-xl transform hover:scale-105">
                            Check Eligibility
                        </a>
                        <a href="#documents" className="bg-transparent border-2 border-white text-white font-bold py-4 px-10 rounded-full hover:bg-white/10 transition">
                            View Documents
                        </a>
                    </div>
                </motion.div>

                {/* Right: The Illustration (Restored) */}
                <motion.div 
                    initial={{ opacity: 0, scale: 0.8 }} 
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="hidden lg:block relative"
                >
                    {/* We add a soft glow behind the image to make it pop against the orange */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-white/20 rounded-full blur-3xl -z-10"></div>
                    
                    {/* Make sure '/illustrations/home_loan.webp' exists in your public folder */}
                    <img 
                        src="/illustrations/home_loan.webp" 
                        alt="Home Loan Family Illustration" 
                        className="w-full max-w-lg mx-auto drop-shadow-2xl hover:-translate-y-2 transition-transform duration-500"
                    />
                </motion.div>
            </div>
          </div>
        </div>

        {/* 2. UNIMAGINABLE OFFERS (Candy) - Pulled up to overlap hero */}
        <div className="container mx-auto px-4 -mt-20 relative z-20">
            <div className="grid md:grid-cols-3 gap-6">
                {offers.map((offer, i) => (
                    <motion.div 
                        key={i} 
                        initial={{ opacity: 0, y: 30 }} 
                        whileInView={{ opacity: 1, y: 0 }} 
                        transition={{ delay: i * 0.1 }}
                        className={`${offer.color} text-white p-6 rounded-2xl shadow-lg relative overflow-hidden group cursor-pointer border-2 border-white/20`}
                    >
                        <div className="absolute -right-6 -top-6 w-24 h-24 bg-white/20 rounded-full group-hover:scale-150 transition-transform duration-500"></div>
                        <div className="flex justify-between items-start mb-4">
                            <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-bold uppercase">{offer.bank}</span>
                            <FaGift className="text-2xl opacity-80" />
                        </div>
                        <h3 className="text-2xl font-bold mb-2">{offer.title}</h3>
                        <p className="text-white/90 text-sm">{offer.desc}</p>
                    </motion.div>
                ))}
            </div>
        </div>

        {/* 3. SIMULATOR */}
        <div id="simulator" className="container mx-auto px-4 py-20">
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Plan Your Budget</h2>
                <p className="text-gray-600 mt-2">Adjust the sliders to see your tailored home loan limit.</p>
            </div>
            <div className="max-w-5xl mx-auto">
                <HomeLoanSimulator />
            </div>
        </div>

        {/* 4. DOCUMENTS & ELIGIBILITY */}
        <div id="documents" className="bg-white py-20 border-t border-gray-100">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-gray-900">Simple Requirements</h2>
                </div>
                
                <div className="grid lg:grid-cols-2 gap-0 rounded-3xl overflow-hidden shadow-2xl">
                    {/* Left: Eligibility */}
                    <div className="bg-brand-bg p-10 md:p-16">
                        <div className="flex items-center mb-8">
                            <div className="bg-brand-primary p-3 rounded-full text-white mr-4"><FaUserTie size={24}/></div>
                            <h3 className="text-2xl font-bold text-brand-primary">Eligibility</h3>
                        </div>
                        <ul className="space-y-6">
                            <CheckItem title="Age" desc="21 to 65 years (at loan maturity)" />
                            <CheckItem title="Income" desc="Min. ₹25,000/mo (Salaried) or ₹3L ITR (Business)" />
                            <CheckItem title="CIBIL Score" desc="700+ preferred for best rates" />
                            <CheckItem title="Work Exp" desc="Min. 2 years total experience" />
                        </ul>
                    </div>

                    {/* Right: Documents */}
                    <div className="bg-gray-900 p-10 md:p-16 text-white">
                        <div className="flex items-center mb-8">
                            <div className="bg-brand-secondary p-3 rounded-full text-gray-900 mr-4"><FaFileAlt size={24}/></div>
                            <h3 className="text-2xl font-bold text-white">Documents</h3>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <DocCard num="01" title="KYC" desc="PAN Card, Aadhaar/Passport" />
                            <DocCard num="02" title="Income" desc="1 year Payslips / 2 Yr ITR" />
                            <DocCard num="03" title="Banking" desc="6 Month Bank Statement" />
                            <DocCard num="04" title="Property" desc="Agreement to Sale / Chain Docs" />
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* 5. CHARGES TABLE */}
        <div className="bg-gray-50 py-20">
            <div className="container mx-auto px-4 max-w-4xl">
                <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Transparency First: Fees & Charges</h2>
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                    <table className="w-full text-left">
                        <thead className="bg-gray-100 text-gray-600 uppercase text-sm font-semibold">
                            <tr>
                                <th className="p-6">Charge Type</th>
                                <th className="p-6">Amount / Rate</th>
                                <th className="p-6 hidden sm:table-cell">Remarks</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {charges.map((c, i) => (
                                <tr key={i} className="hover:bg-gray-50 transition-colors">
                                    <td className="p-6 font-bold text-gray-800">{c.fee}</td>
                                    <td className="p-6 text-brand-primary font-bold">{c.range}</td>
                                    <td className="p-6 text-gray-500 text-sm hidden sm:table-cell">{c.note}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        {/* 6. CALL TO ACTION & FORM */}
        <div className="bg-white py-20">
            <div className="container mx-auto px-4">
                <div className="bg-gradient-to-r from-brand-primary to-brand-secondary rounded-3xl p-8 md:p-16 text-white shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full -translate-y-1/2 translate-x-1/3"></div>
                    <div className="grid lg:grid-cols-2 gap-12 items-center relative z-10">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-extrabold mb-6">Need a Custom Quote?</h2>
                            <p className="text-lg opacity-90 mb-8">
                                Every home journey is unique. Talk to our advisors to get a deal tailored to your financial profile.
                            </p>
                            <div className="flex items-center space-x-4">
                                <div className="bg-white/20 p-4 rounded-xl text-center">
                                    <div className="text-2xl font-bold">5k+</div>
                                    <div className="text-xs uppercase">Families Housed</div>
                                </div>
                                <div className="bg-white/20 p-4 rounded-xl text-center">
                                    <div className="text-2xl font-bold">₹500Cr+</div>
                                    <div className="text-xs uppercase">Disbursed</div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white rounded-2xl p-2 text-gray-900">
                            {/* --- THE FIX: Smart Form Props --- */}
                            <GetQuoteForm defaultService="Home Loan" hideService={true} />
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* 7. FAQ */}
        <div className="bg-gray-50">
            <FaqSection title="Home Loan FAQs" faqs={homeLoanFaqs} />
        </div>

      </div>
    </>
  );
}

// --- Sub-components ---
function CheckItem({ title, desc }) {
    return (
        <div className="flex items-start">
            <FaCheckCircle className="text-green-600 mt-1 mr-3 flex-shrink-0" />
            <div>
                <h4 className="font-bold text-gray-900">{title}</h4>
                <p className="text-gray-600 text-sm">{desc}</p>
            </div>
        </div>
    );
}

function DocCard({ num, title, desc }) {
    return (
        <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm border border-white/10 hover:bg-white/20 transition-colors">
            <div className="text-brand-secondary font-bold text-xs mb-1">{num}</div>
            <h4 className="font-bold text-lg mb-1">{title}</h4>
            <p className="text-gray-300 text-xs">{desc}</p>
        </div>
    );
}