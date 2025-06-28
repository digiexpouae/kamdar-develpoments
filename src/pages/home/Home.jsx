import Form from "../../common/form/Form";
import Section1 from "../../common/section1/Section1"
import Section2 from '../../common/section2/Section2';
import Section3 from "./section3/Section3";
import Section4 from "../../common/section4/Section4";
import Section5 from "../../common/section5/Section5";
import Slider from "./slider/Slider";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import MobileSlider from "../../common/mobileslider/mobileslider";
import { gsap } from 'gsap';
import { useEffect } from "react";
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
const Home = () => {

   
  useEffect(() => {
   const panels = gsap.utils.toArray(".panel:not(:first-child)");
   gsap.registerPlugin(ScrollTrigger);
   ScrollTrigger.normalizeScroll(true);

   
   // Set first panel to be visible by default
   gsap.set(panels[0], { yPercent: 0, zIndex: 1 });
   
   // Set other panels below the viewport
   gsap.set(panels, {
      yPercent: 100,
      zIndex: (i) => i + 2
   });
   
   const scroll=`+=${panels.length * 100}%`; // Adjust for number of panels to animate
   
   const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        endTrigger:'bottom bottom',
        end: `${scroll}vh`, // Dynamic end based on number of panels
        scrub: true,
        pin: true
        ,  anticipatePin: 1,
      }
    })
    console.log(`${(panels.length - 1) * 100}%`)
    
   gsap.set(panels, {
      yPercent: 100,  // Starts each panel 100% down (below the view)
      zIndex: (i, target, targets) => i + 2
    });

    
   panels.forEach((panel, i) => {
   tl.to(panel, {
     yPercent: 0,
     ease: "none"
   }, "+=0.5");
 });
   }, [])
   return (
      
  <>     
         <Header />
         <div className="hero relative ">
         <Section1
            text={<>BUILT FOR GENERATIONS.<br />CRAFTED WITH PURPOSE</>}
            backgroundImage="/assets/1.png"
            mobileBackgroundImage="/assets/homemob.png" // your mobile bg image
            className={'panel inset-0 absolute w-full h-[100vh] z-0'}
         />

         <Section2 text={<>  ELEVATED LIVING.<br />
            WITHIN REACH  </>} className={'panel inset-0 z-[-10] absolute w-full h-[100vh]'}/>
            
         <Section4 heading={<>SOPHISTICATED LIVING IN<br />
            THE HEART OF JVC       </>}
            className={'panel  absolute inset-0 absolute w-full h-[100vh] z-[-10] bg-cover bg-center'}
            desktopBackground={'/assets/3.jpg'}
            btntext={'Explore Now'} />

         <Section5 heading={<> CRAFTED FOR THE FEW <br /> WHO EXPECT MORE</>}  className={'panel absolute inset-0 absolute z-[-10] w-full h-full '}/>
         </div>
         <Section3 />
         {/* <div className="md:block hidden "> */}
            <Slider className={''}/>
         {/* </div> */}

         <div className="block md:hidden ">
            <MobileSlider />
         </div>

         <Form className={''}/>
         <Footer />
     
      </>
   );

}

export default Home;