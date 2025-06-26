'use client';

import React from 'react';

const Section2 = () => {
  return (
    <section
      className="relative w-full min-h-screen flex items-center justify-center px-4 py-20 text-center"
      style={{
        backgroundImage: `url('/assets/formbg.png')`, // replace with your background
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="max-w-5xl mx-auto text-black">
        <h2
          className="text-5xl md:text-[80px]  font-bold mb-2 tracking-tighter"
          style={{ fontFamily: 'Luxerie, sans-serif', letterSpacing: '0.5px' }}
        >
          QUALITY YOU CAN TRUST
        </h2>
        <p className="text-lg max-w-3xl m-auto md:text-xl mb-6 font-base ">
          Kamdar Developments is a distinguished, family-owned real estate developer with a heritage
          of excellence and integrity spanning four decades. Headquartered in Dubai and with offices
          in three continents, we are committed to crafting premium properties that exemplify
          elegance, precision and enduring quality.
        </p>
        <p className="text-lg  max-w-3xl m-auto md:text-xl font-base">
          Our expert team applies an unmatched attention to detail, reliably developing projects on
          time and with meticulous care. We build sophisticated communities that are thoughtfully
          designed, with smart layouts that are finished to the highest standards. Architectural
          elegance combined with master craftsmanship ensures that every development we construct is
          built to last generations.
        </p>
      </div>
    </section>
  );
};

export default Section2;
