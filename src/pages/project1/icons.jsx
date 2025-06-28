import React from 'react'


import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

const icon = ({ icons }) => {
  const firstRow = icons.slice(0, 3);
  const secondRow = icons.slice(3);

  const renderRow = (row) =>
    row.map((elem, index) => (
      <div
        key={index}
        className="flex flex-col items-center justify-center relative text-white  md:h-[200px]"
      >
        <div className="w-[38px] md:w-[80px] flex items-center justify-center h-[23%] md:h-[60%]">
          <Image
            src={elem.img}
            width={100}
            height={100}
            className={`!h-full ${elem.clas}`}
            alt={elem.name}
          />
        </div>
        <div className="flex flex-col items-center justify-start text-center h-[35%] md:h-[50%] w-[70px] md:w-[250px]">
          <span className="text-center font-bold text-[7px] md:text-[29px] w-[70%] font-lexend text-wrap h-[70%] leading-3 md:leading-6 text-white" style={{fontFamily:'Luxerie, sans-serif'}}>
            {elem.name}
          </span>
          <p className="text-[7px] md:text-[18px] h-[30%] text-white">{elem.distance}</p>
        </div>
      </div>
    ));

  return (
    <div className="flex items-center justify-center md:h-[650px]">
      <div className="w-full max-w-7xl space-y-4 md:space-y-8 px-2 md:px-0">
        {/* Mobile: Swiper slider */}
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
                <div className="flex flex-col items-center justify-center">
                  <div className="w-[80px] h-[100px] flex items-center justify-center mx-auto">
                    <Image
                      src={elem.img}
                      width={100}
                      height={100}
                      className={`!h-full ${elem.clas}`}
                      alt={elem.name}
                    />
                  </div>
                  <span className="text-center font-bold text-[14px] w-full my-heading text-wrap leading-3 text-white mt-2">
                    {elem.name}
                  </span>
                  <p className="text-[12px] text-white mt-1">{elem.distance}</p>
                </div>
              </SwiperSlide>
            ))}
            <div className="swiper-button-prev !text-[#FFFFFF] !left-0 !top-1/2 !-translate-y-1/2 !w-8 !h-8 !flex !items-center !justify-center !bg-transparent">
              {/* <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 8L12 16L20 24" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg> */}
            </div>
            <div className="swiper-button-next !text-[#FFFFFF] !right-0 !top-1/2 !-translate-y-1/2 !w-8 !h-8 !flex !items-center !justify-center !bg-transparent">
              {/* <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 8L20 16L12 24" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg> */}
            </div>
          </Swiper>
        </div>
        {/* Desktop: grid */}
        <div className="hidden md:flex items-center justify-center flex-col ">
          <div className="grid grid-cols-3  gap-x-3 w-[70%]">{renderRow(firstRow)}</div>
          <div className="flex justify-center w-[40%] gap-x-2">{renderRow(secondRow)}</div>
        </div>
      </div>
    </div>
  );
};
export default icon


