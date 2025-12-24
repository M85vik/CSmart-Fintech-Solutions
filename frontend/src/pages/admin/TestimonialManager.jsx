// File: src/pages/admin/TestimonialManager.jsx
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  getAllTestimonials,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
  reset,
} from '../../features/testimonials/testimonialSlice';
import { Helmet } from 'react-helmet-async';
import Spinner from '../../components/shared/Spinner';
import { FaPlus, FaTrash, FaEdit, FaSave } from 'react-icons/fa';

export default function TestimonialManager() {
  const dispatch = useDispatch();
  const { adminTestimonials, isLoading, isError, message } = useSelector((state) => state.testimonials);

  const initialFormState = { id: null, name: '', quote: '', company: '', imageUrl: '', isActive: true };
  const [formData, setFormData] = useState(initialFormState);
  const [isEditing, setIsEditing] = useState(false);

  const { name, quote, company, imageUrl, isActive } = formData;

  useEffect(() => {
    dispatch(getAllTestimonials());
  }, [dispatch]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleEditClick = (testimonial) => {
    setIsEditing(true);
    setFormData({
      id: testimonial._id,
      name: testimonial.name,
      quote: testimonial.quote,
      company: testimonial.company || '',
      imageUrl: testimonial.imageUrl || '',
      isActive: testimonial.isActive,
    });
    window.scrollTo(0, 0);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setFormData(initialFormS-tate);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !quote) {
      alert('Name and Quote fields are required.');
      return;
    }

    const testimonialData = { name, quote, company, imageUrl, isActive };

    if (isEditing) {
      dispatch(updateTestimonial({ id: formData.id, testimonialData }));
    } else {
      dispatch(createTestimonial(testimonialData));
    }
    handleCancelEdit();
  };

  // More robust loading check
  if (isLoading && (!adminTestimonials || adminTestimonials.length === 0)) {
    return <Spinner />;
  }

  return (
    <>
      <Helmet><title>Testimonial Manager | Verity Finance Admin</title></Helmet>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold mb-8">Testimonial Manager</h1>
        {/* --- ADD/EDIT FORM SECTION --- */}
        <div className="bg-white p-8 rounded-lg shadow-md mb-12">
          <h2 className="text-2xl font-semibold mb-6 flex items-center">
            {isEditing ? <FaEdit className="mr-3 text-primary" /> : <FaPlus className="mr-3 text-primary" />}
            {isEditing ? 'Edit Testimonial' : 'Add New Testimonial'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input type="text" name="name" value={name} onChange={handleInputChange} placeholder="Client Name" className="w-full p-3 border border-gray-300 rounded-lg" required />
              <input type="text" name="company" value={company} onChange={handleInputChange} placeholder="Company / Role (Optional)" className="w-full p-3 border border-gray-300 rounded-lg" />
            </div>
            <div>
              <input type="text" name="imageUrl" value={imageUrl} onChange={handleInputChange} placeholder="Image URL (Optional)" className="w-full p-3 border border-gray-300 rounded-lg" />
            </div>
            <textarea name="quote" value={quote} onChange={handleInputChange} placeholder="Client Quote" rows="4" className="w-full p-3 border border-gray-300 rounded-lg" required></textarea>
            <div className="flex items-center">
              <input type="checkbox" name="isActive" id="isActive" checked={isActive} onChange={handleInputChange} className="h-5 w-5 text-primary focus:ring-primary border-gray-300 rounded" />
              <label htmlFor="isActive" className="ml-2 block text-sm text-gray-900">Show this testimonial on the public site</label>
            </div>
            <div className="flex space-x-4">
              <button type="submit" className="bg-primary text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors flex items-center">
                {isEditing ? <FaSave className="mr-2" /> : <FaPlus className="mr-2" />}
                {isEditing ? 'Save Changes' : 'Add Testimonial'}
              </button>
              {isEditing && (
                <button type="button" onClick={handleCancelEdit} className="bg-gray-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-gray-600">Cancel</button>
              )}
            </div>
          </form>
        </div>

        {/* --- EXISTING TESTIMONIALS TABLE (THIS WAS MISSING) --- */}
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-6">Existing Testimonials</h2>
          {isError && <p className="text-red-500 bg-red-100 p-3 rounded-md">{message}</p>}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quote</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {adminTestimonials && adminTestimonials.map((testimonial) => (
                  <tr key={testimonial._id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{testimonial.name}</td>
                    <td className="px-6 py-4 max-w-sm text-sm text-gray-500 truncate" title={testimonial.quote}>{testimonial.quote}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${testimonial.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {testimonial.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-4">
                      <button onClick={() => handleEditClick(testimonial)} className="text-indigo-600 hover:text-indigo-900" title="Edit"><FaEdit size={18} /></button>
                      <button onClick={() => dispatch(deleteTestimonial(testimonial._id))} className="text-red-600 hover:text-red-900" title="Delete"><FaTrash size={18} /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}