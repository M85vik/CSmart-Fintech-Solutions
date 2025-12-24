// File: src/components/about/LeadershipCard.jsx
import { motion } from 'framer-motion';
import { FaLinkedinIn, FaTwitter } from 'react-icons/fa';

export default function LeadershipCard({ name, role, image, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="group relative w-full max-w-sm mx-auto"
    >
      <div className="relative h-96 w-full overflow-hidden rounded-2xl shadow-xl">
        {/* Image */}
        <img 
          src={image} 
          alt={name} 
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
        />
        
        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-300"></div>

        {/* Text Content */}
        <div className="absolute bottom-0 left-0 w-full p-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
          <h3 className="text-2xl font-bold text-white">{name}</h3>
          <p className="text-brand-secondary font-medium uppercase tracking-wider text-sm mt-1">{role}</p>
          
          {/* Social Icons (Optional decorative) */}
          <div className="flex space-x-4 mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
            <div className="p-2 bg-white/20 rounded-full text-white hover:bg-brand-primary hover:text-white cursor-pointer transition-colors">
                <FaLinkedinIn />
            </div>
            <div className="p-2 bg-white/20 rounded-full text-white hover:bg-brand-primary hover:text-white cursor-pointer transition-colors">
                <FaTwitter />
            </div>
          </div>
        </div>
      </div>
      
      {/* Decorative Border */}
      <div className="absolute -inset-2 border-2 border-brand-primary rounded-3xl opacity-0 group-hover:opacity-100 scale-95 group-hover:scale-100 transition-all duration-500 -z-10"></div>
    </motion.div>
  );
}