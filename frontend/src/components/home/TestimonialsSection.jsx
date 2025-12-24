// File: src/components/home/TestimonialsSection.jsx
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getActiveTestimonials } from '../../features/testimonials/testimonialSlice';
import { FaQuoteLeft } from 'react-icons/fa';
import { motion } from 'framer-motion';
import Spinner from '../shared/Spinner';

// TestimonialCard component remains the same
const TestimonialCard = ({ name, company, quote, imageUrl }) => {
  return (
    <figure className="relative h-fit w-full max-w-xs cursor-pointer bg-brandBeige p-6 rounded-xl shadow-xl border border-brandOrange">
      <FaQuoteLeft className="absolute top-6 left-6 text-gray-900 text-xl" />
      <blockquote className="relative z-10 text-gray-900 mt-8">
        <p className="italic">"{quote}"</p>
      </blockquote>
      <figcaption className="relative mt-6 flex items-center justify-start border-t border-brandOrange pt-4">
        {imageUrl ? (
          <img src={imageUrl} alt={name} className="h-12 w-12 rounded-full object-cover mr-4" />
        ) : (
          <div className="h-12 w-12 rounded-full bg-red-700 mr-4 flex items-center justify-center text-gray-800 font-bold">
            {name.charAt(0)}
          </div>
        )}
        <div>
          <div className="font-medium text-gray-900">{name}</div>
          <div className="mt-1 text-sm text-gray-500">{company}</div>
        </div>
      </figcaption>
    </figure>
  );
};

// Main Section Component
export default function TestimonialsSection() {
  const dispatch = useDispatch();
  const { publicTestimonials, isLoading, isError, message } = useSelector((state) => state.testimonials);

  useEffect(() => {
    dispatch(getActiveTestimonials());
  }, [dispatch]);

  // Data fetching and checking logic remains the same
  if (isLoading && (!publicTestimonials || publicTestimonials.length === 0)) { return <div className="bg-gray-900 py-20 text-center"><Spinner /></div>; }
  if (isError) { return <div className="bg-white py-20 text-center text-red-400"><p>Error: {message}</p></div>; }
  if (!publicTestimonials || publicTestimonials.length === 0) { return null; }

  // Data splitting logic remains the same (using 4 columns)
  const columns = [[], [], [], []];
  publicTestimonials.forEach((testimonial, i) => { columns[i % 4].push(testimonial); });
  columns.forEach((col, i) => { columns[i] = [...col, ...col]; });

  return (
    <section className="relative w-full overflow-hidden bg-white py-10 text-black">
        <div className="container mx-auto px-4 mb-2 text-center">
            {/* --- ANIMATIONS ARE BACK HERE --- */}
            <motion.h2 
                initial={{ opacity: 0, y: 20 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true }} 
                transition={{ duration: 0.5 }} 
                className="text-3xl font-extrabold sm:text-4xl"
            >
              What Our Clients Say
            </motion.h2>
            <motion.p 
                initial={{ opacity: 0, y: 20 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true }} 
                transition={{ duration: 0.7, delay: 0.1 }} 
                className="mt-4 text-lg text-gray-800"
            >
              We're proud to have earned the trust of clients from all walks of life.
            </motion.p>
            {/* --- END OF ANIMATION FIX --- */}
        </div>
        
        {/* The fade mask remains the same */}
        <div className="absolute inset-0 z-20 [mask-image:linear-gradient(to_bottom,transparent,white_10%,white_90%,transparent)]" />
        
        {/* The flexible column layout is the same as the last fix */}
        <div className="relative z-10 flex h-[500px] overflow-hidden gap-8 px-20">
            {columns.map((col, colIndex) => (
                <motion.div
                    key={colIndex}
                    className="flex flex-col h-full flex-1 min-w-[280px] gap-8"
                    animate={{
                        y: colIndex % 2 === 0 ? ['-50%', '0%'] : ['0%', '-50%']
                    }}
                    transition={{
                        duration: 40 + (colIndex * 5),
                        repeat: Infinity,
                        ease: 'linear',
                    }}
                >
                    {col.map((testimonial, cardIndex) => (
                        <TestimonialCard
                            key={`${testimonial._id}-${cardIndex}`}
                            name={testimonial.name}
                            company={testimonial.company}
                            quote={testimonial.quote}
                            imageUrl={testimonial.imageUrl}
                        />
                    ))}
                </motion.div>
            ))}
        </div>
    </section>
  );
}