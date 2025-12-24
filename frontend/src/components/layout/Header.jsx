// File: src/components/layout/Header.jsx
import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../../features/auth/authSlice';
import { FaSignInAlt, FaSignOutAlt, FaChevronDown } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const NavLink = ({ to, children }) => {
    const [isHovered, setIsHovered] = useState(false);
    const location = useLocation();
    const isActive = location.pathname === to;

    return (
        <Link 
            to={to} 
            className="relative px-3 py-2 text-base font-medium text-text-dark transition-colors hover:text-brand-primary"
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
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate('/');
  };

  const mainLinks = [
    { name: 'About Us', path: '/about' },
    { name: 'Blogs', path: '/blogs' },
  ];
  const serviceLinks = [
    { name: 'Home Loan', path: '/services/home-loan' },
    { name: 'Auto Loans', path: '/services/car-loan' },
    { name: 'Lifestyle & Business', path: '/services/personal-loan' },
    { name: 'Insurance', path: '/services/insurance' },
  ];

  return (
    <motion.header
      className={`sticky top-0 z-50 w-full bg-white transition-shadow duration-300 ${isScrolled ? 'shadow-md' : 'shadow-none'}`}
    >
      {/* --- THIS DIV IS NOW FULL-WIDTH WITH PADDING --- */}
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-20">
          
          <div className="flex-1 flex items-center justify-start">
            <Link to="/">
              {/* --- LOGO SIZE INCREASED --- */}
              <img src="/logos/logo-verity.svg" alt="Verity Finance Logo" className="h-12 w-auto" />
            </Link>
          </div>

          <nav className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <ul className="flex items-center space-x-2">
              {mainLinks.map(link => <li key={link.name}><NavLink to={link.path}>{link.name}</NavLink></li>)}
              <li className="relative" onMouseEnter={() => setServicesOpen(true)} onMouseLeave={() => setServicesOpen(false)}>
                <div className="relative px-3 py-2 text-base font-medium text-text-dark flex items-center cursor-pointer">
                    Services <FaChevronDown className={`ml-1 h-4 w-4 transition-transform ${isServicesOpen ? 'rotate-180' : ''}`} />
                </div>
                <AnimatePresence>
                  {isServicesOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-48 bg-white rounded-md shadow-lg py-2"
                    >
                      {serviceLinks.map(link => (
                        <Link key={link.name} to={link.path} className="block px-4 py-2 text-sm text-gray-700 hover:bg-brand-bg hover:text-brand-primary">{link.name}</Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
              <li><NavLink to="/contact">Contact Us</NavLink></li>
            </ul>
          </nav>

          <div className="hidden md:flex flex-1 items-center justify-end">
            {user ? (
               <div className="flex items-center space-x-4">
                <Link to="/admin" className="font-semibold text-text-dark hover:text-brand-primary transition-colors">Dashboard</Link>
                <button onClick={onLogout} className="flex items-center space-x-2 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors font-semibold">
                  <FaSignOutAlt /> <span>Logout</span>
                </button>
              </div>
            ) : (
                <Link to="/login" className="flex items-center space-x-2 bg-brand-primary text-white px-4 py-2.5 rounded-md hover:bg-brand-secondary transition-colors font-semibold">
                  <FaSignInAlt /> <span>Login</span>
                </Link>
            )}
          </div>

          <div className="md:hidden flex-1 flex justify-end">
            <button onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}>
              {/* Mobile menu icon here */}
            </button>
          </div>
        </div>
      </div>
    </motion.header>
  );
}