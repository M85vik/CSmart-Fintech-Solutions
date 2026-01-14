import { Helmet } from 'react-helmet-async';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaRegNewspaper, FaRegCommentDots, FaRegAddressCard, FaBullhorn, FaCar, FaHandPaper, FaHandsHelping, FaHandHoldingUsd, FaListAlt } from 'react-icons/fa';

const adminLinks = [
  { title: "Manage Banners", description: "Update the homepage carousel slides.", link: "/admin/banners", icon: FaBullhorn, color: "bg-purple-100 text-purple-600" },
  { title: "Manage Blogs", description: "Create, edit, or delete blog posts.", link: "/admin/blogs", icon: FaRegNewspaper, color: "bg-blue-100 text-blue-600" },
  { title: "Manage Testimonials", description: "Add, update, or hide client testimonials.", link: "/admin/testimonials", icon: FaRegCommentDots, color: "bg-green-100 text-green-600" },
  { title: "View Contact Messages", description: "See all submissions from the contact form.", link: "/admin/messages", icon: FaRegAddressCard, color: "bg-yellow-100 text-yellow-600" },
  {
    title: "Manage Vehicle Catalogue",
    description: "Add or remove cars from the Auto Loan catalogue.",
    link: "/admin/vehicles",
    icon: FaCar,
    color: "bg-orange-100 text-orange-600"
  },
  { title: "Assign New Service", description: "Add a loan/insurance to a user.", link: "/admin/services/new", icon: FaHandHoldingUsd, color: "bg-green-100 text-green-600" },
  { title: "Master Service List", description: "View all user services & freeze accounts.", link: "/admin/services/all", icon: FaListAlt, color: "bg-red-100 text-red-600" },
];

export default function AdminDashboard() {
  const { user } = useSelector((state) => state.auth);

  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <>
      <Helmet>
        <title>Admin Dashboard | CS SMART FINSERV</title>
      </Helmet>

      <div className="bg-brand-bg min-h-screen">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">

          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="text-3xl font-bold text-gray-800">Welcome, {user?.name || 'Admin'}!</h1>
            <p className="text-lg text-gray-600 mt-1">Manage your website content from one central place.</p>
          </motion.div>

          <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-10">

            <motion.div
              className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {adminLinks.map((item) => (
                <motion.div key={item.title} variants={itemVariants}>
                  <Link to={item.link} className="block group">
                    <div className="bg-white border-2 border-transparent p-6 rounded-xl shadow-md hover:shadow-xl hover:-translate-y-1 hover:border-brand-primary transition-all duration-300 h-full">
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${item.color}`}>
                        <item.icon className="h-6 w-6" />
                      </div>
                      <h2 className="text-xl font-semibold text-gray-900 mt-4">{item.title}</h2>
                      <p className="text-gray-600 mt-1">{item.description}</p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              className="hidden lg:block"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.5 }}
            >
              <div className="h-full bg-cover bg-center rounded-xl shadow-lg" style={{ backgroundImage: "url('/ad.png')" }}>
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </>
  );
}