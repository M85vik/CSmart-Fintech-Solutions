// File: src/components/home/AlternatingFeature.jsx
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaArrowCircleRight } from 'react-icons/fa';

export default function AlternatingFeature({ title, subtitle, features, imageUrl, link, imageSide = 'left', bgColor }) {
  const imageVariants = {
    hidden: { opacity: 0, x: imageSide === 'left' ? -50 : 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.9, ease:'easeIn' }
    }
  };

  const textVariants = {
    hidden: { opacity: 0, x: imageSide === 'left' ? 50 : -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.7, ease: 'easeOut' }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.1, duration: 0.5 }
    })
  };

  return (
    <div className={`py-16 sm:py-20 overflow-hidden ${bgColor}  `}>
      <div className={`container mx-auto px-4 sm:px-6 lg:px-8 `}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Image Column */}
          <motion.div
            className={`w-full ${imageSide === 'right' ? 'md:order-last' : ''}`}
            variants={imageVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <img src={imageUrl} alt={title} className="rounded-lg object-contain w-full h-auto max-h-[400px]" />
          </motion.div>

          {/* Text Column */}
          <motion.div
            variants={textVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl ">{title}</h2>
            <p className="mt-4 text-lg text-gray-600">{subtitle}</p>
            <ul className="mt-8 space-y-4">
              {features.map((feature, i) => (
                <motion.li key={i} className="flex items-center" custom={i} variants={itemVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                  <FaArrowCircleRight className="h-6 w-6 text-brandOrange mr-4 flex-shrink-0" />
                  <span className="text-gray-700">{feature}</span>
                </motion.li>
              ))}
            </ul>
            <div className="mt-10">
              <Link to={link} className="inline-block bg-brandOrange text-white font-bold py-3 px-8 rounded-lg text-base hover:bg-brandYellow transition-colors shadow-lg hover:shadow-xl">
                Know More
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}