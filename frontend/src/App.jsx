// File: src/App.jsx
import { Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Blogs from './pages/Blogs';
import Contact from './pages/Contact';
import Login from './pages/Login';
import BlogDetails from './pages/BlogDetails';
import AdminDashboard from './pages/admin/AdminDashboard';
import BlogManager from './pages/admin/BlogManager';
import TestimonialManager from './pages/admin/TestimonialManager';
import MessageManager from './pages/admin/MessageManager';
import BannerManager from './pages/admin/BannerManager';
import PrivateRoute from './components/shared/PrivateRoute';
import HomeLoanPage from './pages/services/HomeLoanPage';
import AutoLoanPage from './pages/services/AutoLoanPage';
import CarCatalogue from './pages/services/CarCatalogue';
import CarDetails from './pages/services/CarDetails';
import UsedCarLoanPage from './pages/services/UsedCarLoanPage';
import LoanAgainstCarPage from './pages/services/LoanAgainstCarPage';
//import CarLoanPage from './pages/services/CarLoanPage';
import PersonalLoanPage from './pages/services/PersonalLoanPage';
import InsurancePage from './pages/services/InsurancePage';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import { Toaster } from 'react-hot-toast';
import VehicleManager from './pages/admin/VehicleManager';
import ServiceManager from './pages/admin/ServiceManager';
import ServiceMasterList from './pages/admin/ServiceMasterList';


function App() {
  return (
    <div className="flex flex-col min-h-screen bg-light text-dark">
      <Header />
      <Toaster position="top-center" reverseOrder={false} />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blogs/:id" element={<BlogDetails />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/services/home-loan" element={<HomeLoanPage />} />
          <Route path="/services/car-loan" element={<AutoLoanPage />} />
          <Route path="/services/auto-loan/new" element={<CarCatalogue />} />
          <Route path="/services/auto-loan/catalogue" element={<CarCatalogue />} />
          <Route path="/services/auto-loan/vehicle/:id" element={<CarDetails />} />
          <Route path="/services/auto-loan/used" element={<UsedCarLoanPage />} />
          <Route path="/services/auto-loan/refinance" element={<LoanAgainstCarPage />} />
          <Route path="/services/personal-loan" element={<PersonalLoanPage />} />
          <Route path="/services/business-loan" element={<PersonalLoanPage />} />
          <Route path="/services/insurance" element={<InsurancePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
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
      </main>
      <Footer />
    </div>
  );
}
export default App;