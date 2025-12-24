// // File: src/components/home/StatsSection.jsx
// import { motion, useInView, useAnimation } from 'framer-motion';
// import { useEffect, useRef } from 'react';

// // A reusable component for each animated statistic
// function AnimatedStat({ from, to, label, suffix = '' }) {
//   const ref = useRef(null);
//   const isInView = useInView(ref, { once: true, amount: 0.5 });
//   const controls = useAnimation();

//   useEffect(() => {
//     if (isInView) {
//       controls.start({
//         // The 'to' value will be the final number displayed
//         scale: [1, 1.1, 1],
//         transition: { duration: 0.5 },
//       });
//     }
//   }, [isInView, controls]);

//   return (
//     <div ref={ref} className="text-center">
//       <motion.h3
//         className="text-4xl sm:text-5xl font-extrabold"
//         style={{
//           background: 'linear-gradient(90deg, #EF4444, #F97316)',
//           WebkitBackgroundClip: 'text',
//           WebkitTextFillColor: 'transparent',
//         }}
//         animate={controls}
//       >
//         {/* We can use a custom prop to animate the number, but Framer Motion's `useAnimate`
//            or `motionValue` is better for complex counting. For simplicity and reliability,
//            we'll animate the scale and show the final number. A counting animation library
//            could be added later if desired. Let's start with a solid visual effect. */}
//         {to}{suffix}
//       </motion.h3>
//       <p className="mt-2 text-base text-gray-600 font-medium">{label}</p>
//     </div>
//   );
// }

// export default function StatsSection() {
//   const stats = [
//     { from: 0, to: '10 L', suffix: '+', label: 'Happy Customers' },
//     { from: 0, to: 25, suffix: ' K+', label: 'Loans Disbursed' },
//     { from: 0, to: 98, suffix: '%', label: 'Customer Satisfaction' },
//     { from: 0, to: 5, suffix: '+', label: 'Years in Business' },
//   ];

//   return (
//     <div className="bg-blue-50 py-16 sm:py-20">
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//         <motion.div 
//             initial={{ opacity: 0 }}
//             whileInView={{ opacity: 1 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.5 }}
//             className="text-center"
//         >
//           <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
//             Trusted by Thousands of Users
//           </h2>
//           <p className="mt-4 text-lg text-gray-600">
//             We are committed to helping our clients achieve their financial dreams.
//           </p>
//         </motion.div>
//         <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
//           {stats.map((stat, index) => (
//             <AnimatedStat key={index} {...stat} />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }


// File: src/components/home/StatsSection.jsx
import { useInView } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import CountUp from 'react-countup'; // <-- IMPORT THE NEW LIBRARY

// A reusable component for each animated statistic with a counting effect
function AnimatedStat({ to, label, prefix = '', suffix = '' }) {
  const ref = useRef(null);
  // useInView will trigger the animation when the element is visible
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true);
    }
  }, [isInView, hasAnimated]);

  return (
    <div ref={ref} className="text-center">
      <h3
        className="text-4xl sm:text-5xl font-extrabold"
        style={{
          background: 'linear-gradient(90deg, #EF4444, #F97316)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        {/* The CountUp component handles the animation */}
        {hasAnimated && (
          <CountUp
            start={0}
            end={to}
            duration={2.5}
            separator=","
            prefix={prefix}
            suffix={suffix}
          />
        )}
        {!hasAnimated && '0'} {/* Show '0' before the animation starts */}
      </h3>
      <p className="mt-2 text-base text-gray-600 font-medium">{label}</p>
    </div>
  );
}

export default function StatsSection() {
  // Use numbers for the 'to' value for the counter
  const stats = [
    { to: 10, suffix: ' L+', label: 'Happy Customers' },
    { to: 25, suffix: ' K+', label: 'Loans Disbursed' },
    { to: 98, suffix: '%', label: 'Customer Satisfaction' },
    { to: 5, suffix: '+', label: 'Years in Business' },
  ];

  return (
    <div className="bg-white py-16 sm:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Trusted by Thousands of Users
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            We are committed to helping our clients achieve their financial dreams.
          </p>
        </div>
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <AnimatedStat key={index} {...stat} />
          ))}
        </div>
      </div>
    </div>
  );
}