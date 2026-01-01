import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { FaLock, FaUnlock, FaSearch, FaFileInvoiceDollar } from 'react-icons/fa';
import toast from 'react-hot-toast';
import Spinner from '../../components/shared/Spinner';

export default function ServiceMasterList() {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    
    const { user } = useSelector((state) => state.auth);
    const API_URL = (import.meta.env.VITE_API_URL || 'http://localhost:5001') + '/api/user-services/';

    const fetchAll = async () => {
        try {
            const config = { headers: { Authorization: `Bearer ${user.token}` } };
            const res = await axios.get(API_URL + 'all', config);
            setServices(res.data);
            setLoading(false);
        } catch (err) {
            toast.error("Failed to fetch records");
            setLoading(false);
        }
    };

    const toggleStatus = async (id, currentStatus) => {
        const action = currentStatus === 'Frozen' ? 'Unfreeze' : 'Freeze';
        if(!window.confirm(`Are you sure you want to ${action} this account?`)) return;
        
        try {
            const config = { headers: { Authorization: `Bearer ${user.token}` } };
            await axios.put(API_URL + `status/${id}`, {}, config);
            toast.success(`Account ${action}d`);
            fetchAll(); // Refresh list
        } catch (err) {
            toast.error("Failed to update status");
        }
    };

    useEffect(() => { fetchAll(); }, []);

    // Filter Logic
    const filteredServices = services.filter(item => 
        item.user?.email.toLowerCase().includes(searchTerm.toLowerCase()) || 
        item.user?.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Master Service Record</h1>
                        <p className="text-gray-600">Monitor all active loans and automation status.</p>
                    </div>
                    <div className="relative">
                        <input 
                            type="text" 
                            placeholder="Search by Email or Name..." 
                            className="pl-10 pr-4 py-2 border rounded-lg w-64 focus:ring-2 focus:ring-brand-primary outline-none"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <FaSearch className="absolute left-3 top-3 text-gray-400" />
                    </div>
                </div>

                {loading ? <Spinner /> : (
                    <div className="bg-white rounded-xl shadow-md overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="min-w-full text-left">
                                <thead className="bg-gray-100 border-b">
                                    <tr>
                                        <th className="p-4 font-semibold text-gray-700">Client</th>
                                        <th className="p-4 font-semibold text-gray-700">Service Info</th>
                                        <th className="p-4 font-semibold text-gray-700">Financials</th>
                                        <th className="p-4 font-semibold text-gray-700">Automation</th>
                                        <th className="p-4 font-semibold text-gray-700">Status</th>
                                        <th className="p-4 font-semibold text-gray-700">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y">
                                    {filteredServices.map(item => (
                                        <tr key={item._id} className="hover:bg-gray-50 transition-colors">
                                            <td className="p-4">
                                                <p className="font-bold text-gray-900">{item.user?.name}</p>
                                                <p className="text-sm text-gray-500">{item.user?.email}</p>
                                            </td>
                                            <td className="p-4">
                                                <div className="flex items-center">
                                                    <div className="p-2 bg-blue-50 text-blue-600 rounded mr-3">
                                                        <FaFileInvoiceDollar />
                                                    </div>
                                                    <div>
                                                        <p className="font-medium">{item.serviceType}</p>
                                                        <p className="text-xs text-gray-400">{item.provider}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-4">
                                                <p className="text-sm"><span className="text-gray-500">Total:</span> ₹{item.totalLoanAmount.toLocaleString()}</p>
                                                <p className="text-sm font-bold text-brand-primary">EMI: ₹{item.emiAmount.toLocaleString()}</p>
                                            </td>
                                            <td className="p-4">
                                                <p className="text-sm">Paid: <span className="text-green-600 font-bold">{item.installmentsPaid}</span> Installments</p>
                                                <p className="text-xs text-gray-500">Auto-Update: Day {item.paymentDay}</p>
                                            </td>
                                            <td className="p-4">
                                                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                                                    item.status === 'Active' ? 'bg-green-100 text-green-700' : 
                                                    item.status === 'Frozen' ? 'bg-red-100 text-red-700' : 'bg-gray-200 text-gray-600'
                                                }`}>
                                                    {item.status}
                                                </span>
                                            </td>
                                            <td className="p-4">
                                                <button 
                                                    onClick={() => toggleStatus(item._id, item.status)}
                                                    className={`p-2 rounded-lg transition-colors ${
                                                        item.status === 'Frozen' 
                                                        ? 'bg-green-100 text-green-600 hover:bg-green-200' 
                                                        : 'bg-red-100 text-red-600 hover:bg-red-200'
                                                    }`}
                                                    title={item.status === 'Frozen' ? "Unfreeze Account" : "Freeze Account"}
                                                >
                                                    {item.status === 'Frozen' ? <FaUnlock /> : <FaLock />}
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        {filteredServices.length === 0 && (
                            <div className="p-8 text-center text-gray-500">No records found matching your search.</div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}