// File: src/components/home/HeroCarousel.jsx
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getActiveBanners } from '../../features/banners/bannerSlice';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import Spinner from '../shared/Spinner';

export default function HeroCarousel() {
  const dispatch = useDispatch();
  
  // Select all necessary states from the Redux store.
  const { banners, isLoading, isError, message } = useSelector(
    (state) => state.banner
  );
  
  const [current, setCurrent] = useState(0);

  // Fetch the banners when the component first loads.
  useEffect(() => {
    dispatch(getActiveBanners());
  }, [dispatch]);

  // Handle the auto-play timer.
  useEffect(() => {
    if (banners && banners.length > 1) {
      const timer = setTimeout(() => {
        setCurrent((prev) => (prev === banners.length - 1 ? 0 : prev + 1));
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [current, banners]);

  const nextSlide = () => setCurrent((prev) => (prev === banners.length - 1 ? 0 : prev + 1));
  const prevSlide = () => setCurrent((prev) => (prev === 0 ? banners.length - 1 : prev - 1));

  // --- ROBUST RENDERING LOGIC ---

  // 1. Show spinner ONLY during the initial load.
  if (isLoading) {
    return <div className="h-[70vh] flex items-center justify-center bg-gray-100"><Spinner /></div>;
  }
  
  // 2. If an error occurred, show a detailed error message.
  if (isError) {
    return (
        <div className="h-[70vh] flex flex-col items-center justify-center bg-red-50 text-red-700 p-4">
            <h2 className="text-2xl font-bold mb-2">Error Loading Banners</h2>
            <p className="text-center">Could not retrieve data from the server.</p>
            {message && <p className="mt-4 text-sm font-mono bg-red-100 p-2 rounded">{message}</p>}
        </div>
    );
  }
  
  // 3. If the fetch was successful but no banners exist.
  if (!isLoading && !isError && (!banners || banners.length === 0)) {
    return <div className="h-[70vh] flex items-center justify-center"><p>No promotional banners available right now.</p></div>;
  }

  // 4. If everything is successful, render the carousel.
  return (
    <div className="relative w-full h-[70vh] overflow-hidden">
        <AnimatePresence initial={false}>
            <motion.div key={current} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }} className="absolute inset-0">
                <picture>
                    <source media="(max-width: 768px)" srcSet={banners[current]?.mobileImageUrl} />
                    <source media="(min-width: 769px)" srcSet={banners[current]?.desktopImageUrl} />
                    <img src={banners[current]?.desktopImageUrl} alt={banners[current]?.title} className="w-full h-full object-cover" />
                </picture>
            </motion.div>
        </AnimatePresence>
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white p-4">
            <motion.h1 key={`${current}-title`} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="text-4xl md:text-6xl font-extrabold tracking-tight">
                {banners[current]?.title}
            </motion.h1>
            <motion.p key={`${current}-subtitle`} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }} className="mt-6 max-w-3xl mx-auto text-lg md:text-xl text-gray-200">
                {banners[current]?.subtitle}
            </motion.p>
            <motion.div key={`${current}-button`} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }} className="mt-10">
                <Link to={banners[current]?.buttonLink || '/'} className="bg-blue-600 text-white font-bold py-3 px-8 rounded-full text-lg hover:bg-blue-700 transition-transform transform hover:scale-105 shadow-lg">
                    {banners[current]?.buttonText}
                </Link>
            </motion.div>
        </div>
        {banners.length > 1 && (
            <>
                <button onClick={prevSlide} className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-75 z-20"><FaChevronLeft /></button>
                <button onClick={nextSlide} className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-75 z-20"><FaChevronRight /></button>
            </>
        )}
    </div>
  );
}