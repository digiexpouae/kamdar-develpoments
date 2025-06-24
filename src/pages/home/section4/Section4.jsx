// components/Section4.jsx
import React from 'react';
import { motion } from 'framer-motion';
import Bg from '../../../../public/assets/3.jpg';

const Section4 = () => {
  return (
    <section
      className="relative w-full h-screen bg-cover bg-center"
      style={{
        backgroundImage: `url('/assets/3.jpg')`,
      }}
    >
      {/* Desktop View */}
      <div className="hidden md:flex relative z-10 flex-col items-start justify-start h-full pl-44 pt-24">
        <div className="absolute top-0 left-40 z-10 flex flex-col items-start p-8 md:p-12">
          <h1 className="reveal-on-scroll text-white text-3xl md:text-7xl pt-10 font-light leading-tight mb-6" style={{ fontFamily: 'Luxerie, sans-serif' }}>
            SOPHISTICATED LIVING IN<br />
            THE HEART OF JVC
          </h1>
          <button className="reveal-on-scroll bg-white text-black px-6 py-2 rounded shadow font-medium hover:bg-gray-200 transition">
            Explore More
          </button>
        </div>
      </div>

      {/* Mobile View */}
      <div className="flex md:hidden relative z-10 flex-col items-center justify-center h-full px-4 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-white font-light -mt-68 mb-10"
          style={{
            fontFamily: 'Luxerie, sans-serif',
            fontSize: '2.5rem',
            lineHeight: 1.1,
            letterSpacing: '0.01px',
            textShadow: '0 2px 16px rgba(0,0,0,0.18)',
          }}
        >
          SOPHISTICATED LIVING IN<br />
          THE HEART OF JVC
        </motion.h1>
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-white text-black rounded-md px-6 py-2 font-bold font-lexend shadow hover:bg-gray-200 transition"
        >
          Explore More
        </motion.button>
      </div>
    </section>
  );
};

export default Section4;
