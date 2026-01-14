// File: src/components/layout/Footer.jsx
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <footer className="bg-gray-800 text-gray-300">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Company Info */}
                    <div className="col-span-1 md:col-span-2 lg:col-span-1">
                        <img src="/cs_logo.png" alt="CS Smart Finserv Logo" className="h-12 w-auto mb-4" />
                        <p className="text-gray-400">Your trusted partner for modern financial solutions, simplifying your journey to financial freedom.</p>
                        <div className="flex space-x-4 mt-6">
                            <a href="https://www.instagram.com/cs.smartfinserve?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" className="text-gray-400 hover:text-white"><FaInstagram size={20} /></a>
                            {/* <a href="#" className="text-gray-400 hover:text-white"><FaFacebook size={20} /></a>
                            <a href="#" className="text-gray-400 hover:text-white"><FaLinkedin size={20} /></a> */}
                        </div>
                    </div>
                    {/* Links */}
                    <div>
                        <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
                        <ul className="space-y-2">
                            <li><Link to="/about" className="hover:text-white">About Us</Link></li>
                            <li><Link to="/blogs" className="hover:text-white">Blogs</Link></li>
                            <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
                        </ul>
                    </div>
                    {/* Services */}
                    <div>
                        <h4 className="text-lg font-semibold text-white mb-4">Our Services</h4>
                        <ul className="space-y-2">
                            <li><Link to="/services/home-loan" className="hover:text-white">Home Loans</Link></li>
                            <li><Link to="/services/car-loan" className="hover:text-white">Car Loans</Link></li>
                            <li><Link to="/services/business-loan" className="hover:text-white">Business Loans</Link></li>
                            <li><Link to="/services/insurance" className="hover:text-white">Insurance</Link></li>
                        </ul>
                    </div>
                    {/* Legal */}
                    <div>
                        <h4 className="text-lg font-semibold text-white mb-4">Legal</h4>
                        <ul className="space-y-2">
                            <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                            <li><a href="#" className="hover:text-white">Terms of Service</a></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="bg-gray-900 py-4">
                <div className="container mx-auto text-center text-gray-500">
                    <p>&copy; {new Date().getFullYear()} CS Smart Finserv. All Rights Reserved.</p>
                </div>
            </div>
        </footer>
    );
}