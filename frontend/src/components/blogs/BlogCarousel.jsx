// File: src/components/blogs/BlogCarousel.jsx
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaChevronLeft, FaChevronRight, FaTag } from 'react-icons/fa';

export default function BlogCarousel({ blogs = [] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const slideVariants = {
    hidden: (direction) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.4, ease: 'easeOut' },
    },
    exit: (direction) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
      transition: { duration: 0.4, ease: 'easeIn' },
    }),
  };

  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev === blogs.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? blogs.length - 1 : prev - 1));
  };

  if (!blogs || blogs.length === 0) {
      return (
        <div className="flex items-center justify-center h-[400px] md:h-[350px] bg-white rounded-2xl shadow-xl p-8 text-center">
            <p className="text-gray-600">No featured posts available.</p>
        </div>
      );
  }

  const currentBlog = blogs[currentIndex];

  return (
    <div className="relative w-full h-[400px] md:h-[350px] overflow-hidden">
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={slideVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="absolute inset-0"
        >
          <div className="bg-white rounded-2xl shadow-xl grid grid-cols-1 md:grid-cols-2 h-full overflow-hidden">
            <div className="relative bg-blue-500 flex items-center justify-center p-4 h-full">
              {currentBlog.imageUrl ? (
                <img src={currentBlog.imageUrl} alt={currentBlog.title} className="w-full h-full object-cover" />
              ) : (
                <div className="text-white text-center p-4">
                  <h3 className="text-2xl font-bold">{currentBlog.title}</h3>
                </div>
              )}
            </div>
            <div className="p-6 sm:p-8 flex flex-col">
              <div className="flex items-center text-sm text-gray-500 mb-2">
                <FaTag className="mr-2" />
                <span>Personal Finance</span>
              </div>
              <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-3 h-16 line-clamp-2">
                {currentBlog.title}
              </h3>
              <div className="text-gray-600 mb-4 flex-grow overflow-y-auto">
                <p className="line-clamp-4 lg:line-clamp-5">
                  {currentBlog.content}
                </p>
              </div>
              <Link to={`/blogs/${currentBlog._id}`} className="font-semibold text-blue-600 hover:text-blue-800 self-start mt-auto">
                Read More &raquo;
              </Link>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      <button onClick={prevSlide} className="absolute top-1/2 left-2 md:-left-4 transform -translate-y-1/2 bg-gray-700 bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-75 z-20">
        <FaChevronLeft />
      </button>
      <button onClick={nextSlide} className="absolute top-1/2 right-2 md:-right-4 transform -translate-y-1/2 bg-gray-700 bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-75 z-20">
        <FaChevronRight />
      </button>
    </div>
  );
}