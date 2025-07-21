// components/Section1.jsx
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const fadeVariants = {
  hidden: { opacity: 0, y:20 },
  visible: {
      y: 0,
    opacity: 1,
    transition: {
      duration: 3,
      ease: 'easeOut',
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.5,
      ease: 'easeIn',
    },
  },
};

const Section1 = ({ text, backgroundImage, mobileBackgroundImage, className, description }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const bgImg = isMobile && mobileBackgroundImage ? mobileBackgroundImage : backgroundImage;

  return (
    <motion.section
      className={`reveal-on-scroll max-w-full h-screen bg-cover bg-center flex items-center justify-center ${className}`}
      style={{ backgroundImage: `url(${bgImg})` }}
      variants={fadeVariants}
      initial="hidden"
      animate="visible"
      exit="exit" 
    >
      <div className={`relative z-0 flex flex-col items-center justify-center w-full h-screen ${className && className.includes('thank-you-heading') ? 'px-8' : ''}`}>
        <div className={`w-full max-w-7xl mx-auto ${className && className.includes('thank-you-heading') ? 'grid grid-cols-1 md:grid-cols-2 gap-12 items-center' : 'text-center'}`}>
          <motion.div
            variants={fadeVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <h1
              style={{ fontFamily: 'Luxerie' }}
              className={`reveal-on-scroll text-white text-6xl md:text-6xl ${
                className && className.includes('thank-you-heading') ? '!text-left' : 'text-center'
              }`}
            >
              {text}
            </h1>
          </motion.div>
          
          {description && (
            <motion.div
              className="text-white text-lg md:text-xl font-light pl-44 text-right leading-relaxed"
              variants={fadeVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ delay: 0.3 }}
            >
              {description}
            </motion.div>
          )}
        </div>
      </div>

    </motion.section>
  );
};

export default Section1;
