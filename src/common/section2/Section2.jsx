// components/Section2.jsx
import React from 'react';
import { motion } from 'framer-motion';

const fadeVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      ease: 'easeOut',
    },
  },
};

const Section2 = ({text,className}) => {

  return (
    <section
      className={`reveal-on-scroll max-w-full h-screen bg-cover bg-center flex  items-center justify-center ${className}`}
    style={{
        backgroundImage: `url('/assets/2.png')`,
      }}    >
      <motion.div
        className="reveal-on-scroll relative z-10 flex flex-col items-center justify-center  w-full h-full"
        variants={fadeVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.h1
          style={{ fontFamily: 'Luxerie' }}
          className="reveal-on-scroll text-white text-center text-6xl md:text-8xl leading-[0.8]"
        >
        {text}
        </motion.h1>
      </motion.div>
    </section>
  );
};

export default Section2;
