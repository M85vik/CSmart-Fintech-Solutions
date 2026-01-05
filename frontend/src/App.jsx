import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import PrivateRoute from './components/shared/PrivateRoute';
import Spinner from './components/shared/Spinner';
import { Toaster } from 'react-hot-toast';

// --- REMOVED OLD IMPORTS FROM HERE ---

// --- LAZY LOAD IMPORTS (These replace the old ones) ---
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Blogs = lazy(() => import('./pages/Blogs'));
const Contact = lazy(() => import('./pages/Contact'));
const Login = lazy(() => import('./pages/Login'));
const Signup = lazy(() => import('./pages/Signup'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const BlogDetails = lazy(() => import('./pages/BlogDetails'));

// Service Pages
const HomeLoanPage = lazy(() => import('./pages/services/HomeLoanPage'));
const AutoLoanPage = lazy(() => import('./pages/services/AutoLoanPage'));
const CarCatalogue = lazy(() => import('./pages/services/CarCatalogue'));
const CarDetails = lazy(() => import('./pages/services/CarDetails'));
const UsedCarLoanPage = lazy(() => import('./pages/services/UsedCarLoanPage'));
const LoanAgainstCarPage = lazy(() => import('./pages/services/LoanAgainstCarPage'));
const PersonalLoanPage = lazy(() => import('./pages/services/PersonalLoanPage'));
const InsurancePage = lazy(() => import('./pages/services/InsurancePage'));

// Admin Pages
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));
const BannerManager = lazy(() => import('./pages/admin/BannerManager'));
const BlogManager = lazy(() => import('./pages/admin/BlogManager'));
const TestimonialManager = lazy(() => import('./pages/admin/TestimonialManager'));
const VehicleManager = lazy(() => import('./pages/admin/VehicleManager'));
const MessageManager = lazy(() => import('./pages/admin/MessageManager'));
const ServiceManager = lazy(() => import('./pages/admin/ServiceManager'));
const ServiceMasterList = lazy(() => import('./pages/admin/ServiceMasterList'));

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Toaster position="top-center" />
      <Header />
      <main className="flex-grow">
        {/* Suspense handles the loading state for all lazy components */}
        <Suspense fallback={<div className="h-screen flex items-center justify-center"><Spinner /></div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/blogs/:id" element={<BlogDetails />} />
            <Route path="/contact" element={<Contact />} />
            
            {/* Services */}
            <Route path="/services/home-loan" element={<HomeLoanPage />} />
            <Route path="/services/car-loan" element={<AutoLoanPage />} />
            <Route path="/services/auto-loan/catalogue" element={<CarCatalogue />} />
            <Route path="/services/auto-loan/vehicle/:id" element={<CarDetails />} />
            <Route path="/services/auto-loan/used" element={<UsedCarLoanPage />} />
            <Route path="/services/auto-loan/refinance" element={<LoanAgainstCarPage />} />
            <Route path="/services/personal-loan" element={<PersonalLoanPage />} />
            <Route path="/services/business-loan" element={<PersonalLoanPage />} />
            <Route path="/services/insurance" element={<InsurancePage />} />
            
            {/* Auth */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<Dashboard />} />
            
            {/* Admin */}
            <Route path="/admin" element={<PrivateRoute />}>
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/banners" element={<BannerManager />} />
              <Route path="/admin/blogs" element={<BlogManager />} />
              <Route path="/admin/testimonials" element={<TestimonialManager />} />
              <Route path="/admin/vehicles" element={<VehicleManager />} />
              <Route path="/admin/messages" element={<MessageManager />} />
              <Route path="/admin/services/new" element={<ServiceManager />} />
              <Route path="/admin/services/all" element={<ServiceMasterList />} />
            </Route>
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}

export default App;