// components/Section1.jsx
import React from 'react';
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

const Section1 = ({text,backgroundImage}) => {
  return (
    <motion.section
      className="reveal-on-scroll max-w-full h-screen bg-cover -mt-10 bg-center flex items-center justify-center"
      style={{
     backgroundImage: `url(${backgroundImage})` }}
      variants={fadeVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <div className="relative z-10 flex flex-col items-center justify-center w-full h-full">
        <motion.h1
          style={{ fontFamily: 'Luxerie' }}
          className="reveal-on-scroll text-white text-center text-4xl md:text-7xl leading-[0.8]"
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

export default Section1;
