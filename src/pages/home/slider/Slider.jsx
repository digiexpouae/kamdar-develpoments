'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

import gulf from '../../../../public/assets/gulf.png';
import khaleej from '../../../../public/assets/khaleej.png';
import lovin from '../../../../public/assets/lovin.png';
import slider from '../../../../public/assets/slider.png';

const images = [slider, slider, slider];

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
  const [current, setCurrent] = useState(0);
  const total = images.length;
  const [slideWidth, setSlideWidth] = useState(0);
  const [previewWidth, setPreviewWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      const base = Math.min(Math.max(window.innerWidth * 0.8, 280), 900);
      setSlideWidth(base);
      setPreviewWidth(base * (window.innerWidth < 640 ? 0.07 : 0.1));
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % total);
  const prevSlide = () => setCurrent((prev) => (prev - 1 + total) % total);

  const getTranslateX = () => {
    let tx = current * (slideWidth + previewWidth) - previewWidth / 2;
    const maxTx = (slideWidth + previewWidth) * (total - 1) - previewWidth / 2;
    return Math.min(Math.max(tx, 0), maxTx);
  };

  const containerWidth = slideWidth + previewWidth;
  const containerHeight = Math.min(slideWidth * 0.56, 500);

  return (
    <div className="w-full bg-white px-2 sm:px-8 pt-12 flex justify-center">
      <div className="w-full max-w-6xl">
        {/* Header Section */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-4 w-full"
        >
          <div className="flex flex-col items-center sm:items-start w-full sm:w-auto">
            <h2
              className="text-2xl sm:text-4xl md:text-5xl font-light tracking-tight mb-2 text-center sm:text-left"
              style={{ fontFamily: 'Luxerie, Lexend, sans-serif' }}
            >
              LATEST NEWS
            </h2>
         
          </div>
          <button className="bg-black text-white px-4 py-2 rounded-md transition text-xs sm:text-sm w-full sm:w-auto">
            View All Articles
          </button>
        </motion.div>

        {/* Slider Section */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="relative flex flex-col items-center mt-8"
        >
          <div
            className="overflow-hidden relative"
            style={{
              width: `${containerWidth}px`,
              height: `${containerHeight}px`,
              maxHeight: '500px',
            }}
          >
            <div
              className="flex transition-transform duration-500"
              style={{
                width: `${(slideWidth + previewWidth) * (total - 1) + slideWidth}px`,
                transform: `translateX(-${getTranslateX()}px)`,
              }}
            >
              {images.map((img, idx) => (
                <div
                  key={idx}
                  className="rounded-3xl overflow-hidden bg-white relative "
                  style={{
                    width: `${slideWidth}px`,
                    height: `${containerHeight}px`,
                    marginRight: idx !== total - 1 ? `${previewWidth}px` : 0,
                    flex: '0 0 auto',
                  }}
                >
                  <Image src={img} alt={`Slide ${idx + 1}`} fill className="object-contain" />
                </div>
              ))}
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-0.5 bg-gray-200 rounded-full mt-6 mb-10 relative overflow-hidden">
            <div
              className="h-0.5 bg-black rounded-full transition-all duration-300"
              style={{ width: `${((current + 1) / total) * 100}%` }}
            />
          </div>

          {/* Arrows */}
          <div className="absolute bottom-2 right-2 flex gap-2 z-10">
            <button
              onClick={prevSlide}
              className="w-10 h-10 flex items-center justify-center text-gray-700 text-2xl hover:text-black transition"
              aria-label="Previous"
            >
              &#8592;
            </button>
            <button
              onClick={nextSlide}
              className="w-10 h-10 flex items-center justify-center text-gray-700 text-2xl hover:text-black transition"
              aria-label="Next"
            >
              &#8594;
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Slider;
