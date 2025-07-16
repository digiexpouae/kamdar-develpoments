'use client';

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import slider from '../../../public/assets/aboutimages/slider1.png';
import sliderimg from '../../../public/assets/slider2.jpg';
import sliderimg2 from '../../../public/assets/projectimages/project-2.jpg';
import khaleejLogo from '../../../public/assets/khaleej1.png';
import arabialogo from '../../../public/assets/homeslider/arab.png'
import bayanlogo from '../../../public/assets/homeslider/bayan.png'
import identitylogo from '../../../public/assets/homeslider/identity.png'
import designlogo from '../../../public/assets/homeslider/design.png'
import plumberlogo from '../../../public/assets/homeslider/plumber.png'
import plumberslide from '../../../public/assets/homeslider/hs2.png'
import Image from 'next/image';
import { motion } from 'framer-motion';


const MobileSlider = ({heading}) => {
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


          {/* Slide 2 */}
          <SwiperSlide>
            <div className="relative w-full h-full">
              <Image
                src={sliderimg2}
                alt="Kamdar unveils new residential development in Dubai's JVC"
                layout="fill"
                objectFit="cover"
                className="brightness-[0.5]"
                priority
              />
              <div className="absolute inset-0 flex flex-col max-w-[80%] justify-center p-6 text-white z-10">
                <div className="absolute top-6 left-6 sm:top-10 sm:left-10">
                  <Image src={khaleejLogo} alt="Khaleej Times Logo" width={120} height={32} className="object-contain drop-shadow-lg" />
                </div>
                <h2 className="text-xl font-bold max-w-xl leading-[0.7] mt-5"
                style={{ fontFamily: 'Luxerie, Lexend, sans-serif' }}>
                  Kamdar unveils new residential development in Dubai's JVC
                </h2>
                <p className="mt-2 leading-[1] font-lexend text-sm max-w-md">Renowned developer launches first UAE project for public sale after four decades of delivering exclusive private developments</p>
                <a
                  href="https://www.khaleejtimes.com/business/kamdar-unveils-new-residential-development-in-dubais-jvc"
                  className="mt-4 px-5 py-2 border max-w-[120px] border-white text-sm rounded-md hover:bg-white hover:text-black transition"
                >
                  Read More
                </a>
              </div>
            </div>
          </SwiperSlide>

          {/* Slide 3 */}
          <SwiperSlide>
            <div className="relative w-full h-full">
              <Image
                src={slider}
                alt="Kamdar Developments Breaks Ground on 105 Residences in JVC"
                layout="fill"
                objectFit="cover"
                className="brightness-[0.5]"
                priority
              />
              <div className="absolute inset-0 flex flex-col max-w-[80%] justify-center p-6 text-white z-10">
                <div className="absolute top-6 left-6 sm:top-10 sm:left-10">
                  <Image src={arabialogo} alt="Arabia Logo" width={120} height={32} className="object-contain drop-shadow-lg" />
                </div>
                <h2 className="text-xl font-bold max-w-xl leading-[0.7] mt-5"
                style={{ fontFamily: 'Luxerie, Lexend, sans-serif' }}>
                  Kamdar Developments Breaks Ground on<span style={{ fontFamily: 'lexend',
                  fontSize:'17px',
                  fontWeight:'300',
             }}> 105 </span>Residences in JVC
                </h2>
                <p className="mt-2 leading-[1] font-lexend text-sm max-w-md">A 105-unit luxury residential Dubai project starting from $174,000 with completion expected in early 2027</p>
                <a
                  href="https://www.albayan.ae/economy/business/real-estate/13347"
                  className="mt-4 px-5 py-2 border max-w-[120px] border-white text-sm rounded-md hover:bg-white hover:text-black transition"
                >
                  Read More
                </a>
              </div>
            </div>
          </SwiperSlide>

          {/* Slide 4 */}
          <SwiperSlide>
            <div className="relative w-full h-full">
              <Image
                src={sliderimg2}
                alt="Launch of Kamdar 105 project in Jumeirah Village Circle"
                layout="fill"
                objectFit="cover"
                className="brightness-[0.5]"
                priority
              />
              <div className="absolute inset-0 flex flex-col max-w-[80%] justify-center p-6 text-white z-10">
                <div className="absolute top-6 left-6 sm:top-10 sm:left-10">
                  <Image src={bayanlogo} alt="Bayan Logo" width={80} height={32} className="object-contain drop-shadow-lg" />
                </div>
                <h2 className="text-xl font-bold max-w-xl leading-[0.7] mt-5"
                style={{ fontFamily: 'Luxerie, Lexend, sans-serif' }}>
                  Launch of Kamdar<span style={{ fontFamily: 'lexend',
                  fontSize:'17px',
                  fontWeight:'300',
             }}> 105 </span>project in Jumeirah Village Circle
                </h2>
                <p className="mt-2 leading-[1] font-lexend text-sm max-w-md">Dubai-based Kamdar Developers has announced the launch of its new Kamdar 105 Residences project in Jumeirah Village Circle,.........</p>
                <a
                  href="https://www.arabianbusiness.com/industries/real-estate/dubai-real-estate-kamdar-property-development-announces-new-105-residences-in-jvc"
                  className="mt-4 px-5 py-2 border max-w-[120px] border-white text-sm rounded-md hover:bg-white hover:text-black transition"
                >
                  Read More
                </a>
              </div>
            </div>
          </SwiperSlide>

          {/* Slide 5 */}
          <SwiperSlide>
            <div className="relative w-full h-full">
              <Image
                src={sliderimg}
                alt="Unveiling Attainable Luxury"
                layout="fill"
                objectFit="cover"
                className="brightness-[0.5]"
                priority
              />
              <div className="absolute inset-0 flex flex-col max-w-[80%] justify-center p-6 text-white z-10">
                <div className="absolute top-6 left-6 sm:top-10 sm:left-10">
                  <Image src={identitylogo} alt="Identity Logo" width={120} height={32} className="object-contain drop-shadow-lg" />
                </div>
                <h2 className="text-xl font-bold max-w-xl leading-[0.7] mt-5"
                style={{ fontFamily: 'Luxerie, Lexend, sans-serif' }}>
                  Unveiling Attainable Luxury
                </h2>
                <p className="mt-2 leading-[1] font-lexend text-sm max-w-md">Kamdar Developments has launched 105 Residences, a new high-end development in Jumeirah Village Circle.</p>
                <a
                  href="https://identity.ae/105-residences-jvc/"
                  className="mt-4 px-5 py-2 border max-w-[120px] border-white text-sm rounded-md hover:bg-white hover:text-black transition"
                >
                  Read More
                </a>
              </div>
            </div>
          </SwiperSlide>

          {/* Slide 6 */}
          <SwiperSlide>
            <div className="relative w-full h-full">
              <Image
                src={plumberslide}
                alt="Kamdar Developments Appoints Main Contractor for Latest Project"
                layout="fill"
                objectFit="cover"
                className="brightness-[0.5]"
                priority
              />
              <div className="absolute inset-0 flex flex-col max-w-[80%] justify-center p-6 text-white z-10">
                <div className="absolute top-6 left-6 sm:top-10 sm:left-10">
                  <Image src={plumberlogo} alt="Plumber Logo" width={70} height={32} className="object-contain drop-shadow-lg" />
                </div>
                <h2 className="text-xl font-bold max-w-xl leading-[0.7] mt-5"
                style={{ fontFamily: 'Luxerie, Lexend, sans-serif' }}>
                  Kamdar Developments Appoints Main Contractor for Latest Project
                </h2>
                <p className="mt-2 leading-[1] font-lexend text-sm max-w-md">Emphasising on timely delivery and exceptional quality, Luxedesign's appointment is expected to support the project's completion by early 2027</p>
                <a
                  href="https://www.mepmiddleeast.com/people/appointments/kamdar-developments-appoints-main-contractor"
                  className="mt-4 px-5 py-2 border max-w-[120px] border-white text-sm rounded-md hover:bg-white hover:text-black transition"
                >
                  Read More
                </a>
              </div>
            </div>
          </SwiperSlide>

          {/* Slide 7 */}
          <SwiperSlide>
            <div className="relative w-full h-full">
              <Image
                src={sliderimg2}
                alt="Kamdar Property Development announces new 105 Residences' in JVC"
                layout="fill"
                objectFit="cover"
                className="brightness-[0.5]"
                priority
              />
              <div className="absolute inset-0 flex flex-col max-w-[80%] justify-center p-6 text-white z-10">
                <div className="absolute top-6 left-6 sm:top-10 sm:left-10">
                  <Image src={arabialogo} alt="Arabia Logo" width={120} height={32} className="object-contain drop-shadow-lg" />
                </div>
                <h2 className="text-xl font-bold max-w-xl leading-[0.7] mt-5"
                style={{ fontFamily: 'Luxerie, Lexend, sans-serif' }}>
                  Kamdar Property Development announces new <span style={{ fontFamily: 'lexend',
                  fontSize:'17px',
                  fontWeight:'300',
             }}>105 </span>Residences' in JVC
                </h2>
                <p className="mt-2 leading-[1] font-lexend text-sm max-w-md">105 Residences in Dubai's JVC features comprehensive amenities, including a rooftop open-air cinema, swimming pool, fitness studio and more</p>
                <a
                  href="https://design-middleeast.com/kamdar-developments-partners-with-luxedesign-to-deliver-elevated-residential-design/"
                  className="mt-4 px-5 py-2 border max-w-[120px] border-white text-sm rounded-md hover:bg-white hover:text-black transition"
                >
                  Read More
                </a>
              </div>
            </div>
          </SwiperSlide>

          {/* Slide 8 */}
          <SwiperSlide>
            <div className="relative w-full h-full">
              <Image
                src={plumberslide}
                alt="Kamdar Developments Partners With Luxedesign to Deliver Elevated Residential Design"
                layout="fill"
                objectFit="cover"
                className="brightness-[0.5]"
                priority
              />
              <div className="absolute inset-0 flex flex-col max-w-[80%] justify-center p-6 text-white z-10">
                <div className="absolute top-6 left-6 sm:top-10 sm:left-10">
                  <Image src={designlogo} alt="Design Logo" width={80} height={32} className="object-contain drop-shadow-lg" />
                </div>
                <h2 className="text-xl font-bold max-w-xl leading-[0.7] mt-5"
                style={{ fontFamily: 'Luxerie, Lexend, sans-serif' }}>
                  Kamdar Developments Partners With Luxedesign to Deliver Elevated Residential Design
                </h2>
                <p className="mt-2 leading-[1] font-lexend text-sm max-w-md">Kamdar Developments has appointed Luxedesign (LDV) as the General Contractor for the 105 Residences in JVC and an exclusive luxury villa collection in Meydan.</p>
                <a
                  href="https://www.arabianbusiness.com/industries/real-estate/dubai-real-estate-kamdar-developments-breaks-ground-on-105-residences-in-jvc"
                  className="mt-4 px-5 py-2 border max-w-[120px] border-white text-sm rounded-md hover:bg-white hover:text-black transition"
                >
                  Read More
                </a>
              </div>
            </div>
          </SwiperSlide>

          {/* Slide 9 */}
          <SwiperSlide>
            <div className="relative w-full h-full">
              <Image
                src={sliderimg2}
                alt="Kamdar unveils new residential development in Dubai's JVC"
                layout="fill"
                objectFit="cover"
                className="brightness-[0.5]"
                priority
              />
              <div className="absolute inset-0 flex flex-col max-w-[80%] justify-center p-6 text-white z-10">
                <div className="absolute top-6 left-6 sm:top-10 sm:left-10">
                  <Image src={khaleejLogo} alt="Khaleej Times Logo" width={120} height={32} className="object-contain drop-shadow-lg" />
                </div>
                <h2 className="text-xl font-bold max-w-xl leading-[0.7] mt-5"
                style={{ fontFamily: 'Luxerie, Lexend, sans-serif' }}>
                  Kamdar unveils new residential development in Dubai's JVC
                </h2>
                <p className="mt-2 leading-[1] font-lexend text-sm max-w-md">Renowned developer launches first UAE project for public sale after four decades of delivering exclusive private developments</p>
                <a
                  href="https://www.khaleejtimes.com/business/kamdar-unveils-new-residential-development-in-dubais-jvc"
                  className="mt-4 px-5 py-2 border max-w-[120px] border-white text-sm rounded-md hover:bg-white hover:text-black transition"
                >
                  Read More
                </a>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  
  );
};

export default MobileSlider;