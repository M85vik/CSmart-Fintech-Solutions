// import { Link } from 'react-router-dom';
// import { motion } from 'framer-motion';

// export default function CTASection() {
//     return (
//         <div className="bg-blue-600">
//             <div className="container mx-auto px-4 py-16 text-center">
//                 <motion.h2 
//                     initial={{ opacity: 0, y: 20 }}
//                     whileInView={{ opacity: 1, y: 0 }}
//                     viewport={{ once: true }}
//                     transition={{ duration: 0.5 }}
//                     className="text-3xl font-extrabold text-white sm:text-4xl"
//                 >
//                     Ready to Take the Next Step?
//                 </motion.h2>
//                 <motion.p 
//                     initial={{ opacity: 0, y: 20 }}
//                     whileInView={{ opacity: 1, y: 0 }}
//                     viewport={{ once: true }}
//                     transition={{ duration: 0.5, delay: 0.1 }}
//                     className="mt-4 text-lg text-blue-200"
//                 >
//                     Our team is here to guide you through every step of the process.
//                 </motion.p>
//                 <motion.div
//                     initial={{ opacity: 0, scale: 0.8 }}
//                     whileInView={{ opacity: 1, scale: 1 }}
//                     viewport={{ once: true }}
//                     transition={{ duration: 0.5, delay: 0.2 }}
//                     className="mt-8"
//                 >
//                     <Link to="/contact" className="inline-block bg-white text-blue-600 font-bold py-3 px-8 rounded-full text-lg hover:bg-gray-200 transition-transform transform hover:scale-105 shadow-lg">
//                         Get in Touch
//                     </Link>
//                 </motion.div>
//             </div>
//         </div>
//     );
// }


// File: src/components/home/CTASection.jsx
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function CTASection() {
  return (
    // --- THE FIX IS HERE ---
    // Using your new brand colors for the background and text
    <div className="bg-brand-bg">
      <div className="container mx-auto px-4 py-16 text-center">
        <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-extrabold text-gray-900 sm:text-4xl"
        >
            Ready to Take the Next Step?
        </motion.h2>
        <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-4 text-lg text-gray/80" // Using white with 80% opacity for the subtitle
        >
            Our team is here to guide you through every step of the process.
        </motion.p>
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-8"
        >
            <Link 
                to="/contact" 
                className="inline-block bg-white text-brand-primary font-bold py-3 px-8 rounded-lg text-lg hover:bg-brandPinkish  transition-colors shadow-lg"
            >
                Get in Touch
            </Link>
        </motion.div>
      </div>
    </div>
    // --- END OF FIX ---
  );
}