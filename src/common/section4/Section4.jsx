// components/Section4.jsx
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const Section4 = ({ heading, text, btntext, p, text1, desktopBackground, mobileBackground, overlay, titleNumber, className, isProject1 = false }) => {
  return (
    <section
      className={`relative w-full h-screen ${className}`}
      style={{
        backgroundImage: `url(${desktopBackground})`
      }}
    >
      {/* Dark Overlay */}
      {overlay &&
        <div className="absolute inset-0 bg-black/40"></div>}
      {/* Desktop View */}
      <div className="hidden md:flex relative z-20 flex-col items-start justify-start h-full pl-44">
        <div className="relative z-10 flex flex-col items-start p-8 md:p-12">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            style={{
              fontSize: '2.5rem',

              letterSpacing: '0.01px',
              textShadow: '0 2px 16px rgba(0,0,0,0.18)',
            }}
            className="reveal-on-scroll text-white text-3xl md:text-7xl pt-10 font-light  mb-6"
            style={{ fontFamily: 'Luxerie, sans-serif', lineHeight: 0.5, }}>
            <span className="text-7xl font-extrabold">{titleNumber}</span>{heading}
          </motion.h1>

          {p &&
            <motion.p
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              style={{
                fontFamily: 'Lexend, sans-serif',
                fontSize: '1.5rem',
                lineHeight: 1.1,
                letterSpacing: '0.01px',
                textShadow: '0 2px 16px rgba(0,0,0,0.18)',
              }}
              className={'text-white font-light'}


            > JVC, Dubai</motion.p>}
          {isProject1 ? (
            <motion.button
              onClick={() => {
                const formSection = document.getElementById('register-form');
                if (formSection) {
                  formSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              viewport={{ once: true }}
              className="reveal-on-scroll cursor-pointer mt-5 bg-white text-black px-6 py-2 rounded shadow font-base hover:bg-gray-200 transition"
            >
              {btntext}
            </motion.button>
          ) : (
            <Link href="/project1" passHref legacyBehavior>
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                viewport={{ once: true }}
                className="reveal-on-scroll cursor-pointer mt-5 bg-white text-black px-6 py-2 rounded shadow font-base hover:bg-gray-200 transition"
              >
                {btntext}
              </motion.button>
            </Link>
          )}
        </div>
      </div>

      {/* Mobile View */}
      <div 
        className="flex md:hidden relative z-20 flex-col items-center justify-center h-full px-4 text-center"
        style={{
          backgroundImage: `url(${mobileBackground || desktopBackground})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-white font-light -mt-86 mb-10"
          style={{
            fontFamily: 'Luxerie, sans-serif',
            fontSize: '3.0rem',
            lineHeight: 1.0,
            letterSpacing: '0.01px',
            textShadow: '0 2px 16px rgba(0,0,0,0.18)',
          }}
        >
          {heading}
        </motion.h1>
        {p &&
          <motion.p className='text-white'>{text1}</motion.p>}
        {isProject1 ? (
          <motion.button
            onClick={() => {
              const formSection = document.getElementById('register-form');
              if (formSection) {
                formSection.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            viewport={{ once: true }}
            className="reveal-on-scroll cursor-pointer mt-5 bg-white text-black px-6 py-2 rounded shadow font-base hover:bg-gray-200 transition"
          >
            {btntext}
          </motion.button>
        ) : (
          <Link href="/project1">
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              viewport={{ once: true }}
              className="reveal-on-scroll cursor-pointer mt-5 bg-white text-black px-6 py-2 rounded shadow font-base hover:bg-gray-200 transition"
            >
              {btntext}
            </motion.button>
          </Link>
        )}
      </div>
    </section>
  );
};

export default Section4;
