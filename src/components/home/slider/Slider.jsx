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
      const baseWidth = Math.min(Math.max(window.innerWidth * 0.8, 280), 900);
      setSlideWidth(baseWidth);
      setPreviewWidth(baseWidth * (window.innerWidth < 640 ? 0.07 : 0.1));
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % total);
  const prevSlide = () => setCurrent((prev) => (prev - 1 + total) % total);

  const getTranslateX = () => {
    let tx = current * (slideWidth + previewWidth) - previewWidth / 2;
    const maxTx = (slideWidth + previewWidth) * (images.length - 1) - previewWidth / 2;
    return Math.min(Math.max(tx, 0), maxTx);
  };

  const containerWidth = slideWidth + previewWidth;
  const containerHeight = slideWidth * 0.56 > 500 ? 500 : slideWidth * 0.56;

  return (
    <div className="w-full bg-white px-2 sm:px-8 pt-12 flex justify-center">
      <div className="w-full max-w-4xl">
        {/* Heading and Logos */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-4 w-full"
        >
          <div className="w-full sm:w-auto flex flex-col items-center sm:items-start">
            <h2
              className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-light tracking-tight mb-2 text-center sm:text-left"
              style={{ fontFamily: 'Luxerie, Lexend, sans-serif' }}
            >
              LATEST ARTICLES
            </h2>
            <div className="flex gap-4 sm:gap-6 md:gap-8 mt-2 justify-center sm:justify-start w-full flex-wrap">
              <Image src={gulf} alt="Gulf News" className="h-5 xs:h-6 object-contain w-auto" />
              <Image src={khaleej} alt="Khaleej Times" className="h-5 xs:h-6 object-contain w-auto" />
              <Image src={lovin} alt="Lovin Dubai" className="h-5 xs:h-6 object-contain w-auto" />
            </div>
          </div>
          <button className="bg-black text-white px-4 py-2 rounded-md transition text-xs xs:text-sm self-center sm:self-auto w-full sm:w-auto">
            View All Articles
          </button>
        </motion.div>

        {/* Carousel */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="relative flex flex-col items-center mt-8"
        >
          <div
            className="overflow-hidden relative mx-auto"
            style={{ width: `${containerWidth}px`, height: `${containerHeight}px`, maxHeight: '500px' }}
          >
            <div
              className="flex transition-transform duration-500"
              style={{
                width: `${(slideWidth + previewWidth) * (images.length - 1) + slideWidth}px`,
                transform: `translateX(-${getTranslateX()}px)`
              }}
            >
              {images.map((img, idx) => (
                <div
                  key={idx}
                  className="rounded-3xl overflow-hidden bg-transparent relative shadow-lg"
                  style={{
                    width: `${slideWidth}px`,
                    height: `${containerHeight}px`,
                    marginRight: idx !== images.length - 1 ? `${previewWidth}px` : 0,
                    flex: '0 0 auto',
                  }}
                >
                  <Image
                    src={img}
                    alt={`Slide ${idx + 1}`}
                    fill
                    className="object-contain opacity-90 bg-white"
                  />
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
              className="w-8 h-8 flex items-center justify-center text-gray-700 text-2xl hover:text-black transition"
              aria-label="Previous"
              style={{ background: 'none', border: 'none', outline: 'none' }}
            >
              &#8592;
            </button>
            <button
              onClick={nextSlide}
              className="w-8 h-8 flex items-center justify-center text-gray-700 text-2xl hover:text-black transition"
              aria-label="Next"
              style={{ background: 'none', border: 'none', outline: 'none' }}
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