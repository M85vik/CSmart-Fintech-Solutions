import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../../features/auth/authSlice';
import { FaSignInAlt, FaSignOutAlt, FaUserPlus, FaChevronDown, FaBars, FaTimes, FaUserCircle } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const NavLink = ({ to, children }) => {
    const [isHovered, setIsHovered] = useState(false);
    const location = useLocation();
    const isActive = location.pathname === to;

    return (
        <Link 
            to={to} 
            className="relative px-1 py-2 text-base font-medium text-gray-700 transition-colors hover:text-brand-primary"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <span>{children}</span>
            {(isHovered || isActive) && (
                <motion.div
                    className="absolute bottom-0 left-0 w-full h-0.5 bg-brand-primary"
                    layoutId="underline"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                />
            )}
        </Link>
    );
};

export default function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isServicesOpen, setServicesOpen] = useState(false);

  // --- THE FIX: DYNAMIC DASHBOARD PATH ---
  const isAdmin = user?.email === 'admin@e3n.com';
  const dashboardPath = isAdmin ? '/admin' : '/dashboard';
  const dashboardLabel = isAdmin ? 'Admin Panel' : 'My Dashboard';

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate('/');
  };

  const servicesLinks = [
    { name: 'Home Loans', to: '/services/home-loan' },
    { name: 'Car Loans', to: '/services/car-loan' },
    { name: 'Used Car Loans', to: '/services/auto-loan/used' },
    { name: 'Personal Loans', to: '/services/personal-loan' },
    { name: 'Business Loans', to: '/services/business-loan' },
    { name: 'Insurance', to: '/services/insurance' },
  ];

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex items-center h-20">
          
          {/* 1. LOGO */}
          <Link to="/" className="flex-shrink-0 flex items-center gap-3">
             <img className="h-10 w-auto" src="/logos/logo-verity.svg" alt="Verity Finance" />
          </Link>

          {/* 2. DESKTOP NAV */}
          <nav className="hidden md:flex ml-10 lg:ml-16">
            <ul className="flex items-center gap-8">
              <li><NavLink to="/">Home</NavLink></li>
              <li><NavLink to="/about">About Us</NavLink></li>
              
              <li 
                className="relative group h-full flex items-center"
                onMouseEnter={() => setServicesOpen(true)}
                onMouseLeave={() => setServicesOpen(false)}
              >
                <button className="flex items-center gap-1 text-base font-medium text-gray-700 hover:text-brand-primary focus:outline-none">
                  Services <FaChevronDown className="text-xs transition-transform duration-200 group-hover:rotate-180" />
                </button>
                
                <AnimatePresence>
                  {isServicesOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 mt-2 w-56 rounded-lg shadow-xl bg-white ring-1 ring-black ring-opacity-5 py-2 overflow-hidden z-50"
                    >
                      {servicesLinks.map((link) => (
                        <Link 
                            key={link.name} 
                            to={link.to} 
                            className="block px-4 py-3 text-sm text-gray-700 hover:bg-brand-bg hover:text-brand-primary transition-colors"
                        >
                            {link.name}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>

              <li><NavLink to="/blogs">Blogs</NavLink></li>
              <li><NavLink to="/contact">Contact</NavLink></li>
            </ul>
          </nav>

          {/* 3. AUTH BUTTONS (DESKTOP) */}
          <div className="hidden md:flex items-center gap-4 ml-auto">
            {user ? (
               <>
                {/* DYNAMIC LINK HERE */}
                <Link 
                    to={dashboardPath} 
                    className="flex items-center gap-2 font-semibold text-gray-700 hover:text-brand-primary transition-colors"
                >
                    <FaUserCircle className="text-xl" />
                    {dashboardLabel}
                </Link>
                <div className="h-6 w-px bg-gray-300"></div>
                <button onClick={onLogout} className="flex items-center gap-2 text-red-600 font-semibold hover:text-red-700 transition-colors">
                  <FaSignOutAlt /> Logout
                </button>
               </>
            ) : (
                <>
                    <Link to="/login" className="flex items-center gap-2 text-gray-600 font-semibold hover:text-brand-primary transition-colors">
                      <FaSignInAlt /> Login
                    </Link>
                    <Link to="/signup" className="flex items-center gap-2 bg-brand-primary text-white px-5 py-2.5 rounded-lg hover:bg-orange-600 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                      <FaUserPlus /> Sign Up
                    </Link>
                </>
            )}
          </div>

          {/* 4. MOBILE MENU TOGGLE */}
          <div className="flex md:hidden ml-auto">
            <button 
                onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
                className="text-gray-700 hover:text-brand-primary p-2 focus:outline-none"
            >
              {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>

        {/* --- MOBILE MENU DROPDOWN --- */}
        <AnimatePresence>
            {isMobileMenuOpen && (
                <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="md:hidden overflow-hidden bg-white border-t border-gray-100"
                >
                    <div className="py-4 space-y-2 flex flex-col">
                        <Link to="/" className="px-4 py-2 hover:bg-gray-50 font-medium">Home</Link>
                        <Link to="/about" className="px-4 py-2 hover:bg-gray-50 font-medium">About Us</Link>
                        
                        <div className="px-4 py-2 font-medium text-gray-500">Services</div>
                        <div className="pl-8 flex flex-col space-y-2 border-l-2 border-gray-100 ml-4">
                            {servicesLinks.map(link => (
                                <Link key={link.name} to={link.to} className="text-sm text-gray-600 hover:text-brand-primary">{link.name}</Link>
                            ))}
                        </div>

                        <Link to="/blogs" className="px-4 py-2 hover:bg-gray-50 font-medium">Blogs</Link>
                        <Link to="/contact" className="px-4 py-2 hover:bg-gray-50 font-medium">Contact Us</Link>
                        
                        <div className="border-t border-gray-100 my-2 pt-2 px-4 flex flex-col gap-3">
                            {user ? (
                                <>
                                    {/* DYNAMIC LINK HERE TOO */}
                                    <Link to={dashboardPath} className="w-full text-center py-2 bg-gray-100 rounded text-gray-800 font-bold flex items-center justify-center gap-2">
                                        <FaUserCircle /> {dashboardLabel}
                                    </Link>
                                    <button onClick={onLogout} className="w-full text-center py-2 bg-red-50 text-red-600 rounded font-bold flex items-center justify-center gap-2">
                                        <FaSignOutAlt /> Logout
                                    </button>
                                </>
                            ) : (
                                <>
                                    <Link to="/login" className="w-full text-center py-2 border border-gray-300 rounded text-gray-700 font-bold">Login</Link>
                                    <Link to="/signup" className="w-full text-center py-2 bg-brand-primary text-white rounded font-bold shadow-md">Sign Up</Link>
                                </>
                            )}
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
      </div>
    </header>
  );
}