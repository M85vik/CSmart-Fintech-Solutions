// const logos = [
//     // Add paths to your partner logo images here
//     '/logos/logo.png', '/logos/logo.png','/logos/logo.png','/logos/logo.png','/logos/logo.png','/logos/logo.png'
// ];

// export default function BrandsSection() {
//     return (
//         <div className="bg-amber-300 py-16">
//             <div className="container mx-auto text-center">
//                 <h2 className="text-2xl font-semibold text-gray-600">Trusted by the Best Financial Partners</h2>
//                 <div className="mt-10 relative overflow-hidden bg-red-300">
//                     <div className="flex animate-marquee">
//                         {[...logos, ...logos].map((logo, index) => (
//                             <img key={index} src={logo} alt={`Partner logo ${index + 1}`} className="h-12 mx-10 flex-shrink-0" />
//                         ))}
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }


// File: src/components/home/BrandsSection.jsx
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- DATA SETUP ---
// In a real app, this might come from an API.
// Each logo is tagged with the categories it belongs to.
const allPartners = [
  { name: 'Axis Bank', logoUrl: '/logos/axis.png', categories: ['Home Loan', 'Credit Card'] },
  { name: 'CASHe', logoUrl: '/logos/axis.png', categories: ['Unsecured Loans'] },
  { name: 'HDFC Bank', logoUrl: '/logos/hdfc.png', categories: ['Home Loan', 'Credit Card', 'Unsecured Loans'] },
  { name: 'ICICI Bank', logoUrl: '/logos/icic.png', categories: ['Home Loan', 'Credit Card'] },
  { name: 'Kotak', logoUrl: '/logos/axis.png', categories: ['Home Loan', 'Credit Bureau'] },
  { name: 'Lendingkart', logoUrl: '/logos/axis.png', categories: ['Unsecured Loans'] },
  { name: 'IndusInd Bank', logoUrl: '/logos/axis.png', categories: ['Credit Card'] },
  { name: 'Standard Chartered', logoUrl: '/logos/axis.png', categories: ['Credit Improvement'] },
  { name: 'Tata Capital', logoUrl: '/logos/axis.png', categories: ['Home Loan', 'Unsecured Loans'] },
  { name: 'Yes Bank', logoUrl: '/logos/axis.png', categories: ['Credit Card'] },
  { name: 'Flexiloans', logoUrl: '/logos/axis.png', categories: ['Unsecured Loans'] },
  { name: 'Hero Fincorp', logoUrl: '/logos/axis.png', categories: ['Unsecured Loans'] },
];

const categories = [
  'All',
  'Unsecured Loans',
  'Credit Card',
  'Home Loan',
  'Credit Bureau',
  'Credit Improvement',
];

export default function BrandsSection() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredPartners = selectedCategory === 'All'
    ? allPartners
    : allPartners.filter(partner => partner.categories.includes(selectedCategory));

  return (
    <div className="bg-gradient-to-b from-blue-50 to-white py-16 sm:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Our Partners from Across the Industry
          </h2>
        </div>

        {/* Filter Buttons */}
        <div className="mt-10 flex flex-wrap justify-center gap-2 sm:gap-4">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 text-sm sm:text-base font-semibold rounded-lg transition-colors duration-300 ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-100'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Logo Grid */}
        <motion.div
          layout // This prop tells Framer Motion to animate layout changes
          className="mt-12 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6"
        >
          <AnimatePresence>
            {filteredPartners.map((partner) => (
              <motion.div
                layout
                key={partner.name}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="flex items-center justify-center bg-white p-4 rounded-lg shadow-md h-24"
              >
                <img src={partner.logoUrl} alt={partner.name} className="max-h-12 w-auto object-contain" />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}