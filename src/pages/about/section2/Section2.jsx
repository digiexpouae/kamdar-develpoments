'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const Section2 = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' }); // triggers once when near viewport

  return (
    <section
      className="relative w-full min-h-screen flex items-center justify-center px-4 py-20 text-center"
      style={{
        backgroundImage: `url('/assets/formbg.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="max-w-5xl mx-auto text-black"
      >
        <h2
          className="text-5xl md:text-[80px] font-bold mb-2 tracking-tighter"
          style={{ fontFamily: 'Luxerie, sans-serif', letterSpacing: '0.5px' }}
        >
          QUALITY YOU CAN TRUST
        </h2>
        <p className="text-lg max-w-3xl m-auto md:text-xl mb-6 font-base">
          Kamdar Developments is a distinguished, family-owned real estate developer with a heritage
          of excellence and integrity spanning four decades. Headquartered in Dubai and with offices
          in three continents, we are committed to crafting premium properties that exemplify
          elegance, precision and enduring quality.
        </p>
        <p className="text-lg max-w-3xl m-auto md:text-xl font-base">
          Our expert team applies an unmatched attention to detail, reliably developing projects on
          time and with meticulous care. We build sophisticated communities that are thoughtfully
          designed, with smart layouts that are finished to the highest standards. Architectural
          elegance combined with master craftsmanship ensures that every development we construct is
          built to last generations.
        </p>
      </motion.div>
    </section>
  );
};

export default Section2;
