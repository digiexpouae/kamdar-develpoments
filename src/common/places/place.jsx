
import React, {  useEffect, useRef, useState } from 'react'
import Image from 'next/image';
import car from '../../../public/assets/105/car.png'



import dynamic from 'next/dynamic';

const Map = dynamic(() => import('../map/maptwo'), {
  ssr: false,
});
const places = ({center_position,Name,markers,Main_marker}) => {
useEffect(() => {
  let ctx;

  const loadGsap = async () => {
    const gsapModule = await import('gsap');
    const ScrollTrigger = (await import('gsap/ScrollTrigger')).ScrollTrigger;
    gsapModule.gsap.registerPlugin(ScrollTrigger);
          ScrollTrigger.normalizeScroll(true);


    if (!movingRef.current || !sectionref.current) return;

    ctx = gsapModule.gsap.context(() => {
      gsapModule.gsap.fromTo(
        movingRef.current,
        { left: '17%' },
        {
          left: '80%',
          ease: 'none',
         scrollTrigger: {
  trigger: sectionref.current,
  start: 'top top',
  end: '+=1500',
  scrub: true,
  onUpdate: (self) => {
          if (!movingRef.current) return;

          if (self.progress <= 0) {
            // Stay at 20% until ScrollTrigger starts
            movingRef.current.style.left = '17%';
          } 

  
}

}
,
        }
      );
    }, sectionref);

   
  };

  loadGsap();

  return () => {
    ctx?.revert();
  };
}, []);


  const swipperRef=useRef(null)
const [activeIndex, setactiveIndex] = useState(0)
const styles=[{name:<>105 Residences <br /> by Kamdar</> ,style:'w-[15px] h-[15px] absolute left-[20%] z-20 bg-white rounded-2xl'},
  {name:<>10-20 <br /> minutes</> ,style:'w-[15px] h-[15px] absolute left-[40%] z-20 bg-white rounded-2xl'},
  {name:<>20-25 <br /> minutes</> ,style:'w-[15px] h-[15px] absolute left-[60%]  z-20 bg-white rounded-2xl'},
  {name:<>25-30 <br /> minutes</> ,style:'w-[15px] h-[15px] absolute left-[80%] z-20 bg-white rounded-2xl'}
]
  const movingRef=useRef(null)
const carWrapperRef=useRef(null)

  const sectionref=useRef()

      const viewportWidth = '80vw';








 return(
 <div className='  w-full md:pt-24 pt-20  text-white h-[100vh] mb-40'  ref={sectionref}>
      <div className='flex flex-col items-center justify-center gap-[100px]  w-full lg:mt-[20px] mt-[50px] ' >
        <div className='flex flex-col items-center justify-center w-full ' >

        <div className="relative w-full h-10 flex items-center">
          <hr className="border-t border-white w-full absolute" />
          {styles.map((elem, index) => (
            <div 
              key={index} 
              className="absolute flex flex-col items-center " 
              style={{ left: `${20 + index * 20}%`, transform: 'translate(-50%, 35%)' }}
            >
              <div className="w-[15px] h-[15px] bg-white rounded-full"></div>
              <div className="text-white text-center text-xs md:text-sm whitespace-nowrap mt-2">
                {elem.name}
              </div>
            </div>
          ))}
    {console.log(activeIndex)}



    <div ref={movingRef} className='md:!w-[127px] !w-[62px] !h-[40px] md:!h-[72px] absolute left-[20%] rotate-180 z-30'><Image src={car} objectFit='cover'  className='transition-transform duration-700  h-[100%] w-[100%] ease-in-out'/>
    </div>
          </div> 
          </div>
        <div className='w-[100%]   mb-10 relative'>
           <Map  className={'z-50'} carcontainer={sectionref} sectionref={movingRef} containerRef={sectionref} center_position={center_position} Name={Name} markers={markers} Main_marker={Main_marker}/>
           
        </div></div>
      </div>

  )
}

export default places
