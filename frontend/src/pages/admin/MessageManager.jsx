// File: src/pages/admin/MessageManager.jsx
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getContacts, deleteContact, resetAdmin } from '../../features/contacts/contactSlice';
import { Helmet } from 'react-helmet-async';
import Spinner from '../../components/shared/Spinner';
import { FaEnvelopeOpen, FaTrash, FaUser, FaPhone, FaConciergeBell, FaCalendarAlt } from 'react-icons/fa';

function MessageManager() {
  const dispatch = useDispatch();
  const { adminContacts, isLoading, isError, message } = useSelector(
    (state) => state.contact
  );

  useEffect(() => {
    dispatch(getContacts());
    return () => {
      dispatch(resetAdmin());
    };
  }, [dispatch]);

  const formatDate = (dateString) => new Date(dateString).toLocaleString();

  if (isLoading && adminContacts.length === 0) {
    return <Spinner />;
  }

  return (
    <>
      <Helmet>
        <title>Contact Messages | CS Smart Finserv Admin</title>
      </Helmet>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Contact Form Messages</h1>
        </div>

        {isError && <p className="text-red-500 bg-red-100 p-4 rounded-lg mb-6">{message}</p>}

        {adminContacts.length > 0 ? (
          <div className="space-y-6">
            {adminContacts.map((contact) => (
              <div key={contact._id} className="bg-white p-6 rounded-lg shadow-md border-l-4 border-primary">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                      <div className="flex items-center"><FaUser className="mr-2" /> <span className="font-semibold text-gray-800">{contact.name}</span></div>
                      <div className="flex items-center"><FaEnvelopeOpen className="mr-2" /> <a href={`mailto:${contact.email}`} className="text-blue-600 hover:underline">{contact.email}</a></div>
                      {contact.phone && <div className="flex items-center"><FaPhone className="mr-2" /> {contact.phone}</div>}
                    </div>
                    <p className="text-gray-700 whitespace-pre-wrap">{contact.message}</p>
                  </div>
                  <button
                    onClick={() => { if(window.confirm('Are you sure you want to delete this message?')) dispatch(deleteContact(contact._id)) }}
                    className="text-gray-400 hover:text-red-600 transition-colors"
                    title="Delete Message"
                  >
                    <FaTrash size={18} />
                  </button>
                </div>
                <div className="border-t mt-4 pt-4 flex justify-between items-center text-xs text-gray-500">
                  <div className="flex items-center font-medium"><FaConciergeBell className="mr-2 text-primary" /> Service of Interest: <span className="ml-1 font-bold text-gray-700">{contact.serviceOfInterest}</span></div>
                  <div className="flex items-center"><FaCalendarAlt className="mr-2" /> Received: {formatDate(contact.createdAt)}</div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center bg-white p-12 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-700">No Messages Found</h2>
            <p className="text-gray-500 mt-2">The inbox is currently empty.</p>
          </div>
        )}
      </div>
    </>
  );
}

export default MessageManager;