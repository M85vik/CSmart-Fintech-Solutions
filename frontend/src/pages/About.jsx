// File: src/pages/About.jsx
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { 
  FaHistory, FaHandshake, FaLightbulb, FaMapMarkedAlt, 
  FaBuilding, FaUsers, FaCheckDouble, FaQuoteLeft 
} from 'react-icons/fa';
import CountUp from 'react-countup';
import LeadershipCard from '../components/about/LeadershipCard';

// --- DATA: REAL LEADERSHIP PHOTOS ---
const leadership = [
  { 
    name: "Sushil Kumar Singh", 
    role: "CEO & Managing Director", 
    image: "/Sushil_Kumar_Singh.jpeg",
    bio: "Mr. Sushil Kumar Singh is the visionary founder and driving force behind CS Smart Finserve Pvt. Ltd. With over a decade of hands-on experience in the auto-finance and financial services industry, he is known for building customer-first systems rooted in transparency, speed, and trust. Under his leadership, CS Smart Finserve has grown from a single office in Faridabad into a respected financial services brand across North India. His philosophy is simple: finance should empower dreams, not complicate them."
  },
  // { 
  //   name: "Sachin Arora", 
  //   role: "Director", 
  //   image: "/photos/Sachin_Arora.jpeg" // Updated
  // },
  // { 
  //   name: "Amar Kumar", 
  //   role: "Director", 
  //   image: "/photos/Amar_Kumar.jpeg" // Updated
  // },
];

const stats = [
  { label: "Years of Trust", value: 10, suffix: "+" },
  { label: "Happy Clients", value: 10000, suffix: "+" },
  { label: "Team Strength", value: 45, suffix: "+" },
  { label: "Channel Partners", value: 100, suffix: "+" },
];

const partnerLogos = [
  "/logos/hdfc.png",       
  "/logos/axis.png",
  "/logos/icic.png",
  "/logos/Yes-Bank.png",
  "/logos/IDFC.jpg",
  "/logos/bajaj-finserv.png",
  "/logos/tata-capital.webp",
  "/logos/cholamandalam.png",
  "/logos/Punjab&Sindh.png",
  "/logos/Indian-bank.avif",
  "/logos/Poonawalla-Fincorp.webp",
];

