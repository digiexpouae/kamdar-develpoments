import React from 'react';
import { motion } from 'framer-motion';

const fadeVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 1,
      ease: 'easeOut',
    },
  },
};

const Section5 = ({text}) => {
  return (
    <section
      className="reveal-on-scroll relative w-full h-[110vh] bg-cover bg-center"
      style={{
        backgroundImage: `url('/assets/4.png')`,
      }}
    >
      {/* Desktop View */}
      <motion.div
        className="reveal-on-scroll hidden md:flex relative z-10 flex-col items-start justify-start h-full pl-44 pt-24"
        variants={fadeVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <h1
          className="reveal-on-scroll text-white -mt-10 font-light mb-10"
          style={{
            fontFamily: 'Luxerie, sans-serif',
            fontSize: '5rem',
            lineHeight: 0.8,
            letterSpacing: '0.01px',
            textShadow: '0 2px 16px rgba(0,0,0,0.18)',
          }}
        >
          {text}
        </h1>
        <button
          className="reveal-on-scroll bg-white text-black rounded-md px-6 py-2 font-bold font-lexend shadow hover:bg-gray-200 transition"
        >
          Explore More
        </button>
      </motion.div>

      {/* Mobile View */}
      <motion.div
        className="reveal-on-scroll flex md:hidden relative z-10 flex-col items-center justify-center h-full px-4 pt-24 text-center"
        variants={fadeVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <h1
          className="reveal-on-scroll text-white font-light -mt-68 mb-10"
          style={{
            fontFamily: 'Luxerie, sans-serif',
            fontSize: '2.5rem',
            lineHeight: 1.1,
            letterSpacing: '0.01px',
            textShadow: '0 2px 16px rgba(0,0,0,0.18)',
          }}
        >
          CRAFTED FOR THE FEW WHO EXPECT MORE
        </h1>
        <button className="reveal-on-scroll bg-white text-black rounded-md px-6 py-2 font-bold font-lexend shadow hover:bg-gray-200 transition">
          Explore More
        </button>
      </motion.div>
    </section>
  );
};

export default Section5;
