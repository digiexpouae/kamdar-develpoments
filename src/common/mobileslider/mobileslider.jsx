'use client';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import Image from 'next/image';

// Slide content
const slides = [
  {
    image: '/assets/sliderimg.png',
    title: 'KAMDAR DEVELOPMENTS BREAKS GROUND ON RESIDENCES IN JVC',
    description:
      'The ceremony was attended by the team from Kamdar Developments, contractor Luxedesign (LDV) and project advisors from Savills Middle East',
    link: '#',
  },
  {
    image: '/assets/2.png',
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
                  <h2 className="text-2xl font-bold max-w-xl leading-tight"
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
