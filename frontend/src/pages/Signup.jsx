// File: src/pages/Signup.jsx
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { FaUserPlus, FaEye, FaEyeSlash, FaArrowRight } from 'react-icons/fa';
import toast from 'react-hot-toast';
import Spinner from '../components/shared/Spinner';
import { login, reset } from '../features/auth/authSlice';

export default function Signup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    panId: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const { name, email, panId, password, confirmPassword, agreeTerms } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message || 'Registration failed. Please try again.');
    }
    if (isSuccess || user) {
      navigate('/dashboard'); 
      toast.success('Account created successfully! Checking your credit score...');
    }
    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };
  
  // --- This is the validation logic from the last version ---
  const validateForm = () => {
    const newErrors = {};
    if (!name) newErrors.name = 'Full Name is required.';
    if (!email) newErrors.email = 'Email is required.';
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Email address is invalid.';
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    if (!panId) newErrors.panId = 'PAN ID is required.';
    else if (!panRegex.test(panId.toUpperCase())) newErrors.panId = 'Please enter a valid 10-character PAN ID.';
    if (!password) newErrors.password = 'Password is required.';
    else if (password.length < 8) newErrors.password = 'Password must be at least 8 characters long.';
    if (password !== confirmPassword) newErrors.confirmPassword = 'Passwords do not match.';
    if (!agreeTerms) toast.error('You must agree to the terms and conditions.');
    return newErrors;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    const userData = { name, email, panId: panId.toUpperCase(), password };
    dispatch(login({ email, password }));
  };

  return (
    <>
      <Helmet>
        <title>Sign Up for Free Credit Score | Verity Finance</title>
        <meta name="description" content="Create your Verity Finance account to check your free credit score instantly and unlock personalized financial offers." />
      </Helmet>

      <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-950 p-4 sm:p-6">
        <motion.div /* ...background animation... */ />

        <motion.div
          className="relative z-10 w-full max-w-lg bg-gray-800 border border-gray-700 rounded-xl shadow-2xl p-6 sm:p-10"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
        >
          {/* --- The header with the icon is restored --- */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }} 
            animate={{ opacity: 1, scale: 1 }} 
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-center mb-8"
          >
            <h1 className="text-4xl font-extrabold text-white mb-2">
                <FaUserPlus className="inline mr-3 text-brand-secondary" /> Verify Your Account
            </h1>
            <p className="text-gray-400">Unlock your financial insights with Verity Finance.</p>
          </motion.div>

          <form onSubmit={onSubmit} className="space-y-6">
            
            {/* --- The animated wrappers are back, with validation styles integrated --- */}
            
            <motion.div 
              className="relative"
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <input type="text" name="name" value={name} onChange={onChange} placeholder="Full Name"
                className={`w-full p-4 bg-gray-700 text-white border-b-2 rounded-t-md outline-none transition-all duration-300 ${errors.name ? 'border-red-500' : 'border-gray-600 focus:border-brand-primary'}`}
              />
              {errors.name && <p className="text-red-500 text-xs mt-1 ml-1">{errors.name}</p>}
            </motion.div>

            <motion.div 
              className="relative"
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <input type="email" name="email" value={email} onChange={onChange} placeholder="Email Address"
                className={`w-full p-4 bg-gray-700 text-white border-b-2 rounded-t-md outline-none transition-all duration-300 ${errors.email ? 'border-red-500' : 'border-gray-600 focus:border-brand-primary'}`}
              />
              {errors.email && <p className="text-red-500 text-xs mt-1 ml-1">{errors.email}</p>}
            </motion.div>
            
            <motion.div 
              className="relative"
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <input type="text" name="panId" value={panId} onChange={onChange} placeholder="PAN ID" maxLength="10"
                className={`w-full p-4 bg-gray-700 text-white border-b-2 rounded-t-md outline-none transition-all duration-300 uppercase ${errors.panId ? 'border-red-500' : 'border-gray-600 focus:border-brand-primary'}`}
              />
              {errors.panId ? (
                <p className="text-red-500 text-xs mt-1 ml-1">{errors.panId}</p>
              ) : (
                <p className="text-xs text-gray-500 mt-1 ml-1">Your PAN is required to securely fetch your credit report.</p>
              )}
            </motion.div>

            <motion.div /* ...password input with animation and validation... */ >
               <div className="relative">
                 <input
                  type={showPassword ? "text" : "password"} name="password" value={password} onChange={onChange} placeholder="Password"
                  className={`w-full p-4 pr-12 bg-gray-700 text-white border-b-2 rounded-t-md outline-none transition-all duration-300 ${errors.password ? 'border-red-500' : 'border-gray-600 focus:border-brand-primary'}`}
                  />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white">
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
               </div>
              {errors.password && <p className="text-red-500 text-xs mt-1 ml-1">{errors.password}</p>}
            </motion.div>

            <motion.div /* ...confirm password input with animation and validation... */ >
               <div className="relative">
                 <input
                  type={showPassword ? "text" : "password"} name="confirmPassword" value={confirmPassword} onChange={onChange} placeholder="Confirm Password"
                  className={`w-full p-4 pr-12 bg-gray-700 text-white border-b-2 rounded-t-md outline-none transition-all duration-300 ${errors.confirmPassword ? 'border-red-500' : 'border-gray-600 focus:border-brand-primary'}`}
                 />
               </div>
              {errors.confirmPassword && <p className="text-red-500 text-xs mt-1 ml-1">{errors.confirmPassword}</p>}
            </motion.div>
            
            <motion.div /* ...terms checkbox animation... */ >
                <div className="flex items-center">
                    <input type="checkbox" name="agreeTerms" id="agreeTerms" checked={agreeTerms} onChange={onChange} className="h-5 w-5 text-brand-primary bg-gray-700 border-gray-600 rounded focus:ring-brand-primary" />
                    <label htmlFor="agreeTerms" className="ml-3 text-sm text-gray-300">
                        I agree to the <a href="/terms" className="text-brand-secondary hover:underline">Terms of Service</a> and <a href="/privacy" className="text-brand-secondary hover:underline">Privacy Policy</a>.
                    </label>
                </div>
            </motion.div>

            {/* --- The button with the icon is restored --- */}
            <motion.button
              type="submit"
              className="w-full bg-brand-primary text-white p-4 rounded-lg font-semibold text-lg hover:bg-brand-secondary transition-colors duration-300 shadow-lg disabled:bg-gray-600 disabled:cursor-not-allowed flex items-center justify-center"
              disabled={isLoading}
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
            >
              {isLoading ? <Spinner /> : <>Sign Up & Check Score <FaArrowRight className="ml-2" /></>}
            </motion.button>
          </form>

          <p className="text-center text-gray-400 text-sm mt-8">
            Already have an account? <Link to="/login" className="text-brand-secondary hover:underline">Log In</Link>
          </p>
        </motion.div>
      </div>
    </>
  );
}