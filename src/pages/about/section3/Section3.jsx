'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, useInView } from 'framer-motion';

const content = [
    {
      title: 'DESIGN & INNOVATION',
      description:
        'At Kamdar Developments, Design & Innovation are at the forefront of our services. We embrace cutting-edge design principles and creative solutions to craft spaces that inspire and engage.',
      image: '/assets/pPodium-2.webp',
    },
    {
      title: 'ARCHITECTURE & ENGINEERING',
      description:
        'We combine modern architectural techniques with engineering precision to deliver structurally sound and visually striking developments.',
      image:  '/assets/pExternal-3---105-Residences-by-Kamdar.webp',
    },
    {
      title: 'SUSTAINABLE DEVELOPMENT',
      description:
        'Kamdar integrates eco-friendly practices to create sustainable living spaces that reduce environmental impact and promote well-being.',
      image:  '/assets/p01_2-copy.webp',
    },
    {
      title: 'URBAN PLANNING',
      description:
        'From infrastructure to green spaces, our urban planning team designs cohesive communities with long-term vision and value.',
      image: '/assets/pbeautiful-black-white-upshot-new-york-city-subway-s-wtc-cortlandt-station-k-oculus.webp',
    },
  ];
const Section3 = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const headingRef = useRef(null);
  const headingInView = useInView(headingRef, { once: true, margin: '-100px' });

  return (
    <div className="min-h-screen font-lexend bg-[url('/assets/aboutimages/slider_bg.jpg')] bg-cover bg-center flex flex-col items-center px-4 py-12">
      {/* Animated Heading and Description */}
      <motion.div
        ref={headingRef}
        initial={{ opacity: 0, y: 40 }}
        animate={headingInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="text-center mt-10 mb-10"
      >
        <h2
          className="text-5xl md:text-7xl font-bold text-white"
          style={{ fontFamily: 'Luxerie, sans-serif' }}
        >
          YEARS OF SERVICE
        </h2>
        <p className="text-white text-sm md:text-md font-base font-lexend mt-4 max-w-xl mx-auto">
          Established over 40 years ago, Kamdar boasts a diverse portfolio spanning three continents and encompassing numerous subsidiaries across various sectors.
        </p>
      </motion.div>

      {/* Desktop View */}
      <div className="hidden md:grid bg-white rounded-xl shadow-xl w-[800px] mb-10 h-[380px] grid-cols-1 md:grid-cols-2 overflow-hidden">
        {/* Image with animation */}
        <div className="relative w-full h-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={content[activeIndex].image}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="absolute inset-0"
            >
              <Image
                src={content[activeIndex].image}
                alt={content[activeIndex].title}
                layout="fill"
                objectFit="cover"
                className="rounded-l-xl"
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Text */}
        <div className="p-10 flex flex-col justify-between h-full">
          <div>
            <h3 className="text-4xl font-semibold mb-4" style={{ fontFamily: 'Luxerie, sans-serif' }}>
              {content[activeIndex].title}
            </h3>
            <p className="text-black font-lexend text-base leading-relaxed">
              {content[activeIndex].description}
            </p>
          </div>
          <div className="mt-6 flex space-x-2">
            {content.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`px-2 py-1 border rounded-[5px] text-sm transition ${
                  idx === activeIndex ? 'bg-black text-white' : 'bg-white text-black'
                }`}
              >
                {`0${idx + 1}`}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile View */}
      <div className="block md:hidden w-full max-w-sm bg-white rounded-xl shadow-xl text-center h-[550px] flex flex-col">
        <div className="flex-grow px-6 pt-6">
          <h3
            className="text-3xl font-semibold mb-2"
            style={{ fontFamily: 'Luxerie, sans-serif' }}
          >
            {content[activeIndex].title}
          </h3>
          <p className="text-black font-lexend text-sm mb-4 line-clamp-[6]">
            {content[activeIndex].description}
          </p>

          <div className="flex justify-center space-x-2">
            {content.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`px-2 py-1 border rounded-[5px] text-xs transition ${
                  idx === activeIndex ? 'bg-black text-white' : 'bg-white text-black'
                }`}
              >
                {`0${idx + 1}`}
              </button>
            ))}
          </div>
        </div>

        {/* Animated Image */}
        <div className="relative w-full h-72 rounded-b-xl overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={content[activeIndex].image}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="absolute inset-0"
            >
              <Image
                src={content[activeIndex].image}
                alt={content[activeIndex].title}
                layout="fill"
                objectFit="cover"
                className="rounded-b-xl"
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Section3;
