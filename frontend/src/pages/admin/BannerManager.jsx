// File: frontend8/src/pages/admin/BannerManager.jsx
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllBanners, createBanner, deleteBanner } from '../../features/banners/bannerSlice';
import { Helmet } from 'react-helmet-async';
import Spinner from '../../components/shared/Spinner';
import { FaPlus, FaTrash } from 'react-icons/fa';
import toast from 'react-hot-toast';

export default function BannerManager() {
  const dispatch = useDispatch();
  const { adminBanners, isLoading, isError, message } = useSelector((state) => state.banner);

  // --- 1. ADD 'isActive' TO THE INITIAL STATE ---
  const [formData, setFormData] = useState({ title: '', subtitle: '', buttonText: '', buttonLink: '', isActive: true });
  const [desktopImage, setDesktopImage] = useState(null);
  const [mobileImage, setMobileImage] = useState(null);
  
  const { title, subtitle, buttonText, buttonLink, isActive } = formData;

  useEffect(() => {
    if(isError) { toast.error(message); }
    dispatch(getAllBanners());
  }, [dispatch, isError, message]);

  // --- 2. UPDATE 'onChange' TO HANDLE CHECKBOXES ---
  const handleTextChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };
  
  const handleFileChange = (e) => {
    if (e.target.name === 'desktopImage') setDesktopImage(e.target.files[0]);
    if (e.target.name === 'mobileImage') setMobileImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!desktopImage || !mobileImage || !formData.title) {
        toast.error('Please fill all required fields and upload both images.');
        return;
    }
    const bannerFormData = new FormData();
    Object.keys(formData).forEach(key => bannerFormData.append(key, formData[key]));
    bannerFormData.append('desktopImage', desktopImage);
    bannerFormData.append('mobileImage', mobileImage);
    try {
        await dispatch(createBanner(bannerFormData)).unwrap();
        toast.success('New banner created successfully!');
        setFormData({ title: '', subtitle: '', buttonText: '', buttonLink: '', isActive: true });
        setDesktopImage(null);
        setMobileImage(null);
        e.target.reset();
    } catch (error) {
        console.error('Failed to create banner:', error);
    }
  };

  return (
    <>
      <Helmet><title>Banner Manager | Verity Finance Admin</title></Helmet>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8">Homepage Banner Manager</h1>
        
        <div className="bg-white p-8 rounded-lg shadow-md mb-12">
            <h2 className="text-2xl font-semibold mb-6 flex items-center"><FaPlus className="mr-3 text-brand-primary" /> Add New Banner</h2>
            <form onSubmit={handleSubmit}>
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <input name="title" value={title} onChange={handleTextChange} placeholder="Title" className="p-3 border rounded-lg" required />
                    <input name="subtitle" value={subtitle} onChange={handleTextChange} placeholder="Subtitle" className="p-3 border rounded-lg" required />
                    <input name="buttonText" value={buttonText} onChange={handleTextChange} placeholder="Button Text" className="p-3 border rounded-lg" required />
                    <input name="buttonLink" value={buttonLink} onChange={handleTextChange} placeholder="Button Link" className="p-3 border rounded-lg" required />
                </div>
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div>
                        <label className="block font-medium mb-1">Desktop Image</label>
                        <input type="file" name="desktopImage" onChange={handleFileChange} className="block w-full text-sm" required/>
                    </div>
                    <div>
                        <label className="block font-medium mb-1">Mobile Image</label>
                        <input type="file" name="mobileImage" onChange={handleFileChange} className="block w-full text-sm" required/>
                    </div>
                </div>
                
                {/* --- 3. ADD THE NEW CHECKBOX --- */}
                <div className="flex items-center mb-6">
                    <input type="checkbox" name="isActive" id="isActive" checked={isActive} onChange={handleTextChange} className="h-5 w-5 text-brand-primary focus:ring-brand-primary border-gray-300 rounded" />
                    <label htmlFor="isActive" className="ml-2 block text-sm text-gray-900">Set this banner as active on the homepage</label>
                </div>
                
                <button type="submit" disabled={isLoading} className="bg-brand-primary text-white font-bold py-3 px-6 rounded-lg hover:bg-brand-secondary transition-colors disabled:bg-gray-400">
                    {isLoading ? 'Uploading...' : 'Add Banner'}
                </button>
            </form>
        </div>
        
        <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-6">Current Banners</h2>
            <div className="space-y-4">
                {isLoading && (!adminBanners || adminBanners.length === 0) ? <Spinner /> : (
                    Array.isArray(adminBanners) && adminBanners.map(banner => (
                        <div key={banner._id} className={`flex items-center justify-between p-4 border rounded-lg transition-all ${banner.isActive ? 'border-green-500 bg-green-50' : 'border-gray-200'}`}>
                            <div className="flex items-center space-x-4">
                                <img src={banner.desktopImageUrl} alt={banner.title} className="h-16 w-32 object-cover rounded" />
                                <div>
                                    <p className="font-bold">{banner.title}</p>
                                    <p className="text-sm text-gray-500">{banner.subtitle}</p>
                                </div>
                            </div>
                            <button onClick={() => dispatch(deleteBanner(banner._id))} className="text-red-500 hover:text-red-700" title="Delete Banner"><FaTrash size={20}/></button>
                        </div>
                    ))
                )}
            </div>
        </div>
      </div>
    </>
  );
}