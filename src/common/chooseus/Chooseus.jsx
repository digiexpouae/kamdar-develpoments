'use client';

import React from 'react';
import Image from 'next/image';

const features = [
  { icon: '/assets/inn.png', label: 'Innovative designs' },
  { icon: '/assets/unmstched.png', label: 'Unmatched expertise' },
  { icon: '/assets/community.png', label: 'Community focus' },
  { icon: '/assets/sup.png', label: 'Superior quality' },
  { icon: '/assets/sus.png', label: 'Sustainable practices' },
  { icon: '/assets/customer.png', label: 'Customer-centric approach' },
];

const Choose = () => {
  return (
    <section
      className="relative w-full py-16 bg-cover bg-center"
      style={{ backgroundImage: "url('/assets/choose_bg.jpg')" }}
    >
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6">
        {/* Heading and Button Row */}
        <div className="mb-12 grid grid-cols-2">
          <h2
            className="text-3xl md:text-5xl font-semibold text-black text-left"
            style={{ fontFamily: 'Luxerie, sans-serif' }}
          >
            WHY CHOOSE US
          </h2>
          <div className="flex justify-end items-center">
            <button className="bg-black text-white px-6 py-2 rounded-md hover:bg-neutral-800 transition whitespace-nowrap">
              Learn More
            </button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-10 md:gap-14 justify-items-center">
          {features.map((item, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className="w-16 h-16 md:w-20 md:h-20 relative mb-4">
                <Image
                  src={item.icon}
                  alt={item.label}
                  layout="fill"
                  objectFit="contain"
                />
              </div>
              <p className="text-sm md:text-base font-medium text-black">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Choose;
