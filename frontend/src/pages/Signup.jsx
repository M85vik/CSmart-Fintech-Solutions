import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { FaUserPlus, FaEye, FaEyeSlash, FaArrowRight } from 'react-icons/fa';
import toast from 'react-hot-toast';
import Spinner from '../components/shared/Spinner';
import { register, reset } from '../features/auth/authSlice';

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

  const { name, email, panId, password, confirmPassword, agreeTerms } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message || 'Registration failed.');
    }
    if (isSuccess || user) {
      navigate('/dashboard'); 
      toast.success('Account created successfully!');
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

  const onSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    if (!agreeTerms) {
      toast.error('Please agree to the terms');
      return;
    }

    const userData = { name, email, password };
    dispatch(register(userData));
  };

  return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <Helmet><title>Sign Up | CS Smart Finserv</title></Helmet>
        
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="sm:mx-auto sm:w-full sm:max-w-md text-center"
        >
          <img className="mx-auto h-12 w-auto" src="/logos/logo-verity.svg" alt="CS Smart Finserv" />
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Create your account</h2>
          <p className="mt-2 text-sm text-gray-600">Join thousands of financially smart users today</p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="mt-8 sm:mx-auto sm:w-full sm:max-w-md"
        >
          <div className="bg-white py-8 px-4 shadow-xl sm:rounded-xl sm:px-10 border border-gray-100">
            <form className="space-y-6" onSubmit={onSubmit}>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Full Name</label>
                <div className="mt-1">
                  <input name="name" type="text" required value={name} onChange={onChange} className="appearance-none block w-full px-3 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-brand-primary focus:border-brand-primary" placeholder="John Doe" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Email address</label>
                <div className="mt-1">
                  <input name="email" type="email" required value={email} onChange={onChange} className="appearance-none block w-full px-3 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-brand-primary focus:border-brand-primary" placeholder="you@example.com" />
                </div>
              </div>

              <div>
                 <label className="block text-sm font-medium text-gray-700">Password</label>
                 <div className="mt-1 relative">
                    <input name="password" type={showPassword ? "text" : "password"} required value={password} onChange={onChange} className="appearance-none block w-full px-3 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-brand-primary focus:border-brand-primary" placeholder="••••••••" />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600">
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                 </div>
              </div>

              <div>
                 <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
                 <div className="mt-1">
                    <input name="confirmPassword" type="password" required value={confirmPassword} onChange={onChange} className="appearance-none block w-full px-3 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-brand-primary focus:border-brand-primary" placeholder="••••••••" />
                 </div>
              </div>

              <div className="flex items-center">
                <input id="agreeTerms" name="agreeTerms" type="checkbox" checked={agreeTerms} onChange={onChange} className="h-4 w-4 text-brand-primary focus:ring-brand-primary border-gray-300 rounded" />
                <label htmlFor="agreeTerms" className="ml-2 block text-sm text-gray-900">
                  I agree to the <Link to="/terms" className="text-brand-primary hover:underline">Terms</Link> and <Link to="/privacy" className="text-brand-primary hover:underline">Privacy Policy</Link>
                </label>
              </div>

              <div>
                <button type="submit" disabled={isLoading} className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-brand-primary hover:bg-brand-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary transition-colors disabled:bg-gray-400">
                  {isLoading ? <Spinner /> : <><FaUserPlus className="mr-2 mt-0.5" /> Sign Up</>}
                </button>
              </div>
            </form>

            <div className="mt-6">
               <div className="relative">
                  <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-300"></div></div>
                  <div className="relative flex justify-center text-sm"><span className="px-2 bg-white text-gray-500">Or continue with</span></div>
               </div>
               <div className="mt-6 text-center">
                  <p className="text-sm text-gray-600">
                    Already have an account? <Link to="/login" className="font-medium text-brand-primary hover:text-brand-secondary">Sign in</Link>
                  </p>
               </div>
            </div>
          </div>
        </motion.div>
      </div>
  );
}