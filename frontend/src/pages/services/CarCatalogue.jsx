// File: src/pages/services/CarCatalogue.jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FaFilter, FaGasPump, FaCogs, FaSearch } from 'react-icons/fa';
import Spinner from '../../components/shared/Spinner';

export default function CarCatalogue() {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch data from your new Backend API
  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        // Use the environment variable for the API URL
        const response = await axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:5001'}/api/vehicles`);
        setVehicles(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching vehicles:", error);
        setLoading(false);
      }
    };
    fetchVehicles();
  }, []);

  // Filtering Logic
  const categories = ['All', 'SUV', 'Sedan', 'Hatchback', 'EV', 'Luxury', 'MUV'];
  
  const filteredVehicles = vehicles.filter(vehicle => {
    const matchesCategory = filter === 'All' || vehicle.category === filter;
    const matchesSearch = vehicle.model.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          vehicle.make.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      <Helmet>
        <title>Explore Dream Cars | CS Smart Finserv</title>
        <meta name="description" content="Browse the latest cars, check on-road prices, and calculate your loan EMI instantly." />
      </Helmet>

      <div className="bg-gray-50 min-h-screen py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-extrabold text-gray-900">Find Your Dream Ride</h1>
            <p className="mt-4 text-lg text-gray-600">Compare specs, check prices, and get instant loan approval.</p>
          </div>

          {/* Search & Filters */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4 bg-white p-4 rounded-xl shadow-sm">
            
            {/* Category Tabs */}
            <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 w-full justify-start md:justify-center scrollbar-hide px-1">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`flex-shrink-0 whitespace-nowrap px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                    filter === cat 
                      ? 'bg-brand-primary text-white shadow-md' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search Bar */}
            <div className="relative w-full md:w-64">
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search (e.g. Swift, Thar)" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary"
              />
            </div>
          </div>

          {/* Vehicle Grid */}
          {loading ? (
            <Spinner />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredVehicles.length > 0 ? (
                filteredVehicles.map((car) => (
                  <CarCard key={car._id} car={car} />
                ))
              ) : (
                <div className="col-span-full text-center py-20">
                  <p className="text-gray-500 text-lg">No cars found matching your criteria.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

// Reusable Car Card Component
function CarCard({ car }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -8 }}
      className="bg-white rounded-2xl shadow-lg overflow-hidden group border border-gray-100"
    >
      <div className="relative h-56 overflow-hidden">
        <img 
          src={car.imageUrl} 
          alt={`${car.make} ${car.model}`} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-gray-800">
          {car.category}
        </div>
      </div>

      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="text-xl font-bold text-gray-900">{car.make} {car.model}</h3>
            <p className="text-sm text-gray-500">Ex-showroom</p>
          </div>
          <p className="text-lg font-extrabold text-brand-primary">
            ₹{(car.price / 100000).toFixed(2)} Lakh
          </p>
        </div>

        <div className="flex items-center space-x-4 my-4 text-sm text-gray-600">
          <div className="flex items-center"><FaGasPump className="mr-1 text-gray-400" /> {car.fuelType}</div>
          <div className="flex items-center"><FaCogs className="mr-1 text-gray-400" /> {car.transmission}</div>
        </div>

        <Link 
          to={`/services/auto-loan/vehicle/${car._id}`} 
          className="block w-full text-center bg-gray-900 text-white font-bold py-3 rounded-lg hover:bg-brand-primary transition-colors"
        >
          View EMI Offers
        </Link>
      </div>
    </motion.div>
  );
}