export default function About() {
  return (
    <>
      <Helmet>
        <title>About Us | CS Smart Finserve - The People Behind Your Dreams</title>
      </Helmet>

      <div className="bg-white min-h-screen font-sans overflow-x-hidden">
        
        {/* 1. HERO: The Legacy (Warm & Premium) */}
        <div className="relative h-[65vh] flex items-center justify-center bg-gray-900 text-white overflow-hidden">
          {/* Abstract Premium Background */}
          <div className="absolute inset-0 opacity-50 bg-[url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2670&auto=format&fit=crop')] bg-cover bg-center bg-fixed"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent"></div>
          
          <div className="relative z-10 container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              <span className="bg-[#ff6d00] text-white px-4 py-1 rounded-full font-bold tracking-wider uppercase text-xs mb-6 inline-block shadow-lg">
                Est. 2015
              </span>
              <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight">
                A Decade of <span className="text-[#ff6d00]">Trust.</span>
              </h1>
              <p className="text-xl text-gray-200 max-w-2xl mx-auto font-light">
                From a single branch in Faridabad to a financial powerhouse across North India. We don't just finance cars; we finance dreams.
              </p>
            </motion.div>
          </div>
        </div>

        {/* 2. THE ORIGIN STORY (Photo: Delhi-3 - The Engine Room) */}
        <div className="py-24 container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center mb-6">
                <div className="p-4 bg-orange-50 rounded-full text-[#ff6d00] mr-4 shadow-sm">
                  <FaHistory size={28} />
                </div>
                <h2 className="text-4xl font-bold text-gray-900">Our Humble Beginnings</h2>
              </div>
              <div className="prose prose-lg text-gray-600 leading-relaxed">
                <p>
                  The journey began on <strong>October 20, 2015</strong>. Our founder, <strong>Mr. Sushil Kumar Singh</strong>, observed a gap in the market: financing was complex, slow, and intimidating for the common man.
                </p>
                <p>
                  With a vision to change this, <strong>CS Smart Finserve Pvt. Ltd.</strong> (CS Smart Finserv) was born in <strong>Sector-16, Faridabad</strong>. Our mission was simple: make buying a dream car as easy as driving one.
                </p>
                <p className="font-medium text-gray-800 border-l-4 border-[#ff6d00] pl-4 italic">
                  Today, we are a family of 35+ experts serving over 5,000 happy families.
                </p>
              </div>
            </motion.div>
            
            {/* REAL PHOTO: THE TEAM AT WORK */}
            <motion.div 
              className="relative"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl border-4 border-white transform hover:scale-[1.02] transition-transform duration-500">
                <img 
                  src="/photos/Delhi-3.jpeg" 
                  alt="Verity Team Hard at Work" 
                  className="w-full object-cover" 
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                    <p className="text-white font-bold text-lg">The Engine Room</p>
                    <p className="text-gray-300 text-sm">Where your approvals happen instantly.</p>
                </div>
              </div>
              {/* Decorative Blobs */}
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-orange-100 rounded-full -z-0"></div>
              <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-gray-100 rounded-full -z-0"></div>
            </motion.div>
          </div>
        </div>

        {/* 3. THE SOUL (Photo: employees.jpeg - The Family) */}
        {/* We use the group photo as a parallax background to show "Humanity" */}
        <div className="relative py-32 bg-fixed bg-cover bg-center" style={{ backgroundImage: "url('/photos/employees.jpeg')" }}>
          <div className="absolute inset-0 bg-gray-900/80"></div> {/* Dark overlay for text readability */}
          
          <div className="container mx-auto px-4 relative z-10 text-white">
            <div className="text-center mb-16">
              <span className="text-[#ff6d00] font-bold tracking-widest uppercase text-sm">Our Culture</span>
              <h2 className="text-4xl md:text-5xl font-bold mt-2">The Soul of CS Smart Finserve</h2>
              <p className="text-gray-300 mt-4 max-w-2xl mx-auto">
                We are not just a company; we are a family. Every loan we process helps a family realize their dream.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 text-left">
              <SoulCard 
                icon={FaLightbulb} 
                title="Our Vision" 
                desc="To enable the easy and quick purchase of dream vehicles for every Indian family, regardless of their background." 
              />
              <SoulCard 
                icon={FaHandshake} 
                title="Our Mission" 
                desc="To provide expert guidance through a simple, transparent, and efficient loan process with zero hidden costs." 
              />
              <SoulCard 
                icon={FaCheckDouble} 
                title="Core Values" 
                desc="Customer-Centricity, Absolute Transparency, Unmatched Expertise, and Professional Accountability." 
              />
            </div>
          </div>
        </div>

        {/* 4. LIVE STATS */}
        <div className="bg-[#ff6d00] py-16 text-white shadow-inner">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-white/20">
              {stats.map((stat, index) => (
                <div key={index} className="p-2">
                  <div className="text-4xl md:text-5xl font-extrabold mb-2 drop-shadow-md">
                    <CountUp end={stat.value} duration={2.5} />{stat.suffix}
                  </div>
                  <div className="text-sm md:text-base font-medium uppercase tracking-wide opacity-90">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 5. LEADERSHIP (Photo: Delhi-2 - Directors Cabin + Individual Cards) */}
        <div className="py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900">Meet The Leadership</h2>
              <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
                Guided by seasoned experts who have transformed the auto-finance landscape in North India.
              </p>
            </div>
            
            {/* Feature: Directors in Cabin */}
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-16 rounded-3xl overflow-hidden shadow-xl relative group max-w-5xl mx-auto"
            >
                <img src="/photos/Delhi-2.jpeg" alt="Directors Cabin" className="w-full h-[400px] object-cover object-center group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-8">
                    <div>
                        <h3 className="text-white text-2xl font-bold">Strategic Leadership</h3>
                        <p className="text-gray-300">Always available, always approachable.</p>
                    </div>
                </div>
            </motion.div>

            {/* Individual Cards */}
            <div className="grid md:grid-cols-1 gap-10">
              {leadership.map((leader, index) => (
                <LeadershipCard key={index} {...leader} delay={index * 0.2} />
              ))}
            </div>
          </div>
        </div>

        {/* 6. PHYSICAL PRESENCE (Twin Hubs: Delhi-1 & Faridabad-2) */}
        <div className="bg-gray-50 py-24 border-t border-gray-200">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Real Offices, Real Trust</h2>
            <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
              We believe in a "Phygital" approach. Digital speed, backed by the trust of physical brick-and-mortar offices.
            </p>

            <div className="grid md:grid-cols-2 gap-8">
                {/* Delhi Hub */}
                <motion.div 
                    whileHover={{ y: -5 }}
                    className="bg-white p-4 rounded-2xl shadow-lg"
                >
                    <div className="h-64 overflow-hidden rounded-xl mb-6 relative">
                        <img src="/photos/Delhi-1.jpeg" alt="Delhi Office Entrance" className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500" />
                        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur text-black px-3 py-1 rounded-full text-xs font-bold shadow-sm">
                            DELHI HUB
                        </div>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">Karol Bagh, New Delhi</h3>
                    <p className="text-gray-500 text-sm mt-2">Serving the capital with premium financing solutions.</p>
                </motion.div>

                {/* Faridabad Hub */}
                <motion.div 
                    whileHover={{ y: -5 }}
                    className="bg-white p-4 rounded-2xl shadow-lg"
                >
                    <div className="h-64 overflow-hidden rounded-xl mb-6 relative">
                        <img src="/faridabad-2.jpeg" alt="Faridabad Office Glass Door" className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500" />
                        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur text-black px-3 py-1 rounded-full text-xs font-bold shadow-sm">
                            HEAD OFFICE
                        </div>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">Sector-16, Faridabad</h3>
                    <p className="text-gray-500 text-sm mt-2">The birthplace of CS Smart Finserv. Our central command.</p>
                </motion.div>
            </div>
          </div>
        </div>

        {/* 7. PARTNERS MARQUEE (Infinite Loop) */}
        <div className="py-16 bg-white overflow-hidden">
            <div className="container mx-auto px-4 text-center mb-10">
                <p className="text-gray-400 font-bold uppercase tracking-widest text-sm">Trusted By Industry Giants</p>
            </div>
            
            <div className="flex overflow-hidden relative w-full">
                <motion.div 
                    className="flex gap-16 items-center flex-shrink-0"
                    animate={{ x: "-50%" }} 
                    transition={{ 
                        ease: "linear", 
                        duration: 30, 
                        repeat: Infinity 
                    }}
                >
                    {/* Render logo set 4 times for smooth infinite loop */}
                    {[...partnerLogos, ...partnerLogos, ...partnerLogos, ...partnerLogos].map((logo, index) => (
                        <div key={index} className="flex-shrink-0">
                           <img 
                               src={logo} 
                               alt="Bank Partner" 
                               className="h-14 w-auto grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300 object-contain" 
                           />
                        </div>
                    ))}
                </motion.div>
            </div>
        </div>

      </div>
    </>
  );
}

// --- Internal Components ---

function SoulCard({ icon: Icon, title, desc }) {
  return (
    <motion.div 
      whileHover={{ y: -10 }}
      className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/10 hover:bg-white/20 transition-all duration-300"
    >
      <div className="w-12 h-12 bg-[#ff6d00] rounded-lg flex items-center justify-center text-white mb-6 text-xl shadow-lg">
        <Icon />
      </div>
      <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
      <p className="text-gray-200 leading-relaxed text-sm">
        {desc}
      </p>
    </motion.div>
  );
}