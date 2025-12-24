import { motion } from 'framer-motion';

function Hero() {
  return (
    <div className="relative bg-dark text-white min-h-[60vh] flex items-center">
      {/* You can add a background image here */}
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-extrabold tracking-tight"
        >
          Fast, Flexible, and Fair Financial Solutions
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-6 max-w-3xl mx-auto text-lg md:text-xl text-gray-300"
        >
          At Verity Finance, we simplify the process of getting loans and insurance, so you can focus on what matters most.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-10"
        >
          <a href="/services" className="bg-primary text-white font-bold py-3 px-8 rounded-full text-lg hover:bg-blue-700 transition-transform transform hover:scale-105">
            Explore Our Services
          </a>
        </motion.div>
      </div>
    </div>
  );
}
export default Hero;