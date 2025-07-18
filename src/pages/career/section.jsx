

import React from "react";
import Image from "next/image";
import im1 from "../../../public/assets/1.jpg";
import im2 from "../../../public/assets/two.JPG";
import im3 from "../../../public/assets/three.JPG";

const Section = () => {
  return (
    <div className="flex flex-col items-center justify-center  w-full text-black py-12 px-4 " style={{backgroundImage:'url(/assets/white-bg.jpg)',backgroundSize:'cover',backgroundPosition:'center'}}>
      <h1 className="text-[30px] md:text-[65px] text-center font-bold leading-tight " style={{fontFamily:'Luxerie, sans-serif'}}>
    Our Culture
      </h1>
      <p className="text-[8px] md:text-[20px] text-center  md:w-xl mb-10">We've built a workplace where innovation thrives, relationships matter, 
and everyone can reach their full potential.
</p>
      
      <div className="flex flex-col md:flex-row items-center justify-center md:justify-between  w-full max-w-screen-md">
        {/* Card 1 */}
        <div className="flex flex-col items-center text-center">
          <div className="relative w-[220px] h-[120px] mb-2">
            <Image
              src={im1}
              alt="Flexible Working Hours"
              className="!w-full !h-full !object-cover rounded-2xl"
              fill
            />
          </div>
          <p className="text-[15px] md:text-[20px] " style={{fontFamily:'lexend, sans-serif'}}>
            Flexible <br /> Working Hours
          </p>
        </div>

        {/* Card 2 */}
        <div className="flex flex-col items-center text-center">
          <div className="relative w-[220px] h-[120px] mb-2">
            <Image
              src={im2}
              alt="Friendly, Inclusive Environment"
              className="!w-full !h-full !object-cover rounded-2xl"
              fill
            />
          </div>
          <p className="text-[15px] md:text-[20px] ">
            Friendly, Inclusive <br /> Environment
          </p>
        </div>

        {/* Card 3 */}
        <div className="flex flex-col items-center text-center">
          <div className="relative w-[220px] h-[120px] mb-2">
            <Image
              src={im3}
              alt="Opportunities for Growth"
              className="!w-full !h-full !object-cover rounded-2xl"
              fill
            />
          </div>
          <p className="text-[15px] md:text-[20px] ">
            Opportunities <br /> for Growth
          </p>
        </div>
      </div>
    </div>
  );
};

export default Section;
