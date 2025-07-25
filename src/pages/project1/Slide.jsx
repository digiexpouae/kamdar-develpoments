'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

import 'swiper/css';

const images = [
  '/assets/105slider/1.webp',
  '/assets/105slider/2.webp',
  '/assets/105slider/3.webp',
  '/assets/105slider/4.webp',
  '/assets/105slider/5.webp',
  '/assets/105slider/6.webp',
  '/assets/105slider/7.webp',
  '/assets/105slider/8.webp',
  '/assets/105slider/9.webp',
  '/assets/105slider/10.webp',
  
  
];

const icons = [
  { im: '/assets/105/icon-1.png', name: <>Infinity<br /> swimming pool</> },
  { im: '/assets/105/icon-2.png', name: <>Barbecue <br /> area</> },
  { im: '/assets/105/icon-3.png', name: <>Kids <br /> play area</> },
  { im: '/assets/105/icon-4.png', name: <>Accessible <br /> parking</> },
  { im: '/assets/105/icon-5.png', name: <>Fully <br /> equipped gym</> },
  { im: '/assets/105/icon-6.png', name: <>Rooftop <br /> wellness garden</> },
  { im: '/assets/105/icon-7.png', name: <>Rooftop <br /> Cinema</> },
  { im: '/assets/105/icon-8.png', name: <>Multi-purpose <br /> sports court</> }
];

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const slideIn = {
  hidden: { x: -20, opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { duration: 0.5 } },
};

const Slide = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <section
      className="w-full md:py-20 py-5 px-4 sm:px-6 relative bg-white"
      style={{
        backgroundImage: `url('/assets/formbg.png')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <motion.div
        className="relative z-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
      >
        {/* Top Text Section */}
        <div className="flex flex-col md:flex-row max-w-5xl mx-auto gap-6 mb-10">
          <motion.div
            className="md:w-1/2 flex flex-col gap-4 md:gap-6 text-center md:text-left"
            style={{ fontFamily: 'Luxerie' }}
            variants={fadeIn}
          >
            <h1 className="text-5xl sm:text-5xl md:text-6xl font-light leading-10">
              ELEVATED LIVING <br /> WITHIN REACH
            </h1>
            <a
  href="/105 Residences by Kamdar - Brochure.pdf"
  target="_blank"
  rel="noopener noreferrer"
  className="mt-2 cursor-pointer font-lexend md:block hidden md:mt-4 w-fit px-5 py-2 bg-black text-white rounded-md shadow hover:bg-gray-900 transition text-sm md:text-base"
>
  View Brochure
</a>
          </motion.div>

          <motion.div
            className="md:w-1/2 text-sm md:text-base text-black leading-tight font-base mt-2 md:mt-3 text-center md:text-left"
            variants={slideIn}
          >
            <p>
              105 Residences by Kamdar is a meticulously designed community in Jumeirah Village Circle,
              offering elegant studio, 1 bed, and 2-bed apartments. Crafted for luxury and modern living,
              it blends sophisticated architecture, top-tier finishes, and state-of-the-art amenities to
              deliver an unparalleled lifestyle in one of Dubai’s most sought-after residential neighbourhoods.
              The project is under development and will be ready to move in from Q1 2027.
            </p>
            <a
  href="/105 Residences by Kamdar - Brochure.pdf"
  target="_blank"
  rel="noopener noreferrer"
  className="mt-8 md:hidden cursor-pointer font-lexend block w-fit px-5 py-2 bg-black text-white rounded-md shadow hover:bg-gray-900 transition text-sm"
>
  View Brochure
</a>
          </motion.div>
        </div>

        {/* Enhanced Image Carousel with AnimatePresence */}
        <motion.div
          className="relative max-w-5xl mx-auto h-[250px] md:h-[550px] w-full rounded-lg overflow-hidden mb-10"
          variants={fadeIn}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={images[currentIndex]}
              initial={{ opacity: 0, scale: 1.03 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.6, ease: 'easeInOut' }}
              className="absolute inset-0 w-full h-full"
            >
              <Image
                src={images[currentIndex]}
                alt="Carousel"
                fill
                className="md:object-cover  object-contain"
              />
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <button
            onClick={prevImage}
            className="absolute top-1/2 -left-2 sm:left-4 transform -translate-y-1/2 bg-black bg-opacity-60 hover:bg-opacity-80 p-2 rounded-md transition-all duration-300 hover:scale-105"
          >
            <ChevronLeft color="white" size={20} />
          </button>

          <button
            onClick={nextImage}
            className="absolute top-1/2 -right-2 sm:right-4 transform -translate-y-1/2 bg-black bg-opacity-60 hover:bg-opacity-80 p-2 rounded-md transition-all duration-300 hover:scale-105"
          >
            <ChevronRight color="white" size={20} />
          </button>
        </motion.div>

        {/* Mobile Icon Strip */}
        <div className="block md:hidden w-full relative">
          <Swiper
            spaceBetween={10}
            slidesPerView={1}
            centeredSlides={true}
            className="w-full px-4"
            modules={[Navigation]}
            navigation={{
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            }}
          >
            {icons.map((elem, index) => (
              <SwiperSlide key={index}>
                <div className="flex flex-col items-center justify-center h-[120px]">
                  <div className="w-[80px] h-[70px] flex items-center justify-center mx-auto">
                    <Image
                      src={elem.im}
                      width={100}
                      height={100}
                      className="!h-full"
                      alt={elem.name}
                    />
                  </div>
                  <span className="text-center font-bold h-[50px] text-[14px] w-full font-lexend text-wrap leading-5 text-black my-2">
                    {elem.name}
                  </span>
                </div>
              </SwiperSlide>
            ))}
            <div className="swiper-button-prev !text-[#CCAB64] !left-0 !top-1/2 !-translate-y-1/2 !w-8 !h-8 !flex !items-center !justify-center !bg-transparent" />
            <div className="swiper-button-next !text-[#CCAB64] !right-0 !top-1/2 !-translate-y-1/2 !w-8 !h-8 !flex !items-center !justify-center !bg-transparent" />
          </Swiper>
        </div>

        {/* Desktop Icon Strip */}
        <motion.div
          className="hidden md:flex justify-center"
          variants={fadeIn}
        >
          <Image
            src="/assets/iconstrip.png"
            alt="Amenities"
            width={1000}
            height={80}
            className="object-contain"
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Slide;
