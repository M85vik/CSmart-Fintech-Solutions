// // // File: src/components/about/TeamCollage.jsx
// // import { motion } from 'framer-motion';

// // const images = [
// //   '/e1.jpg',
// //   '/e2.jpg',
// //   '/e1.jpg',
// //   '/e2.jpg',
// //   '/e2.jpg',
// // ];

// // // --- VARIANTS FOR STAGGERED ANIMATION ---

// // // 1. Parent container variant: Controls the staggering of children
// // const gridContainerVariants = {
// //     hidden: { opacity: 0 },
// //     show: {
// //         opacity: 1,
// //         transition: {
// //             staggerChildren: 0.1, // Time delay between each child animating in
// //         },
// //     },
// // };

// // // 2. Child item variant: Defines how each grid item animates
// // const gridItemVariants = {
// //     hidden: { opacity: 0, scale: 0.8, y: 20 },
// //     show: { opacity: 1, scale: 1, y: 0, transition: { duration: 1} },
// // };


// // export default function TeamCollage() {
// //   return (
// //     <div className="bg-blue-50 py-16 sm:py-20">
// //       <div className="container mx-auto px-4 sm:px-6 lg:px-8">
// //         <div className="text-center mb-12">
// //             <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
// //               Our Passionate Team
// //             </h2>
// //             <p className="mt-4 text-lg text-gray-600">
// //               The people behind our success, dedicated to yours.
// //             </p>
// //         </div>

// //         {/* --- APPLY THE PARENT VARIANT HERE --- */}
// //         <motion.div 
// //           className="grid grid-cols-4 grid-rows-2 gap-4 h-[500px]"
// //           variants={gridContainerVariants}
// //           initial="hidden"
// //           whileInView="show"
// //           viewport={{ once: true, amount: 0.3 }}
// //         >
// //             <GridItem image={images[0]} position="col-span-2 row-span-2" />
// //             <GridItem image={images[1]} position="col-span-1 row-span-1" />
// //             <GridItem image={images[2]} position="col-span-1 row-span-1" />
// //             <GridItem image={images[3]} position="col-span-1 row-span-1" />
// //             <GridItem image={images[4]} position="col-span-1 row-span-1" />
// //         </motion.div>
// //       </div>
// //     </div>
// //   );
// // }

// // // A reusable grid item component with the hover animation
// // const GridItem = ({ image, position }) => {
// //   return (
// //     // --- APPLY THE CHILD VARIANT HERE ---
// //     <motion.div 
// //       className={`relative rounded-xl overflow-hidden ${position}`}
// //       variants={gridItemVariants}
// //     >
// //       <motion.div 
// //         className="absolute inset-0 bg-cover bg-center" 
// //         style={{ backgroundImage: `url(${image})` }}
// //         whileHover={{ scale: 1.1, transition: { duration: 0.8, ease: 'easeOut' } }} // Made hover faster
// //       />
// //     </motion.div>
// //   );
// // }


// // File: src/components/about/TeamCollage.jsx
// import { motion } from 'framer-motion';

// const images = [
//   '/e1.jpg',
//   '/e2.jpg',
//   '/e1.jpg',
//   '/e2.jpg',
//   '/e2.jpg',
// ];

// export default function TeamCollage() {
//   // We will control the staggering directly on the parent.
//   const containerVariants = {
//     hidden: {},
//     visible: {
//       transition: {
//         staggerChildren: 0.1, // A slightly shorter delay can feel snappier
//       },
//     },
//   };

//   return (
//     <div className="bg-blue-50 py-16 sm:py-20">
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="text-center mb-12">
//             <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
//               Our Passionate Team
//             </h2>
//             <p className="mt-4 text-lg text-gray-600">
//               The people behind our success, dedicated to yours.
//             </p>
//         </div>

//         {/* --- APPLY THE PARENT VARIANT HERE --- */}
//         <motion.div 
//           className="grid grid-cols-4 grid-rows-2 gap-4 h-[500px]"
//           variants={containerVariants}
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true, amount: 0.3 }}
//         >
//             <GridItem image={images[0]} position="col-span-2 row-span-2" />
//             <GridItem image={images[1]} position="col-span-1 row-span-1" />
//             <GridItem image={images[2]} position="col-span-1 row-span-1" />
//             <GridItem image={images[3]} position="col-span-1 row-span-1" />
//             <GridItem image={images[4]} position="col-span-1 row-span-1" />
//         </motion.div>
//       </div>
//     </div>
//   );
// }

// // A reusable grid item component with a more performant animation
// const GridItem = ({ image, position }) => {
//   // --- THE FIX IS HERE: Simplified variants with a spring transition ---
//   const itemVariants = {
//     hidden: { opacity: 0, scale: 0.9 },
//     visible: { 
//         opacity: 1, 
//         scale: 1,
//         transition: {
//             type: "spring", // Use a spring for a more natural feel
//             stiffness: 150,
//             damping: 15,
//         }
//     },
//   };

//   return (
//     <motion.div 
//       className={`relative rounded-xl overflow-hidden ${position}`}
//       variants={itemVariants}
//     >
//       <motion.div 
//         className="absolute inset-0 bg-cover bg-center" 
//         style={{ backgroundImage: `url(${image})` }}
//         // Use a faster, simpler transition for hover
//         whileHover={{ scale: 1.1 }}
//         transition={{ duration: 0.3, ease: 'easeOut' }}
//       />
//     </motion.div>
//   );
// }


// File: src/components/about/TeamCollage.jsx
import { motion } from 'framer-motion';

const images = [
  '/e1.jpg',
  '/e2.jpg',
  '/e1.jpg',
  '/e2.jpg',
  '/e2.jpg',
  '/e1.jpg', // Added a 6th image for a more balanced layout
];

export default function TeamCollage() {
  return (
    <div className="bg-blue-50 py-16 sm:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Our Passionate Team
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              The people behind our success, dedicated to yours. We are a blend of creative thinkers, technical wizards, and financial experts.
            </p>
        </div>

        {/* --- NEW GRID LAYOUT --- */}
        {/* Using a 3x3 grid layout for a more balanced and interesting collage */}
        <div className="grid grid-cols-3 grid-rows-3 gap-4 h-[600px] max-w-4xl mx-auto">
            <GridItem image={images[0]} position="col-span-2 row-span-2 rounded-2xl" />
            <GridItem image={images[1]} position="col-span-1 row-span-1 rounded-2xl" />
            <GridItem image={images[2]} position="col-span-1 row-span-1 rounded-2xl" />
            <GridItem image={images[3]} position="col-span-1 row-span-2 rounded-2xl" />
            <GridItem image={images[4]} position="col-span-1 row-span-1 rounded-2xl" />
            <GridItem image={images[5]} position="col-span-1 row-span-1 rounded-2xl" />
        </div>

      </div>
    </div>
  );
}

// A reusable grid item component with only hover animation
const GridItem = ({ image, position }) => {
  return (
    <motion.div 
      className={`relative overflow-hidden ${position}`}
      // Simple fade-in effect when it enters the view
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div 
        className="absolute inset-0 bg-cover bg-center" 
        style={{ backgroundImage: `url(${image})` }}
        whileHover={{ scale: 1.05 }} // Subtle zoom effect
        transition={{ duration: 0.3, ease: 'easeOut' }}
      >
        {/* Optional overlay that appears on hover, you can add text here */}
        <motion.div 
            className="absolute inset-0 bg-black"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 0.2 }}
        />
      </motion.div>
    </motion.div>
  );
}