// components/Section3.jsx
'use client';
import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const fadeVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.2,
      ease: 'easeOut',
    },
  },
};

const Section3 = () => {
  return (
    <section
      className="relative w-full min-h-[700px] px-6 md:px-20 py-20 font-['Lexend']"
      style={{
        backgroundImage: `url('/assets/formbg.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="max-w-7xl mx-auto flex flex-col gap-10 justify-between">
        {/* Main Flex Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Left Block */}
          <div className="flex flex-col gap-6">
            <motion.h2
              variants={fadeVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-5xl md:text-6xl xl:text-7xl font-medium leading-tight"
              style={{ fontFamily: 'Luxerie' }}
            >
              <span className="block">DRIVEN BY DETAIL,</span>
              <span className="block">DEFINED BY</span>
              <span className="block">INTEGRITY</span>
            </motion.h2>

            <motion.div
              variants={fadeVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="mt-2"
            >
              <div className="text-xl font-medium" style={{ fontFamily: 'Luxerie' }}>
                YOUSUF KAMDAR
              </div>
              <div className="text-sm font-light">Chairman of Kamdar Developments</div>
            </motion.div>

            <motion.button
              variants={fadeVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="mt-4 w-fit px-6 py-2 bg-black text-white rounded-md shadow hover:bg-gray-900 transition"
            >
              Get in Touch
            </motion.button>
          </div>

          {/* Right Quote */}
          <motion.div
            variants={fadeVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex items-start text-right"
          >
            <p className="text-base md:text-lg font-light leading-relaxed max-w-md">
              “We founded Kamdar with a simple belief; that real estate should stand the test of time, both in design and in trust. Every home we build is a reflection of that legacy”
            </p>
          </motion.div>
        </div>

        {/* Bottom Stats */}
        <motion.div
          variants={fadeVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-wrap gap-10 md:gap-20 mt-10"
        >
          <div>
            <h3 className="text-5xl font-semibold">40+</h3>
            <p className="text-base font-light mt-1">Years of Experience</p>
          </div>
          <div>
            <h3 className="text-5xl font-semibold">500+</h3>
            <p className="text-base font-light mt-1">Properties</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Section3;
