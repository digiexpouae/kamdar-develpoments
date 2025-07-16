// import React from "react";
// import Image from "next/image";
// import im1 from "../../../public/assets/1.jpg";
// import im2 from "../../../public/assets/2.JPG";
// import im3 from "../../../public/assets/3.JPG";
// const section=()=>{
//     return(
//         <div className=" flex flex-col items-center justify-center bg-[#0E1527] w-full text-white h-[400px] gap-10">
//             <h1 className="text-[15px] md:text-[45px] text-center my-heading leading-6 text-white font-bold">Life at Empire</h1>
//             <div className="flex items-center justify-between w-[60%]">
//             <div className="flex flex-col items-center text-white"><div className=" relative  w-[220px] h-[120px] mb-2"><Image src={im1} className="!w-full !h-full !object-cover rounded-2xl " /></div><p className="text-[15px] md:text-[20px] text-center my-heading leading-6 text-white font-bold">Flexible  <br/> Working Hours</p></div>
//             <div className="flex flex-col items-center text-white"><div className=" relative  w-[220px] h-[120px] mb-2"><Image src={im2} className="!w-full !h-full !object-cover rounded-2xl " /></div><p className="text-[15px] md:text-[20px] text-center my-heading leading-6 text-white font-bold">Friendly, Inclusive <br/> Environment</p></div>
//             <div className="flex flex-col items-center text-white"><div className=" relative  w-[220px] h-[120px] mb-2"><Image src={im3} className="!w-full !h-full !object-cover rounded-2xl " /></div><p className="text-[15px] md:text-[20px] text-center my-heading leading-6 text-white font-bold">Opportunities  <br/> for Growth</p></div></div>
//         </div>
//     )
// }
// export default section

import React from "react";
import Image from "next/image";
import im1 from "../../../public/assets/1.jpg";
import im2 from "../../../public/assets/2.JPG";
import im3 from "../../../public/assets/3.JPG";

const Section = () => {
  return (
    <div className="flex flex-col items-center justify-center bg-[#0F0D0D] w-full text-white py-12 px-4">
      <h1 className="text-[30px] md:text-[45px] text-center font-bold leading-tight mb-10" style={{fontFamily:'Luxerie, sans-serif'}}>
        Life at Kamdar
      </h1>
      
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
