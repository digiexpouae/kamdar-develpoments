'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import slider from '../../../../public/assets/aboutimages/slider1.png';
import sliderimg from '../../../../public/assets/slider2.jpg';
import khaleejLogo from '../../../../public/assets/khaleej1.png';

// Updated image set
const images = [ slider,sliderimg,  slider ,sliderimg];

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

const Slider = () => {
  const [current, setCurrent] = useState(1); // start at index 1 due to cloning
  const total = images.length;
  const extendedImages = [images[total - 1], ...images, images[0]];
  const extendedTotal = extendedImages.length;

  const [slideWidth, setSlideWidth] = useState(0);
  const [previewWidth, setPreviewWidth] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const [isHovered, setIsHovered] = useState(false); // 👈 NEW

  useEffect(() => {
    const handleResize = () => {
      const container = Math.min(Math.max(window.innerWidth * 0.85, 280), 900);
      const slide = container * 0.8;
      const preview = container * 0.2;
      setSlideWidth(slide);
      setPreviewWidth(preview);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const nextSlide = () => {
    if (!transitioning) {
      setTransitioning(true);
      setCurrent((prev) => prev + 1);
    }
  };

  const prevSlide = () => {
    if (!transitioning) {
      setTransitioning(true);
      setCurrent((prev) => prev - 1);
    }
  };

  const getTranslateX = () => {
    const totalSlideWidth = slideWidth + previewWidth;
    const containerCenter = (slideWidth + previewWidth) / 2;
    const offset = current * totalSlideWidth + slideWidth / 2 - containerCenter;
    return offset;
  };

  useEffect(() => {
    if (!transitioning) return;

    const timeout = setTimeout(() => {
      if (current === 0) {
        setTransitioning(false);
        setCurrent(total);
      } else if (current === total + 1) {
        setTransitioning(false);
        setCurrent(1);
      } else {
        setTransitioning(false);
      }
    }, 500);

    return () => clearTimeout(timeout);
  }, [current, transitioning, total]);

  // Autoplay: pause if hovered
  useEffect(() => {
    const interval = setInterval(() => {
      if (!transitioning && !isHovered) {
        setTransitioning(true);
        setCurrent((prev) => prev + 1);
      }
    }, 1000); // ← autoplay interval

    return () => clearInterval(interval);
  }, [transitioning, isHovered]);

  const realIndex = (current - 1 + total) % total;
  const containerWidth = slideWidth + previewWidth;
  const containerHeight = Math.min(slideWidth * 0.56, 500);

  return (
    <div className="w-full h-screen bg-white px-2 sm:px-8 pt-12 flex justify-center">
      <div className="w-full max-w-5xl">
        {/* Header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-4 w-full"
        >
          <div className="flex flex-col items-center mb-10 sm:items-start w-full sm:w-auto">
            <h2
              className="text-6xl font-light tracking-tight mb-2 text-center sm:text-left"
              style={{ fontFamily: 'Luxerie, Lexend, sans-serif' }}
            >
              LATEST NEWS
            </h2>
          </div>
          <button className="bg-black text-white px-4 py-2 rounded-md transition text-xs sm:text-sm w-full sm:w-auto">
            View All Articles
          </button>
        </motion.div>

        {/* Slider */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="relative flex flex-col items-center mt-8"
        >
          <div
            className="relative"
            style={{
              width: `${containerWidth}px`,
              height: `${containerHeight}px`,
              maxHeight: '500px',
            }}
          >
            <div
              className={`flex ${transitioning ? 'transition-transform duration-500 ease-out' : ''}`}
              style={{
                width: `${(slideWidth + previewWidth) * extendedTotal}px`,
                transform: `translateX(-${getTranslateX()}px)`,
              }}
            >
              {extendedImages.map((img, idx) => {
                return (
                  <div
                    key={idx}
                    onMouseEnter={() => setIsHovered(true)} // 👈 pause autoplay
                    onMouseLeave={() => setIsHovered(false)} // 👈 resume autoplay
                    className="rounded-3xl overflow-hidden bg-white relative"
                    style={{
                      width: `${slideWidth}px`,
                      height: `${containerHeight}px`,
                      marginRight: `${previewWidth}px`,
                      flex: '0 0 auto',
                    }}
                  >
                    <Image
                      src={img}
                      alt={`Slide ${idx}`}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 flex flex-col justify-end sm:justify-center p-6 sm:p-12 z-10"
                      style={{
                        background:
                          'linear-gradient(180deg,rgba(25,25,25,0.45) 60%,rgba(25,25,25,0.85) 100%)',
                      }}
                    >
                      <div className="max-w-md">
                        <div className="absolute top-6 left-6 sm:top-10 sm:left-10">
                          <Image
                            src={khaleejLogo}
                            alt="Khaleej Times Logo"
                            width={120}
                            height={32}
                            className="object-contain drop-shadow-lg"
                          />
                        </div>
                        <h2
                          style={{ fontFamily: 'Luxerie, Lexend, sans-serif' }}
                          className="text-white text-4xl font-semibold leading-[1] mt-3 mb-1 drop-shadow-lg"
                        >
                          KAMDAR DEVELOPMENTS BREAKS GROUND ON RESIDENCES IN JVC
                        </h2>
                        <p className="text-white text-md font-lexend mb-8 max-w-md drop-shadow-lg">
                          The ceremony was attended by the team from Kamdar Developments, contractor Luxedesign (LDV) and project advisors from Savills Middle East
                        </p>
                        <button
                          style={{
                            border: '1px solid #A08741',
                            borderRadius: '7px',
                          }}
                          className="text-white text-xs font-lexend cursor-pointer px-3 py-2 shadow-md transition w-fit"
                        >
                          Read More
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Slider;