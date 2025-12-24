// File: src/components/home/CreditScoreCta.jsx
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaTags, FaShieldAlt, FaChartLine } from 'react-icons/fa';
import { useRef } from 'react'; // <-- 1. Import useRef

const features = [
  { icon: FaTags, text: "Completely Free, Forever" },
  { icon: FaShieldAlt, text: "No Impact on Your Score" },
  { icon: FaChartLine, text: "Personalized Insights & Offers" },
];

export default function CreditScoreCta() {
  const targetRef = useRef(null); // <-- 2. Create a ref for the container

  // --- 3. PARALLAX LOGIC ---
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });
  // Move the image vertically as the section scrolls into view
  const imageY = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);
  // --- END OF PARALLAX LOGIC ---

  const listVariants = {
    visible: { transition: { staggerChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div ref={targetRef} className="bg-brand-bg py-16 sm:py-20 overflow-hidden"> {/* Add overflow-hidden */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-12 items-center bg-white p-8 sm:p-12 rounded-3xl shadow-xl overflow-hidden">
          
          {/* --- 4. NEW: BACKGROUND GRADIENT BLOBS --- */}
          <div className="absolute top-0 left-0 w-72 h-72 bg-brand-primary/20 rounded-full filter blur-3xl opacity-50 -translate-x-1/2 -translate-y-1/2 -z-1"></div>
          <div className="absolute bottom-0 right-0 w-72 h-72 bg-brand-secondary/20 rounded-full filter blur-3xl opacity-50 translate-x-1/2 translate-y-1/2 -z-1"></div>
          {/* --- END OF NEW BLOBS --- */}

          {/* Left Column: Text Content */}
          <motion.div 
            className="z-10" // Ensure text is above the blobs
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h2 className="text-3xl font-bold tracking-tight text-text-dark sm:text-4xl">
              Your Credit Score Unlocks Your Financial Future.
            </h2>
            <p className="mt-4 text-lg text-text-light">
              Get your free, up-to-date credit score in seconds and see what you're eligible for.
            </p>

            <motion.ul 
              className="mt-8 space-y-4"
              variants={listVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {features.map((feature, index) => (
                <motion.li key={index} className="flex items-center" variants={itemVariants}>
                  <feature.icon className="h-6 w-6 text-brand-primary mr-4 flex-shrink-0" />
                  <span className="text-lg text-text-dark font-medium">{feature.text}</span>
                </motion.li>
              ))}
            </motion.ul>

            <Link
              to="/signup"
              className="mt-10 inline-block bg-brand-primary text-white font-bold py-4 px-8 rounded-lg text-lg hover:bg-brand-secondary transition-colors shadow-lg group"
            >
              Check My Score for Free <FaArrowRight className="inline ml-2 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>

            <div className="mt-8 flex items-center">
              <p className="text-sm text-gray-500 mr-8">In partnership with</p>
              <img src="/logos/cibil.png" alt="CIBIL Logo" className="h-10" />
            </div>
          </motion.div>

          <motion.div 
            className="hidden lg:block relative h-full"
            style={{ y: imageY }} 
          >
            <img 
              src="/illustrations/credit-score-hero.png" 
              alt="Credit Score Illustration"
              className="absolute -right-16 top-1/2 -translate-y-1/2 w-[115%]" 
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}