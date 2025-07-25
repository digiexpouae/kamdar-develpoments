'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const features = [
  { icon: '/assets/inn.png', label: 'Innovative designs' },
  { icon: '/assets/unmstched.png', label: 'Unmatched expertise' },
  { icon: '/assets/community.png', label: 'Community focus' },
  { icon: '/assets/sup.png', label: 'Superior quality' },
  { icon: '/assets/sus.png', label: 'Sustainable practices' },
  { icon: '/assets/customer.png', label: 'Customer-centric approach' },
];

// Animation variants
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
      ease: 'easeOut',
    },
  }),
};

const Choose = () => {
  return (
    <section
      className="relative w-full py-16 bg-cover bg-center"
      style={{ backgroundImage: "url('/assets/choose_bg.jpg')" }}
    >
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">

        {/* Desktop View */}
        <div className="md:block hidden">
          {/* Heading + Button */}
          <div className="mb-16 grid grid-cols-2 items-center">
            <motion.h2
              className="text-4xl md:text-7xl font-semibold text-black text-left"
              style={{ fontFamily: 'Luxerie, sans-serif' }}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              WHY CHOOSE US
            </motion.h2>

        
          </div>

          {/* Features */}
          <div className="grid grid-cols-3 gap-10">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="flex items-center gap-4 p-2"
                custom={index + 1}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 200 }}
              >
                <div className="w-14 h-14 relative">
                  <Image
                    src={feature.icon}
                    alt={feature.label}
                    layout="fill"
                    objectFit="contain"
                  />
                </div>
                <p className="text-base font-medium text-black">
                  {feature.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile View */}
        <div className="block md:hidden text-center">
          {/* Animated Heading */}
          <motion.h2
            className="text-4xl font-semibold text-black mb-6"
            style={{ fontFamily: 'Luxerie, sans-serif' }}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            WHY CHOOSE US
          </motion.h2>

      

          {/* Icon Grid */}
          <div className="grid grid-cols-2 gap-x-4 gap-y-6 px-4">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="flex flex-col items-center text-center gap-2 min-h-[100px]"
                custom={index + 1}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <div className="w-10 h-10 relative">
                  <Image
                    src={feature.icon}
                    alt={feature.label}
                    layout="fill"
                    objectFit="contain"
                  />
                </div>
                <p className="text-sm font-medium text-black">{feature.label}</p>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default Choose;
