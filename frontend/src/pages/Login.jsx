// // File: src/pages/Login.jsx
// import { useState, useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { login, reset } from '../features/auth/auth.js';
// import { FaSignInAlt } from 'react-icons/fa';
// import { Helmet } from 'react-helmet-async';
// // You should create a Spinner component for loading states
// // import Spinner from '../components/shared/Spinner'; 

// function Login() {
//   const [formData, setFormData] = useState({ email: '', password: '' });
//   const { email, password } = formData;

//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const { user, isLoading, isError, isSuccess, message } = useSelector(
//     (state) => state.auth
//   );

//   useEffect(() => {
//     if (isError) {
//       alert(message); // Replace with a better toast notification
//     }
//     if (isSuccess || user) {
//       navigate('/admin'); // Redirect to admin dashboard on success
//     }
//     dispatch(reset());
//   }, [user, isError, isSuccess, message, navigate, dispatch]);

//   const onChange = (e) => {
//     setFormData((prevState) => ({
//       ...prevState,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   const onSubmit = (e) => {
//     e.preventDefault();
//     const userData = { email, password };
//     dispatch(login(userData));
//   };

//   if (isLoading) {
//     return <p>Loading...</p> // Replace with <Spinner />
//   }

//   return (
//     <>
//       <Helmet>
//         <title>Admin Login | Verity Finance Fintech</title>
//       </Helmet>
//       <div className="container mx-auto px-4 py-12 flex justify-center">
//         <div className="w-full max-w-md">
//           <div className="bg-white p-8 rounded-lg shadow-lg">
//             <h1 className="text-3xl font-bold mb-6 text-center text-gray-800 flex items-center justify-center">
//               <FaSignInAlt className="mr-3" /> Admin Login
//             </h1>
//             <form onSubmit={onSubmit}>
//               <div className="mb-4">
//                 <input
//                   type="email"
//                   className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   id="email"
//                   name="email"
//                   value={email}
//                   placeholder="Enter your email"
//                   onChange={onChange}
//                   required
//                 />
//               </div>
//               <div className="mb-6">
//                 <input
//                   type="password"
//                   className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   id="password"
//                   name="password"
//                   value={password}
//                   placeholder="Enter password"
//                   onChange={onChange}
//                   required
//                 />
//               </div>
//               <div className="mb-4">
//                 <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300">
//                   Login
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default Login;


// File: src/pages/Login.jsx
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login, reset } from '../features/auth/authSlice';
import { FaSignInAlt } from 'react-icons/fa';
import { Helmet } from 'react-helmet-async';
import Spinner from '../components/shared/Spinner';
import toast from 'react-hot-toast';

export default function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const { email, password } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message || 'Login failed. Please check your credentials.');
    }
    if (isSuccess || user) {
      // 1. Check if the user is the specific admin
      if (user.email === 'admin@e3n.com') {
        navigate('/admin');
      } else {
        // 2. Everyone else goes to the user dashboard
        navigate('/dashboard');
      }
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
        toast.error('Please enter both email and password.');
        return;
    }
    const userData = { email, password };
    dispatch(login(userData));
  };

  return (
    <>
      <Helmet>
        <title>Admin Login | Verity Finance Fintech</title>
      </Helmet>
      {/* --- NEW UI/UX STRUCTURE --- */}
      <div className="min-h-screen flex items-center justify-center bg-brand-bg p-4">
        <div className="w-full max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 bg-white rounded-2xl shadow-2xl overflow-hidden">
          
          {/* Left Side: Branding and Illustration */}
          <div className="hidden md:flex flex-col items-center justify-center bg-brand-primary p-12 text-white">
            <h1 className="text-4xl font-bold mb-4">Verity Finance Admin</h1>
            <p className="text-center text-white/80">
              Welcome back! Manage your website content and connect with your users.
            </p>
            <img 
                src="/ad.png" 
                alt="Admin Login Illustration"
                className="w-3/4 mt-8"
            />
          </div>
          
          {/* Right Side: Login Form */}
          <div className="p-8 md:p-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-2 flex items-center">
              <FaSignInAlt className="mr-3 text-brand-primary" /> Admin Login
            </h2>
            <p className="text-gray-500 mb-8">Please enter your credentials to proceed.</p>
            
            <form onSubmit={onSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input
                  type="email"
                  className="w-full p-3 bg-gray-100 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                  id="email"
                  name="email"
                  value={email}
                  placeholder="admin@example.com"
                  onChange={onChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <input
                  type="password"
                  className="w-full p-3 bg-gray-100 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                  id="password"
                  name="password"
                  value={password}
                  placeholder="••••••••"
                  onChange={onChange}
                  required
                />
              </div>
              <div>
                <button type="submit" className="w-full bg-brand-primary text-white p-3 rounded-lg font-semibold hover:bg-brand-secondary transition duration-300 disabled:bg-gray-400" disabled={isLoading}>
                  {isLoading ? <Spinner /> : 'Login'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}