import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getActiveBanners } from '../../features/banners/bannerSlice';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import BannerSkeleton from '../shared/BannerSkeleton';

export default function HeroCarousel() {
  const dispatch = useDispatch();
  
  const { banners, isLoading, isError } = useSelector(
    (state) => state.banner
  );
  
  const [current, setCurrent] = useState(0);

  // 1. Fetch Banners Effect
  useEffect(() => {
    dispatch(getActiveBanners());
  }, [dispatch]);

  // 2. Auto-Play Effect (MOVED UP HERE, BEFORE RETURNS)
  useEffect(() => {
    if (banners && banners.length > 1) {
      const timer = setTimeout(() => {
        setCurrent((prev) => (prev === banners.length - 1 ? 0 : prev + 1));
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [current, banners]);

  // --- NOW WE CAN RETURN EARLY ---

  // Loading State
  if (isLoading) {
    return <BannerSkeleton />;
  }

  // Error/Empty State
  if (isError || !banners || banners.length === 0) {
     return (
        <div className="relative bg-gray-900 text-white min-h-[60vh] md:h-[70vh] flex items-center justify-center">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-40"></div>
            <div className="text-center px-4 relative z-10">
                <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4 drop-shadow-lg">
                  Fast, Flexible, and Fair Financial Solutions
                </h1>
                <p className="text-lg text-gray-200 mb-8 max-w-2xl mx-auto drop-shadow-md">
                  Get the best loans and insurance deals tailored for you.
                </p>
                <Link to="/services/home-loan" className="bg-brand-primary text-white font-bold py-3 px-8 rounded-full hover:bg-orange-600 transition-colors shadow-lg">
                    Get Started
                </Link>
            </div>
        </div>
     );
  }

  const nextSlide = () => setCurrent((prev) => (prev === banners.length - 1 ? 0 : prev + 1));
  const prevSlide = () => setCurrent((prev) => (prev === 0 ? banners.length - 1 : prev - 1));

  return (
    <div className="relative w-full h-[60vh] md:h-[70vh] overflow-hidden bg-gray-900 text-white group">
        <AnimatePresence mode='wait'>
            <motion.div
                key={current}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7 }}
                className="absolute inset-0"
            >
                <div 
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-[10000ms] ease-linear scale-105"
                    style={{ backgroundImage: `url(${window.innerWidth < 768 ? banners[current].mobileImageUrl : banners[current].desktopImageUrl})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />

                <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-center items-start">
                    <motion.h1 
                        initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3, duration: 0.8 }}
                        className="text-4xl md:text-7xl font-extrabold max-w-4xl leading-tight drop-shadow-lg"
                    >
                        {banners[current].title}
                    </motion.h1>
                    <motion.p 
                        initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5, duration: 0.8 }}
                        className="mt-6 text-lg md:text-2xl text-gray-200 max-w-2xl font-light drop-shadow-md"
                    >
                        {banners[current].subtitle}
                    </motion.p>
                    <motion.div 
                        initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.7, duration: 0.8 }}
                        className="mt-10"
                    >
                        <Link to={banners[current].buttonLink} className="bg-brand-primary text-white font-bold py-4 px-10 rounded-full hover:bg-orange-600 transition-all shadow-xl hover:shadow-orange-500/30 text-lg">
                            {banners[current].buttonText}
                        </Link>
                    </motion.div>
                </div>
            </motion.div>
        </AnimatePresence>

        {banners.length > 1 && (
            <>
                <button onClick={prevSlide} className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/30 rounded-full backdrop-blur-md transition-colors text-white opacity-0 group-hover:opacity-100"><FaChevronLeft size={24} /></button>
                <button onClick={nextSlide} className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/30 rounded-full backdrop-blur-md transition-colors text-white opacity-0 group-hover:opacity-100"><FaChevronRight size={24} /></button>
            </>
        )}
    </div>
  );
}