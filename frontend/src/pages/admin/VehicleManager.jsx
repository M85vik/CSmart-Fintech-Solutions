// File: src/pages/admin/VehicleManager.jsx
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getVehicles, createVehicle, deleteVehicle } from '../../features/vehicles/vehicleSlice';
import { Helmet } from 'react-helmet-async';
import Spinner from '../../components/shared/Spinner';
import { FaPlus, FaTrash, FaCar } from 'react-icons/fa';
import toast from 'react-hot-toast';

export default function VehicleManager() {
  const dispatch = useDispatch();
  const { vehicles, isLoading, isError, message } = useSelector((state) => state.vehicle);

  const [formData, setFormData] = useState({
    make: '', model: '', category: 'SUV', price: '', imageUrl: '',
    fuelType: 'Petrol', transmission: 'Manual', mileage: '', engine: '',
    safetyRating: 3, isFeatured: false
  });

  useEffect(() => {
    dispatch(getVehicles());
    if (isError) toast.error(message);
  }, [dispatch, isError, message]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createVehicle(formData));
    toast.success("Vehicle Added Successfully!");
    setFormData({
      make: '', model: '', category: 'SUV', price: '', imageUrl: '',
      fuelType: 'Petrol', transmission: 'Manual', mileage: '', engine: '',
      safetyRating: 3, isFeatured: false
    });
  };

  return (
    <>
      <Helmet><title>Manage Cars | CS Smart Finserv Admin</title></Helmet>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8">Vehicle Catalogue Manager</h1>

        {/* ADD FORM */}
        <div className="bg-white p-8 rounded-xl shadow-md mb-12 border-t-4 border-brand-primary">
          <h2 className="text-xl font-bold mb-6 flex items-center"><FaPlus className="mr-2" /> Add New Vehicle</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Basic Info */}
            <input name="make" placeholder="Make (e.g. Tata)" value={formData.make} onChange={handleChange} className="p-3 border rounded" required />
            <input name="model" placeholder="Model (e.g. Nexon)" value={formData.model} onChange={handleChange} className="p-3 border rounded" required />
            <select name="category" value={formData.category} onChange={handleChange} className="p-3 border rounded">
                <option>SUV</option><option>Sedan</option><option>Hatchback</option><option>EV</option><option>MUV</option><option>Luxury</option>
            </select>
            
            {/* Pricing & Image */}
            <input type="number" name="price" placeholder="Ex-Showroom Price (₹)" value={formData.price} onChange={handleChange} className="p-3 border rounded" required />
            <input name="imageUrl" placeholder="Image URL" value={formData.imageUrl} onChange={handleChange} className="p-3 border rounded md:col-span-2" required />

            {/* Specs */}
            <select name="fuelType" value={formData.fuelType} onChange={handleChange} className="p-3 border rounded">
                <option>Petrol</option><option>Diesel</option><option>Electric</option><option>Hybrid</option><option>CNG</option>
            </select>
            <select name="transmission" value={formData.transmission} onChange={handleChange} className="p-3 border rounded">
                <option>Manual</option><option>Automatic</option><option>IMT</option><option>CVT</option><option>DCT</option>
            </select>
            <input name="mileage" placeholder="Mileage (e.g. 18 kmpl)" value={formData.mileage} onChange={handleChange} className="p-3 border rounded" required />
            <input name="engine" placeholder="Engine (e.g. 1497 cc)" value={formData.engine} onChange={handleChange} className="p-3 border rounded" />
            
            <div className="flex items-center gap-2">
                <label>Safety (Stars):</label>
                <input type="number" name="safetyRating" min="0" max="5" value={formData.safetyRating} onChange={handleChange} className="p-3 border rounded w-20" />
            </div>

            <div className="flex items-center md:col-span-3">
                <input type="checkbox" name="isFeatured" checked={formData.isFeatured} onChange={handleChange} className="h-5 w-5" />
                <label className="ml-2">Mark as Featured (Shows on Hub)</label>
            </div>

            <button type="submit" className="md:col-span-3 bg-brand-primary text-white font-bold py-3 rounded hover:bg-brand-secondary">
                Add Vehicle to Catalogue
            </button>
          </form>
        </div>

        {/* LIST */}
        <div className="bg-white p-8 rounded-xl shadow-md">
            <h2 className="text-xl font-bold mb-6">Current Inventory ({vehicles.length})</h2>
            {isLoading ? <Spinner /> : (
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-100"><th className="p-3">Image</th><th className="p-3">Name</th><th className="p-3">Price</th><th className="p-3">Category</th><th className="p-3">Action</th></tr>
                        </thead>
                        <tbody>
                            {vehicles.map(car => (
                                <tr key={car._id} className="border-b hover:bg-gray-50">
                                    <td className="p-3"><img src={car.imageUrl} alt="" className="h-12 w-20 object-cover rounded" /></td>
                                    <td className="p-3 font-bold">{car.make} {car.model}</td>
                                    <td className="p-3">₹{(car.price/100000).toFixed(2)} L</td>
                                    <td className="p-3"><span className="bg-gray-200 px-2 py-1 rounded text-xs">{car.category}</span></td>
                                    <td className="p-3">
                                        <button onClick={() => dispatch(deleteVehicle(car._id))} className="text-red-500 hover:text-red-700"><FaTrash /></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
      </div>
    </>
  );
}