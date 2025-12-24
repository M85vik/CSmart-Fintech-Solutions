// File: src/pages/services/InsurancePage.jsx
import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
    FaArrowRight, FaHandshake, FaFileSignature, FaUserCheck,
    FaCar, FaHeartbeat, FaUserShield, FaMotorcycle, FaCheckCircle,
    FaPhoneAlt, FaShieldAlt
} from 'react-icons/fa';
import {
    Dialog, DialogTitle, DialogContent, Box, Typography,
    TextField, Button, IconButton, Fab
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk';

import FaqSection from '../../components/home/FaqSection';

// --- BRAND COLORS ---
const ORANGE_MAIN = '#ff6d00';

// --- DATA ---
const insuranceTypes = [
    { name: "Health Insurance", description: "Cover medical bills & protect your family's savings.", icon: FaHeartbeat, link: "/services/health-insurance" },
    { name: "Life Insurance", description: "Secure your family's financial future completely.", icon: FaUserShield, link: "/services/life-insurance" },
    { name: "Car Insurance", description: "Comprehensive cover for accidents & theft.", icon: FaCar, link: "/services/car-insurance" },
    { name: "Bike Insurance", description: "Instant policy for your two-wheeler.", icon: FaMotorcycle, link: "/services/bike-insurance" },
];

const topPlans = [
    { name: "Verity Health Secure", insurer: "HDFC ERGO", features: ["₹10 Lakh Cover", "Cashless Hospitals", "Annual Check-up"] },
    { name: "Verity Term Shield", insurer: "ICICI Pru", features: ["₹1 Cr Life Cover", "64 Critical Illnesses", "Tax Benefits"] },
    { name: "Verity Motor Protect", insurer: "Tata AIG", features: ["Zero Depreciation", "24/7 Roadside Assist", "Quick Claims"] },
];

const socialProofStats = [
    { value: "50+", label: "Partner Insurers" },
    { value: "1 Lakh+", label: "Policies Issued" },
    { value: "24/7", label: "Claims Support" },
];

const processSteps = [
    { name: "Tell Us Your Needs", description: "Answer a few simple questions to find the best plan." },
    { name: "Compare Quotes", description: "See quotes from top insurers side-by-side." },
    { name: "Instant Policy", description: "Zero paperwork. Get your policy in your inbox instantly." },
];

const insuranceFaqs = [
    { question: "Why buy from Verity Finance?", answer: "We offer unbiased comparisons from 50+ insurers and handle your claims personally." },
    { question: "Difference between Term & Health?", answer: "Term insurance pays your family on death. Health insurance pays your hospital bills while alive." },
    { question: "Is the process completely online?", answer: "Yes! From quote to policy issuance, everything is digital and paperless." },
];

const partnerLogos = [
    "https://upload.wikimedia.org/wikipedia/commons/4/46/HDFC_Bank_logo.png",
    "https://upload.wikimedia.org/wikipedia/en/thumb/8/85/LIC_Logo.svg/1200px-LIC_Logo.svg.png",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Tata_AIG_Logo.svg/1200px-Tata_AIG_Logo.svg.png",
    "https://upload.wikimedia.org/wikipedia/en/thumb/e/e5/ICICI_Lombard_Logo.svg/1200px-ICICI_Lombard_Logo.svg.png"
];

// --- 1. INTERACTIVE HERO FORM (Now Triggers Callback) ---
const InteractiveHeroForm = ({ onComplete }) => {
    const [step, setStep] = useState(0);
    const insuranceOptions = [
        { name: "Car", icon: FaCar }, { name: "Health", icon: FaHeartbeat },
        { name: "Life", icon: FaUserShield }, { name: "Bike", icon: FaMotorcycle }
    ];

    return (
        <div className="bg-white p-8 rounded-3xl shadow-2xl border-t-8 border-[#ff6d00]">
            <AnimatePresence mode="wait">
                <motion.div
                    key={step}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                >
                    {step === 0 && (
                        <div>
                            <h3 className="font-extrabold text-2xl text-gray-900 text-center mb-6">What would you like to protect?</h3>
                            <div className="grid grid-cols-2 gap-4">
                                {insuranceOptions.map(opt => (
                                    <button
                                        key={opt.name}
                                        onClick={() => setStep(1)}
                                        className="flex flex-col items-center justify-center p-6 rounded-xl bg-gray-50 hover:bg-orange-50 hover:shadow-lg transition-all border border-transparent hover:border-orange-200 group"
                                    >
                                        <opt.icon className="text-4xl text-[#ff6d00] mb-3 group-hover:scale-110 transition-transform" />
                                        <span className="font-bold text-gray-700 group-hover:text-[#ff6d00]">{opt.name}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                    {step === 1 && (
                        <div>
                            <h3 className="font-bold text-2xl text-gray-900 text-center mb-2">Great Choice!</h3>
                            <p className="text-center text-gray-500 mb-6">Get the best quotes delivered to you.</p>

                            <div className="space-y-4">
                                <input type="tel" placeholder="Enter Mobile Number" className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#ff6d00]" />
                                <button
                                    onClick={onComplete} // Opens Callback Modal
                                    className="w-full bg-[#ff6d00] text-white font-bold py-4 rounded-xl hover:bg-orange-600 transition-colors shadow-lg shadow-orange-500/30"
                                >
                                    View Quotes
                                </button>
                                <button onClick={() => setStep(0)} className="w-full text-gray-400 text-sm hover:text-gray-600">Go Back</button>
                            </div>
                        </div>
                    )}
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

// --- 2. PREMIUM CALCULATOR (Orange Theme) ---
const PremiumCalculator = () => {
    const [coverage, setCoverage] = useState(1000000);
    const [age, setAge] = useState(30);
    const [members, setMembers] = useState('self');
    const [premium, setPremium] = useState(0);

    const coverageOptions = [{ label: '5 Lakh', value: 500000 }, { label: '10 Lakh', value: 1000000 }, { label: '25 Lakh', value: 2500000 }];
    const memberOptions = [{ label: 'Just Me', value: 'self' }, { label: 'Couple', value: 'couple' }, { label: 'Family', value: 'family' }];

    useEffect(() => {
        const basePremium = 300;
        const ageFactor = 8;
        const coverageFactor = 0.0004;
        let total = basePremium + (age * ageFactor) + (coverage * coverageFactor);
        if (members === 'couple') total *= 1.8;
        if (members === 'family') total *= 2.5;
        setPremium(Math.round(total));
    }, [coverage, age, members]);

    return (
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 relative overflow-hidden">
            {/* Decorative Bg */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-50 rounded-full -translate-y-1/2 translate-x-1/2"></div>

            <h3 className="text-2xl font-bold text-center mb-1 text-gray-900">Health Insurance Estimator</h3>
            <p className="text-center text-gray-500 mb-8">Calculate your monthly premium instantly.</p>

            <div className="space-y-6 relative z-10">
                <div>
                    <label className="font-bold text-gray-700 text-sm uppercase tracking-wide">Coverage Amount</label>
                    <div className="grid grid-cols-3 gap-3 mt-2">
                        {coverageOptions.map(opt => (
                            <button key={opt.value} onClick={() => setCoverage(opt.value)} className={`py-2 rounded-lg font-bold text-sm transition-all ${coverage === opt.value ? 'bg-[#ff6d00] text-white shadow-md' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                                ₹ {opt.label}
                            </button>
                        ))}
                    </div>
                </div>

                <div>
                    <label className="font-bold text-gray-700 text-sm uppercase tracking-wide flex justify-between">
                        Age of Eldest Member <span>{age} Years</span>
                    </label>
                    <input type="range" min="18" max="60" value={age} onChange={(e) => setAge(Number(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer mt-3 accent-[#ff6d00]" />
                </div>

                <div>
                    <label className="font-bold text-gray-700 text-sm uppercase tracking-wide">Members</label>
                    <div className="grid grid-cols-3 gap-3 mt-2">
                        {memberOptions.map(opt => (
                            <button key={opt.value} onClick={() => setMembers(opt.value)} className={`py-2 rounded-lg font-bold text-sm transition-all ${members === opt.value ? 'bg-[#ff6d00] text-white shadow-md' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                                {opt.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-100 text-center relative z-10">
                <p className="text-gray-500 text-sm">Estimated Monthly Premium</p>
                <p className="text-4xl font-extrabold text-[#ff6d00] mt-1">
                    ₹{premium.toLocaleString('en-IN')}
                    <span className="text-lg font-medium text-gray-400">/mo</span>
                </p>
            </div>
        </div>
    );
};

// --- CALLBACK MODAL ---
const CallbackModal = ({ open, onClose }) => (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
        <DialogTitle sx={{ bgcolor: ORANGE_MAIN, color: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            Get Expert Advice
            <IconButton onClick={onClose} sx={{ color: '#fff' }}><CloseIcon /></IconButton>
        </DialogTitle>
        <DialogContent sx={{ mt: 2 }}>
            <Typography variant="body2" color="text.secondary" gutterBottom>
                Our certified insurance experts will help you find the perfect plan.
            </Typography>
            <Box component="form" sx={{ mt: 1 }}>
                <TextField fullWidth label="Your Name" margin="normal" size="small" />
                <TextField fullWidth label="Mobile Number" margin="normal" size="small" />
                <TextField fullWidth label="Insurance Type (Optional)" margin="normal" size="small" />
                <Button
                    fullWidth
                    variant="contained"
                    size="large"
                    sx={{ mt: 2, bgcolor: ORANGE_MAIN, '&:hover': { bgcolor: '#e65100' } }}
                >
                    Request Callback
                </Button>
            </Box>
        </DialogContent>
    </Dialog>
);

// --- MAIN PAGE COMPONENT ---
export default function InsurancePage() {
    const [openCallback, setOpenCallback] = useState(false);

    const Section = ({ children, className = "" }) => (
        <motion.div className={`py-16 sm:py-24 ${className}`} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            {children}
        </motion.div>
    );

    return (
        <>
            <Helmet>
                <title>Insurance - Compare & Buy Plans Online | CS Smart Finserve</title>
            </Helmet>

            <div className="bg-white min-h-screen">

                {/* 1. HERO SECTION */}
                <div className="relative bg-black pt-28 pb-20 lg:pt-32 lg:pb-32 overflow-hidden">
                    {/* Background Image */}
                    <div className="absolute inset-0 z-0 opacity-60" style={{
                        backgroundImage: 'url(https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80)',
                        backgroundSize: 'cover', backgroundPosition: 'center'
                    }}></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent z-0"></div>

                    <div className="container mx-auto px-4 relative z-10 grid lg:grid-cols-2 gap-16 items-center">
                        <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}>
                            <span className="text-[#ff6d00] font-bold tracking-wider uppercase">Protection First</span>
                            <h1 className="text-5xl lg:text-7xl font-extrabold text-white leading-tight mt-4 mb-6">
                                Secure Your <br /><span className="text-[#ff6d00]">Tomorrow,</span> Today.
                            </h1>
                            <p className="text-xl text-gray-300 max-w-lg mb-8">
                                Compare and buy the best Health, Life, and Vehicle insurance plans. Paperless. Instant. Trusted.
                            </p>

                            {/* Stats */}
                            <div className="flex gap-8 border-t border-gray-700 pt-8">
                                {socialProofStats.map((stat) => (
                                    <div key={stat.label}>
                                        <p className="text-3xl font-extrabold text-white">{stat.value}</p>
                                        <p className="text-sm text-[#ff6d00] font-bold">{stat.label}</p>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }}>
                            <InteractiveHeroForm onComplete={() => setOpenCallback(true)} />
                        </motion.div>
                    </div>
                </div>

                {/* 2. INSURANCE TYPES GRID */}
                <Section className="bg-gray-50">
                    <div className="container mx-auto px-4 text-center">
                        <h2 className="text-3xl lg:text-4xl font-extrabold text-gray-900 mb-4">Complete Protection</h2>
                        <p className="text-gray-500 mb-12 max-w-2xl mx-auto">Coverage for every aspect of your life.</p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {insuranceTypes.map((type, i) => (
                                <motion.div
                                    key={type.name}
                                    className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-pointer group"
                                    onClick={() => setOpenCallback(true)}
                                    whileHover={{ scale: 1.02 }}
                                >
                                    <div className="w-16 h-16 bg-orange-50 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-[#ff6d00] transition-colors">
                                        <type.icon className="text-3xl text-[#ff6d00] group-hover:text-white transition-colors" />
                                    </div>
                                    <h3 className="font-bold text-xl text-gray-900 mb-2">{type.name}</h3>
                                    <p className="text-sm text-gray-500">{type.description}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </Section>

                {/* 3. TOP PLANS */}
                <Section>
                    <div className="container mx-auto px-4">
                        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
                            <div>
                                <h2 className="text-3xl font-bold text-gray-900">Best Selling Plans</h2>
                                <p className="text-gray-500 mt-2">Curated by our experts for maximum coverage.</p>
                            </div>
                            <button onClick={() => setOpenCallback(true)} className="text-[#ff6d00] font-bold flex items-center hover:underline mt-4 md:mt-0">
                                View All Plans <FaArrowRight className="ml-2" />
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {topPlans.map((plan, i) => (
                                <div key={plan.name} className="bg-white border border-gray-100 rounded-2xl p-6 shadow-lg relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 bg-[#ff6d00] text-white text-xs font-bold px-3 py-1 rounded-bl-lg">POPULAR</div>
                                    <h3 className="font-bold text-xl text-gray-900">{plan.name}</h3>
                                    <p className="text-sm text-gray-500 mb-6">By {plan.insurer}</p>

                                    <ul className="space-y-3 mb-8">
                                        {plan.features.map(feat => (
                                            <li key={feat} className="flex items-center text-gray-700 text-sm">
                                                <FaCheckCircle className="text-green-500 mr-3" /> {feat}
                                            </li>
                                        ))}
                                    </ul>
                                    <button
                                        onClick={() => setOpenCallback(true)}
                                        className="w-full border-2 border-[#ff6d00] text-[#ff6d00] font-bold py-3 rounded-xl group-hover:bg-[#ff6d00] group-hover:text-white transition-all"
                                    >
                                        Check Premium
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </Section>

                {/* 4. CALCULATOR SECTION */}
                <div className="py-20 bg-gray-900 text-white overflow-hidden relative">
                    <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                    <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-16 items-center relative z-10">
                        <div>
                            <h2 className="text-4xl font-bold mb-6">Plan Your Budget</h2>
                            <p className="text-gray-400 text-lg mb-8">
                                Use our smart calculator to estimate your health insurance premium. No login required.
                            </p>
                            <ul className="space-y-6">
                                {["Instant Estimate", "Adjust Coverage", "Add Family Members"].map((item, i) => (
                                    <li key={i} className="flex items-center text-xl font-medium">
                                        <div className="w-10 h-10 rounded-full bg-[#ff6d00] flex items-center justify-center mr-4">
                                            <FaCheckCircle className="text-white" />
                                        </div>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <PremiumCalculator />
                    </div>
                </div>

                {/* 5. PROCESS STEPS */}
                <Section className="bg-white">
                    <div className="container mx-auto px-4 text-center">
                        <h2 className="text-3xl font-bold text-gray-900 mb-16">How It Works</h2>
                        <div className="relative max-w-4xl mx-auto">
                            {/* Connecting Line */}
                            <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-gray-100 -translate-y-1/2 z-0"></div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
                                {processSteps.map((step, i) => (
                                    <div key={i} className="bg-white p-4">
                                        <div className="w-16 h-16 bg-[#ff6d00] text-white text-2xl font-bold rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-orange-200">
                                            {i + 1}
                                        </div>
                                        <h3 className="font-bold text-xl text-gray-900 mb-2">{step.name}</h3>
                                        <p className="text-gray-500 text-sm">{step.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </Section>

                {/* 6. PARTNERS (Marquee) */}
                <div className="py-12 border-t border-gray-100 overflow-hidden">
                    <div className="container mx-auto px-4 text-center mb-8">
                        <p className="text-gray-400 font-bold uppercase tracking-widest text-sm">Trusted By Leading Insurers</p>
                    </div>

                    {/* Infinite Loop Container */}
                    <div className="flex overflow-hidden relative w-full">
                        <motion.div
                            className="flex gap-16 items-center flex-shrink-0"
                            // Move only to -50% (the width of exactly one set of logos)
                            animate={{ x: "-50%" }}
                            transition={{
                                ease: "linear",
                                duration: 40, // Adjust speed: Higher number = Slower
                                repeat: Infinity
                            }}
                        >
                            {/* We render the logo set TWICE to create the seamless loop effect */}
                            {["/logos/acko.jpeg",         
                                "/logos/hdfc-ergo.jpeg",
                                "/logos/bajaj-allianz.jpg",
                                "/logos/tata-aig.jpg",
                                "/logos/icici-lombard.jpeg",
                            "/logos/acko.jpeg",         
                                "/logos/hdfc-ergo.jpeg",
                                "/logos/bajaj-allianz.jpg",
                                "/logos/tata-aig.jpg",
                                "/logos/icici-lombard.jpeg",
                            "/logos/acko.jpeg",         
                                "/logos/hdfc-ergo.jpeg",
                                "/logos/bajaj-allianz.jpg",
                                "/logos/tata-aig.jpg",
                                "/logos/icici-lombard.jpeg",
                            "/logos/acko.jpeg",         
                                "/logos/hdfc-ergo.jpeg",
                                "/logos/bajaj-allianz.jpg",
                                "/logos/tata-aig.jpg",
                                "/logos/icici-lombard.jpeg"].map((logo, i) => (
                                <img
                                    key={i}
                                    src={logo}
                                    alt="Partner"
                                    className="h-12 w-auto opacity-60 hover:opacity-100 transition-opacity grayscale hover:grayscale-0"
                                />
                            ))}
                        </motion.div>
                    </div>
                </div>

                {/* 7. GO FOR IT BANNER */}
                <div className="bg-[#1a1a1a] py-16 text-center text-white relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-64 h-64 bg-[#ff6d00] opacity-10 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
                    <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#ff6d00] opacity-10 rounded-full translate-x-1/2 translate-y-1/2"></div>

                    <div className="container mx-auto px-4 relative z-10">
                        <h2 className="text-4xl font-extrabold mb-4">Don't Leave It to Chance.</h2>
                        <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                            Get the right protection for you and your family today.
                        </p>
                        <button
                            onClick={() => setOpenCallback(true)}
                            className="bg-[#ff6d00] text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-orange-600 transition-colors shadow-xl shadow-orange-600/20"
                        >
                            Get Insured Now
                        </button>
                    </div>
                </div>

                {/* 8. FAQs */}
                <div className="bg-gray-50">
                    <FaqSection title="Insurance FAQs" faqs={insuranceFaqs} />
                </div>

                {/* 9. FLOATING ACTION BUTTON */}
                <Fab
                    variant="extended"
                    color="primary"
                    aria-label="callback"
                    onClick={() => setOpenCallback(true)}
                    sx={{
                        position: 'fixed', bottom: 30, right: 30,
                        bgcolor: '#ff6d00', fontWeight: 'bold', zIndex: 1000,
                        '&:hover': { bgcolor: '#e65100' }
                    }}
                >
                    <PhoneInTalkIcon sx={{ mr: 1 }} />
                    Expert Call
                </Fab>

                {/* CALLBACK MODAL */}
                <CallbackModal open={openCallback} onClose={() => setOpenCallback(false)} />

            </div>
        </>
    );
}