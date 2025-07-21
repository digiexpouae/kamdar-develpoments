'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import slider from '../../public/assets/aboutimages/slider1.png';
import sliderimg from '../../public/assets/slider2.jpg';
import sliderimg2 from '../../public/assets/projectimages/project-2.jpg';
import khaleejLogo from '../../public/assets/khaleej1.png';
import arabialogo from '../../public/assets/homeslider/arab.png';
import bayanlogo from '../../public/assets/homeslider/bayan.png';
import identitylogo from '../../public/assets/homeslider/identity.png';
import designlogo from '../../public/assets/homeslider/design.png';
import plumberlogo from '../../public/assets/homeslider/plumber.png';
import plumberslide from '../../public/assets/homeslider/hs2.png';
import Link from 'next/link';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: 'easeOut',
    },
  },
};

const Slider = ({ heading, buttonheading, href }) => {
  const [isHovered, setIsHovered] = useState(false);
  const sliderRef = useRef(null);

  const slides = [  {
      image: sliderimg2,
      logo: khaleejLogo,
      heading: 'Kamdar unveils new residential development in Dubai\'s JVC',
      text: 'Renowned developer launches first UAE project for public sale after four decades of delivering exclusive private developments',
      buttonHref: 'https://www.khaleejtimes.com/business/kamdar-unveils-new-residential-development-in-dubais-jvc',
    },
    {
      image: slider,
      logo: arabialogo,
      heading: 'Kamdar Developments Breaks Ground on 105 Residences in JVC',
      text: 'A 105-unit luxury residential Dubai project starting from $174,000 with completion expected in early 2027',
      buttonHref: 'https://www.albayan.ae/economy/business/real-estate/13347',
    },   {
      image: sliderimg2,
      logo: bayanlogo,
      heading: 'Launch of Kamdar 105 project in Jumeirah Village Circle',
      text: 'Dubai-based Kamdar Developers has announced the launch of its new Kamdar 105 Residences project in Jumeirah Village Circle,.........',
      buttonHref: 'https://www.arabianbusiness.com/industries/real-estate/dubai-real-estate-kamdar-property-development-announces-new-105-residences-in-jvc',
    },    {
      image: sliderimg,
      logo: identitylogo,
      heading: 'Unveiling Attainable Luxury',
      text: 'Kamdar Developments has launched 105 Residences, a new high-end development in Jumeirah Village Circle.',
      buttonHref: 'https://identity.ae/105-residences-jvc/',
    },
    {
      image: plumberslide,
      logo: plumberlogo,
      heading: 'Kamdar Developments Appoints Main Contractor for Latest Project',
      text: 'Emphasising on timely delivery and exceptional quality, Luxedesign\'s appointment is expected to support the project\'s completion by early 2027',
      buttonHref: 'https://www.mepmiddleeast.com/people/appointments/kamdar-developments-appoints-main-contractor',
    },    {
      image: sliderimg2,
      logo: arabialogo,
      heading: 'Kamdar Property Development announces new 105 Residences\' in JVC',
      text: '105 Residences in Dubai\'s JVC features comprehensive amenities, including a rooftop open-air cinema, swimming pool, fitness studio and more',
      buttonHref: 'https://design-middleeast.com/kamdar-developments-partners-with-luxedesign-to-deliver-elevated-residential-design/',
    },
    {
      image: plumberslide,
      logo: designlogo,
      heading: 'Kamdar Developments Partners With Luxedesign to Deliver Elevated Residential Design',
      text: 'Kamdar Developments has appointed Luxedesign (LDV) as the General Contractor for the 105 Residences in JVC and an exclusive luxury villa collection in Meydan.',
      buttonHref: 'https://www.arabianbusiness.com/industries/real-estate/dubai-real-estate-kamdar-developments-breaks-ground-on-105-residences-in-jvc',
    },
  
    
 


  ];

  const duplicatedSlides = [...slides, ...slides];

  // Helper function to apply custom 105 styling
  const renderHeadingWith105 = (heading) => {
    return heading.split('105').map((part, i) => (
      <React.Fragment key={i}>
        {part}
        {i < heading.split('105').length - 1 && (
          <span style={{ fontFamily: 'lexend', fontSize: '29px', fontWeight: '300' }}>105</span>
        )}
      </React.Fragment>
    ));
  };

  return (
    <div className="w-full min-h-screen bg-white px-2 sm:px-8 pt-12 flex justify-center">
      <div className="w-full max-w-5xl">
        {/* Header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-4 w-full"
        >
          <div className="flex flex-col items-center sm:items-start w-full sm:w-auto">
            <h2
              className="text-6xl font-light tracking-tight mb-2 text-center sm:text-left"
              style={{ fontFamily: 'Luxerie, Lexend, sans-serif' }}
            >
              {heading}
            </h2>
          </div>
          <Link href={href}>
            <button className="bg-black cursor-pointer text-white px-4 py-2 rounded-md transition text-xs sm:text-sm w-full sm:w-auto">
              {buttonheading}
            </button>
          </Link>
        </motion.div>

        {/* Infinite Scroll Slider */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="relative w-full flex items-center justify-center py-8"
        >
          <style jsx>{`
            @keyframes scroll-right {
              0% {
                transform: translateX(0);
              }
              100% {
                transform: translateX(-50%);
              }
            }
            
            .infinite-scroll {
              animation: scroll-right 50s linear infinite;
            }
            
            .infinite-scroll:hover {
              animation-play-state: paused;
            }
            
            .scroll-container {
              mask: linear-gradient(
                90deg,
                transparent 0%,
                black 10%,
                black 90%,
                transparent 100%
              );
              -webkit-mask: linear-gradient(
                90deg,
                transparent 0%,
                black 10%,
                black 90%,
                transparent 100%
              );
            }
            
            .slide-item {
              transition: transform 0.3s ease, filter 0.3s ease;
            }
            
            .slide-item:hover {
              transform: scale(1.05);
              filter: brightness(1.1);
            }
          `}</style>
          
          <div className=" w-full max-w-6xl">
            <div 
              className="infinite-scroll flex gap-8 w-max"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {duplicatedSlides.map((slide, index) => (
                <div
                  key={index}
                  className="slide-item flex-shrink-0 w-96 h-96 md:w-[45rem] md:h-[28rem] rounded-xl overflow-hidden shadow-2xl relative"
                >
                  <Image 
                    src={slide.image} 
                    alt={`Slide ${index % slides.length}`} 
                    fill 
                    className="object-cover"
                  />
                  <div
                    className="absolute inset-0 flex flex-col justify-end p-6 z-10"
                    style={{
                      background: 'linear-gradient(180deg,rgba(25,25,25,0.45) 60%,rgba(25,25,25,0.85) 100%)',
                    }}
                  >
                    <div className=" max-w-md">
                      <div className="absolute top-10">
                        <Image
                          src={slide.logo}
                          alt="Slide Logo"
                          width={120}
                          height={32}
                          className="object-contain drop-shadow-lg"
                        />
                      </div>
                      <h2
                        style={{ fontFamily: 'Luxerie, Lexend, sans-serif' }}
                        className="text-white text-4xl  font-semibold leading-[1] mt-10 mb-1 drop-shadow-lg"
                      >
                        {renderHeadingWith105(slide.heading)}
                      </h2>
                      <p className="text-white text-sm font-lexend mb-4 max-w-md drop-shadow-lg line-clamp-2">
                        {slide.text}
                      </p>
                      <a href={slide.buttonHref} target="_blank" rel="noopener noreferrer">
                        <button
                          style={{
                            border: '1px solid #A08741',
                            borderRadius: '7px',
                          }}
                          className="text-white text-xs font-lexend cursor-pointer px-3 py-2 shadow-md transition w-fit"
                        >
                          Read More
                        </button>
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Slider;