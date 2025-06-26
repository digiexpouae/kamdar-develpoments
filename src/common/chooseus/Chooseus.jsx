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
      className="relative w-full  py-16 bg-cover bg-center"
      style={{ backgroundImage: "url('/assets/choose_bg.jpg')" }}
    >
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6">

        {/* Heading and Button Row */}
        <div className='md:block hidden'>

        <div className="mb-12 grid grid-cols-2">
          <h2
            className="text-3xl md:text-6xl font-semibold text-black text-left"
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
        <div className="grid grid-cols-2 md:grid-cols-3 gap-10 md:gap-14">
          {/* Manual alignment for each icon */}
          <div className="flex flex-row items-center text-left gap-3 md:gap-5 justify-self-start">
            <div className="w-12 h-12 md:w-16 md:h-16 relative">
              <Image src={features[0].icon} alt={features[0].label} layout="fill" objectFit="contain" />
            </div>
            <p className="text-sm md:text-base font-medium text-black whitespace-pre-line">{features[0].label}</p>
          </div>
          <div className="flex flex-row items-center text-left gap-3 md:gap-5 justify-self-center">
            <div className="w-12 h-12 md:w-16 md:h-16 relative">
              <Image src={features[1].icon} alt={features[1].label} layout="fill" objectFit="contain" />
            </div>
            <p className="text-sm md:text-base font-medium text-black whitespace-pre-line">{features[1].label}</p>
          </div>
          <div className="flex flex-row items-center text-left gap-3 md:gap-5 justify-self-end">
            <div className="w-12 h-12 md:w-16 md:h-16 relative">
              <Image src={features[2].icon} alt={features[2].label} layout="fill" objectFit="contain" />
            </div>
            <p className="text-sm md:text-base font-medium text-black whitespace-pre-line">{features[2].label}</p>
          </div>
          <div className="flex flex-row items-center text-left gap-3 md:gap-5 justify-self-start">
            <div className="w-12 h-12 md:w-16 md:h-16 relative">
              <Image src={features[3].icon} alt={features[3].label} layout="fill" objectFit="contain" />
            </div>
            <p className="text-sm md:text-base font-medium text-black whitespace-pre-line">{features[3].label}</p>
          </div>
          <div className="flex flex-row items-center text-left gap-3 md:gap-5 justify-self-center">
            <div className="w-12 h-12 md:w-16 md:h-16 relative">
              <Image src={features[4].icon} alt={features[4].label} layout="fill" objectFit="contain" />
            </div>
            <p className="text-sm md:text-base font-medium text-black whitespace-pre-line">{features[4].label}</p>
          </div>
          <div className="flex flex-row items-center text-left gap-3 md:gap-5 justify-self-end">
            <div className="w-12 h-12 md:w-16 md:h-16 relative">
              <Image src={features[5].icon} alt={features[5].label} layout="fill" objectFit="contain" />
            </div>
            <p className="text-sm md:text-base font-medium text-black whitespace-pre-line">{features[2].label}</p>
          </div>
        </div>
        </div>

        <div className="block md:hidden text-center">
  {/* Heading */}
  <h2
    className="text-5xl font-semibold text-black mb-6"
    style={{ fontFamily: 'Luxerie, sans-serif' }}
  >
    WHY CHOOSE US
  </h2>

  {/* Button */}
  <button className="bg-black text-white px-6 py-2 rounded-md hover:bg-neutral-800 transition mb-10">
    Learn More
  </button>

  {/* Icon Grid: 2 per row, center aligned */}
  <div className="grid grid-cols-2 gap-x-4 gap-y-6 px-4">
    {features.map((feature, index) => (
      <div
        key={index}
        className="flex items-center justify-center gap-3 text-left"
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
      </div>
    ))}
  </div>
</div>



      </div>
    </section>
  );
};

export default Choose;
