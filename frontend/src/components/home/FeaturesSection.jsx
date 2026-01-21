// File: src/components/home/FeaturesSection.jsx

import { motion } from 'framer-motion';
import { FaFileSignature, FaFeatherAlt, FaShieldAlt, FaHeadset } from 'react-icons/fa';

// Array of features to display
const features = [
  {
    name: 'Express Approval',
    icon: FaFileSignature,
    description: 'Apply for loans and insurance from the comfort of your home, with no physical paperwork required.'
  },
  {
    name: 'Minimal Documentation',
    icon: FaFeatherAlt,
    description: 'We only ask for what\'s necessary, making your application process quick and hassle-free.'
  },
  {
    name: 'Simple & Secure Process',
    icon: FaShieldAlt,
    description: 'Your data is protected with bank-grade security, ensuring your privacy and peace of mind.'
  },
  {
    name: 'Rapid Customer Support',
    icon: FaHeadset,
    description: 'Our dedicated support team is always available to help you with any questions or concerns.'
  }
];

export default function FeaturesSection() {
  return (
    <div className="bg-brandBeige py-16 sm:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Why CS Smart Finserve?
          </h2>
          <p className="mt-4 text-lg leading-8 text-gray-700">
            CS Smart Finserve that provides simple, affordable, and accessible financial products and services.
          </p>
        </div>
        <div className="mt-16 max-w-xl mx-auto grid grid-cols-1 gap-y-12 md:max-w-none md:grid-cols-2 lg:grid-cols-4 md:gap-x-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="flex items-center justify-center h-16 w-16 mx-auto rounded-lg bg-brandLightYellow">
                <feature.icon className="h-8 w-8 text-brandOrange" aria-hidden="true" />
              </div>
              <h3 className="mt-6 font-semibold text-gray-900">{feature.name}</h3>
              {/* Optional description - uncomment if you want more text
              <p className="mt-2 text-sm text-gray-600">{feature.description}</p>
              */}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}