// // File: src/components/home/CompanyIntro.jsx
// import { motion } from 'framer-motion';
// import { FaLandmark, FaUsers, FaHandshake } from 'react-icons/fa';

// const stats = [
//   {
//     icon: FaLandmark,
//     title: "India's Largest Consumer Credit Marketplace",
//     description: "Verity Finance is a leading digital marketplace, offering a wide choice of financial products and ease of comparison."
//   },
//   {
//     icon: FaUsers,
//     title: "10 Lakh+ Happy Customers",
//     description: "More than a million consumers from cities across India have accessed loans and insurance through our platform."
//   },
//   {
//     icon: FaHandshake,
//     title: "65+ Partnerships",
//     description: "We work with top banks, NBFCs, and fintech lenders to offer a wide choice to consumers across all segments."
//   }
// ];

// // Reusable card component
// const StatCard = ({ icon: Icon, title, description, delay }) => {
//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 50 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       whileHover={{ y: -8 }}
//       viewport={{ once: true, amount: 0.5 }}
//       transition={{ duration: 0.5, delay, y: { type: "spring", stiffness: 100 } }}
//       className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 h-full"
//     >
//       <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
//         <Icon className="h-8 w-8 text-blue-600" />
//       </div>
//       <div className="w-8 h-1 bg-red-400 rounded-full mb-4"></div> {/* Decorative line */}
//       <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
//       <p className="text-gray-600 leading-relaxed">{description}</p>
//     </motion.div>
//   );
// };


// export default function CompanyIntro() {
//   const backgroundImageUrl = "https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=2574&auto=format=fit=crop";

//   return (
//     // We use a light blue/purple background for the entire section
//     <div className="bg-indigo-50 py-16 sm:py-20">
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
//         {/* --- THE FIX IS HERE --- */}
//         {/* Main container with relative positioning */}
//         <div className="relative">
        
//             {/* 1. The large, rounded background image container. It takes up the full width. */}
//             <div className="relative h-96 md:h-[500px] rounded-3xl overflow-hidden">
//                 <div 
//                     className="absolute inset-0 bg-cover bg-center"
//                     style={{ backgroundImage: `url(${backgroundImageUrl})` }}
//                 />
//                 <div 
//                     className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-500 opacity-80 mix-blend-multiply" 
//                 />
//             </div>
            
//             {/* 2. The grid of cards, positioned absolutely to float on top of the background image.
//                `transform` and `translate` are used to perfectly center it horizontally and vertically.
//                Negative margin `-mt-24` pulls the cards up to overlap the background. */}
//             <div className="absolute inset-0 flex items-center justify-center -mt-16 md:-mt-24">
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl px-4">
//                   {stats.map((stat, index) => (
//                     <StatCard 
//                       key={index} 
//                       icon={stat.icon} 
//                       title={stat.title}
//                       description={stat.description}
//                       delay={index * 0.1}
//                     />
//                   ))}
//                 </div>
//             </div>
//         </div>
//         {/* --- END OF FIX --- */}
//       </div>
//     </div>
//   );
// }


// File: src/components/home/CompanyIntro.jsx
import { motion } from 'framer-motion';
import { FaLandmark, FaUsers, FaHandshake } from 'react-icons/fa';

const stats = [
  {
    icon: FaLandmark,
    title: "India's Largest Consumer Credit Marketplace",
    description: "Verity Finance is a leading digital marketplace, offering a wide choice of financial products and ease of comparison."
  },
  {
    icon: FaUsers,
    title: "10 Lakh+ Happy Customers",
    description: "More than a million consumers from cities across India have accessed loans and insurance through our platform."
  },
  {
    icon: FaHandshake,
    title: "65+ Partnerships",
    description: "We work with top banks, NBFCs, and fintech lenders to offer a wide choice to consumers across all segments."
  }
];

// Reusable card component
const StatCard = ({ icon: Icon, title, description, delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8, transition: { type: "spring", stiffness: 300 } }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.5, delay }}
      className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 h-full flex flex-col"
    >
      <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mb-6 flex-shrink-0">
          <Icon className="h-8 w-8 text-blue-600" />
      </div>
      <div className="w-8 h-1 bg-red-400 rounded-full mb-4"></div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </motion.div>
  );
};


export default function CompanyIntro() {
  const backgroundImageUrl = "https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=2574&auto=format=fit=crop";

  return (
    <div className="bg-indigo-50 py-10 sm:py-20 lg:pt-24 lg:pb-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* --- THE FIX IS HERE --- */}
        {/* We use a grid container to precisely layer the background and the cards */}
        <div className="grid grid-cols-1">
        
            {/* 1. The background image container. It occupies the first (and only) row and column. */}
            <div 
              className="col-start-1 row-start-1 relative h-80 md:h-96 rounded-3xl overflow-hidden mb-20"
            >
                <div 
                    className="absolute inset-0 bg-cover bg-center "
                    style={{ backgroundImage: `url(${backgroundImageUrl})` }}
                />
                <div 
                    className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-500 opacity-80 mix-blend-multiply " 
                />
            </div>
            
            {/* 2. The grid of cards. It ALSO occupies the first row and column, placing it directly on top.
               We use flexbox to center it and padding to position it correctly. */}
            <div className="col-start-1 row-start-1 flex items-center justify-center pt-16 md:pt-0">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl px-4 z-30">
                  {stats.map((stat, index) => (
                    <StatCard 
                      key={index} 
                      icon={stat.icon} 
                      title={stat.title}
                      description={stat.description}
                      delay={index * 0.15}
                    />
                  ))}
                </div>
            </div>
        </div>
        {/* --- END OF FIX --- */}

      </div>
    </div>
  );
}