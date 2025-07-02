// components/Section1.jsx
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const fadeVariants = {
  hidden: { opacity: 0, y: 20 },
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

const Section1Video = ({ text, backgroundImage, mobileBackgroundImage, className }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const bgVideo = isMobile && mobileBackgroundImage ? mobileBackgroundImage : backgroundImage;

  return (
    <motion.section
      className={`reveal-on-scroll max-w-full h-screen bg-cover  bg-center flex items-center justify-center ${className}`}
      variants={fadeVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {/* Background Video */}
      <video
        src={bgVideo}
        autoPlay
        loop
        muted
        preload='auto'
        playsInline
        className="absolute top-0 left-0 w-full h-screen object-cover z-0"
      />

      <div className="relative z-0 flex flex-col items-center justify-center w-full h-full">
        <motion.h1
          style={{ fontFamily: 'Luxerie' }}
          className="reveal-on-scroll text-white text-center text-6xl md:text-7xl md:leading-[0.8]"
          variants={fadeVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {text}
        </motion.h1>
      </div>
    </motion.section>
  );
};

export default Section1Video;
