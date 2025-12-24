// // This component now has the "Card Swap" effect built-in with Framer Motion.
// import { Link } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import { FaHome, FaCar, FaBriefcase, FaUser, FaShieldAlt } from 'react-icons/fa';

// const services = [
//     { name: 'Home Loans', icon: FaHome, link: '/services/home-loan', description: 'Find the perfect loan for your dream home with competitive rates.' },
//     { name: 'Car Loans', icon: FaCar, link: '/services/car-loan', description: 'Get behind the wheel faster with our flexible car financing options.' },
//     { name: 'Business Loans', icon: FaBriefcase, link: '/services/business-loan', description: 'Fuel your business growth with our tailored loan solutions.' },
//     { name: 'Personal Loans', icon: FaUser, link: '/services/personal-loan', description: 'Flexible funds for any of life\'s planned or unplanned expenses.' },
// ];

// export default function ServicesSection() {
//     return (
//         <div className="bg-gray-50 py-20">
//             <div className="container mx-auto px-4 text-center">
//                 <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Our Services</h2>
//                 <p className="mt-4 text-lg text-gray-600">We provide a wide range of financial solutions to meet your needs.</p>
//                 <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//                     {services.map((service, index) => (
//                         <motion.div
//                             key={service.name}
//                             initial={{ opacity: 0, y: 50 }}
//                             whileInView={{ opacity: 1, y: 0 }}
//                             viewport={{ once: true }}
//                             transition={{ duration: 0.5, delay: index * 0.1 }}
//                         >
//                             <Link to={service.link} className="block group">
//                                 <motion.div
//                                     whileHover={{ y: -10 }}
//                                     className="bg-white p-8 rounded-xl shadow-lg h-full flex flex-col items-center justify-center text-center transition-shadow duration-300 group-hover:shadow-2xl"
//                                 >
//                                     <div className="bg-blue-100 text-blue-600 rounded-full p-4 mb-6 transition-colors duration-300 group-hover:bg-blue-600 group-hover:text-white">
//                                         <service.icon className="h-10 w-10" />
//                                     </div>
//                                     <h3 className="text-xl font-bold text-gray-900">{service.name}</h3>
//                                     <p className="mt-2 text-gray-500">{service.description}</p>
//                                 </motion.div>
//                             </Link>
//                         </motion.div>
//                     ))}
//                 </div>
//             </div>
//         </div>
//     );
// }



// File: src/components/home/ServicesSection.jsx
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const services = [
    {
        name: 'Home Loans',
        link: '/services/home-loan',
        description: 'Realize your dream of owning a home with our competitive and flexible loan options.',
        // Replace with a relevant illustration from unDraw, Storyset, etc.
        imageUrl: 'https://images.unsplash.com/photo-1503256575996-7cbe509190b7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjQ2fHxRdW90ZXN8ZW58MHx8MHx8fDA%3D',
    },
    {
        name: 'Car Loans',
        link: '/services/car-loan',
        description: 'Get behind the wheel faster with our quick approval process and attractive interest rates.',
        imageUrl: 'https://images.unsplash.com/photo-1503256575996-7cbe509190b7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjQ2fHxRdW90ZXN8ZW58MHx8MHx8fDA%3D',
    },
    {
        name: 'Personal Loans',
        link: '/services/personal-loan',
        description: 'Fund your dreams, from weddings to vacations, with our versatile personal loan products.',
        imageUrl: 'https://images.unsplash.com/photo-1503256575996-7cbe509190b7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjQ2fHxRdW90ZXN8ZW58MHx8MHx8fDA%3D',
    },
    {
        name: 'Insurance',
        link: '/services/insurance',
        description: 'Protect yourself and your loved ones with our comprehensive and affordable insurance plans.',
        imageUrl: 'https://images.unsplash.com/photo-1503256575996-7cbe509190b7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjQ2fHxRdW90ZXN8ZW58MHx8MHx8fDA%3D',
    },
];

export default function ServicesSection() {
    return (
         <div className="bg-brandBeige py-16 sm:py-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Our Services</h2>
                <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">
                    We provide a wide range of financial solutions to meet your needs, all through a simple digital process.
                </p>
                <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {services.map((service, index) => (
                        <motion.div
                            key={service.name}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <Link to={service.link} className="block group h-full">
                                <motion.div
                                    whileHover={{ y: -8 }}
                                    className="h-full"
                                >
                                    {/* --- THE FIX IS HERE --- */}
                                    {/* 1. The outer div acts as the border. We give it a background color and padding. */}
                                    <div className="bg-brandYellow p-1 rounded-xl h-full transition-colors duration-300 group-hover:bg-brandOrange ">
                                        {/* 2. The inner div is the white card. `h-full` makes it fill its parent. */}
                                        <div className="bg-white p-6 rounded-lg h-full flex flex-col items-center text-center shadow-md">
                                            <div className="mb-6 h-40 flex items-center justify-center">
                                                <img src={service.imageUrl} alt={`${service.name} illustration`} className="max-h-full rounded-xl" />
                                            </div>
                                            <h3 className="text-xl font-bold text-gray-900">{service.name}</h3>
                                            <p className="mt-2 text-gray-500 flex-grow">{service.description}</p>
                                            <span className="mt-6 inline-block bg-yellow-100 text-brandYellow font-semibold py-2 px-5 rounded-full transition-colors duration-300 group-hover:bg-brandOrange group-hover:text-white">
                                                More
                                            </span>
                                        </div>
                                    </div>
                                    {/* --- END OF FIX --- */}
                                </motion.div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}