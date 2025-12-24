// File: src/components/about/MissionStatement.jsx
import { motion } from 'framer-motion';

export default function MissionStatement() {
  return (
    <div className="bg-white py-16 sm:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7 }}
        >
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-gray-900 leading-tight">
            We make personal finance easy, convenient & transparent
          </h1>
          <div className="mt-8 space-y-6 text-lg text-gray-600">
            <p>
              Using data and technology innovations, we help you choose the most suited offers across loans and cards. Our algorithm-based technology platform provides you with access to multiple personal credit offers, ease of comparison of multiple offers available and unbiased advice.
            </p>
            <p>
              From application to disbursal, Verity Finance will accompany you at each step, till the disbursal of loan or issuance of credit card.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}