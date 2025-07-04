'use client';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import khaleejLogo from '../../../public/assets/khaleej1.png';
import Image from 'next/image';
import { motion } from 'framer-motion';


// Slide content
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

const slides = [
  {
    image: '/assets/aboutimages/slider1.png',
    title: 'KAMDAR DEVELOPMENTS BREAKS GROUND ON RESIDENCES IN JVC',
    description:
      'The ceremony was attended by the team from Kamdar Developments, contractor Luxedesign (LDV) and project advisors from Savills Middle East',
    link: '#',
  },
  {
    image: '/assets/slider2.jpg',
    title: 'NEW PROJECT LAUNCH IN DUBAI MARINA',
    description:
      'Kamdar introduces another luxurious property with world-class amenities and waterfront views.',
    link: '#',
  },
];

const MobileSlider = () => {
  return (
    <div className="w-full relative overflow-hidden bg-white">
      <style jsx>{`
        /* Position and style pagination pills */
        :global(.swiper-pagination) {
          bottom: 12px !important;
        }

        :global(.swiper-pagination-bullets) {
          display: flex;
          justify-content: center;
          gap: 0.5rem;
        }

        :global(.swiper-pagination-bullet) {
          width: 10px;
          height: 10px;
          background: #888;
          border-radius: 9999px;
          opacity: 1;
          transition: all 0.3s ease;
        }

        :global(.swiper-pagination-bullet-active) {
          background: #fff;
          width: 24px;
        }
      `}</style>
      
    <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                className="flex flex-col sm:flex-row items-start p-6 sm:items-center justify-between mb-4 w-full"
              >
                <div className="flex flex-col items-center justify-center mb-4 sm:items-start w-full sm:w-auto">
                  <h2
                    className="text-6xl font-light tracking-tight mb-2 text-center sm:text-left"
                    style={{ fontFamily: 'Luxerie, Lexend, sans-serif' }}
                  >
                    LATEST NEWS
                  </h2>
                </div>
                <div className="w-full flex flex-col items-center justify-center">
                <button className="bg-black text-white px-3 py-4 rounded-md transition text-xs sm:text-sm  sm:w-auto">
                  View All Articles
                </button>
                </div>
              </motion.div>
      <div className="relative w-full h-[300px]" style={{ aspectRatio: '16 / 9' }}>
          
        <Swiper
          modules={[Pagination]}
          spaceBetween={0}
          slidesPerView={1}
          pagination={{ clickable: true }}
          className="w-full h-full"
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={index}>
              <div className="relative w-full h-full">
                <Image
                  src={slide.image}
                  alt={slide.title}
                  layout="fill"
                  objectFit="cover"
                  className="brightness-[0.5]"
                  priority
                />
                <div className="absolute inset-0 flex flex-col max-w-[80%] justify-center p-6 text-white z-10">
                   <div className="absolute top-6 left-6 sm:top-10 sm:left-10">
                                           <Image src={khaleejLogo} alt="Khaleej Times Logo" width={120} height={32} className="object-contain drop-shadow-lg" />
                                         </div>
                  <h2 className="text-2xl font-bold max-w-xl leading-[0.7] mt-5"
                  style={{ fontFamily: 'Luxerie, Lexend, sans-serif' }}>
                    {slide.title}
                  </h2>
                  <p className="mt-2 font-lexend text-sm max-w-md">{slide.description}</p>
                  <a
                    href={slide.link}
                    className="mt-4 px-5 py-2 border max-w-[120px] border-white text-sm rounded-md hover:bg-white hover:text-black transition"
                  >
                    Read More
                  </a>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  
  );
};

export default MobileSlider;
