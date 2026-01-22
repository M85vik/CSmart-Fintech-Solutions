// File: src/components/about/LeadershipCard.jsx
import { motion } from 'framer-motion';
import { FaQuoteLeft } from 'react-icons/fa';

export default function LeadershipCard({ name, role, image, bio, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="group w-full mx-auto bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row min-h-[24rem]"
    >
      {/* LEFT: IMAGE */}
      <div className="md:w-1/2 relative min-h-[24rem]">
        <img
          src={image}
          alt={name}
          className="h-full w-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/40"></div>

        <div className="absolute bottom-6 left-6 right-6 text-white">
          <h3 className="text-2xl font-bold">{name}</h3>
          <p className="text-brand-secondary font-medium uppercase tracking-wider text-sm mt-1">
            {role}
          </p>
        </div>
      </div>

      {/* RIGHT: BIO */}
      <div className="md:w-1/2 p-10 flex flex-col justify-center h-full">
        <FaQuoteLeft className="text-brand-primary text-3xl mb-4 opacity-80" />
        <p className="text-gray-700 leading-relaxed text-base">
          {bio}
        </p>
      </div>
    </motion.div>
  );
}